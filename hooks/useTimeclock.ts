'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// GPS accuracy threshold in meters
const MAX_ACCURACY_METERS = 50;

// Heartbeat interval in milliseconds (3 minutes)
const HEARTBEAT_INTERVAL_MS = 3 * 60 * 1000;

// GPS options for high accuracy
const GPS_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export type TimeclockState = 
  | 'idle'           // Not clocked in
  | 'clocked_in'     // Clocked in, onsite
  | 'offsite_grace'  // Clocked in, offsite < 15 min
  | 'auto_clocked_out' // Auto clocked out
  | 'on_lunch'       // On lunch break
  | 'error';         // GPS or other error

export interface TimeclockStatus {
  state: TimeclockState;
  entryId: string | null;
  clockInAt: string | null;
  clockOutAt: string | null;
  lunchStartAt: string | null;
  lunchEndAt: string | null;
  hoursWorked: number | null;
  withinGeofence: boolean;
  outsideSince: string | null;
  graceTimeRemaining: number | null; // seconds
  error: string | null;
  alert: string | null;
  gpsAccuracy: number | null;
}

export interface GPSPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

interface UseTimeclockOptions {
  siteId?: string;
  partnerId?: string;
  programId?: string;
}

export function useTimeclock(options: UseTimeclockOptions = {}) {
  const { siteId, partnerId, programId } = options;
  
  const [status, setStatus] = useState<TimeclockStatus>({
    state: 'idle',
    entryId: null,
    clockInAt: null,
    clockOutAt: null,
    lunchStartAt: null,
    lunchEndAt: null,
    hoursWorked: null,
    withinGeofence: false,
    outsideSince: null,
    graceTimeRemaining: null,
    error: null,
    alert: null,
    gpsAccuracy: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const graceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Get current GPS position
  const getCurrentPosition = useCallback((): Promise<GPSPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          if (accuracy > MAX_ACCURACY_METERS) {
            reject(new Error(`GPS accuracy too low: ${Math.round(accuracy)}m (max: ${MAX_ACCURACY_METERS}m)`));
            return;
          }

          resolve({
            lat: latitude,
            lng: longitude,
            accuracy,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location permission denied. Please enable location access.'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out.'));
              break;
            default:
              reject(new Error('Unknown location error.'));
          }
        },
        GPS_OPTIONS
      );
    });
  }, []);

  // Send heartbeat to server
  const sendHeartbeat = useCallback(async () => {
    if (!status.entryId) return;

    try {
      const position = await getCurrentPosition();
      
      setStatus(prev => ({ ...prev, gpsAccuracy: position.accuracy }));

      const response = await fetch('/api/timeclock/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry_id: status.entryId,
          lat: position.lat,
          lng: position.lng,
          accuracy: position.accuracy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(prev => ({ ...prev, error: data.error }));
        return;
      }

      // Update state based on server response
      if (data.auto_clocked_out) {
        stopHeartbeat();
        setStatus(prev => ({
          ...prev,
          state: 'auto_clocked_out',
          clockOutAt: data.clock_out_at,
          withinGeofence: false,
          outsideSince: null,
          graceTimeRemaining: null,
          error: null,
        }));
      } else if (!data.within_geofence && data.outside_since) {
        // Calculate grace time remaining
        const outsideSince = new Date(data.outside_since);
        const now = new Date();
        const elapsedSeconds = (now.getTime() - outsideSince.getTime()) / 1000;
        const graceRemaining = Math.max(0, 15 * 60 - elapsedSeconds);

        setStatus(prev => ({
          ...prev,
          state: 'offsite_grace',
          withinGeofence: false,
          outsideSince: data.outside_since,
          graceTimeRemaining: Math.round(graceRemaining),
          error: null,
        }));
      } else {
        setStatus(prev => ({
          ...prev,
          state: prev.lunchStartAt && !prev.lunchEndAt ? 'on_lunch' : 'clocked_in',
          withinGeofence: data.within_geofence,
          outsideSince: null,
          graceTimeRemaining: null,
          error: null,
        }));
      }
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Heartbeat failed',
      }));
    }
  }, [status.entryId, getCurrentPosition]);

  // Start heartbeat loop
  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) return;
    
    // Send initial heartbeat
    sendHeartbeat();
    
    // Set up interval
    heartbeatIntervalRef.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
  }, [sendHeartbeat]);

  // Stop heartbeat loop
  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    if (graceTimerRef.current) {
      clearInterval(graceTimerRef.current);
      graceTimerRef.current = null;
    }
  }, []);

  // Clock in
  const clockIn = useCallback(async () => {
    if (!siteId || !partnerId || !programId) {
      setStatus(prev => ({ ...prev, error: 'Missing site, partner, or program configuration' }));
      return;
    }

    setIsLoading(true);
    setStatus(prev => ({ ...prev, error: null, alert: null }));

    try {
      const position = await getCurrentPosition();

      const response = await fetch('/api/timeclock/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clock_in',
          site_id: siteId,
          partner_id: partnerId,
          program_id: programId,
          lat: position.lat,
          lng: position.lng,
          accuracy: position.accuracy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(prev => ({ ...prev, error: data.error }));
        return;
      }

      setStatus(prev => ({
        ...prev,
        state: 'clocked_in',
        entryId: data.entry_id,
        clockInAt: data.clock_in_at,
        clockOutAt: null,
        lunchStartAt: null,
        lunchEndAt: null,
        hoursWorked: null,
        withinGeofence: true,
        outsideSince: null,
        graceTimeRemaining: null,
        error: null,
        alert: data.alert || null,
        gpsAccuracy: position.accuracy,
      }));

      // Start heartbeat
      startHeartbeat();
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Clock in failed',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [siteId, partnerId, programId, getCurrentPosition, startHeartbeat]);

  // Clock out
  const clockOut = useCallback(async () => {
    if (!status.entryId) {
      setStatus(prev => ({ ...prev, error: 'No active shift' }));
      return;
    }

    setIsLoading(true);
    setStatus(prev => ({ ...prev, error: null, alert: null }));

    try {
      const position = await getCurrentPosition();

      const response = await fetch('/api/timeclock/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clock_out',
          entry_id: status.entryId,
          lat: position.lat,
          lng: position.lng,
          accuracy: position.accuracy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(prev => ({ ...prev, error: data.error }));
        return;
      }

      stopHeartbeat();

      setStatus(prev => ({
        ...prev,
        state: 'idle',
        clockOutAt: data.clock_out_at,
        hoursWorked: data.hours_worked,
        withinGeofence: false,
        outsideSince: null,
        graceTimeRemaining: null,
        error: null,
        alert: data.alert || null,
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Clock out failed',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [status.entryId, getCurrentPosition, stopHeartbeat]);

  // Start lunch
  const startLunch = useCallback(async () => {
    if (!status.entryId) {
      setStatus(prev => ({ ...prev, error: 'No active shift' }));
      return;
    }

    setIsLoading(true);
    setStatus(prev => ({ ...prev, error: null, alert: null }));

    try {
      const position = await getCurrentPosition();

      const response = await fetch('/api/timeclock/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'lunch_start',
          entry_id: status.entryId,
          lat: position.lat,
          lng: position.lng,
          accuracy: position.accuracy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(prev => ({ ...prev, error: data.error }));
        return;
      }

      setStatus(prev => ({
        ...prev,
        state: 'on_lunch',
        lunchStartAt: data.lunch_start_at,
        error: null,
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Start lunch failed',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [status.entryId, getCurrentPosition]);

  // End lunch
  const endLunch = useCallback(async () => {
    if (!status.entryId) {
      setStatus(prev => ({ ...prev, error: 'No active shift' }));
      return;
    }

    setIsLoading(true);
    setStatus(prev => ({ ...prev, error: null, alert: null }));

    try {
      const position = await getCurrentPosition();

      const response = await fetch('/api/timeclock/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'lunch_end',
          entry_id: status.entryId,
          lat: position.lat,
          lng: position.lng,
          accuracy: position.accuracy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(prev => ({ ...prev, error: data.error }));
        return;
      }

      setStatus(prev => ({
        ...prev,
        state: 'clocked_in',
        lunchEndAt: data.lunch_end_at,
        error: null,
        alert: data.alert || null,
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'End lunch failed',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [status.entryId, getCurrentPosition]);

  // Reset after auto clock-out (allows new clock-in)
  const resetAfterAutoClockOut = useCallback(() => {
    setStatus({
      state: 'idle',
      entryId: null,
      clockInAt: null,
      clockOutAt: null,
      lunchStartAt: null,
      lunchEndAt: null,
      hoursWorked: null,
      withinGeofence: false,
      outsideSince: null,
      graceTimeRemaining: null,
      error: null,
      alert: null,
      gpsAccuracy: null,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHeartbeat();
    };
  }, [stopHeartbeat]);

  // Update grace timer countdown
  useEffect(() => {
    if (status.state === 'offsite_grace' && status.graceTimeRemaining !== null) {
      graceTimerRef.current = setInterval(() => {
        setStatus(prev => {
          if (prev.graceTimeRemaining === null || prev.graceTimeRemaining <= 0) {
            return prev;
          }
          return {
            ...prev,
            graceTimeRemaining: prev.graceTimeRemaining - 1,
          };
        });
      }, 1000);

      return () => {
        if (graceTimerRef.current) {
          clearInterval(graceTimerRef.current);
        }
      };
    }
  }, [status.state, status.graceTimeRemaining]);

  return {
    status,
    isLoading,
    clockIn,
    clockOut,
    startLunch,
    endLunch,
    resetAfterAutoClockOut,
    getCurrentPosition,
  };
}
