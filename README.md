# Naughty Coffee — website

Website for Naughty Coffee: a specialty coffee shop, roastery and kitchen.
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
(`hello@naughtycoffee.example`), Instagram and Google Maps links, and opening hours.

## Checkout

The cart works (stored in the browser), but checkout is a placeholder. To take real payments,
connect a provider such as Shopify Buy Button, Stripe Payment Links or Snipcart.
