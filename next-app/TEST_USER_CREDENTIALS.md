# Test User Credentials

## Login Credentials

Use these credentials to test the login functionality:

**Email:** `test@thearc.com`  
**Password:** `TestPassword123!`

## Create Test User

To create or recreate the test user, call:

```bash
curl -X POST http://localhost:3000/api/test/create-test-user
```

Or visit in your browser:
```
http://localhost:3000/api/test/create-test-user
```

## Test User Details

- **First Name:** Test
- **Last Name:** User
- **Email:** test@thearc.com
- **Password:** TestPassword123!
- **Country:** US
- **Timezone:** America/New_York
- **Email Verified:** Yes (can login immediately)
- **Health Data Consent:** Accepted

## Testing Login

1. Go to: `http://localhost:3000/login`
2. Enter:
   - Email: `test@thearc.com`
   - Password: `TestPassword123!`
3. Click "Sign In"

You should be redirected to the dashboard after successful login.

