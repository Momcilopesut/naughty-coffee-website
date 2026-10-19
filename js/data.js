/* Kumcoffee — catalogue & origin stories.
   Edit this file to change products, prices and stories; the pages render from it. */

window.SHOP = window.SHOP || {};

SHOP.currency = "€";
SHOP.freeShippingAt = 45;

SHOP.products = [
  // ---- Coffee ----
  {
    id: "guji-hambela", type: "coffee", name: "Guji Hambela", origin: "Ethiopia", originId: "ethiopia",
    process: "Washed", roast: 1, notes: ["Jasmine", "Bergamot", "White peach"],
    price: 22, size: "250g", color: "#e7b24c", bag: "#ffffff", tag: "New harvest"
  },
  {
    id: "huila-pink-bourbon", type: "coffee", name: "Huila Pink Bourbon", origin: "Colombia", originId: "colombia",
    process: "Washed", roast: 2, notes: ["Red grape", "Hibiscus", "Panela"],
    price: 24, size: "250g", color: "#de7e72", bag: "#ffffff"
  },
  {
    id: "nyeri-aa", type: "coffee", name: "Nyeri AA", origin: "Kenya", originId: "kenya",
    process: "Washed", roast: 1, notes: ["Blackcurrant", "Grapefruit", "Molasses"],
    price: 25, size: "250g", color: "#8d3b4a", bag: "#ffffff", tag: "Limited"
  },
  {
    id: "huehuetenango", type: "coffee", name: "Huehuetenango", origin: "Guatemala", originId: "guatemala",
    process: "Washed", roast: 3, notes: ["Milk chocolate", "Almond", "Red apple"],
    price: 20, size: "250g", color: "#c98d4f", bag: "#ffffff"
  },
  {
    id: "cerrado-natural", type: "coffee", name: "Cerrado Natural", origin: "Brazil", originId: "brazil",
    process: "Natural", roast: 3, notes: ["Cocoa", "Hazelnut", "Brown sugar"],
    price: 18, size: "250g", color: "#7c9a6b", bag: "#ffffff"
  },
  {
    id: "aceh-gayo", type: "coffee", name: "Aceh Gayo", origin: "Indonesia", originId: "indonesia",
    process: "Wet-hulled", roast: 4, notes: ["Cedar", "Dark chocolate", "Clove"],
    price: 20, size: "250g", color: "#4f6d7a", bag: "#ffffff"
  },
  {
    id: "house-espresso", type: "coffee", name: "House Espresso", origin: "Brazil · Colombia · Ethiopia", originId: null,
    process: "Blend", roast: 3, notes: ["Caramel", "Cherry", "Cocoa nib"],
    price: 19, size: "250g", color: "#c4542a", bag: "#1f2b22", tag: "Bestseller"
  },
  {
    id: "night-shift-decaf", type: "coffee", name: "Night Shift Decaf", origin: "Colombia", originId: "colombia",
    process: "Sugarcane EA", roast: 3, notes: ["Toffee", "Orange", "Malt"],
    price: 19, size: "250g", color: "#9a8fbf", bag: "#1f2b22"
  },

  {
    id: "drip-guji", type: "coffee", kind: "drip", name: "Drip Coffee — Guji Hambela", origin: "Ethiopia", originId: "ethiopia",
    process: "Washed", roast: 1, notes: ["Jasmine", "Bergamot"],
    price: 16, size: "10 × 12g", color: "#e9a23b", options: ["Box of 10"], tag: "New"
  },
  {
    id: "drip-huila", type: "coffee", kind: "drip", name: "Drip Coffee — Huila Pink Bourbon", origin: "Colombia", originId: "colombia",
    process: "Washed", roast: 2, notes: ["Red grape", "Panela"],
    price: 17, size: "10 × 12g", color: "#d9a0c4", options: ["Box of 10"]
  },

  // ---- Apparel ----
  {
    id: "logo-tee", type: "apparel", kind: "tee", name: "Kumcoffee Logo Tee", origin: "Heavyweight organic cotton",
    price: 32, color: "#151515", print: "#f6f6f5", sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "roaster-tee", type: "apparel", kind: "tee", name: "Roaster Tee", origin: "Garment-dyed, 240gsm",
    price: 34, color: "#ecebe7", print: "#151515", sizes: ["S", "M", "L", "XL"], tag: "Staff favourite"
  },
  {
    id: "field-cap", type: "apparel", kind: "cap", name: "Field Cap", origin: "Washed cotton twill",
    price: 30, color: "#c9b48f", print: "#1f2b22", sizes: ["One size"]
  },
  {
    id: "harvest-beanie", type: "apparel", kind: "beanie", name: "Harvest Beanie", origin: "Merino blend rib knit",
    price: 28, color: "#c4542a", print: "#f3efe6", sizes: ["One size"]
  }
];

