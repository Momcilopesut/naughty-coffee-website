/* Kumcoffee intro: one set of black lines that redraws itself
   home espresso machine → 70s VW bus → the café storefront, with a percentage line.
   Plays once per visit; tap/click to skip; skipped for reduced motion. */
(function () {
  "use strict";

  const intro = document.getElementById("intro");
  if (!intro) return;

  let seen = false;
  try { seen = sessionStorage.getItem("kum-intro") === "1"; } catch (e) { /* storage blocked */ }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (seen || reduce) { intro.remove(); return; }
  try { sessionStorage.setItem("kum-intro", "1"); } catch (e) { /* storage blocked */ }
  document.documentElement.classList.add("intro-on");

  /* ---------- the three drawings, as the same number of strokes (viewBox 400 × 260) ---------- */
  const circle = (cx, cy, r) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;
  const rect = (x, y, w, h, r = 0) => r
    ? `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`
    : `M${x} ${y} H${x + w} V${y + h} H${x} Z`;

  const MACHINE = [
    rect(140, 58, 120, 140, 10),                      // body
    "M146 50 H254",                                   // cup-warmer rail
    rect(176, 104, 48, 14, 3),                        // group head
    "M176 116 L120 124",                              // portafilter handle
    "M190 118 V124 H210 V118",                        // basket
    "M186 160 V182 Q186 190 194 190 H206 Q214 190 214 182 V160 Z", // cup
    "M196 150 Q192 144 196 138",                      // steam
    "M204 150 Q208 144 204 138",                      // steam
    circle(232, 82, 9),                               // pressure dial
    circle(168, 82, 5),                               // power button
    "M252 108 L268 162",                              // steam wand
    "M150 194 H250",                                  // drip tray
    "M110 210 H290",                                  // counter
    "M246 64 V100",                                   // water-tank seam
  ];

  const BUS = [
    "M78 182 V100 Q78 72 108 70 H300 Q330 70 334 104 L338 182 Z", // body
    "M108 70 H300",                                   // roof line
    "M298 98 L316 126 L332 98",                       // the V on the nose
    "M310 180 H346",                                  // front bumper
    "M98 84 H286 V112 H98 Z",                         // window band
    "M148 84 V112",                                   // window pillars
    "M196 84 V112",
    "M244 84 V112",
    "M78 132 H338",                                   // two-tone line
    circle(318, 152, 6),                              // headlight
    circle(132, 186, 21),                             // rear wheel
    circle(284, 186, 21),                             // front wheel
    "M224 116 V178",                                  // door
    "M40 208 H360",                                   // road
  ];

  const STORE = [
    rect(80, 40, 240, 168),                           // facade
    "M80 40 H320",                                    // cornice
    "M110 54 H290 V78 H110 Z",                        // sign band
    "M92 96 Q101 106 110 96 Q119 106 128 96 Q137 106 146 96 Q155 106 164 96 Q173 106 182 96 Q191 106 200 96 Q209 106 218 96 Q227 106 236 96 Q245 106 254 96 Q263 106 272 96 Q281 106 290 96 Q299 106 308 96", // awning
    rect(98, 114, 64, 70),                            // window left
    "M130 114 V184",                                  // window muntins
    "M98 149 H162",
    "M238 114 H302 V184 H238 Z",                      // window right
    circle(200, 66, 6),                               // ensō on the sign
    rect(176, 120, 48, 88),                           // door
    circle(214, 166, 2.5),                            // door knob
    "M168 208 H232",                                  // step
    "M40 208 H360",                                   // street
    "M200 40 V30 H214",                               // lamp bracket
  ];

  /* ---------- sample every stroke to the same number of points, so they can morph ---------- */
  const N = 48;
  const NS = "http://www.w3.org/2000/svg";
  const svg = intro.querySelector("svg");
  const probe = document.createElementNS(NS, "path");
  svg.appendChild(probe);
  const sample = (d) => {
    probe.setAttribute("d", d);
    const len = probe.getTotalLength();
    return Array.from({ length: N }, (_, i) => { const p = probe.getPointAtLength(len * i / (N - 1)); return [p.x, p.y]; });
  };
  const shapes = [MACHINE, BUS, STORE].map((s) => s.map(sample));
  probe.remove();

  // every stroke is one continuous line (one M), so its sampled points never jump
  const strokes = shapes[0].map(() => {
    const p = document.createElementNS(NS, "path");
    svg.appendChild(p);
    return p;
  });
  const toD = (pts) => "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
  const lens = shapes[0].map((pts) => pts.reduce((a, p, i) => i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0));

  /* ---------- timeline (seconds) ---------- */
  const T = { draw: 1.2, hold1: 1.75, morph1: 2.55, hold2: 3.05, morph2: 3.85, end: 4.6, out: 5.0 };
  const ease = (k) => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const lerpPts = (a, b, k) => a.map((p, i) => [p[0] + (b[i][0] - p[0]) * k, p[1] + (b[i][1] - p[1]) * k]);

  const bar = intro.querySelector(".intro-bar i");
  const pct = intro.querySelector(".intro-pct");
  let t0 = null, done = false, lastKey = "";

  function frame(now) {
    if (done) return;
    if (t0 === null) t0 = now;
    const t = (now - t0) / 1000;

    // line shapes only change while morphing; holds and the draw-on skip the rebuild
    const m1 = ease(clamp((t - T.hold1) / (T.morph1 - T.hold1)));
    const m2 = ease(clamp((t - T.hold2) / (T.morph2 - T.hold2)));
    const key = m1 + ":" + m2;
    const reshape = key !== lastKey;
    lastKey = key;
    const drawing = t < T.draw + strokes.length * 0.05;
    strokes.forEach((el, i) => {
      if (reshape) {
        const pts = m1 < 1 ? lerpPts(shapes[0][i], shapes[1][i], m1) : lerpPts(shapes[1][i], shapes[2][i], m2);
        el.setAttribute("d", toD(pts));
      }
      if (drawing) {
        // draw-on: each stroke starts slightly after the one before
        const k = clamp((t - i * 0.05) / (T.draw - 0.4));
        el.style.strokeDasharray = lens[i] + 2000;
        el.style.strokeDashoffset = (lens[i] + 2000) * (1 - ease(k));
      }
    });

    const prog = clamp(t / T.end);              // steady, so the number reads as real progress
    const shown = Math.floor(prog * 100);
    bar.style.transform = `scaleX(${prog})`;
    pct.textContent = shown + "%";

    if (t >= T.end) finish();
    else requestAnimationFrame(frame);
  }

  function finish() {
    if (done) return;
    done = true;
    pct.textContent = "100%";
    bar.style.transform = "scaleX(1)";
    intro.classList.add("is-out");
    document.documentElement.classList.remove("intro-on");
    setTimeout(() => intro.remove(), (T.out - T.end) * 1000 + 100);
  }

  intro.addEventListener("click", finish);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(); }, { once: true });
  requestAnimationFrame(frame);
})();
