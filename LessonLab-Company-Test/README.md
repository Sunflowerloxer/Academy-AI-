# LessonLab — Teacher Activity Builder

A Next.js + TypeScript classroom activity builder using fixed templates and validated JSON. AI never supplies executable HTML/JS.

## Included
- Teacher email/password signup and login with Supabase Auth
- Five activity templates: multiple choice, true/false, flashcards, matching and ordering
- AI generation and chat refinement through a server-only API route
- Fake/demo mode with no AI API key required
- Zod validation, one automatic retry for invalid AI output, friendly errors
- Direct editing, add/delete/reorder items
- Save and reopen activities
- Public student route `/a/[id]`, phone-friendly play screen and score
- Responsive CSS

## 1. Requirements
Install Node.js 20.9+ and Git. Create a Supabase project. For real AI generation, obtain an Anthropic API key.

## 2. Install
```bash
npm install
cp .env.example .env.local
```
On Windows PowerShell use:
```powershell
Copy-Item .env.example .env.local
```

## 3. Configure Supabase
In Supabase, open SQL Editor and run all of `supabase/schema.sql`.
Then open Project Settings → API and copy:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Paste them into `.env.local`. In Authentication → URL Configuration, set the local Site URL to `http://localhost:3000`. For production, add your deployed Vercel URL.

## 4. Demo mode first
Keep:
```env
FAKE_MODE=true
```
This creates realistic placeholder activities without calling Claude. It lets you test all five templates, editing, saving and public student links. Fake mode content is demonstration content, not verified lesson answers.

## 5. Enable Claude
Set `FAKE_MODE=false`, add your key and optionally choose a model:
```env
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_MODEL=claude-sonnet-5
```
Never put the Anthropic key in a `NEXT_PUBLIC_` variable or browser code. Restart the dev server after changing `.env.local`.

## 6. Run
```bash
npm run dev
```
Open http://localhost:3000. Create an account, log in, create an activity, save it, then open its student link. Students do not need an account.

## 7. Build check
```bash
npm run build
```

## 8. Deploy
Push the project to GitHub, import the repository in Vercel, and add the same environment variables in Vercel → Project Settings → Environment Variables. Deploy. Add the Vercel URL to Supabase Auth URL configuration.

## Important implementation notes
- Public links intentionally allow anonymous SELECT on the activities table so students can load shared activities. This means anyone who obtains a link can read that activity. Do not store private student information in activity content.
- The teacher dashboard/editor are protected by Supabase data policies; the public activity is read-only.
- This starter does not yet include student result storage, teacher analytics, password reset UI, activity unpublishing, or a custom domain.
- The ordering activity currently grades exact step order. Matching activities use unique right-side answers for straightforward scoring.
- Before production use, test generated subject content for correctness and add rate limiting, abuse controls, backups and monitoring to the API.