SHOP.grinds = ["Whole bean", "Espresso", "Filter", "French press"];

/* Coordinates are [longitude, latitude] for the coffee-belt map. */
SHOP.origins = [
  {
    id: "ethiopia", country: "Ethiopia", region: "Guji Zone, Oromia", coords: [38.9, 5.8], color: "#e7b24c",
    altitude: "1,950–2,300 m", varietals: "Indigenous landraces", process: "Washed", harvest: "Nov – Jan",
    title: "Where coffee grew before anyone planted it",
    quote: "In Guji, nobody talks about a coffee farm. They talk about a garden.",
    body: [
      "Coffee is not a crop in southern Ethiopia so much as part of the forest. Arabica evolved in these highlands, and most of the trees our Guji lot comes from were never selected or bred — they are local landraces, thousands of genetic variations growing side by side under a canopy of acacia and false banana.",
      "Families here typically tend less than two hectares each. During harvest, cherries are carried down the hillsides in sacks and sold at a washing station, where they are sorted by hand, pulped, fermented in water for up to two days, and then laid out on raised beds of mesh to dry slowly in the mountain air.",
      "That slow drying is where the florals come from. We roast this one light and fast to keep the jasmine on top — it tastes almost like tea, and that is the point."
    ]
  },
  {
    id: "colombia", country: "Colombia", region: "Huila, Southern Andes", coords: [-75.6, 2.5], color: "#de7e72",
    altitude: "1,700–2,000 m", varietals: "Pink Bourbon", process: "Washed", harvest: "Apr – Jun · Oct – Dec",
    title: "Two harvests a year, and a pink cherry",
    quote: "The equator gives Huila two seasons of flowering — and two chances to get it right.",
    body: [
      "Huila sits close enough to the equator that coffee trees flower twice a year, so there is a main harvest and a smaller 'mitaca'. Steep valleys between the Central and Eastern cordilleras make every farm its own microclimate: a slope facing east can taste completely different from one facing west a kilometre away.",
      "Pink Bourbon is a rare natural cross that ripens to a salmon pink instead of red. It is low-yielding and fussy, and only a handful of smallholders bother with it. Those who do pick it cherry by cherry, because a pink that is underripe looks almost the same as one that is perfect.",
      "In the cup it is the most expressive coffee on our shelf — red grape, hibiscus and a long panela sweetness. We roast it just past first crack."
    ]
  },
  {
    id: "kenya", country: "Kenya", region: "Nyeri, Mount Kenya slopes", coords: [36.95, -0.42], color: "#8d3b4a",
    altitude: "1,700–1,900 m", varietals: "SL28 · SL34 · Ruiru 11", process: "Washed, double fermented", harvest: "Oct – Dec",
    title: "Red soil, cold mornings and the AA grade",
    quote: "Kenyan coffee doesn't whisper. It tells you exactly what it is.",
    body: [
      "On the southern slopes of Mount Kenya, volcanic red soil and cool nights make for a slow-ripening cherry with an unusual amount of acidity. Most growers belong to cooperative societies that run shared 'factories' — what the rest of the world calls washing stations.",
      "Kenya is known for its long, careful process: cherry is pulped, fermented, washed, then soaked again in clean water before drying. The SL28 and SL34 varieties, selected here almost a century ago, are what give the region its signature blackcurrant and tomato-leaf character.",
      "AA refers to bean size, the largest screen. It doesn't guarantee quality on its own, which is why we cup dozens of lots before choosing one."
    ]
  },
  {
    id: "guatemala", country: "Guatemala", region: "Huehuetenango", coords: [-91.5, 15.3], color: "#c98d4f",
    altitude: "1,600–2,000 m", varietals: "Bourbon · Caturra", process: "Washed", harvest: "Jan – Apr",
    title: "Hot winds from Mexico, coffee above the frost line",
    quote: "Dry, warm air rolls up from the Tehuantepec plain — and lets coffee grow higher here than almost anywhere in Central America.",
    body: [
      "Huehuetenango is one of the most remote coffee regions in Guatemala. Warm winds blowing in from the Mexican lowlands protect the high mountain farms from frost, so coffee can be planted at altitudes that would be too cold elsewhere.",
      "Because it is so far from cities, many producers process their own cherry at home on small wet mills, drying the coffee on patios next to the house. That makes the quality very personal: each lot reflects one family's habits and care.",
      "This is our everyday filter coffee — a comforting cup of milk chocolate, toasted almond and crisp red apple. Easy to love, hard to get tired of."
    ]
  },
  {
    id: "brazil", country: "Brazil", region: "Cerrado Mineiro, Minas Gerais", coords: [-46.9, -18.9], color: "#7c9a6b",
    altitude: "900–1,250 m", varietals: "Yellow Catuaí · Mundo Novo", process: "Natural", harvest: "May – Sep",
    title: "A savanna plateau and a very dry winter",
    quote: "The Cerrado has a clear rainy season and a clear dry one, and coffee loves certainty.",
    body: [
      "The Cerrado is a high, flat savanna in the heart of Minas Gerais. Unlike the mountain origins on our shelf, farms here are often large and partly mechanised, but the reliable dry season lets cherries dry naturally — whole fruit, skin on — in the sun.",
      "Drying in the fruit pushes sugar and body into the bean. The result is round and low in acidity: cocoa, hazelnut, brown sugar. It's the backbone of our House Espresso and what we reach for when we want milk drinks to taste like dessert.",
      "The region was the first in Brazil to earn a protected designation of origin, which means every bag can be traced back to the farm it came from."
    ]
  },
  {
    id: "indonesia", country: "Indonesia", region: "Gayo Highlands, Aceh, Sumatra", coords: [96.8, 4.6], color: "#4f6d7a",
    altitude: "1,400–1,700 m", varietals: "Ateng · Typica · Tim Tim", process: "Wet-hulled (Giling Basah)", harvest: "Oct – Jun",
    title: "Rain, a lake in the mountains, and a process found nowhere else",
    quote: "In Sumatra it rains so often that coffee had to invent its own way to dry.",
    body: [
      "Around Lake Laut Tawar in the Gayo highlands it can rain almost any day of the year. Farmers developed 'giling basah' — wet-hulling — to cope: the parchment layer is removed while the bean is still damp, so it can dry in hours instead of weeks.",
      "That shortcut is what gives Sumatran coffee its deep, earthy profile: cedar, dark chocolate, a little spice. It's polarising in specialty circles, which is exactly why we like serving it — it reminds people that 'good' coffee tastes like many different things.",
      "Gayo coffee is grown mostly by smallholders under shade trees, and much of it is organic by default. We take it a touch darker than our other single origins to make it sing through milk."
    ]
  }
];

