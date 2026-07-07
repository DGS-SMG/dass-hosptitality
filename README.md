# DASS Hospitality — Website

A modern, elegant, fully static website for DASS Hospitality, built with plain HTML, CSS and JavaScript. No frameworks, no build tools, no backend required.

## Project Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── hero-placeholder.jpg
│   ├── about-placeholder.jpg
│   ├── project-*.jpg
│   └── gallery-placeholder-1.jpg … gallery-placeholder-14.jpg
├── videos/
│   └── dass-trailer.mov
└── README.md
```

All images in `images/` are clearly labelled placeholders generated for layout purposes. Replace them with real photography before launch — keep the same filenames to avoid editing HTML, or update the `src` attributes in `index.html` if you rename files.

### Promotional Video

A short vertical trailer (`videos/dass-trailer.mov`) plays in a dedicated "Our Story, In Motion" section directly beneath the hero. It is a native HTML5 `<video>` element with a custom play button — no external player or JavaScript library required.

**Codec note:** the source file is encoded as HEVC/AAC inside a QuickTime (`.mov`) container. Safari and Chrome/Edge on machines with hardware HEVC decoding play this natively, but Firefox and some Chromium builds (including headless/CI browsers) do not support HEVC and will be unable to play the file. For guaranteed cross-browser playback, export an additional **H.264 MP4** version (e.g. `videos/dass-trailer.mp4`) and add it as a second `<source>` above the `.mov` source in `index.html`:

```html
<source src="videos/dass-trailer.mp4" type="video/mp4">
<source src="videos/dass-trailer.mov">
```

Most editing tools (Final Cut Pro, Premiere, HandBrake, or `ffmpeg -i dass-trailer.mov -c:v libx264 -c:a aac dass-trailer.mp4`) can produce this export.

## Running Locally

No build step is required. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve the folder locally for the most accurate experience (recommended, avoids any browser file:// restrictions):

   ```bash
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one) and push this project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: DASS Hospitality website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub, go to your repository's **Settings** tab.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` and folder to `/ (root)`, then click **Save**.
6. GitHub will publish the site at:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   It may take a minute or two for the site to go live after the first deploy.

### Using a Custom Domain (optional)

1. Add a `CNAME` file to the root of the repository containing your domain, e.g.:

   ```
   www.dasshospitality.co.uk
   ```

2. In your DNS provider, add a `CNAME` record pointing your domain to `<your-username>.github.io`.
3. In the GitHub Pages settings, enter the custom domain and enable **Enforce HTTPS**.

## Deploying to Netlify (alternative)

1. Drag and drop the project folder into the [Netlify Drop](https://app.netlify.com/drop) interface, **or**
2. Connect the GitHub repository via the Netlify dashboard and set:
   - **Build command:** (leave blank — no build step)
   - **Publish directory:** `/` (root)

## Editing Content

- **Text content** — edit directly in `index.html`. Sections are clearly commented (Hero, About, Services, Projects, Gallery, Clients, Statistics, Testimonials, Contact, Footer).
- **Colours & spacing** — all core design tokens (colours, fonts, spacing) are defined as CSS custom properties at the top of `css/styles.css` under `:root`.
- **Images** — replace files inside `images/` with real photography, keeping the same filenames and roughly similar aspect ratios for best results.

## Accessibility & Performance Notes

- Semantic HTML5 landmarks (`header`, `main`, `nav`, `section`, `footer`) are used throughout.
- A "Skip to main content" link is included for keyboard and screen-reader users.
- All images include descriptive `alt` text placeholders — update these when replacing images.
- Animations respect `prefers-reduced-motion`.
- Fonts are loaded from Google Fonts with `preconnect` hints for faster loading.
- No external JavaScript dependencies — a single small `main.js` file handles navigation, scroll reveal, and counters.
