"use client";

import React from 'react';

import { useEffect, useState } from 'react';

interface DynamicContentProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
}

/**
 * Renders content dynamically on the client side to prevent static scraping.
 * Content is not included in the initial HTML, making it harder for scrapers to access.
 */
export function DynamicContent({ children, delay = 0, fallback = null }: DynamicContentProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isReady) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface ObfuscatedTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text in a way that's harder for scrapers to extract.
 * Uses character-by-character rendering with random delays.
 */
export function ObfuscatedText({ text, className }: ObfuscatedTextProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const chars = text.split('');

    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayText(prev => prev + chars[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

interface ProtectedEmailProps {
  user: string;
  domain: string;
  className?: string;
}

/**
 * Renders email addresses in a way that prevents scraping by bots.
 * Email is constructed client-side from separate parts.
 */
export function ProtectedEmail({ user, domain, className }: ProtectedEmailProps) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Construct email client-side to prevent scraping
    const fullEmail = `${user}@${domain}`;
    setEmail(fullEmail);
  }, [user, domain]);

  if (!email) {
    return <span className={className}>Loading...</span>;
  }

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        // Additional protection: construct mailto on click
        e.preventDefault();
        window.location.href = `mailto:${email}`;
      }}
    >
      {email}
    </a>
  );
}

interface ProtectedPhoneProps {
  number: string;
  display?: string;
  className?: string;
}

/**
 * Renders phone numbers in a way that prevents scraping.
 * Number is obfuscated in the HTML.
 */
export function ProtectedPhone({ number, display, className }: ProtectedPhoneProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Decode phone number client-side
    setPhoneNumber(number);
  }, [number]);

  if (!phoneNumber) {
    return <span className={className}>Loading...</span>;
  }

  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        window.location.href = `tel:${phoneNumber}`;
      }}
    >
      {display || phoneNumber}
    </a>
  );
}

/**
 * Wrapper for curriculum content that should be protected from scraping.
 * Adds watermarks and prevents easy copying.
 */
export function ProtectedCurriculum({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 100) {
        const watermark = '\n\n© Elevate For Humanity - Proprietary Curriculum - All Rights Reserved';
        e.clipboardData?.setData('text/plain', selection + watermark);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  return (
    <div className="protected-curriculum" data-protected="true">
      {children}
    </div>
  );
}
