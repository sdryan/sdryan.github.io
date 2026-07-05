# SEO checklist — sdryan.github.io

On-site basics are already built (sitemap, robots, canonical tags, Person
structured data, social-share tags). The items below are the ones that
actually move rankings for a new site. Work top to bottom.

## 1. Get indexed (do this first)

- [ ] **Google Search Console** — search.google.com/search-console
  - Add a **URL-prefix** property: `https://sdryan.github.io/`
    (NOT a "Domain" property — that needs DNS you don't control on github.io. See note below.)
  - Verify with the **HTML file** method (drop Google's `google<code>.html`
    into the `site/` folder, push) or the **HTML tag** method (paste the
    meta tag into `index.html` <head>).
  - Submit the sitemap: `https://sdryan.github.io/sitemap.xml`
  - Use **URL Inspection → Request indexing** on the home page.
- [ ] **Bing Webmaster Tools** — bing.com/webmasters (you can import from Google).

## 2. Build backlinks from profiles you control (biggest ranking lever)

Add a link to `https://sdryan.github.io/` from each:

- [ ] **CSU faculty page** (academic.csuohio.edu/ryan-shawn) — a `.edu` link carries real weight.
- [ ] **Google Scholar** profile → "Homepage" field.
- [ ] **ORCID** (create one if you don't have it) → website link.
- [ ] **LinkedIn** → Contact info / website.
- [ ] **ResearchGate** → profile website.
- [ ] **arXiv** author page.
- [ ] **ADAM center** page (academic.csuohio.edu/adam).
- [ ] **GitHub profile** README (github.com/sdryan).
- [ ] Department directory / any co-author or grant pages you can edit.

## 3. Reinforce your identity (entity SEO)

- [ ] Use the exact same name + institution everywhere: **"Shawn D. Ryan," "Cleveland State University."**
- [ ] Keep the old CSU page live and point it at the new site ("My group site is now at sdryan.github.io") — don't delete it; it has authority to pass.

## 4. Keep it fresh

- [ ] Add news/updates over time (new papers, talks, student wins). Fresh, unique content helps.
- [ ] Re-submit the sitemap in Search Console after big updates.

## 5. Set expectations

- Ranks for **your name** and **"Ryan Research Group"**: a few weeks after steps 1–2.
- Generic terms ("mathematical biology") are dominated by large sites — not the target.
- GitHub Pages ranks fine. A custom domain is a branding choice, not an SEO requirement.

---

## Note on the "DNS TXT record" from Google

Google offers a **Domain** property that's verified with a **DNS TXT record**.
That record does **not** go anywhere on GitHub — GitHub does not host DNS for
`github.io` subdomains, so you can't use that method for `sdryan.github.io`.

- **On github.io (current setup):** use a **URL-prefix** property with the
  **HTML file** or **HTML tag** method above. No DNS involved.
- **Only if you later buy a custom domain** (e.g., `shawnryanlab.com`): the TXT
  record goes in your **domain registrar's DNS settings** (Namecheap, Cloudflare,
  GoDaddy, etc.), not on GitHub. On GitHub you'd only set the custom domain under
  **Settings → Pages → Custom domain** (which creates a `CNAME` file), and point
  the domain's DNS at GitHub Pages at the registrar.
