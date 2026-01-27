# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously at Elevate for Humanity. If you discover a security vulnerability, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please email us at: **security@elevateforhumanity.org**

Include the following in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Assessment**: We will assess the vulnerability within 7 days
- **Resolution**: Critical vulnerabilities will be addressed within 30 days
- **Disclosure**: We will coordinate disclosure timing with you

### Scope

The following are in scope:
- elevateforhumanity.org and subdomains
- Elevate-lms application
- API endpoints
- Authentication/authorization issues
- Data exposure vulnerabilities
- Payment processing security

### Out of Scope

- Social engineering attacks
- Physical security
- Denial of service attacks
- Issues in third-party services we don't control

### Safe Harbor

We will not pursue legal action against security researchers who:
- Act in good faith
- Avoid privacy violations
- Do not destroy data
- Report vulnerabilities responsibly

## Security Measures

This application implements:
- Row Level Security (RLS) on all database tables
- Server-side only access to service role keys
- Webhook signature verification for Stripe
- Environment variable separation (test/live)
- HTTPS enforcement
- Input validation and sanitization

## Contact

For security concerns: security@elevateforhumanity.org
For general inquiries: info@elevateforhumanity.org
