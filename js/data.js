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
    { name: "Pour Over", price: 5.5, desc: "Any single origin from the shelf, brewed to order." },
    { name: "Espresso Tonic", price: 5.0, desc: "Espresso, yuzu tonic, a twist of lemon." },
    { name: "Matcha Latte", price: 5.0, desc: "Ceremonial-grade matcha over oat milk, a little honey." },
    { name: "Hojicha Latte", price: 4.8, desc: "Roasted green tea, a little honey. No coffee." }
  ]
};

/* ---------- Illustrations (generated SVG so the site needs no photos) ---------- */

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
      <text x="48" y="176" font-family="Inter Tight, sans-serif" font-weight="700" font-size="9.5" letter-spacing="-0.4" fill="#111">KUM</text>
      <text x="48" y="185" font-family="Inter Tight, sans-serif" font-weight="700" font-size="9.5" letter-spacing="-0.4" fill="#111">COFFEE.</text>
      <circle cx="190" cy="178" r="5" fill="${p.color}"/>
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
      <text x="52" y="58" font-family="Inter Tight, sans-serif" font-weight="700" font-size="7.5" letter-spacing="-0.3" fill="#111">KUM</text>
      <text x="52" y="65" font-family="Inter Tight, sans-serif" font-weight="700" font-size="7.5" letter-spacing="-0.3" fill="#111">COFFEE.</text>
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
      <text x="136" y="66" font-family="Inter Tight, sans-serif" font-weight="700" font-size="7" letter-spacing="-0.3" fill="${p.print}">KUM</text>
      <text x="136" y="73" font-family="Inter Tight, sans-serif" font-weight="700" font-size="7" letter-spacing="-0.3" fill="${p.print}">COFFEE.</text>
    </svg>`;
  },
  cap(p) {
    return `<svg viewBox="0 0 240 200" aria-hidden="true">
      <path d="M44 128 Q40 44 122 42 Q204 44 200 128 Z" fill="${p.color}"/>
      <path d="M122 42 Q100 80 98 128 M122 42 Q150 80 156 128" fill="none" stroke="#161613" stroke-opacity=".15"/>
      <path d="M44 128 Q120 146 200 128 Q226 140 226 152 Q140 172 70 158 Q40 150 44 128 Z" fill="${p.color}" stroke="#161613" stroke-opacity=".18"/>
      <ellipse cx="122" cy="44" rx="7" ry="3" fill="#161613" opacity=".3"/>
      <rect x="92" y="88" width="60" height="22" rx="2" fill="${p.print}"/>
      <text x="122" y="104" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="600" font-size="8.5" fill="${p.color}">Kumcoffee</text>
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
      <text x="120" y="166" text-anchor="middle" font-family="Inter Tight, sans-serif" font-weight="600" font-size="7.5" fill="${p.color}">Kumcoffee</text>
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
