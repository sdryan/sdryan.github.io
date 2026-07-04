# Ryan Research Group — website

Static site. No build step, no dependencies. Just HTML, one CSS file, one JS file.
Designed to deploy to GitHub Pages at `sdryan.github.io`.

## Files

```
site/
├── index.html          Home (animated collective-motion hero)
├── research.html       Research topics + funding + press
├── publications.html   All 47 papers, filterable by area
├── group.html          Group, ADAM, people, collaborators
├── teaching.html       Awards, OER, courses
├── contact.html        Contact details
├── 404.html            Custom not-found page
├── .nojekyll           Tells GitHub Pages to skip Jekyll processing
├── css/style.css       Design system
├── js/main.js          Hero animation, scroll reveals, nav, pub filter
└── assets/             Put headshot.png here (see assets/README.txt)
```

## Deploy to GitHub Pages (free, sdryan.github.io)

**Use the terminal, not a Finder drag-and-drop.** Copying in Finder can silently
skip hidden files (like `.nojekyll`) and, on OneDrive, can copy empty
"cloud-only" placeholders instead of the real file contents. That's how you end
up with a live page that has no styling: the HTML deploys but `css/style.css`
arrives empty. Git reads the real bytes, so this is the reliable path.

```bash
# 1. go INTO the site folder (this folder)
cd "/Users/shawnryan/Library/CloudStorage/OneDrive-ClevelandStateUniversity/Documents/Webpage/webpage_new_2026/site"

# 2. stage everything, including css/, js/, assets/, and hidden .nojekyll
git init
git add -A
git commit -m "Full site: styles, demo, figures"
git branch -M main

# 3. point at your repo (use set-url instead of add if it already exists)
git remote add origin https://github.com/sdryan/sdryan.github.io.git

# 4. push (force-replaces whatever partial copy is up there)
git push -f -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source: Deploy from a branch**,
branch `main`, folder `/ (root)`, Save. Live at **https://sdryan.github.io** in ~1 minute.

### Verify it worked

Open **https://sdryan.github.io/css/style.css** directly. You should see CSS text
starting with a comment block. If it's blank or 404s, the stylesheet didn't
upload, which is exactly the "unstyled page" symptom. Re-run the push above from
inside the `site/` folder.

Note: `index.html` must sit at the **repo root**, not inside a `site/` subfolder.
The commands above push the folder's *contents*, so that's already handled.

## Edit anything

Everything is plain text. Open a `.html` file, change the words, save, push.
To add a student, copy a `.person` card in `group.html`. To add a paper, copy a
`<li class="pub">` in `publications.html` and give it the right `data-tags`.

## Custom domain (optional, later)

Buy a domain (~$12/yr), add a `CNAME` file containing just the domain, and point
a DNS record at GitHub Pages. Free HTTPS is included.
