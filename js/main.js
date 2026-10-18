/* Naughty Coffee — site behaviour: navigation, cart, product grids, origins map. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (n) => SHOP.currency + (Number.isInteger(n) ? n : n.toFixed(2));
  const byId = (id) => SHOP.products.find((p) => p.id === id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.remove("no-js");

  /* ---------------- Header & mobile nav ---------------- */

  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav a").forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------- Toast ---------------- */

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* ---------------- Cart ---------------- */

  const CART_KEY = "naughty-cart";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  cart = cart.filter((l) => byId(l.id));

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
  }

  document.body.insertAdjacentHTML("beforeend", `
    <div class="scrim" data-cart-close></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
      <div class="drawer-head">
        <h2 id="cart-title">Your bag</h2>
        <button class="icon-btn" data-cart-close aria-label="Close bag">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
      </div>
      <div class="drawer-body" data-cart-lines></div>
      <div class="drawer-foot" data-cart-foot></div>
    </aside>`);

  const drawer = $(".drawer");
  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    document.body.classList.add("cart-open");
    drawer.setAttribute("aria-hidden", "false");
    $(".icon-btn", drawer).focus();
  }
  function closeCart() {
    document.body.classList.remove("cart-open");
    drawer.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  }
  $$("[data-cart-open]").forEach((b) => b.addEventListener("click", openCart));
  $$("[data-cart-close]").forEach((b) => b.addEventListener("click", closeCart));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("cart-open")) closeCart();
  });

  function addToCart(id, option) {
    const line = cart.find((l) => l.id === id && l.option === option);
    if (line) line.qty += 1;
    else cart.push({ id, option, qty: 1 });
    saveCart();
    renderCart(true);
    showToast(`${byId(id).name} added to your bag`);
  }

  function renderCart(bump) {
    const count = cart.reduce((n, l) => n + l.qty, 0);
    $$(".cart-count").forEach((el) => {
      el.textContent = count;
      if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    });

    const lines = $("[data-cart-lines]");
    const foot = $("[data-cart-foot]");
    if (!cart.length) {
      lines.innerHTML = `<div class="drawer-empty"><p>Your bag is empty.</p><span>Fresh beans ship every Tuesday &amp; Friday.</span></div>`;
      foot.innerHTML = `<a class="btn" href="shop.html">Browse the shop <span class="arrow">→</span></a>`;
      return;
    }

    lines.innerHTML = cart.map((l, i) => {
      const p = byId(l.id);
      return `<div class="line-item">
        <div class="line-thumb">${SHOP.art.forProduct(p)}</div>
        <div>
          <h3>${p.name}</h3>
          <div class="mono">${l.option}</div>
          <div class="qty" aria-label="Quantity">
            <button data-qty="${i}" data-d="-1" aria-label="Decrease quantity">−</button>
            <span>${l.qty}</span>
            <button data-qty="${i}" data-d="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="line-right">
          <span class="mono" style="color:var(--ink)">${money(p.price * l.qty)}</span>
          <button class="remove" data-remove="${i}">Remove</button>
        </div>
      </div>`;
    }).join("");

    const total = cart.reduce((n, l) => n + byId(l.id).price * l.qty, 0);
    const left = SHOP.freeShippingAt - total;
    const pct = Math.min(100, (total / SHOP.freeShippingAt) * 100);
    foot.innerHTML = `
      <div class="mono">${left > 0 ? `${money(left)} away from free shipping` : "You've unlocked free shipping"}</div>
      <div class="ship-bar"><i style="width:${pct}%"></i></div>
      <div class="total-row"><span>Subtotal</span><span>${money(total)}</span></div>
      <button class="btn" data-checkout>Checkout <span class="arrow">→</span></button>`;
  }

  drawer.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) {
      const line = cart[+q.dataset.qty];
      line.qty += +q.dataset.d;
      if (line.qty < 1) cart.splice(+q.dataset.qty, 1);
    } else if (r) {
      cart.splice(+r.dataset.remove, 1);
    } else if (e.target.closest("[data-checkout]")) {
      showToast("Checkout coming soon — connect a payment provider to go live.");
      return;
    } else return;
    saveCart();
    renderCart();
  });

  renderCart();

  /* ---------------- Product grids ---------------- */

  function roastDots(level) {
    const names = ["", "Light", "Light–medium", "Medium", "Medium–dark", "Dark"];
    let dots = "";
    for (let i = 1; i <= 5; i++) dots += `<b class="${i <= level ? "on" : ""}"></b>`;
    return `<div class="roast"><span class="roast-dots" aria-hidden="true">${dots}</span>${names[level]} roast</div>`;
  }

  function productCard(p) {
    const opts = p.type === "coffee" ? SHOP.grinds : p.sizes;
    const optLabel = p.type === "coffee" ? "Grind" : "Size";
    const select = opts.length > 1
      ? `<select class="select" aria-label="${optLabel} for ${p.name}" data-option>${opts.map((o) => `<option>${o}</option>`).join("")}</select>`
      : `<span class="mono muted" data-option-fixed="${opts[0]}">${opts[0]}</span>`;
    const details = p.type === "coffee"
      ? `<p class="card-meta">${p.origin} · ${p.process} · ${p.size}</p>
         <div class="notes">${p.notes.map((n) => `<span>${n}</span>`).join("")}</div>
         ${roastDots(p.roast)}`
      : `<p class="card-meta">${p.origin}</p>`;
    return `<article class="card reveal" data-type="${p.type}" style="--tint:${p.color}">
      <div class="card-media">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
        ${SHOP.art.forProduct(p)}
        <div class="card-quick"><button class="btn" data-add="${p.id}">Add to bag — ${money(p.price)}</button></div>
      </div>
      <div class="card-info"><h3 class="card-title">${p.name}</h3><span class="card-price">${money(p.price)}</span></div>
      ${details}
      <div class="card-options">${select}</div>
    </article>`;
  }

  $$("[data-products]").forEach((grid) => {
    const type = grid.dataset.products;
    const limit = +grid.dataset.limit || Infinity;
    const list = SHOP.products.filter((p) => type === "all" || p.type === type).slice(0, limit);
    grid.innerHTML = list.map(productCard).join("");
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const card = btn.closest(".card");
    const sel = $("[data-option]", card);
    const fixed = $("[data-option-fixed]", card);
    addToCart(btn.dataset.add, sel ? sel.value : fixed ? fixed.dataset.optionFixed : "");
  });

  /* Shop filters */
  const filters = $$("[data-filter]");
  function applyFilter(type) {
    filters.forEach((f) => f.setAttribute("aria-pressed", String(f.dataset.filter === type)));
    $$(".card[data-type]").forEach((c) => { c.hidden = type !== "all" && c.dataset.type !== type; });
  }
  if (filters.length) {
    filters.forEach((f) => f.addEventListener("click", () => {
      applyFilter(f.dataset.filter);
      history.replaceState(null, "", f.dataset.filter === "all" ? location.pathname : "#" + f.dataset.filter);
    }));
    const fromHash = location.hash.slice(1);
    applyFilter(["coffee", "apparel"].includes(fromHash) ? fromHash : "all");
  }

  /* ---------------- Menu page ---------------- */

  $$("[data-menu]").forEach((list) => {
    const items = SHOP.menu[list.dataset.menu] || [];
    list.innerHTML = items.map((it) => `<li class="menu-item reveal">
      <div class="menu-row"><h3>${it.name}${(it.diet || []).map((d) => ` <span class="diet">${d}</span>`).join("")}</h3><span class="dots"></span><span class="price">${money(it.price)}</span></div>
      <p>${it.desc}</p>
    </li>`).join("");
  });

  /* ---------------- Origins ---------------- */

  // Coffee-belt map: longitude -110…120, latitude 32…-32
  const W = 1000, H = 300;
  const px = ([lon, lat]) => [((lon + 110) / 230) * W, ((32 - lat) / 64) * H];
  const labelSide = { ethiopia: "up", kenya: "down" };

  $$("[data-belt]").forEach((holder) => {
    const ty = (lat) => ((32 - lat) / 64) * H;
    let dots = "";
    for (let x = 10; x < W; x += 20) for (let y = 10; y < H; y += 20) {
      const inBelt = y > ty(23.44) && y < ty(-23.44);
      dots += `<circle cx="${x}" cy="${y}" r="1.3" fill="#161613" opacity="${inBelt ? 0.22 : 0.07}"/>`;
    }
    const lines = [[23.44, "Tropic of Cancer"], [0, "Equator"], [-23.44, "Tropic of Capricorn"]].map(([lat, name]) =>
      `<line x1="0" x2="${W}" y1="${ty(lat)}" y2="${ty(lat)}" stroke="#161613" stroke-opacity="${lat === 0 ? 0.35 : 0.2}" stroke-dasharray="${lat === 0 ? "0" : "3 5"}"/>
       <text x="${W - 6}" y="${ty(lat) - 6}" text-anchor="end" font-family="Inter, sans-serif" font-size="11" fill="#6b6a66">${name}</text>`).join("");
    const pins = SHOP.origins.map((o) => {
      const [x, y] = px(o.coords);
      const side = labelSide[o.id];
      const lx = side ? x : x + 12, ly = side === "up" ? y - 14 : side === "down" ? y + 22 : y + 4;
      return `<a href="${holder.dataset.belt}#${o.id}" class="pin" data-pin="${o.id}" aria-label="${o.country}">
        <circle class="pulse" cx="${x}" cy="${y}" r="6" fill="${o.color}"/>
        <circle class="dot" cx="${x}" cy="${y}" r="6" fill="#161613"/>
        <circle cx="${x}" cy="${y}" r="16" fill="transparent"/>
        <text x="${lx}" y="${ly}" text-anchor="${side ? "middle" : "start"}">${o.country}</text>
      </a>`;
    }).join("");
    holder.innerHTML = `<svg class="belt" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of the coffee belt with our origins">
      <rect x="0" y="${ty(23.44)}" width="${W}" height="${ty(-23.44) - ty(23.44)}" fill="#c4542a" opacity=".05"/>
      ${dots}${lines}${pins}</svg>`;
  });

  const storiesEl = $("[data-stories]");
  if (storiesEl) {
    storiesEl.innerHTML = SHOP.origins.map((o) => {
      const beans = SHOP.products.filter((p) => p.originId === o.id);
      const lat = `${Math.abs(o.coords[1]).toFixed(1)}°${o.coords[1] >= 0 ? "N" : "S"}`;
      const lon = `${Math.abs(o.coords[0]).toFixed(1)}°${o.coords[0] >= 0 ? "E" : "W"}`;
      return `<article class="story" id="${o.id}">
        <div class="story-head reveal">
          <div class="story-swatch" style="background:${o.color}33">${SHOP.art.cherry(o.color)}</div>
          <div>
            <span class="eyebrow eyebrow--plain">${o.region} · ${lat} ${lon}</span>
            <h2 class="h2">${o.country}</h2>
          </div>
        </div>
        <h3 class="h3 italic reveal">${o.title}</h3>
        <dl class="facts reveal">
          <div><dt>Altitude</dt><dd>${o.altitude}</dd></div>
          <div><dt>Varietals</dt><dd>${o.varietals}</dd></div>
          <div><dt>Process</dt><dd>${o.process}</dd></div>
          <div><dt>Harvest</dt><dd>${o.harvest}</dd></div>
        </dl>
        <div class="story-body reveal">
          <p>${o.body[0]}</p>
          <blockquote class="story-quote">${o.quote}</blockquote>
          ${o.body.slice(1).map((t) => `<p>${t}</p>`).join("")}
        </div>
        ${beans.length ? `<div class="story-cta reveal">
          <p>Taste ${o.country}: <strong>${beans.map((b) => b.name).join(", ")}</strong></p>
          ${beans.map((b) => `<button class="btn" data-add-direct="${b.id}">Add ${b.name} — ${money(b.price)}</button>`).join("")}
        </div>` : ""}
      </article>`;
    }).join("");

    storiesEl.addEventListener("click", (e) => {
      const b = e.target.closest("[data-add-direct]");
      if (b) addToCart(b.dataset.addDirect, SHOP.grinds[0]);
    });

    const toc = $("[data-toc]");
    if (toc) toc.innerHTML = SHOP.origins.map((o) => `<li><a href="#${o.id}" data-toc-link="${o.id}"><span>${o.country}</span></a></li>`).join("");

    const setActive = (id) => {
      $$("[data-toc-link]").forEach((a) => a.classList.toggle("is-active", a.dataset.tocLink === id));
      $$("[data-pin]").forEach((p) => p.classList.toggle("is-active", p.dataset.pin === id));
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$(".story").forEach((s) => io.observe(s));
    }
    setActive(SHOP.origins[0].id);
  }

  // Home page origins list
  $$("[data-origin-list]").forEach((ul) => {
    ul.innerHTML = SHOP.origins.map((o, i) => `<li><a href="origins.html#${o.id}">
      <span class="idx">0${i + 1}</span>
      <span class="country">${o.country}</span>
      <span class="region">${o.region}</span>
      <span class="go" aria-hidden="true">→</span>
    </a></li>`).join("");
  });

  /* ---------------- Hero bags ---------------- */

  $$("[data-hero-bags]").forEach((el) => {
    el.innerHTML = el.dataset.heroBags.split(" ").map((id) => SHOP.art.forProduct(byId(id))).join("");
  });

  /* ---------------- Newsletter ---------------- */

  $$("[data-signup]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $(".form-note", form.parentElement);
      const email = $("input", form).value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "That email doesn't look right."; return; }
      form.reset();
      note.textContent = "Thanks — you'll hear about the next roast first.";
    });
  });

  /* ---------------- Reveal on scroll ---------------- */

  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      ro.observe(el);
    });
  }
})();