SHOP.menu = {
  breakfast: [
    { name: "Kum's Breakfast Plate", price: 15, desc: "Two soft eggs, miso-butter mushrooms, charred greens, house sourdough, pickled shallot.", diet: ["V"] },
    { name: "Tamago Sando", price: 12, desc: "Thick-cut Japanese omelette, kewpie, chives on toasted milk bread.", diet: ["V"] },
    { name: "Shakshuka", price: 14, desc: "Spiced tomato and pepper, baked eggs, labneh, za'atar, grilled flatbread.", diet: ["V"] },
    { name: "Crispy Rice Bowl", price: 15, desc: "Sesame crispy rice, soy-cured egg yolk, avocado, cucumber, furikake, chili crisp.", diet: ["V", "GF"] },
    { name: "Buttermilk Pancakes", price: 13, desc: "Brown butter, whipped ricotta, seasonal fruit, maple roasted with our espresso.", diet: ["V"] },
    { name: "Smoked Salmon Toast", price: 14, desc: "Cultured cream cheese, capers, dill, nori salt on rye.", diet: [] },
    { name: "Granola & Yoghurt", price: 9, desc: "Toasted oat and buckwheat granola, coffee-cherry compote, Greek yoghurt.", diet: ["V"] }
  ],
  coffee: [
    { name: "Espresso", price: 2.8, desc: "House blend or rotating single origin." },
    { name: "Flat White", price: 4.2, desc: "Double ristretto, silky milk. Oat at no extra cost." },
    { name: "Cappuccino", price: 4.0, desc: "Classic, generous foam." },
    { name: "Batch Brew", price: 3.5, desc: "Today's filter, refills half price." },
    { name: "Cortado", price: 3.8, desc: "Equal parts espresso and steamed milk." },
    { name: "Decaf", price: 3.5, desc: "Night Shift decaf as espresso or filter." },
    { name: "Pour Over", price: 5.5, desc: "Any single origin from the shelf, brewed to order." },
    { name: "Espresso Tonic", price: 5.0, desc: "Espresso, yuzu tonic, a twist of lemon." },
    { name: "Matcha Latte", price: 5.0, desc: "Ceremonial-grade matcha over oat milk, a little honey." },
    { name: "Hojicha Latte", price: 4.8, desc: "Roasted green tea, a little honey. No coffee." }
  ]
};

