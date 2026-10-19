"""Cut the header film from real photos and footage.

Photos get a slow camera move (zoom + drift); the café walkthrough is real video.
Shots are joined with crossfades, then the end is blended into the start so the
20-second loop has no visible jump. Two framings are rendered: 16:9 for desktop
and 2:3 for phones.

Usage: python3 tools/hero-film/cut.py <walkthrough.mp4> <out_dir>
       (run from the repository root; photos are read from img/)
"""
import os, subprocess, sys, tempfile

WALK, OUT = sys.argv[1], sys.argv[2]
FPS, XF = 30, 0.8  # frame rate, crossfade length

# name, source, seconds, start zoom, end zoom, focus at start (x, y), focus at end (x, y)
# focus values are fractions of the source image; for video the start offset is in `clip`.
SHOTS = [
    ("farm",    "img/farmer.jpg",          4.5, 1.12, 1.00, (.50, .42), (.50, .28)),
    ("roast",   "img/roasting-drum.jpg",   3.8, 1.00, 1.14, (.45, .50), (.42, .52)),
    ("street",  "img/storefront.jpg",      3.8, 1.00, 1.18, (.40, .55), (.42, .62)),
    ("walk",    WALK,                      5.6, 1.00, 1.00, (.50, .45), (.50, .45)),
    ("pour",    "img/extraction.jpg",      3.3, 1.06, 1.16, (.42, .40), (.45, .52)),
    ("latte",   "img/breakfast-table.jpg", 3.8, 1.05, 1.30, (.30, .55), (.22, .58)),
]
WALK_START, WALK_CROP = 2.4, "1180:1510:0:340"   # skip the phone UI in the screen recording
GRADE = "eq=brightness=-0.05:saturation=0.92:contrast=1.04,vignette=PI/5"


def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def aspect_box(w, h, aspect, fx, fy):
    """Largest box of `aspect` inside w×h, centred on (fx, fy) as far as it fits."""
    bw, bh = (w, w / aspect) if w / h < aspect else (h * aspect, h)
    bw, bh = min(bw, w), min(bh, h)
    x = min(max(fx * w - bw / 2, 0), w - bw)
    y = min(max(fy * h - bh / 2, 0), h - bh)
    return int(bw), int(bh), int(x), int(y)


def shot_photo(src, dur, z0, z1, f0, f1, W, H, out):
    from PIL import Image
    w, h = Image.open(src).size
    # crop a box that covers both focus points, then let zoompan move inside it
    fx, fy = (f0[0] + f1[0]) / 2, (f0[1] + f1[1]) / 2
    bw, bh, bx, by = aspect_box(w, h, W / H, fx, fy)
    n = int(dur * FPS)
    # pan target expressed inside the crop box
    px0, py0 = (f0[0] * w - bx) / bw, (f0[1] * h - by) / bh
    px1, py1 = (f1[0] * w - bx) / bw, (f1[1] * h - by) / bh
    k = f"(on/{n - 1})"
    ease = f"(0.5-0.5*cos(PI*{k}))"
    z = f"({z0}+({z1}-{z0})*{ease})"
    px = f"({px0}+({px1}-{px0})*{ease})"
    py = f"({py0}+({py1}-{py0})*{ease})"
    vf = (f"crop={bw}:{bh}:{bx}:{by},scale={W * 3}:{H * 3},"
          f"zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{px}*iw-iw/zoom/2))':y='max(0,min(ih-ih/zoom,{py}*ih-ih/zoom/2))'"
          f":d={n}:s={W}x{H}:fps={FPS},{GRADE},format=yuv420p")
    run(["-loop", "1", "-i", src, "-vf", vf, "-frames:v", str(n), "-c:v", "libx264", "-crf", "16", "-preset", "fast", out])


def shot_video(src, dur, f, W, H, out):
    cw, ch = map(int, WALK_CROP.split(":")[:2])
    bw, bh, bx, by = aspect_box(cw, ch, W / H, f[0], f[1])
    vf = f"crop={WALK_CROP},crop={bw}:{bh}:{bx}:{by},scale={W}:{H},fps={FPS},{GRADE},format=yuv420p"
    run(["-ss", str(WALK_START), "-t", str(dur), "-i", src, "-vf", vf, "-an", "-c:v", "libx264", "-crf", "16", "-preset", "fast", out])


def render(W, H, tag, tmp):
    parts = []
    for name, src, dur, z0, z1, f0, f1 in SHOTS:
        out = os.path.join(tmp, f"{tag}-{name}.mp4")
        if src == WALK:
            shot_video(src, dur, f0, W, H, out)
        else:
            shot_photo(src, dur, z0, z1, f0, f1, W, H, out)
        parts.append((out, dur))

    # chain crossfades into one sequence
    inputs, chain, label, t = [], [], "0:v", parts[0][1]
    for i, (p, _) in enumerate(parts):
        inputs += ["-i", p]
    for i in range(1, len(parts)):
        off = t - XF
        nxt = f"v{i}"
        chain.append(f"[{label}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[{nxt}]")
        label, t = nxt, off + parts[i][1]
    seq = os.path.join(tmp, f"{tag}-seq.mp4")
    run([*inputs, "-filter_complex", ";".join(chain), "-map", f"[{label}]", "-c:v", "libx264", "-crf", "16", "-preset", "fast", seq])

    # loop: blend the last XF seconds into the first XF seconds, drop the head
    total = t
    loop = (f"[0:v]trim=start={XF}:end={total - XF},setpts=PTS-STARTPTS[body];"
            f"[0:v]trim=start={total - XF}:end={total},setpts=PTS-STARTPTS[tail];"
            f"[0:v]trim=start=0:end={XF},setpts=PTS-STARTPTS[head];"
            f"[tail][head]xfade=transition=fade:duration={XF}:offset=0[blend];"
            f"[body][blend]concat=n=2:v=1[out]")
    mp4 = os.path.join(OUT, f"hero-film{tag}.mp4")
    run(["-i", seq, "-filter_complex", loop, "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4])
    run(["-i", mp4, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
         "-an", os.path.join(OUT, f"hero-film{tag}.webm")])
    print(tag, "done", round(total - XF, 2), "s")


with tempfile.TemporaryDirectory() as tmp:
    render(1280, 720, "", tmp)
    render(720, 1080, "-portrait", tmp)
