# AMC Guide — deploy to amcguide.edaitutor.org (Railway)

## Repo layout
    amcguide/
      server.js          # tiny Express static server (binds to Railway $PORT)
      package.json       # start = node server.js
      public/
        index.html       # <-- copy the wired platform here (rename amc-mock-exam.html)

## One-time setup
1. Copy the platform in:
       cp amc-mock-exam.html public/index.html
2. Commit and push to GitHub (embedded-username remote for your dual accounts):
       git init
       git add .
       git commit -m "AMC Guide v1"
       git remote add origin https://<username>@github.com/<username>/amcguide.git
       git push -u origin main

## Railway
3. railway.app -> New Project -> Deploy from GitHub repo -> pick amcguide.
   Nixpacks detects package.json and runs `npm start`. No build config needed.
   (Railway injects PORT automatically; server.js already reads it.)
4. Service -> Settings -> Networking -> Custom Domain -> add `amcguide.edaitutor.org`.
   Railway shows you a CNAME target like `xxxx.up.railway.app`.

## DNS (edaitutor.org is on WordPress.com DNS)
5. In the edaitutor.org DNS panel add a record:
       Type: CNAME   Host/Name: amcguide   Value: <the railway target>   TTL: default
6. Wait for propagation; Railway auto-provisions the HTTPS (Let's Encrypt) cert.
   Done — https://amcguide.edaitutor.org is live.

## Notes
- Pure static for v1: NO Supabase, NO env vars required.
- Tune exam length in public/index.html: search for EXAM_LENGTH (default 50; set 150 for a full mock).
- To update: replace public/index.html, commit, push -> Railway redeploys.
- If you later add a service worker / PWA, bump the cache version on every deploy.

## When you add Supabase later (Phase 2)
Tables: mcq_items, flashcards, users (Supabase Auth), responses, sr_state.
- Load amc-mcq-bank.json into mcq_items (one row per item, or store as build-time JSON).
- responses table is the one that matters: it feeds real IRT difficulty calibration.
- Add SUPABASE_URL and SUPABASE_ANON_KEY as Railway env vars; never hard-code keys.
