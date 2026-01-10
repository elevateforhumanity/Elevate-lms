# Security and Access Control Documentation

## Access Control Policy

### Role-Based Access Control (RBAC)

Elevate for Humanity implements role-based access control to protect student data and system resources.

#### Defined Roles

1. **Student**
   - Access: Own education records, course materials, grades, certificates
   - Cannot: Access other students' records, administrative functions
   - Authentication: Email/password, MFA optional

2. **Delegate (Case Manager)**
   - Access: Assigned student records, case management tools, support services
   - Cannot: Modify system settings, access unassigned students
   - Authentication: Email/password, MFA required

3. **Staff**
   - Access: Course management, student progress tracking, reporting
   - Cannot: Modify student financial records, system administration
   - Authentication: Email/password, MFA required

4. **Program Holder (Provider Admin)**
   - Access: Program management, student enrollment, reporting for their programs
   - Cannot: Access other providers' data, system-wide settings
   - Authentication: Email/password, MFA required

5. **Manager**
   - Access: Team management, operational reports, workflow oversight
   - Cannot: System configuration, financial administration
   - Authentication: Email/password, MFA required

6. **Marketing Admin**
   - Access: Marketing campaigns, contact management, analytics
   - Cannot: Student education records, financial data
   - Authentication: Email/password, MFA required

7. **HR Admin**
   - Access: Employee records, payroll, HR management
   - Cannot: Student records, system configuration
   - Authentication: Email/password, MFA required

8. **Admin**
   - Access: Full system access, user management, configuration
   - Cannot: Delete audit logs (immutable)
   - Authentication: Email/password, MFA required

9. **Super Admin**
   - Access: Complete system access, including audit logs and system configuration
   - Cannot: Bypass audit logging
   - Authentication: Email/password, MFA required, IP whitelist

### Access Control Implementation

#### Authentication
- Email/password authentication via Supabase Auth
- Multi-factor authentication (MFA) required for administrative roles
- Session timeout: 24 hours for students, 8 hours for staff/admin
- Password requirements: Minimum 12 characters, complexity rules enforced

#### Authorization
- Role verification on every API request via middleware
- Database Row-Level Security (RLS) policies enforce data isolation
- API endpoints protected by role checks (see `/lib/rbac.ts`)
- Frontend route guards prevent unauthorized navigation

#### Data Access Patterns

**Student Data Access:**
```typescript
// Students can only access their own records
SELECT * FROM enrollments WHERE user_id = auth.uid()

// Staff can access assigned students
SELECT * FROM enrollments 
WHERE user_id IN (
  SELECT student_id FROM case_assignments 
  WHERE case_manager_id = auth.uid()
)

// Admins can access all records with audit logging
SELECT * FROM enrollments -- Logged in audit_logs table
```

**Audit Logging:**
- All access to student education records is logged
- Logs include: user_id, action, resource, timestamp, IP address
- Audit logs are immutable and retained for 7 years
- Location: `audit_logs` table in database

### Data Retention Policy

#### Student Education Records
- **Active Students:** Retained while enrolled + 5 years after last attendance
- **Transcripts:** Retained permanently
- **Financial Records:** Retained for 7 years per IRS requirements
- **Application Materials:** Retained for 3 years after decision
- **Disciplinary Records:** Retained for 7 years after resolution

#### Non-Education Records
- **Marketing Data:** Retained until opt-out + 30 days
- **Website Analytics:** Aggregated data retained indefinitely, PII removed after 26 months
- **Support Tickets:** Retained for 3 years
- **Audit Logs:** Retained for 7 years (immutable)

#### Data Deletion Process
1. Student submits deletion request via email or portal
2. Identity verification required
3. Legal hold check (pending litigation, investigations)
4. Retention period verification
5. Data anonymization or deletion within 30 days
6. Confirmation email sent to student
7. Deletion logged in audit trail

**Exceptions to Deletion:**
- Records required by law (transcripts, financial aid documentation)
- Records subject to legal hold
- Aggregated/anonymized data used for research

### Consent Management

#### Types of Consent

1. **Educational Services Consent**
   - Required: Enrollment agreement
   - Scope: Use of data for educational purposes
   - Duration: Length of enrollment + retention period
   - Withdrawal: Student may withdraw and request deletion

2. **FERPA Directory Information Consent**
   - Optional: Student may opt out
   - Scope: Name, program, dates, awards
   - Duration: Until opt-out
   - Withdrawal: Email to elevate4humanityedu@gmail.com

3. **Marketing Communications Consent**
   - Optional: Opt-in required
   - Scope: Promotional emails, newsletters
   - Duration: Until unsubscribe
   - Withdrawal: Unsubscribe link in every email

4. **Third-Party Data Sharing Consent**
   - Required: Explicit consent for each third party
   - Scope: Specific to partner (e.g., Certiport for testing)
   - Duration: Purpose-limited
   - Withdrawal: Contact privacy@elevateforhumanity.institute

5. **Cookies and Analytics Consent**
   - Required: Cookie consent banner on first visit
   - Scope: Analytics, functional cookies
   - Duration: Until browser clear or opt-out
   - Withdrawal: Cookie settings in banner

#### Consent Records
- All consents stored in `user_consents` table
- Fields: user_id, consent_type, granted_at, withdrawn_at, ip_address, user_agent
- Consent history maintained for compliance audits
- Students can view/manage consents in account settings

#### Minor Consent (Under 18)
- Parental/guardian consent required for students under 18
- Consent form includes: parent name, relationship, signature, date
- Verification: ID check, phone verification
- Stored separately with enhanced protection

### Security Measures

#### Data Encryption
- **At Rest:** AES-256 encryption for database (Supabase default)
- **In Transit:** TLS 1.3 for all connections
- **Backups:** Encrypted with separate keys
- **PII Fields:** Additional field-level encryption for SSN, financial data

#### Network Security
- **Firewall:** Cloud firewall rules restrict database access
- **IP Whitelist:** Admin access restricted to approved IPs
- **DDoS Protection:** Cloudflare/Vercel protection enabled
- **Rate Limiting:** API rate limits prevent abuse

#### Application Security
- **Input Validation:** All user input sanitized
- **SQL Injection Prevention:** Parameterized queries only
- **XSS Protection:** Content Security Policy headers
- **CSRF Protection:** Token-based protection on forms
- **Dependency Scanning:** Automated vulnerability scanning

#### Incident Response
1. **Detection:** Automated monitoring alerts on suspicious activity
2. **Containment:** Immediate access revocation, system isolation
3. **Investigation:** Forensic analysis, audit log review
4. **Notification:** Affected users notified within 72 hours
5. **Remediation:** Vulnerability patching, access review
6. **Documentation:** Incident report filed, lessons learned

### Compliance Contacts

**FERPA Compliance Officer:**
Email: ferpa@elevateforhumanity.institute
Phone: (317) 314-3757

**Data Protection Officer:**
Email: privacy@elevateforhumanity.institute
Phone: (317) 314-3757

**Security Incidents:**
Email: security@elevateforhumanity.institute
Phone: (317) 314-3757 (24/7)

### Annual Review

This access control policy is reviewed annually and updated as needed to reflect:
- Changes in applicable law (FERPA, CCPA, etc.)
- New security threats and vulnerabilities
- Technology changes and system updates
- Audit findings and recommendations

**Last Review:** January 10, 2026
**Next Review:** January 10, 2027
**Approved By:** Executive Director

---

*This document is maintained in the repository at `/SECURITY_ACCESS_CONTROL.md` and is version controlled.*
