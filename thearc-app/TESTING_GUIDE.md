# Testing Guide for The Arc Dashboard

## Prerequisites

Before testing, ensure you have:

1. **Environment Variables Set Up**
   - Create a `.env` file in the project root
   - Add required variables (see `.env.example`)

2. **Database Running**
   - PostgreSQL database accessible
   - Prisma migrations run

3. **Dependencies Installed**
   - All npm packages installed

## Step-by-Step Testing Guide

### 1. Start the Development Server

```bash
cd /Users/solo/Desktop/TheArc_website/thearc-app
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Test the Complete Flow

#### A. Register a New User

1. Navigate to: `http://localhost:3000/signup` (or create this page)
   - OR use the API directly:

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

2. Check your email (or SendGrid logs) for verification link
3. Click the verification link or visit: `http://localhost:3000/verify?token=<token-from-email>`

#### B. Login

1. Navigate to: `http://localhost:3000/login`
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `testpassword123`
3. Click "Login"
4. You should be redirected to `/dashboard`

#### C. View Dashboard

Once logged in, you should see:

- **Welcome Header**: "Welcome back, Test"
- **4 Metric Cards**: Stress Load, Cortisol Regulation, Sleep Quality, Cognitive Recovery
- **Predisposition Card**: Risk areas list
- **Screening Card**: Recommended tests
- **Performance Path Card**: 6-month timeline
- **Next Steps Card**: CTA to start screening

### 3. Test Dashboard Components

#### Check Each Component:

1. **Welcome Header**
   - ✅ Shows your first name
   - ✅ Displays descriptive text

2. **Metric Cards**
   - ✅ 4 cards in a row (desktop)
   - ✅ Each shows title, value, description
   - ✅ Values are numbers (85, 70, 55, 60)

3. **Predisposition Card**
   - ✅ Shows risk areas list
   - ✅ Clean formatting

4. **Screening Card**
   - ✅ Shows recommended screenings
   - ✅ Has "Explore Recommended Tests" link

5. **Performance Path Card**
   - ✅ Shows 6-month timeline
   - ✅ Month-by-month breakdown

6. **Next Steps Card**
   - ✅ Shows CTA button
   - ✅ "Start Free Screening" link

### 4. Test Responsive Design

1. **Desktop View** (1920px+)
   - 4 metric cards in a row
   - 2-column layout for cards

2. **Tablet View** (768px - 1024px)
   - 2 metric cards per row
   - Cards stack vertically

3. **Mobile View** (< 768px)
   - Single column layout
   - All cards stacked

### 5. Test Protected Routes

#### Test Middleware Protection:

1. **Logout**: Click logout in sidebar
2. **Try to access dashboard directly**: `http://localhost:3000/dashboard`
3. **Expected**: Should redirect to `/login`

#### Test Session:

1. **Login again**
2. **Access dashboard**: Should work
3. **Check browser cookies**: Should see `arc_session` cookie (HttpOnly)

### 6. Test Sidebar Navigation

1. **Dashboard link**: Should highlight when active
2. **Account Settings**: Should navigate to `/account`
3. **Privacy & Permissions**: Should navigate to `/privacy`
4. **Portal Settings**: Should navigate to `/settings`
5. **Logout**: Should clear session and redirect

### 7. Test User Context

The dashboard uses `useUser()` hook. Verify:

1. User data loads correctly
2. First name appears in welcome header
3. No errors in browser console
4. Loading state shows while fetching user data

## Quick Test Script

### Using Browser DevTools Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for any errors
4. Verify user data:

```javascript
// Check if user is loaded
fetch('/api/auth/me')
  .then(res => res.json())
  .then(data => console.log('User data:', data));
```

## Common Issues & Solutions

### Issue: "Not authenticated" error

**Solution:**
- Make sure you're logged in
- Check if `arc_session` cookie exists
- Verify JWT_SECRET is set in `.env`

### Issue: Dashboard shows "Loading your data..."

**Solution:**
- Check `/api/auth/me` endpoint
- Verify database connection
- Check browser console for errors

### Issue: Components not rendering

**Solution:**
- Check browser console for errors
- Verify all components are imported correctly
- Check if UserProvider is wrapping the dashboard

### Issue: Styling looks broken

**Solution:**
- Verify Tailwind CSS is configured
- Check if `globals.css` is imported
- Clear browser cache

## Testing Checklist

- [ ] Development server starts without errors
- [ ] Can register a new user
- [ ] Can verify email
- [ ] Can login successfully
- [ ] Dashboard loads after login
- [ ] Welcome header shows user's first name
- [ ] All metric cards display correctly
- [ ] Predisposition card shows data
- [ ] Screening card shows recommendations
- [ ] Performance path card shows timeline
- [ ] Next steps card has CTA
- [ ] Sidebar navigation works
- [ ] Logout works
- [ ] Protected routes redirect when not logged in
- [ ] Responsive design works on mobile/tablet
- [ ] No console errors
- [ ] User context loads correctly

## Manual Testing Steps

1. **Start Server**
   ```bash
   npm run dev
   ```

2. **Open Browser**
   - Go to `http://localhost:3000`

3. **Register & Verify**
   - Create account
   - Verify email

4. **Login**
   - Use credentials
   - Should redirect to dashboard

5. **Explore Dashboard**
   - Check all components
   - Test navigation
   - Test responsive design

6. **Test Other Pages**
   - Account settings
   - Privacy & Permissions
   - Settings

## API Testing

### Test Authentication Endpoints

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{...}'

# Login (save cookie)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "testpassword123"}' \
  -c cookies.txt

# Get user data
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

## Next Steps After Testing

Once dashboard is tested and working:

1. Replace dummy data with real API calls
2. Add loading states
3. Add error handling
4. Add data visualization
5. Add real-time updates

