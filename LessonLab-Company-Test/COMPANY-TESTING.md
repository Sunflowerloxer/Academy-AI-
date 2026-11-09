# LessonLab - Company Test Bundle

This ZIP contains the LessonLab teacher activity builder source code, its package lockfile, the Supabase database schema, and a Windows launcher. It intentionally excludes installed packages, generated build output, and `.env.local` credentials.

## Run locally

1. Install Node.js 20.9 or newer.
2. Create a Supabase test project. In its SQL Editor, run `supabase/schema.sql` once.
3. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from that test project. Keep `.env.local` private.
4. Double-click `START-APP.cmd`. On first launch, it installs packages and starts the development server.
5. Open `http://localhost:3000`, create a teacher account, then try creating, editing, saving, and sharing an activity.

## Demo and AI modes

`FAKE_MODE=true` uses sample activity content and does not need an Anthropic key. It still needs Supabase for teacher login and saving activities. For real AI generation, set `FAKE_MODE=false`, add `ANTHROPIC_API_KEY` to `.env.local`, and restart the server. Never add a service-role key or Anthropic key to client-side code or this ZIP.

## Build check

From this folder, run `npm.cmd ci` and `npm.cmd run build`. The app build completed successfully in the developer workspace after adding the required Zod dependency. The company should run the build again after setting up its own environment.

The development server is local to the computer running it; this bundle is not a deployed public website.