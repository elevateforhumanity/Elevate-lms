'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Coffee, 
  LogOut,
  Loader2,
  ArrowLeft
} from 'lucide-react';

const HEARTBEAT_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes
const LOCATION_TIMEOUT_MS = 10000;
const MAX_ACCURACY_M = 50;

interface ShiftState {
  entryId: string | null;
  clockInAt: string | null;
  lunchStartAt: string | null;
  lunchEndAt: string | null;
  clockOutAt: string | null;
}

interface LocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

interface GeofenceState {
  withinGeofence: boolean | null;
  distance: number | null;
  lastCheck: string | null;
}

export default function TimeclockPage() {
  const router = useRouter();
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  
  // TODO: Get these from user context/session
  const [apprenticeId] = useState<string>('');
  const [partnerId] = useState<string>('');
  const [programId] = useState<string>('');
  const [siteId] = useState<string>('');
  
  const [shift, setShift] = useState<ShiftState>({
    entryId: null,
    clockInAt: null,
    lunchStartAt: null,
    lunchEndAt: null,
    clockOutAt: null,
  });
  
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    error: null,
    loading: false,
  });
  
  const [geofence, setGeofence] = useState<GeofenceState>({
    withinGeofence: null,
    distance: null,
    lastCheck: null,
  });
  
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get current location
  const getLocation = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      setLocation(prev => ({ ...prev, loading: true, error: null }));
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null,
            loading: false,
          });
          resolve(position);
        },
        (err) => {
          const errorMsg = err.code === 1 
            ? 'Location permission denied. Please enable location access.'
            : err.code === 2 
            ? 'Location unavailable. Please try again.'
            : 'Location request timed out.';
          setLocation(prev => ({ ...prev, error: errorMsg, loading: false }));
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: LOCATION_TIMEOUT_MS,
          maximumAge: 0,
        }
      );
    });
  }, []);

  // Send heartbeat
  const sendHeartbeat = useCallback(async () => {
    if (!shift.entryId) return;
    
    try {
      const position = await getLocation();
      
      const response = await fetch('/api/timeclock/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry_id: shift.entryId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy_m: position.coords.accuracy,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeofence({
          withinGeofence: data.within_geofence,
          distance: data.distance_m,
          lastCheck: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Heartbeat failed:', err);
    }
  }, [shift.entryId, getLocation]);

  // Start heartbeat polling
  const startHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
    }
    
    // Send immediately
    sendHeartbeat();
    
    // Then poll every 2 minutes
    heartbeatRef.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
  }, [sendHeartbeat]);

  // Stop heartbeat polling
  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopHeartbeat();
  }, [stopHeartbeat]);

  // Resume heartbeat on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && shift.entryId && !shift.clockOutAt) {
        sendHeartbeat();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shift.entryId, shift.clockOutAt, sendHeartbeat]);

  // Timeclock action handler
  const handleAction = async (action: 'clock_in' | 'lunch_start' | 'lunch_end' | 'clock_out') => {
    setActionLoading(action);
    setError(null);
    
    try {
      const position = await getLocation();
      
      if (position.coords.accuracy > MAX_ACCURACY_M) {
        setError(`GPS accuracy too low (${Math.round(position.coords.accuracy)}m). Please wait for better signal.`);
        setActionLoading(null);
        return;
      }
      
      const response = await fetch('/api/timeclock/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          apprentice_id: apprenticeId,
          partner_id: partnerId,
          program_id: programId,
          site_id: siteId,
          progress_entry_id: shift.entryId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy_m: position.coords.accuracy,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Action failed');
        setActionLoading(null);
        return;
      }
      
      // Update shift state based on action
      switch (action) {
        case 'clock_in':
          setShift({
            entryId: data.progress_entry_id,
            clockInAt: data.clock_in_at,
            lunchStartAt: null,
            lunchEndAt: null,
            clockOutAt: null,
          });
          startHeartbeat();
          break;
          
        case 'lunch_start':
          setShift(prev => ({ ...prev, lunchStartAt: data.lunch_start_at }));
          break;
          
        case 'lunch_end':
          setShift(prev => ({ ...prev, lunchEndAt: data.lunch_end_at }));
          break;
          
        case 'clock_out':
          setShift(prev => ({ ...prev, clockOutAt: data.clock_out_at }));
          stopHeartbeat();
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const isClockedIn = shift.clockInAt && !shift.clockOutAt;
  const isOnLunch = shift.lunchStartAt && !shift.lunchEndAt;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <Link 
          href="/apprentice/dashboard" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-600" />
            Timeclock
          </h1>

          {/* Location Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className={`w-5 h-5 mr-2 ${location.error ? 'text-red-500' : 'text-green-500'}`} />
                <span className="text-sm font-medium">
                  {location.loading ? 'Getting location...' : 
                   location.error ? 'Location error' :
                   location.lat ? `${location.lat.toFixed(4)}, ${location.lng?.toFixed(4)}` :
                   'Location not available'}
                </span>
              </div>
              {location.accuracy && (
                <span className={`text-xs px-2 py-1 rounded ${
                  location.accuracy <= MAX_ACCURACY_M ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  ±{Math.round(location.accuracy)}m
                </span>
              )}
            </div>
            {location.error && (
              <p className="text-sm text-red-600 mt-2">{location.error}</p>
            )}
          </div>

          {/* Geofence Status */}
          {geofence.withinGeofence !== null && (
            <div className={`mb-6 p-4 rounded-lg ${
              geofence.withinGeofence ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center">
                {geofence.withinGeofence ? (
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  geofence.withinGeofence ? 'text-green-700' : 'text-red-700'
                }`}>
                  {geofence.withinGeofence ? 'Within work site' : 'Outside work site'}
                  {geofence.distance && ` (${Math.round(geofence.distance)}m away)`}
                </span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Shift Status */}
          {isClockedIn && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Clocked in:</strong> {new Date(shift.clockInAt!).toLocaleTimeString()}
              </p>
              {shift.lunchStartAt && (
                <p className="text-sm text-blue-700 mt-1">
                  <strong>Lunch started:</strong> {new Date(shift.lunchStartAt).toLocaleTimeString()}
                </p>
              )}
              {shift.lunchEndAt && (
                <p className="text-sm text-blue-700 mt-1">
                  <strong>Lunch ended:</strong> {new Date(shift.lunchEndAt).toLocaleTimeString()}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isClockedIn ? (
              <button
                onClick={() => handleAction('clock_in')}
                disabled={actionLoading !== null || location.loading}
                className="w-full flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
              >
                {actionLoading === 'clock_in' ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Clock className="w-5 h-5 mr-2" />
                )}
                Clock In
              </button>
            ) : (
              <>
                {!isOnLunch && !shift.lunchEndAt && (
                  <button
                    onClick={() => handleAction('lunch_start')}
                    disabled={actionLoading !== null}
                    className="w-full flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    {actionLoading === 'lunch_start' ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Coffee className="w-5 h-5 mr-2" />
                    )}
                    Start Lunch
                  </button>
                )}
                
                {isOnLunch && (
                  <button
                    onClick={() => handleAction('lunch_end')}
                    disabled={actionLoading !== null}
                    className="w-full flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    {actionLoading === 'lunch_end' ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Coffee className="w-5 h-5 mr-2" />
                    )}
                    End Lunch
                  </button>
                )}
                
                <button
                  onClick={() => handleAction('clock_out')}
                  disabled={actionLoading !== null || isOnLunch}
                  className="w-full flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                >
                  {actionLoading === 'clock_out' ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5 mr-2" />
                  )}
                  Clock Out
                </button>
              </>
            )}
          </div>

          {/* Shift Complete */}
          {shift.clockOutAt && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Shift complete! Clocked out at {new Date(shift.clockOutAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
