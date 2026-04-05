What was created
Landing page — landing/
File	What it does
index.html	Full landing page — Hero with layered room + scanline, Features (3 cards), Screenshots (4 placeholders), All 12 Classes with stat bars, Download CTA, Footer
privacy.html	Full Privacy Policy — covers Supabase, Apple/Google Sign-In, email, voice memos, data retention, user rights, GDPR-compatible
terms.html	Full Terms & Conditions — 14 sections including IAP placeholder, EULA link to Apple's standard
styles/tokens.css	All fonts (@font-face) + CSS custom properties
styles/reset.css	Box model reset
styles/layout.css	Nav, hero, sections, footer, legal page, responsive breakpoints
styles/components.css	Buttons, store badges, XP badges, feature cards, class cards, stat bars, screenshot frames, scroll-reveal
styles/animations.css	Float, scanline flicker, slide-in, stat bar fill, blink cursor
scripts/main.js	IntersectionObserver scroll reveal + stat bar trigger + nav scroll effect
vercel.json	Single-line Vercel deploy config
IMAGES_NEEDED.md	Full list of every placeholder image, exact specs, and where each is referenced
Assets already copied from client: fonts (Jersey10, VT323, Inter Variable), focus room PNGs (6 layers), character sprite layers, icon + favicon.

App — Settings screen
Added a Legal card in settings.tsx with tappable links to Privacy Policy, Terms & Conditions, and Apple EULA — all open in the browser.

To deploy
GitHub Pages (free, immediate):
Repo Settings → Pages → Branch main → Folder /landing

Custom domain later: add a CNAME file with productivitism.app

Vercel: import repo, set root to landing/

Next step on your end
Open IMAGES_NEEDED.md — take your screenshots and drop them in landing/assets/images/. The placeholders in the HTML will be replaced when you update the src attributes.