/* ---------- Ticker: cups sold ----------
   Total = cupsPerDay × 365 × years, split by each drink's share of sales.
   `change` is the % change versus the previous year. Edit these to update the ticker. */
SHOP.sales = {
  cupsPerDay: 500,
  years: 3,
  mix: [
    { name: "Flat White",     share: 0.24, change: 6.8 },
    { name: "Cappuccino",     share: 0.19, change: 2.1 },
    { name: "Batch Brew",     share: 0.16, change: 4.4 },
    { name: "Espresso",       share: 0.13, change: -1.7 },
    { name: "Pour Over",      share: 0.11, change: 12.3 },
    { name: "Espresso Tonic", share: 0.07, change: 18.9 },
    { name: "Cortado",        share: 0.06, change: -0.6 },
    { name: "Decaf",          share: 0.04, change: 3.2 }
  ]
};

/* ---------- Illustrations (generated SVG so the site needs no photos) ---------- */

/* The Kumcoffee ensō in a 100×100 box (same geometry as the site logo). */
SHOP.ENSO = "M68.78 14.68 L67.81 13.84 L66.80 13.02 L65.76 12.23 L64.69 11.48 L63.58 10.75 L62.44 10.06 L61.28 9.41 L60.08 8.79 L58.85 8.21 L57.60 7.67 L56.31 7.21 L54.99 6.97 L53.65 6.77 L52.31 6.62 L50.96 6.51 L49.60 6.45 L48.24 6.43 L46.88 6.46 L45.52 6.53 L44.16 6.65 L42.80 6.82 L41.45 7.03 L40.10 7.29 L38.76 7.59 L37.43 7.94 L36.11 8.34 L34.80 8.78 L33.51 9.26 L32.23 9.79 L30.97 10.36 L29.73 10.98 L28.51 11.63 L27.31 12.33 L26.13 13.07 L24.98 13.85 L23.86 14.67 L22.76 15.53 L21.69 16.43 L20.65 17.36 L19.65 18.32 L18.67 19.32 L17.73 20.35 L16.83 21.42 L15.96 22.51 L15.13 23.63 L14.34 24.78 L13.58 25.96 L12.87 27.16 L12.19 28.38 L11.56 29.63 L10.97 30.89 L10.42 32.18 L9.92 33.47 L9.46 34.79 L9.04 36.12 L8.67 37.46 L8.34 38.81 L8.06 40.17 L7.82 41.53 L7.63 42.90 L7.48 44.28 L7.38 45.66 L7.32 47.04 L7.31 48.41 L7.34 49.79 L7.41 51.16 L7.53 52.53 L7.70 53.89 L7.90 55.24 L8.15 56.58 L8.45 57.91 L8.78 59.22 L9.15 60.53 L9.57 61.81 L10.02 63.09 L10.52 64.34 L11.05 65.57 L11.62 66.79 L12.22 67.98 L12.86 69.15 L13.54 70.30 L14.25 71.43 L14.99 72.53 L15.77 73.60 L16.57 74.65 L17.41 75.66 L18.27 76.65 L19.17 77.62 L20.09 78.55 L21.03 79.45 L22.00 80.32 L23.00 81.15 L24.02 81.96 L25.06 82.73 L26.12 83.47 L27.20 84.17 L28.30 84.84 L29.42 85.47 L30.56 86.07 L31.70 86.66 L32.86 87.20 L34.03 87.71 L35.22 88.17 L36.42 88.60 L37.63 88.99 L38.86 89.35 L40.09 89.66 L41.33 89.93 L42.58 90.17 L43.84 90.37 L45.09 90.53 L46.36 90.65 L47.62 90.72 L48.89 90.77 L50.16 90.77 L51.42 90.73 L52.68 90.65 L53.95 90.53 L55.20 90.38 L56.45 90.18 L57.70 89.95 L58.93 89.68 L60.16 89.36 L61.38 89.01 L62.58 88.63 L63.77 88.20 L64.95 87.74 L66.12 87.24 L67.27 86.70 L68.40 86.13 L69.52 85.52 L70.61 84.88 L71.69 84.20 L72.74 83.49 L73.77 82.74 L74.78 81.96 L75.76 81.15 L76.72 80.31 L77.65 79.44 L78.55 78.53 L79.42 77.60 L80.26 76.64 L81.08 75.65 L81.86 74.64 L82.61 73.60 L83.32 72.54 L84.00 71.46 L84.65 70.35 L85.26 69.22 L85.83 68.07 L86.36 66.91 L86.86 65.72 L87.32 64.52 L87.74 63.31 L88.12 62.08 L88.46 60.85 L88.76 59.60 L89.01 58.34 L89.23 57.08 L89.41 55.81 L89.54 54.53 L89.63 53.25 L89.68 51.97 L89.68 50.69 L89.65 49.41 L89.57 48.14 L89.45 46.86 L89.29 45.60 L89.09 44.34 L88.84 43.09 L88.56 41.85 L88.23 40.62 L87.87 39.41 L87.46 38.21 L87.02 37.02 L86.54 35.86 L86.02 34.71 L85.46 33.58 L84.87 32.47 L84.24 31.39 L83.18 31.95 L83.70 33.05 L84.18 34.16 L84.63 35.28 L85.04 36.42 L85.41 37.57 L85.74 38.74 L86.04 39.91 L86.29 41.09 L86.51 42.27 L86.68 43.47 L86.82 44.66 L86.92 45.86 L86.98 47.06 L87.00 48.25 L86.98 49.45 L86.92 50.64 L86.82 51.83 L86.68 53.01 L86.51 54.19 L86.30 55.36 L86.05 56.51 L85.76 57.66 L85.43 58.79 L85.08 59.91 L84.68 61.02 L84.25 62.10 L83.79 63.18 L83.29 64.23 L82.76 65.26 L82.20 66.28 L81.61 67.27 L80.99 68.24 L80.34 69.19 L79.66 70.11 L78.95 71.01 L78.22 71.88 L77.46 72.73 L76.68 73.55 L75.88 74.34 L75.05 75.10 L74.20 75.84 L73.33 76.54 L72.44 77.22 L71.54 77.86 L70.61 78.48 L69.68 79.06 L68.72 79.61 L67.75 80.13 L66.77 80.62 L65.78 81.08 L64.77 81.50 L63.76 81.89 L62.74 82.25 L61.71 82.58 L60.67 82.87 L59.63 83.14 L58.58 83.37 L57.52 83.56 L56.47 83.73 L55.41 83.86 L54.35 83.96 L53.29 84.02 L52.24 84.06 L51.18 84.06 L50.12 84.03 L49.07 83.97 L48.02 83.88 L46.98 83.76 L45.94 83.60 L44.91 83.42 L43.88 83.21 L42.87 82.96 L41.86 82.69 L40.86 82.39 L39.87 82.06 L38.89 81.70 L37.92 81.31 L36.96 80.90 L36.01 80.45 L35.08 79.99 L34.16 79.50 L33.26 78.96 L32.38 78.39 L31.52 77.80 L30.67 77.19 L29.85 76.55 L29.04 75.88 L28.25 75.19 L27.48 74.48 L26.74 73.74 L26.01 72.98 L25.31 72.20 L24.63 71.40 L23.97 70.58 L23.34 69.74 L22.73 68.88 L22.15 68.00 L21.59 67.10 L21.06 66.18 L20.56 65.25 L20.08 64.31 L19.63 63.34 L19.21 62.37 L18.82 61.38 L18.45 60.37 L18.12 59.36 L17.82 58.33 L17.55 57.30 L17.30 56.25 L17.09 55.20 L16.91 54.13 L16.77 53.07 L16.65 51.99 L16.57 50.92 L16.52 49.83 L16.51 48.75 L16.52 47.66 L16.57 46.58 L16.66 45.49 L16.77 44.41 L16.92 43.33 L17.11 42.25 L17.33 41.18 L17.58 40.11 L17.87 39.05 L18.18 38.00 L18.54 36.96 L18.92 35.93 L19.34 34.91 L19.79 33.90 L20.27 32.91 L20.79 31.93 L21.33 30.97 L21.91 30.03 L22.52 29.10 L23.15 28.19 L23.82 27.31 L24.51 26.44 L25.24 25.60 L25.99 24.78 L26.76 23.99 L27.57 23.22 L28.39 22.48 L29.24 21.77 L30.12 21.08 L31.01 20.42 L31.93 19.80 L32.87 19.20 L33.83 18.64 L34.80 18.10 L35.80 17.60 L36.81 17.13 L37.83 16.70 L38.87 16.30 L39.92 15.94 L40.98 15.61 L42.05 15.31 L43.13 15.06 L44.22 14.84 L45.31 14.65 L46.41 14.50 L47.52 14.39 L48.63 14.32 L49.73 14.28 L50.84 14.28 L51.95 14.32 L53.06 14.39 L54.16 14.50 L55.26 14.65 L56.38 14.65 L57.52 14.65 L58.66 14.70 L59.81 14.78 L60.95 14.90 L62.11 15.05 L63.26 15.25 L64.41 15.49 L65.56 15.77 L66.70 16.09 L67.84 16.45 Z";
SHOP.mark = (x, y, size, ink = "#111", dot = "#c8402c") =>
  `<g transform="translate(${x} ${y}) scale(${size / 100})"><path d="${SHOP.ENSO}" fill="${ink}"/><circle cx="50" cy="50" r="8.5" fill="${dot}"/></g>`;

