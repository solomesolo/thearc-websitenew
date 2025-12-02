# The Arc Backend API

Secure authentication and user management system for The Arc platform.

## Features

- 🔐 **Secure Authentication**: Password hashing with Argon2
- 🔑 **JWT Tokens**: Session management
- 📧 **Email Verification**: SendGrid integration
- 🔒 **Data Encryption**: Google Cloud KMS for sensitive fields
- 📏 **Input Validation**: Zod schema validation
- 🗄️ **Database**: Prisma ORM with PostgreSQL

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SENDGRID_API_KEY`: SendGrid API key for emails
- `SENDGRID_FROM_EMAIL`: Email address for sending emails
- `CLOUD_KMS_KEY_ID`: Google Cloud KMS key resource name
- `JWT_SECRET`: Secret key for JWT token signing
- `NEXT_PUBLIC_APP_URL`: Your application URL (used for generating verification links)
  - Local: `http://localhost:3000`
  - Production: `https://your-vercel-domain.vercel.app`

### 3. Database Setup

Initialize Prisma and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

## API Endpoints

### POST `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "country": "US",
  "timezone": "America/New_York",
  "consents": [
    {
      "type": "health_data",
      "mandatory": true,
      "accepted": true,
      "legalVersion": "1.0"
    }
  ],
  "ipAddress": "192.168.1.1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "userId": "clx..."
}
```

### POST `/api/auth/login`

Authenticate user and create secure session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful."
}
```

**Error Responses:**

**400 - Invalid Credentials:**
```json
{
  "error": "Invalid email or password."
}
```

**403 - Email Not Verified:**
```json
{
  "error": "Please verify your email before logging in."
}
```

**Note:** On successful login, a secure HttpOnly cookie (`arc_session`) is set with a JWT token valid for 7 days.

### GET `/api/auth/me`

Get the currently authenticated user's information.

**Authentication:** Requires valid session cookie

**Success Response (200):**
```json
{
  "id": "clx...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "emailVerified": true,
  "country": "US",
  "timezone": "America/New_York"
}
```

**Error Responses:**

**401 - Not Authenticated:**
```json
{
  "error": "Not authenticated."
}
```

**404 - User Not Found:**
```json
{
  "error": "User not found."
}
```

### POST `/api/auth/logout`

Log out the current user by clearing the session cookie.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

**Note:** This endpoint clears the `arc_session` cookie immediately.

### PATCH `/api/user/update`

Update user profile information.

**Authentication:** Requires valid session cookie

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "country": "US",
  "timezone": "America/New_York"
}
```

**Success Response (200):**
```json
{
  "id": "clx...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "country": "US",
  "timezone": "America/New_York"
}
```

**Error Responses:**
- **400**: Validation error
- **401**: Not authenticated

### PATCH `/api/user/change-password`

Change user password.

**Authentication:** Requires valid session cookie

**Request Body:**
```json
{
  "oldPassword": "currentpassword123",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully."
}
```

**Error Responses:**
- **400**: Incorrect old password or validation error
- **401**: Not authenticated
- **404**: User not found

### GET `/api/privacy/consents`

Get all user consent records.

**Authentication:** Requires valid session cookie

**Success Response (200):**
```json
{
  "consents": [
    {
      "id": "clx...",
      "type": "health_data_processing",
      "mandatory": true,
      "accepted": true,
      "timestamp": "2025-01-01T00:00:00.000Z",
      "ipAddress": "192.168.1.1",
      "legalVersion": "2025-01"
    }
  ]
}
```

**Error Responses:**
- **401**: Not authenticated
- **500**: Internal server error

### PATCH `/api/privacy/update`

Update optional consent preferences.

**Authentication:** Requires valid session cookie

**Request Body:**
```json
{
  "marketing_emails": true,
  "product_updates": false,
  "data_research": true
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Note:** Creates new consent entries (does not overwrite) to maintain audit trail per GDPR requirements.

**Error Responses:**
- **400**: Validation error
- **401**: Not authenticated
- **500**: Internal server error

### GET `/api/user/export`

Export all user data as a downloadable JSON file.

**Authentication:** Requires valid session cookie

**Success Response (200):**
- Content-Type: `application/json`
- Content-Disposition: `attachment; filename="thearc-data-export-{userId}.json"`
- JSON file containing:
  - User profile (with decrypted email)
  - All consents
  - Verification tokens
  - Password reset tokens

**Error Responses:**
- **401**: Not authenticated
- **404**: User not found
- **500**: Internal server error

**Note:** This endpoint implements GDPR Article 15 (Right of Access).

### DELETE `/api/user/delete`

Permanently delete user account and all personal data.

**Authentication:** Requires valid session cookie

**Request Body:**
```json
{
  "password": "userpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully."
}
```

**Error Responses:**
- **400**: Incorrect password or validation error
- **401**: Not authenticated
- **404**: User not found
- **500**: Internal server error

**Note:** 
- Requires password confirmation for security
- Deletes all personal data including consents
- Implements GDPR Article 17 (Right to Erasure)
- Action is irreversible

### POST `/api/auth/reset-request`

Request a password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If that email exists, password reset instructions were sent."
}
```

**Note:** Generic message prevents email enumeration attacks.

**Error Responses:**
- **400**: Invalid email format
- **405**: Method not allowed
- **500**: Internal server error

### PATCH `/api/auth/reset-confirm`

Confirm password reset with token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully."
}
```

