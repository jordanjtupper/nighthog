[README.md](https://github.com/user-attachments/files/28444727/README.md)
# Night Hog — nighthogbr.com

Official website for **Night Hog**, Baton Rouge's classic rock, funk, and soul cover band.

Built as a static HTML/CSS/JS site, hosted on **GitHub Pages** at `nighthogbr.com`.

---

## 🚀 Deployment (GitHub Pages)

### 1. Create the repo
1. Go to [github.com/jordanjtupper](https://github.com/jordanjtupper)
2. Create a new public repository named **`nighthogbr.com`**
3. Push this folder's contents to the `main` branch

```bash
cd nighthogbr
git init
git add .
git commit -m "Initial Night Hog site"
git remote add origin https://github.com/jordanjtupper/nighthogbr.com.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. In the repo → **Settings → Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)`
3. Save

### 3. Add custom domain
1. In **Settings → Pages → Custom domain**, enter `nighthogbr.com`
2. Add a `CNAME` file to repo root with just: `nighthogbr.com`
3. At your DNS registrar, add these records:

| Type  | Name | Value                   |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | jordanjtupper.github.io |

4. Check **Enforce HTTPS** after DNS propagates (~24hrs)

---

## 📁 File Structure

```
nighthogbr.com/
├── index.html          # Main page (all sections)
├── 404.html            # Custom 404
├── robots.txt          # SEO crawl rules
├── sitemap.xml         # SEO sitemap
├── CNAME               # Custom domain (add this)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Nav, scroll, form logic
└── images/             # Add your photos here
    ├── jordan-tupper.jpg
    ├── wade-jackson.jpg
    ├── zach-bourque.jpg
    ├── nighthog-live-1.jpg … nighthog-live-5.jpg
    ├── nighthog-crowd.jpg
    └── og-image.jpg    # 1200×630 for social sharing
```

---

## 📸 Adding Photos

Drop photos into the `images/` folder. Recommended:
- **Member photos**: square, min 600×600px (Jordan, Wade, Zach)
- **Live shots**: 4:3 ratio, min 800×600px
- **OG image**: exactly 1200×630px for social sharing

---

## 🎬 Updating YouTube Videos

In `index.html`, find the three `<iframe>` blocks in the `#videos` section and replace the `src` values with real YouTube embed URLs:

```html
<!-- Format for a single video: -->
src="https://www.youtube.com/embed/VIDEO_ID"

<!-- Format for a playlist: -->
src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID"
```

---

## 📬 Booking Form Setup

The booking form needs a backend to send emails. Easiest option — **Formspree** (free tier works):

1. Go to [formspree.io](https://formspree.io), create a free account
2. Create a new form → copy the endpoint URL (e.g. `https://formspree.io/f/abcdefgh`)
3. In `index.html`, update the `<form>` action:
   ```html
   <form ... action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove `data-netlify="true"` from the form tag
5. Update the redirect: create a simple `thanks.html` or let Formspree handle it

---

## ✏️ Content Updates

All content is in `index.html`. Key areas:
- **Bio**: `#about` section — edit the `<p>` tags
- **Setlist**: `#setlist` section — add/remove `<li>` items
- **Booking details**: `#booking` section — update email, location, etc.
- **Social links**: footer `<a>` tags — update YouTube/Facebook/Instagram URLs

---

## 🔍 SEO Checklist

- [x] Title and meta description on every page
- [x] Open Graph tags for social sharing
- [x] Schema.org MusicGroup structured data
- [x] `robots.txt` allowing all crawlers
- [x] `sitemap.xml`
- [x] Semantic HTML (headings, landmarks, alt text)
- [x] Canonical URL tag
- [ ] Add real OG image (`images/og-image.jpg`)
- [ ] Submit sitemap to Google Search Console

---

## 🛠️ Local Development

No build step needed — it's plain HTML/CSS/JS.

```bash
# Option 1: Python (usually pre-installed)
python3 -m http.server 8080

# Option 2: Node (if installed)
npx serve .

# Then open http://localhost:8080
```
