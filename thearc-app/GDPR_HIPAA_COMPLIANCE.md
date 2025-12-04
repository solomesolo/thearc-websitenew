# GDPR & HIPAA Compliance Documentation

## Overview

This system implements comprehensive GDPR (General Data Protection Regulation) and HIPAA (Health Insurance Portability and Accountability Act) compliance measures for collecting, storing, and managing health questionnaire data.

## Compliance Features

### 1. Data Encryption

**At Rest:**
- All sensitive data (questionnaire responses, emails) encrypted using Google Cloud KMS
- Fallback to base64 encoding in development (NOT SECURE - for testing only)
- Encryption key management through Cloud KMS

**In Transit:**
- All API endpoints use HTTPS
- Database connections use SSL/TLS

### 2. Consent Management (GDPR Article 6, 7)

**Features:**
- Explicit consent required before data collection
- Consent versioning (tracks which version of privacy policy user agreed to)
- Consent withdrawal capability
- Consent expiration dates
- IP address and timestamp logging for audit

**Consent Types:**
- `health_data`: Required for questionnaire responses
- `marketing`: Optional for marketing communications
- `research`: Optional for research purposes
- `third_party`: Optional for sharing with third parties

### 3. Data Minimization (GDPR Article 5)

- Only collect data necessary for the stated purpose
- No unnecessary data collection
- Data retention policies (default: 7 years for medical records per HIPAA)

### 4. Right to Access (GDPR Article 15)

**Implementation:**
- Users can request all their data
- API endpoint: `GET /api/data-rights/export`
- Returns complete data in JSON/CSV/PDF format
- Includes: profile, questionnaire responses, consents, audit logs

### 5. Right to Rectification (GDPR Article 16)

**Implementation:**
- Users can update their profile information
- Questionnaire responses can be updated (with audit logging)

### 6. Right to Erasure / Right to be Forgotten (GDPR Article 17)

**Implementation:**
- Users can request complete data deletion
- API endpoint: `POST /api/data-rights/delete`
- Options:
  - Delete profile
  - Delete questionnaire responses
  - Anonymize instead of delete
  - Keep consents (for legal compliance)

**Process:**
1. User requests deletion
2. System generates verification token
3. User confirms deletion with token
4. Data is deleted or anonymized
5. Audit log records the deletion

### 7. Right to Data Portability (GDPR Article 20)

**Implementation:**
- Users can export all their data
- Multiple formats: JSON, CSV, PDF
- Secure download tokens (expire after 7 days)
- API endpoint: `POST /api/data-rights/export`

### 8. Audit Logging (HIPAA §164.312(b))

**What is Logged:**
- Who accessed data (user ID)
- What data was accessed (data type, fields)
- When it was accessed (timestamp)
- Why it was accessed (purpose)
- IP address and user agent
- Access type (read, create, update, delete, export)

**Access Types:**
- `read`: Data retrieval
- `create`: Data creation
- `update`: Data modification
- `delete`: Data deletion
- `export`: Data export

### 9. Access Controls (HIPAA §164.312(a)(1))

**Implementation:**
- User authentication required for all data access
- Users can only access their own data
- Session-based authentication
- API endpoints verify user identity before data access

### 10. Data Retention (GDPR Article 5, HIPAA)

**Policies:**
- Medical records: 7 years (HIPAA requirement)
- User accounts: Until deletion request
- Audit logs: 6 years (HIPAA requirement)
- Consent records: Retained for legal compliance

**Automatic Cleanup:**
- Data past retention period can be automatically anonymized
- Soft delete for user accounts (deletedAt timestamp)

### 11. Breach Notification (HIPAA §164.408, GDPR Article 33)

**Implementation:**
- Data breach logging system
- Tracks: severity, affected users, data types, actions taken
- Notification requirements:
  - HIPAA: Within 60 days
  - GDPR: Within 72 hours to supervisory authority

## Database Schema

### Key Tables

1. **User**: Encrypted user information
2. **Consent**: Consent records with versioning
3. **QuestionnaireResponse**: Encrypted questionnaire data
4. **DataAccessLog**: Complete audit trail
5. **DataDeletionRequest**: Deletion request tracking
6. **DataExportRequest**: Export request tracking
7. **DataBreachLog**: Breach incident logging

## API Endpoints

### Data Collection
- `POST /api/questionnaire/save` - Save questionnaire response (encrypted)
- `GET /api/questionnaire/get?responseId=...` - Retrieve response (with access control)

### Consent Management
- `POST /api/consent/record` - Record user consent
- `GET /api/consent/history` - Get consent history

### Data Rights (GDPR)
- `POST /api/data-rights/export` - Request data export
- `GET /api/data-rights/export?token=...` - Download exported data
- `POST /api/data-rights/delete` - Request data deletion
- `PUT /api/data-rights/delete` - Process deletion (with verification)

### Audit Logs
- `GET /api/audit-logs` - Get user's audit log history

## Security Measures

1. **Encryption**: All sensitive data encrypted at rest
2. **Access Control**: User-based access restrictions
3. **Audit Logging**: Complete access trail
4. **Session Management**: Secure session tokens
5. **Input Validation**: All inputs validated and sanitized
6. **Error Handling**: No sensitive data in error messages

## Data Flow

1. **Collection:**
   - User completes questionnaire
   - System verifies consent
   - Data encrypted and stored
   - Audit log created

2. **Access:**
   - User requests data
   - System verifies identity
   - Data decrypted
   - Audit log created

3. **Deletion:**
   - User requests deletion
   - Verification token generated
   - User confirms
   - Data deleted/anonymized
   - Audit log created

## Compliance Checklist

### GDPR
- ✅ Lawful basis for processing (consent)
- ✅ Data minimization
- ✅ Purpose limitation
- ✅ Storage limitation
- ✅ Right to access
- ✅ Right to rectification
- ✅ Right to erasure
- ✅ Right to data portability
- ✅ Right to object
- ✅ Consent management
- ✅ Data breach notification

### HIPAA
- ✅ Administrative safeguards
- ✅ Physical safeguards (cloud infrastructure)
- ✅ Technical safeguards (encryption, access controls)
- ✅ Audit controls
- ✅ Integrity controls
- ✅ Transmission security
- ✅ Breach notification

## Best Practices

1. **Regular Audits**: Review audit logs regularly
2. **Access Reviews**: Periodically review who has access to what
3. **Training**: Ensure all staff understand compliance requirements
4. **Documentation**: Keep all policies and procedures documented
5. **Incident Response**: Have a plan for data breaches
6. **Privacy by Design**: Build privacy into all features

## Legal Considerations

- **Business Associate Agreements (BAA)**: Required for third-party services (e.g., Google Cloud)
- **Privacy Policy**: Must clearly state data collection and use
- **Terms of Service**: Must include data processing terms
- **Data Processing Agreements**: Required for EU users

## Contact

For questions about data privacy or to exercise your rights:
- Email: privacy@thearcme.com
- Data Protection Officer: dpo@thearcme.com