**Error Responses:**
- **400**: Invalid/expired token, token already used, or validation error
- **405**: Method not allowed
- **500**: Internal server error

**Note:** Token expires after 1 hour and can only be used once.

### GET `/api/auth/verify`

Verify user email address using a verification token.

**Query Parameters:**
- `token`: Verification token from email link

**Response (Success):**
```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

**Response (Error):**
```json
{
  "error": "Invalid token." // or "This verification link has already been used." or "This verification link has expired."
}
```

## Verification Flow

1. **User Registration**: User signs up → account created → verification token generated → email sent
2. **Email Verification**: User clicks link → `/verify?token=xxx` page loads → API validates token → user marked as verified → redirects to login
3. **Login Requirement**: Users must have `emailVerified = true` to log in

## Pages

### `/login`

User login page with:
- Email and password input fields
- Form validation
- Error handling
- Loading states
- Automatic redirect to `/dashboard` on successful login
- Links to "Forgot password" and "Sign up"

### `/dashboard`

Protected dashboard page that:
- Requires authentication (middleware protected)
- Displays personalized welcome message
- Shows user's first name
- Provides link to start free screening
- Uses protected layout with sidebar navigation

### `/account`

Account settings page that:
- Requires authentication (middleware protected)
- Allows editing profile information (first name, last name, country, timezone)
- Includes password change functionality
- Shows success/error messages
- Uses protected layout with sidebar navigation

### `/privacy`

Privacy & Permissions page that:
- Requires authentication (middleware protected)
- Displays all user consents (mandatory and optional)
- Shows consent history with timestamps
- Allows toggling optional consents
- Maintains GDPR-compliant audit trail
- Uses protected layout with sidebar navigation

### `/settings`

Settings page that:
- Requires authentication (middleware protected)
- Allows exporting all user data (GDPR Article 15)
- Provides account deletion functionality (GDPR Article 17)
- Password confirmation required for deletion
- Uses protected layout with sidebar navigation

### `/forgot-password`

Forgot password page that:
- Allows users to request password reset
- Sends reset email if email exists
- Generic success message (doesn't reveal if email exists)
- Links back to login page

### `/reset-password`

Reset password page that:
- Extracts token from URL query parameter
- Allows user to set new password
- Validates token and expiration
- Redirects to login after successful reset

### `/verify`

Email verification page that:
- Extracts token from URL query parameter
- Calls verification API endpoint
- Shows loading, success, or error states
- Automatically redirects to `/login` after successful verification (2.5 seconds)

## Security Features

- **Email Encryption**: User emails are encrypted using Google Cloud KMS before storage
- **Password Hashing**: Argon2id for secure password hashing
- **JWT Sessions**: Secure HttpOnly, Secure cookies for session management
- **XSS Protection**: HttpOnly cookies prevent JavaScript access
- **CSRF Protection**: SameSite=Lax cookie attribute
- **HTTPS Only**: Secure flag ensures cookies only sent over HTTPS
- **Email Verification Required**: Users must verify email before login
- **Token Expiry**: Verification and reset tokens expire after set time periods
- **Session Expiry**: JWT tokens expire after 7 days
- **Input Validation**: All inputs validated with Zod schemas
- **Consent Tracking**: GDPR-compliant consent management

## Database Schema

- **User**: User accounts with encrypted emails
- **Consent**: User consent records for GDPR compliance
- **VerificationToken**: Email verification tokens
- **PasswordResetToken**: Password reset tokens

## Development

### Generate Prisma Client

```bash
npx prisma generate
```

### View Database

```bash
npx prisma studio
```

### Run Migrations

```bash
npx prisma migrate dev
```

## Production Deployment

1. Set all environment variables in your hosting platform (Vercel, etc.)
2. Run migrations: `npx prisma migrate deploy`
3. Ensure Google Cloud KMS credentials are configured
4. Configure SendGrid sender verification

## License

Proprietary - The Arc Platform
