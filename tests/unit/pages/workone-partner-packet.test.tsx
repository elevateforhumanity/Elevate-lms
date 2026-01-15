/**
 * Unit tests for the WorkOne Partner Packet page
 * Tests rendering, content, and key elements
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkOnePartnerPacketPage from '@/app/workone-partner-packet/page';

describe('WorkOnePartnerPacketPage', () => {
  it('renders the page without crashing', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(document.body).toBeTruthy();
  });

  it('displays the main heading', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('WorkOne Partner Packet');
  });

  it('displays the hero section with video element', () => {
    render(<WorkOnePartnerPacketPage />);
    const video = document.querySelector('video');
    expect(video).toBeTruthy();
    // Boolean attributes in HTML become empty strings
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
  });

  it('displays credential badges', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('Registered Apprenticeship Sponsor')).toBeInTheDocument();
    expect(screen.getByText('ETPL Approved')).toBeInTheDocument();
    expect(screen.getByText('WIOA | WRG Eligible')).toBeInTheDocument();
  });

  it('displays organization overview', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('Organization Overview')).toBeInTheDocument();
    expect(screen.getByText('Organization Type')).toBeInTheDocument();
    expect(screen.getByText('Federal Oversight')).toBeInTheDocument();
    expect(screen.getByText('State Alignment')).toBeInTheDocument();
    expect(screen.getByText('ETPL Status')).toBeInTheDocument();
  });

  it('displays who we are section', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(screen.getByText('What Makes Us Different')).toBeInTheDocument();
    expect(screen.getByText('Employer-Driven Model')).toBeInTheDocument();
    expect(screen.getByText('Compliance Built-In')).toBeInTheDocument();
    expect(screen.getByText('Outcome-Focused')).toBeInTheDocument();
    expect(screen.getByText('Automated Reporting')).toBeInTheDocument();
  });

  it('displays how it works section', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('How It Works for WorkOne')).toBeInTheDocument();
    expect(screen.getByText('Referral')).toBeInTheDocument();
    expect(screen.getByText('Enrollment')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('Placement')).toBeInTheDocument();
  });

  it('displays ETPL-approved programs', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('ETPL-Approved Programs')).toBeInTheDocument();
    expect(screen.getByText('Barber Apprenticeship')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Certifications')).toBeInTheDocument();
    expect(screen.getByText('IT & Cybersecurity')).toBeInTheDocument();
    expect(screen.getByText('CDL Training')).toBeInTheDocument();
    expect(screen.getByText('Skilled Trades')).toBeInTheDocument();
    expect(screen.getByText('Business & Office')).toBeInTheDocument();
  });

  it('displays funding and billing section', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('Funding & Billing')).toBeInTheDocument();
    expect(screen.getByText('Accepted Funding Sources')).toBeInTheDocument();
    expect(screen.getByText('Billing Process')).toBeInTheDocument();
  });

  it('displays accepted funding sources', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('WIOA Title I (Adult)')).toBeInTheDocument();
    expect(screen.getByText('WIOA Title I (DW)')).toBeInTheDocument();
    expect(screen.getByText('WRG (Workforce Ready Grant)')).toBeInTheDocument();
    expect(screen.getByText('Veterans Benefits')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('(317) 314-3757')).toBeInTheDocument();
    expect(screen.getByText('workone@elevateforhumanity.org')).toBeInTheDocument();
  });

  it('has correct contact links', () => {
    render(<WorkOnePartnerPacketPage />);
    const phoneLink = screen.getByRole('link', { name: /317.*314.*3757/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+13173143757');
    
    const emailLink = screen.getByRole('link', { name: /workone@elevateforhumanity/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:workone@elevateforhumanity.org');
  });

  it('displays CTA section', () => {
    render(<WorkOnePartnerPacketPage />);
    expect(screen.getByText('Ready to Refer Participants?')).toBeInTheDocument();
  });

  it('does not use black color class (uses gray-900 instead)', () => {
    render(<WorkOnePartnerPacketPage />);
    const container = document.querySelector('.min-h-screen');
    expect(container).toBeTruthy();
    // The page should use gray-900 for text, not black
    const htmlContent = container?.innerHTML || '';
    expect(htmlContent).not.toContain('text-black');
  });
});
