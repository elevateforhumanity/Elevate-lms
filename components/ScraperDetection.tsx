"use client";

import React from 'react';
import { useEffect, useRef } from 'react';
/**
 * Scraper Detection Component
 * Detects suspicious behavior that indicates automated scraping
 */
export function ScraperDetection() {
  const mouseMovements = useRef(0);
  const scrollEvents = useRef(0);
  const clickEvents = useRef(0);
  const startTime = useRef(Date.now());
  const alerted = useRef(false);
  useEffect(() => {
    // Track mouse movements
    const handleMouseMove = () => {
      mouseMovements.current++;
    };
    // Track scrolling
    const handleScroll = () => {
      scrollEvents.current++;
    };
    // Track clicks
    const handleClick = () => {
      clickEvents.current++;
    };
    // Track copy events
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString() || '';
      if (selection.length > 100) {
        sendAlert({
          type: 'LARGE_COPY',
          url: window.location.href,
          textLength: selection.length,
          timestamp: new Date().toISOString()
        });
      }
    };
    // Track right-click (often used before "View Source")
    const handleContextMenu = () => {
      sendAlert({
        type: 'RIGHT_CLICK',
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    };
    // Track keyboard shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'i' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        sendAlert({
          type: 'DEVTOOLS_SHORTCUT',
          url: window.location.href,
          key: e.key,
          timestamp: new Date().toISOString()
        });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    // Check for bot behavior after 5 seconds
    const checkTimer = setTimeout(() => {
      if (alerted.current) return;
      const timeOnPage = Date.now() - startTime.current;
      // If no mouse movement, scrolling, or clicks = likely bot
      if (mouseMovements.current === 0 &&
          scrollEvents.current === 0 &&
          clickEvents.current === 0 &&
          timeOnPage > 5000) {
        alerted.current = true;
        sendAlert({
          type: 'NO_HUMAN_BEHAVIOR',
          url: window.location.href,
          timeOnPage,
          mouseMovements: mouseMovements.current,
          scrollEvents: scrollEvents.current,
          clickEvents: clickEvents.current,
          timestamp: new Date().toISOString()
        });
      }
    }, 5000);
    // Check for DevTools opening
    const detectDevTools = () => {
      // Guard against undefined window properties on mobile
      if (typeof window === 'undefined' || !window.outerWidth || !window.outerHeight) {
        return;
      }
      
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if ((widthThreshold || heightThreshold) && !alerted.current) {
        alerted.current = true;
        sendAlert({
          type: 'DEVTOOLS_OPENED',
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
      }
    };
    const devToolsInterval = setInterval(detectDevTools, 1000);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(checkTimer);
      clearInterval(devToolsInterval);
    };
  }, []);
  return null;
}
function sendAlert(data: Record<string, unknown>) {
  // Send alert to backend
  fetch('/api/alert-scraper', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true
  }).catch((error) => {
  });
}
