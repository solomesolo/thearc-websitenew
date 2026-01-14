# Vercel Deployment Guide for The Arc Website

## 📋 Prerequisites

1. **GitHub Repository**: ✅ Already pushed to `thearc_new` repository
2. **Branch**: `thearc-website-nzer` ✅ Created and pushed
3. **Vercel Account**: Sign up at https://vercel.com if you haven't already

## 🚀 Deployment Steps

### Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select **"solomesolo/thearc_new"** from the list
5. If the repository doesn't appear, click **"Adjust GitHub App Permissions"** and grant access

### Step 2: Configure Project Settings

**Important Settings:**

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `next-app` ⚠️ **CRITICAL - Set this to `next-app`**
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Development Command**: `npm run dev` (default)

### Step 3: Select Branch

- **Production Branch**: Select `thearc-website-nzer` or `main` (your choice)
- **Branch to Deploy**: `thearc-website-nzer`

### Step 4: Environment Variables

Add the following environment variables in Vercel:

#### Required Environment Variables:

```
# Resend Email API
RESEND_API_KEY=re_hVSPKVSC_C34cy5KsgZuxdEMAFTtNdtmY
RESEND_FROM_EMAIL=onboarding@resend.dev

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (if using)
DATABASE_URL=your_database_url

# Analytics (if using)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
```

**To add environment variables:**
1. In project settings, go to **"Environment Variables"**
2. Add each variable with its value
3. Select environments: **Production**, **Preview**, and **Development**
4. Click **"Save"**

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://thearc-new-xyz.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔧 Configuration Files

### vercel.json (Root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "next-app/package.json",
      "use": "@vercel/next"
    }
  ]
}
```

### .vercelignore (Root)
```
# Ignore everything except next-app directory
*
!next-app/
!next-app/**
!package.json
!vercel.json
```

## 📝 Important Notes

1. **Root Directory**: Must be set to `next-app` in Vercel project settings
2. **Build Command**: Vercel will automatically detect Next.js and use the correct build command
3. **Node Version**: Vercel uses Node.js 18.x by default (compatible with Next.js 15)
4. **Environment Variables**: Make sure all sensitive keys are added in Vercel dashboard, not committed to Git

## 🔄 Automatic Deployments

Vercel will automatically deploy:
- **Production**: When you push to the production branch (main or thearc-website-nzer)
- **Preview**: When you push to any other branch or create a pull request

## 🐛 Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - Build command errors
   - TypeScript errors (check `next.config.js` for type checking settings)

### Environment Variables Not Working

1. Make sure variables are added in Vercel dashboard
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)

### Root Directory Issues

1. Go to **Settings** → **General**
2. Set **Root Directory** to `next-app`
3. Redeploy

## 📊 Deployment Status

- **Repository**: `solomesolo/thearc_new`
- **Branch**: `thearc-website-nzer`
- **Root Directory**: `next-app`
- **Framework**: Next.js 15.4.1

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

