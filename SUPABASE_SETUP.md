# Supabase & Vercel Integration Setup

## 1. Supabase Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### Get Your Credentials
1. In your Supabase dashboard, go to Settings → API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database Setup
1. Go to SQL Editor in your Supabase dashboard
2. Run the SQL scripts from `scripts/01-create-tables.sql` and `scripts/02-seed-data.sql`
3. Or use the Table Editor to create tables manually

### Authentication Setup
1. Go to Authentication → Settings in Supabase
2. Configure your site URL (for local dev: `http://localhost:3000`)
3. Add redirect URLs:
   - `http://localhost:3000/dashboard`
   - `https://your-domain.vercel.app/dashboard`

## 2. Vercel Setup

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repo
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Custom Domain (Optional)
1. In your Vercel project, go to Settings → Domains
2. Add your custom domain
3. Update Supabase redirect URLs with your domain

## 3. Test the Integration

1. Run locally: `npm run dev`
2. Test sign-up/sign-in functionality
3. Check that auth redirects work properly
4. Deploy to Vercel and test production

## 4. Environment Variables Reference

```bash
# Required for client-side
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 5. Troubleshooting

- **Hydration errors**: Make sure all client components use "use client"
- **Auth redirects**: Verify redirect URLs in Supabase match your domain
- **CORS issues**: Check Supabase RLS policies and CORS settings
- **Environment variables**: Ensure they're set in both local and Vercel
