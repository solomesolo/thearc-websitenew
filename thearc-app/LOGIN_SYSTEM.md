# Login System Documentation 🔐

## Overview

Secure authentication system with JWT-based sessions stored in HttpOnly cookies. This implementation provides clinic-grade security suitable for healthcare applications.

## Architecture

### Session Strategy

- **JWT Tokens**: Stored in HttpOnly, Secure cookies
- **Cookie Name**: `arc_session`
- **Token Expiration**: 7 days
- **Security Flags**:
  - `HttpOnly`: Prevents JavaScript access (XSS protection)
  - `Secure`: Only sent over HTTPS (production)
  - `SameSite=Lax`: CSRF protection
  - `Path=/`: Available across entire site

### JWT Payload Structure

```typescript
{
  userId: string;        // User's unique ID
  emailVerified: boolean; // Email verification status
  ts: number;            // Timestamp when token was issued
}
```

## API Endpoints

### POST `/api/auth/login`

Authenticate user credentials and create secure session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "userpassword123"
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

- **400**: Invalid email or password (generic message for security)
- **403**: Email not verified
- **405**: Method not allowed

## Security Features

### ✅ Password Security
- **Argon2id Hashing**: Industry-standard password hashing
- **Verification**: Secure password comparison without exposing timing attacks

### ✅ Email Security
- **Encrypted Storage**: Emails encrypted with Google Cloud KMS
- **Decryption on Login**: Emails decrypted only during authentication
- **Case-Insensitive Matching**: Email comparison is case-insensitive

### ✅ Session Security
- **HttpOnly Cookies**: Cannot be accessed via JavaScript
- **Secure Flag**: Only sent over HTTPS in production
- **SameSite Protection**: Prevents CSRF attacks
- **Token Expiration**: 7-day automatic expiry

### ✅ Access Control
- **Email Verification Required**: Users must verify email before login
- **Generic Error Messages**: Prevents user enumeration attacks

## Implementation Details

### Login Flow

1. **Input Validation**: Zod schema validates email and password
2. **User Lookup**: 
   - Fetches all users from database
   - Decrypts each email until match found
   - Note: In production, consider indexing or caching strategies
3. **Email Verification Check**: Ensures `emailVerified = true`
4. **Password Verification**: Argon2id hash comparison
5. **Session Creation**: JWT token generated and set as HttpOnly cookie
6. **Response**: Success message returned

### Session Management

#### Setting Session
```typescript
import { setLoginSession } from "@/lib/session";

const sessionPayload = {
  userId: user.id,
  emailVerified: user.emailVerified,
  ts: Date.now(),
};

setLoginSession(res, sessionPayload);
```

#### Clearing Session (Logout)
```typescript
import { clearLoginSession } from "@/lib/session";

clearLoginSession(res);
```

#### Reading Session
```typescript
import { getSessionFromRequest } from "@/lib/session";

const session = getSessionFromRequest(req);
if (!session) {
  // User not authenticated
}
```

## Development vs Production

### Development (HTTP)
- `Secure` flag is **not** set
- Cookies work over `http://localhost:3000`
- Still uses `HttpOnly` and `SameSite=Lax`

### Production (HTTPS)
- `Secure` flag is **set**
- Cookies only sent over HTTPS
- Full security enabled

## Performance Considerations

### Current Implementation
- **Email Lookup**: Decrypts all user emails sequentially
- **Scalability**: May need optimization for large user bases

### Future Optimizations
1. **Email Index**: Create a hash index of encrypted emails
2. **Caching**: Cache decrypted emails temporarily
3. **Database Indexing**: Optimize user queries
4. **Rate Limiting**: Prevent brute force attacks

## Error Handling

### Security Best Practices
- **Generic Messages**: "Invalid email or password" for both wrong email and wrong password
- **No User Enumeration**: Doesn't reveal if email exists
- **Rate Limiting**: Consider adding rate limiting (future task)

### Error Codes
- **400**: Bad request (invalid input or credentials)
- **403**: Forbidden (email not verified)
- **405**: Method not allowed
- **500**: Internal server error

## Testing

### Manual Testing

1. **Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "testpassword123",
    "country": "US",
    "mandatoryConsents": {
      "healthData": true,
      "dataTransfer": true,
      "terms": true,
      "ageConfirmed": true
    }
  }'
```

2. **Verify email** (check email for verification link)

3. **Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }' \
  -v
```

4. **Check cookie**: Look for `arc_session` cookie in response headers

### Test Cases

- ✅ Valid credentials → Success + cookie set
- ✅ Invalid email → 400 error
- ✅ Invalid password → 400 error
- ✅ Unverified email → 403 error
- ✅ Missing fields → 400 error
- ✅ Wrong HTTP method → 405 error

## Next Steps

- [ ] Create `/app/login/page.tsx` UI
- [ ] Implement `/api/auth/me` endpoint (Task 9)
- [ ] Add logout endpoint
- [ ] Add rate limiting
- [ ] Add password reset flow
- [ ] Add "Remember Me" functionality (optional)

## Security Checklist

- ✅ Password hashing (Argon2id)
- ✅ Email encryption (KMS)
- ✅ HttpOnly cookies
- ✅ Secure flag (production)
- ✅ SameSite protection
- ✅ Email verification required
- ✅ Generic error messages
- ✅ Input validation (Zod)
- ✅ JWT token expiration
- ⏳ Rate limiting (future)
- ⏳ Password complexity requirements (future)

