# Kumcoffee — website

Website for Kumcoffee: a specialty coffee shop, roastery and kitchen.
Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Home: hero, featured beans, roastery, kitchen, origin stories, merch, visit info |
| `shop.html` | Online shop for coffee beans, t-shirts and hats, with filters and a cart |
| `menu.html` | Breakfast and coffee bar menu, opening hours |
| `origins.html` | Coffee-growing stories from six countries, with an interactive coffee-belt map |
| `about.html` | The roastery: how we work, our story, location and hours |

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Or deploy the folder as-is to any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Editing content

Products, prices, menu items and origin stories all live in **`js/data.js`** — the pages render from it.
Product images are generated SVG illustrations (bags, tees, caps), so no photos are needed;
swap in real photography later if you like.

Placeholder details to replace before launch: the address (`12 Harbour Lane`), email
(`hello@kumcoffee.example`), Instagram and Google Maps links, and opening hours.

## Checkout

The cart works (stored in the browser), but checkout is a placeholder. To take real payments,
connect a provider such as Shopify Buy Button, Stripe Payment Links or Snipcart.

## Logo

The mark is a brush ensō (open zen circle) with a vermilion coffee-cherry dot.
`tools/logo.py` generates it; `python3 tools/logo.py mark.svg` writes a standalone SVG.

## Header film

`video/hero-film*.webm` / `.mp4` is a 20-second loop cut from the café's own photos and footage:
coffee farm → roaster → storefront → walk through the café → hand pour → latte art → closing clip. Photos are still
slides, shots crossfade, and the end blends into the start. There is a 1920×1080 cut for desktop and a
1080×1920 (9:16) cut (`-portrait`) for phones; the page picks one by screen shape.

To swap a shot, edit the `SHOTS` list in `tools/hero-film/cut.py` and run (needs ffmpeg and Pillow):

```sh
python3 tools/hero-film/cut.py path/to/cafe-walkthrough.mp4 path/to/ending.mov video
```

`tools/hero-film/film.html` is the earlier illustrated version, kept for reference.

## Performance notes

- Photos are WebP with an 800px copy for phones (`img/*-800.webp`); pages pick the right one via `srcset`.
- Product grids are pre-rendered into the HTML at build time by `tools/render-products.js` (same template as the page script).
- The header film starts loading after the page has finished; other clips load when they come near the screen.
- Inter Tight is self-hosted in `fonts/` and preloaded.
- Host on something that serves gzip/brotli and long cache headers (GitHub Pages, Netlify, Cloudflare Pages all do).
