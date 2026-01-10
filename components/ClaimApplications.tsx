"use client";

import React from 'react';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * ClaimApplications Component
 *
 * Automatically claims any applications submitted before login
 * by matching the user's email address.
 *
 * Runs on:
 * - Component mount (for page visits)
 * - SIGNED_IN auth event (for fresh logins)
 *
 * Usage: Add to layout or authenticated pages
 */
export function ClaimApplications() {
  useEffect(() => {
    const supabase = createClient();

    const claimApplications = async () => {
      try {
        const { data, error } = await supabase.rpc(
          'claim_applications_for_current_user'
        );

        if (error) {
        } else if (data > 0) {
        }
      } catch (err) {
      }
    };

    // Claim on mount
    claimApplications();

    // Also claim on auth state change (SIGNED_IN event)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await claimApplications();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // This component doesn't render anything
  return null;
}
