"""Kumcoffee mark: a brush ensō (open zen circle) with a vermilion coffee-cherry dot.

enso_points() returns the brush outline in a 100x100 box, so the same shape can be
written into SVG (svg_mark) or painted onto photos with PIL (draw_mark).
"""
import math

INK = "#141414"
VERMILION = "#c8402c"
DOT = (50, 50, 8.5)  # cx, cy, r of the cherry dot


def enso_points(n=180):
    start, sweep = math.radians(-62), math.radians(326)

    def width(s):
        # quick press-in, full body through the lower half, dry taper at the end
        if s < 0.06:
            return 2 + (s / 0.06) * 5.5
        if s < 0.55:
            return 7.5 + 1.8 * math.sin((s - 0.06) / 0.49 * math.pi)
        return 7.5 - 6.3 * ((s - 0.55) / 0.45) ** 1.3

    outer, inner = [], []
    for i in range(n + 1):
        s = i / n
        a = start - s * sweep  # counter-clockwise on screen
        r = 39 + 1.1 * math.sin(s * math.pi * 2.6) - 1.0 * s
        w = width(s)
        cx, cy = 50 + 0.8 * math.sin(s * 5), 50
        outer.append((cx + (r + w / 2) * math.cos(a), cy + (r + w / 2) * math.sin(a)))
        inner.append((cx + (r - w / 2) * math.cos(a), cy + (r - w / 2) * math.sin(a)))
    return outer + inner[::-1]


def enso_path():
    pts = enso_points()
    return "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + " Z"


def svg_mark(cls="brand-mark", ink=INK, dot=VERMILION, extra=""):
    cx, cy, r = DOT
    return (f'<svg class="{cls}" viewBox="0 0 100 100" aria-hidden="true"{extra}>'
            f'<path d="{enso_path()}" fill="{ink}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/></svg>')


def draw_mark(draw, x, y, size, ink=(20, 20, 20), dot=(200, 64, 44), with_dot=True):
    """Paint the mark onto a PIL ImageDraw with its top-left at (x, y)."""
    k = size / 100
    draw.polygon([(x + px * k, y + py * k) for px, py in enso_points()], fill=ink)
    if with_dot:
        cx, cy, r = DOT
        draw.ellipse([x + (cx - r) * k, y + (cy - r) * k, x + (cx + r) * k, y + (cy + r) * k], fill=dot)


if __name__ == "__main__":
    import sys
    open(sys.argv[1], "w").write(svg_mark(extra=' xmlns="http://www.w3.org/2000/svg" width="400" height="400"'))
