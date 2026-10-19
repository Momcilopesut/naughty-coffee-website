"""Cut the header film from real photos and footage.

Photos are still slides; the café walkthrough is real video.
Shots are joined with crossfades, then the end is blended into the start so the
20-second loop has no visible jump. Two framings are rendered: 16:9 for desktop
and 2:3 for phones.

Usage: python3 tools/hero-film/cut.py <walkthrough.mp4> <ending.mov> <out_dir>
       (run from the repository root; photos are read from img/)
"""
import os, subprocess, sys, tempfile

WALK, END, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
FPS, XF = 30, 0.8  # frame rate, crossfade length

# name, source, seconds, start zoom, end zoom, focus at start (x, y), focus at end (x, y)
# focus values are fractions of the source image; for video the start offset is in `clip`.
SHOTS = [
    ("farm",    "img/farmer.jpg",          3.6, 1.12, 1.00, (.50, .42), (.50, .28)),
    ("roast",   "img/roasting-drum.jpg",   3.0, 1.00, 1.14, (.45, .50), (.42, .52)),
    ("street",  "img/storefront.jpg",      3.0, 1.00, 1.18, (.40, .55), (.42, .62)),
    ("walk",    WALK,                      4.6, 1.00, 1.00, (.50, .45), (.50, .45)),
    ("pour",    "img/extraction.jpg",      2.8, 1.06, 1.16, (.42, .40), (.45, .52)),
    ("latte",   "img/breakfast-table.jpg", 3.6, 1.05, 1.30, (.30, .55), (.22, .58)),
    ("end",     END,                       5.0, 1.00, 1.00, (.50, .55), (.50, .55)),
]
# video sources: start second, frame size after the pre-crop, pre-crop (skips phone UI in screen recordings)
VIDEOS = {WALK: (2.4, (1180, 1510), "crop=1180:1510:0:340,"),
          END: (1.0, (720, 1280), "")}
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


def shot_photo(src, dur, f, W, H, out):
    """A still slide: crop to the frame's shape around the focus point, no camera move."""
    from PIL import Image
    w, h = Image.open(src).size
    bw, bh, bx, by = aspect_box(w, h, W / H, f[0], f[1])
    vf = (f"crop={bw}:{bh}:{bx}:{by},scale={W}:{H}:flags=lanczos,unsharp=5:5:0.6,"
          f"fps={FPS},{GRADE},format=yuv420p")
    run(["-loop", "1", "-framerate", str(FPS), "-i", src, "-vf", vf, "-t", str(dur),
         "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-tune", "stillimage", out])


def shot_video(src, dur, f, W, H, out):
    t0, (cw, ch), pre = VIDEOS[src]
    enc = ["-an", "-c:v", "libx264", "-crf", "12", "-preset", "fast", out]
    if ch / cw > 1.4 * H / W:
        # much taller than the frame: show it whole, centred, over a blurred fill of itself
        fc = (f"[0:v]{pre}fps={FPS},split[a][b];"
              f"[a]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},boxblur=40:2,eq=brightness=-0.12[bg];"
              f"[b]scale=-2:{H}:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:0,{GRADE},format=yuv420p[v]")
        run(["-ss", str(t0), "-t", str(dur), "-i", src, "-filter_complex", fc, "-map", "[v]", *enc])
        return
    bw, bh, bx, by = aspect_box(cw, ch, W / H, f[0], f[1])
    vf = f"{pre}crop={bw}:{bh}:{bx}:{by},scale={W}:{H}:flags=lanczos,fps={FPS},{GRADE},format=yuv420p"
    run(["-ss", str(t0), "-t", str(dur), "-i", src, "-vf", vf, *enc])


def render(W, H, tag, tmp):
    parts = []
    for name, src, dur, z0, z1, f0, f1 in SHOTS:
        out = os.path.join(tmp, f"{tag}-{name}.mp4")
        if src in VIDEOS:
            shot_video(src, dur, f0, W, H, out)
        else:
            shot_photo(src, dur, f1, W, H, out)
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
    run([*inputs, "-filter_complex", ";".join(chain), "-map", f"[{label}]", "-c:v", "libx264", "-crf", "12", "-preset", "fast", seq])

    # loop: blend the last XF seconds into the first XF seconds, drop the head
    total = t
    loop = (f"[0:v]trim=start={XF}:end={total - XF},setpts=PTS-STARTPTS[body];"
            f"[0:v]trim=start={total - XF}:end={total},setpts=PTS-STARTPTS[tail];"
            f"[0:v]trim=start=0:end={XF},setpts=PTS-STARTPTS[head];"
            f"[tail][head]xfade=transition=fade:duration={XF}:offset=0[blend];"
            f"[body][blend]concat=n=2:v=1[out]")
    mp4 = os.path.join(OUT, f"hero-film{tag}.mp4")
    run(["-i", seq, "-filter_complex", loop, "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "19", "-profile:v", "high",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4])
    run(["-i", mp4, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "28", "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
         "-an", os.path.join(OUT, f"hero-film{tag}.webm")])
    print(tag, "done", round(total - XF, 2), "s")


with tempfile.TemporaryDirectory() as tmp:
    only = os.environ.get("ONLY")  # "wide" or "portrait" to re-render one cut
    if only != "portrait":
        render(1920, 1080, "", tmp)
    if only != "wide":
        render(1080, 1920, "-portrait", tmp)