SHOP.art = {
  /* Coffee label: a white receipt card with a torn (zigzag) bottom edge. */
  label(p) {
    const o = SHOP.origins.find((x) => x.id === p.originId);
    const country = (p.origin || "").split(" · ").length > 1 ? "Blend" : p.origin;
    const lines = [
      o ? o.region.split(",")[0] : p.origin,
      p.process,
      o ? o.altitude.replace(/,/g, "") : "Seasonal",
      o ? o.varietals.split(" · ")[0] : "Rotating lots"
    ].map((t) => t.toUpperCase());
    let zig = "";
    for (let x = 206; x > 34; x -= 8) zig += ` L${x - 4} 202 L${x - 8} 196`;
    return `<svg viewBox="26 22 188 188" aria-hidden="true">
      <path d="M34 30 H206 V196${zig} Z" fill="#fff"/>
      <text x="120" y="56" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="600" font-size="9" letter-spacing="-0.2" fill="#111">(${p.name.toUpperCase()}, ${country.toUpperCase()})</text>
      ${lines.map((t, i) => `<text x="48" y="${78 + i * 10}" font-family="Inter Tight, sans-serif" font-size="6.4" fill="#111">${t}</text>`).join("")}
      <text x="48" y="132" font-family="Inter Tight, sans-serif" font-weight="600" font-size="6.4" fill="#111">(${p.notes.join(", ").toUpperCase()})</text>
      ${SHOP.mark(46, 168, 18)}
      <text x="70" y="181" font-family="Inter Tight, sans-serif" font-weight="500" font-size="7.5" letter-spacing="1.6" fill="#111">KUMCOFFEE</text>
      <rect x="184" y="173" width="10" height="10" fill="${p.color}"/>
    </svg>`;
  },
  /* Drip-bag box: grey packet with a coloured panel. */
  drip(p) {
    const [, name] = p.name.split(" — ");
    let zig = "";
    for (let x = 192; x > 48; x -= 8) zig += ` L${x - 4} 150 L${x - 8} 145`;
    let qr = "";
    for (let i = 0; i < 25; i++) if ((i * 7 + 3) % 3) qr += `<rect x="${166 + (i % 5) * 3}" y="${170 + Math.floor(i / 5) * 3}" width="3" height="3" fill="#111"/>`;
    return `<svg viewBox="0 0 240 240" aria-hidden="true">
      <rect x="40" y="36" width="160" height="168" fill="#ecebe8"/>
      ${SHOP.mark(50, 48, 16)}
      <text x="70" y="59" font-family="Inter Tight, sans-serif" font-weight="500" font-size="6" letter-spacing="1.2" fill="#111">KUMCOFFEE</text>
      <text x="188" y="50" text-anchor="end" font-family="Inter Tight, sans-serif" font-size="4" fill="#111">POUR-OVER COFFEE</text>
      <path d="M48 76 H192 V145${zig} Z" fill="${p.color}"/>
      <text x="54" y="104" font-family="Inter Tight, sans-serif" font-weight="700" font-size="20" letter-spacing="-1.2" fill="#111">DRIP</text>
      <text x="54" y="122" font-family="Inter Tight, sans-serif" font-weight="700" font-size="20" letter-spacing="-1.2" fill="#111">COFFEE.</text>
      <text x="54" y="134" font-family="Inter Tight, sans-serif" font-weight="600" font-size="5.6" fill="#111">${name.toUpperCase()} (${p.origin.toUpperCase()})</text>
      <text x="52" y="196" font-family="Inter Tight, sans-serif" font-size="4" fill="#111">(GROUND COFFEE)</text>
      <text x="110" y="196" font-family="Inter Tight, sans-serif" font-size="4" fill="#111">${p.size.toUpperCase()}</text>
      <text x="164" y="166" font-family="Inter Tight, sans-serif" font-size="3.6" fill="#111">(HOW TO BREW)</text>
      ${qr}
    </svg>`;
  },
  tee(p) {
    return `<svg viewBox="0 0 240 240" aria-hidden="true">
      <path d="M86 22 Q120 44 154 22 L214 48 L198 100 L172 90 L172 222 L68 222 L68 90 L42 100 L26 48 Z" fill="${p.color}" stroke="#161613" stroke-opacity=".12"/>
      <path d="M86 22 Q120 44 154 22" fill="none" stroke="#161613" stroke-opacity=".25" stroke-width="3"/>
      ${SHOP.mark(138, 58, 18, p.print)}
    </svg>`;
  },
  cap(p) {
    return `<svg viewBox="0 0 240 200" aria-hidden="true">
      <path d="M44 128 Q40 44 122 42 Q204 44 200 128 Z" fill="${p.color}"/>
      <path d="M122 42 Q100 80 98 128 M122 42 Q150 80 156 128" fill="none" stroke="#161613" stroke-opacity=".15"/>
      <path d="M44 128 Q120 146 200 128 Q226 140 226 152 Q140 172 70 158 Q40 150 44 128 Z" fill="${p.color}" stroke="#161613" stroke-opacity=".18"/>
      <ellipse cx="122" cy="44" rx="7" ry="3" fill="#161613" opacity=".3"/>
      <rect x="92" y="88" width="60" height="22" rx="2" fill="${p.print}"/>
      <text x="122" y="104" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="500" font-size="6" letter-spacing="1" fill="${p.color}">KUMCOFFEE</text>
    </svg>`;
  },
  beanie(p) {
    let ribs = "";
    for (let x = 52; x <= 188; x += 8) ribs += `<line x1="${x}" y1="140" x2="${x}" y2="186" stroke="#161613" stroke-opacity=".12"/>`;
    return `<svg viewBox="0 0 240 210" aria-hidden="true">
      <path d="M50 146 Q46 40 120 38 Q194 40 190 146 Z" fill="${p.color}"/>
      <path d="M120 38 Q118 90 120 146" stroke="#161613" stroke-opacity=".08" fill="none"/>
      <rect x="44" y="136" width="152" height="54" rx="6" fill="${p.color}"/>
      <rect x="44" y="136" width="152" height="54" rx="6" fill="#000" opacity=".08"/>
      ${ribs}
      <rect x="94" y="150" width="52" height="24" rx="2" fill="${p.print}"/>
      <text x="120" y="166" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="500" font-size="5.2" letter-spacing=".8" fill="${p.color}">KUMCOFFEE</text>
    </svg>`;
  },
  forProduct(p) {
    if (p.kind === "drip") return this.drip(p);
    if (p.type === "coffee") return this.label(p);
    return this[p.kind] ? this[p.kind](p) : this.tee(p);
  },
  /* a small coffee-cherry branch used as a story icon */
  cherry(color) {
    return `<svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 34 Q18 20 34 8" stroke="#161613" stroke-width="1.4" fill="none"/>
      <path d="M22 18 q8 -10 14 -6 q-6 8 -14 6z" fill="#1f2b22"/>
      <circle cx="14" cy="24" r="5" fill="${color}"/>
      <circle cx="21" cy="28" r="4.5" fill="${color}" opacity=".85"/>
      <circle cx="25" cy="20" r="4" fill="${color}" opacity=".7"/>
    </svg>`;
  }
};
