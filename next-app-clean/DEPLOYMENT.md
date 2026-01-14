
## Deployment Instructions

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push this to a new GitHub repository:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click 'Deploy'

### Option 2: Deploy via CLI

1. Run: `vercel login`
2. Follow the authentication steps
3. Run: `vercel --prod`

### Environment Variables (if needed)

If you use email functionality, add these in Vercel dashboard:
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- SENDGRID_API_KEY (if using SendGrid)

