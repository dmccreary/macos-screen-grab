#!/usr/bin/env python3
"""Draw the seven poses of Pinch the Hermit Crab as transparent PNGs.

Every pose is built from the same parts, so the character stays consistent.
Colors and proportions match docs/img/mascot/character-sheet.md.

A white outline around each silhouette keeps the dark lines readable on black
backgrounds. The output folder is required, because docs/img/mascot may hold
images made with another tool that this script should not replace by accident.

Run in the `mkdocs` conda env (needs cairosvg and Pillow), then trim each pose
with $BK_HOME/src/image-utils/trim-padding-from-image.py.

    python scripts/generate-mascot-poses.py path/to/output-folder
"""
import argparse
import io
from pathlib import Path

import cairosvg
from PIL import Image, ImageFilter

OUTPUT_WIDTH = 420
OUTLINE_WIDTH = 4  # white outline width, in output pixels

CORAL = "#FF7043"
CORAL_DARK = "#BF360C"
BELLY = "#FFAB91"
INDIGO = "#3F51B5"
INDIGO_DARK = "#1A237E"
INDIGO_LIGHT = "#9FA8DA"
AMBER = "#FFB300"
INK = "#1A1A2E"
TEAL = "#00897B"
PINK = "#D81B60"


def claw(x, y, rot=0, scale=1.0, spread=0, thumb=False):
    """A pincer whose wrist sits at (x, y) and whose tips point up before rot."""
    left = spread if not thumb else 0
    right = spread
    style = f'fill="{CORAL}" stroke="{CORAL_DARK}" stroke-width="{5 / scale:.1f}" stroke-linejoin="round"'
    return f"""
    <g transform="translate({x},{y}) rotate({rot}) scale({scale})">
      <path transform="rotate({-left} -12 -50)" {style}
            d="M-30,-45 C-44,-85 -24,-114 2,-120 C-8,-96 -6,-70 6,-48 Z"/>
      <path transform="rotate({right} 12 -50)" {style}
            d="M30,-45 C42,-78 28,-106 10,-114 C15,-92 12,-70 -4,-48 Z"/>
      <ellipse cx="0" cy="-30" rx="33" ry="35" {style}/>
    </g>"""


def arm(x1, y1, x2, y2):
    """An upper arm from the shoulder to a claw's wrist."""
    d = f"M{x1},{y1} L{x2},{y2}"
    return f"""
    <path d="{d}" stroke="{CORAL_DARK}" stroke-width="28" stroke-linecap="round" fill="none"/>
    <path d="{d}" stroke="{CORAL}" stroke-width="18" stroke-linecap="round" fill="none"/>"""


def shell():
    """The small indigo shell, with its spiral and the orange crosshair mark."""
    return f"""
    <circle cx="377" cy="72" r="20" fill="{INDIGO}" stroke="{INDIGO_DARK}" stroke-width="6"/>
    <circle cx="347" cy="104" r="38" fill="{INDIGO}" stroke="{INDIGO_DARK}" stroke-width="6"/>
    <circle cx="255" cy="195" r="122" fill="{INDIGO}" stroke="{INDIGO_DARK}" stroke-width="6"/>
    <path d="M272,190 C272,172 246,170 240,190 C232,218 270,236 292,214
             C318,188 302,136 256,132 C204,128 176,176 186,222"
          fill="none" stroke="{INDIGO_LIGHT}" stroke-width="11" stroke-linecap="round"/>
    <g stroke="{AMBER}" stroke-width="5" stroke-linecap="round">
      <path d="M268,182 v-0 M256,190 h24 M268,178 v24"/>
    </g>"""


def legs(splay=0):
    out = ""
    for x, foot in [(105, -22), (140, -10), (175, 4), (210, 18)]:
        d = f"M{x},300 Q{x + foot / 2},340 {x + foot - splay if x < 160 else x + foot + splay},358"
        out += f'<path d="{d}" stroke="{CORAL_DARK}" stroke-width="17" stroke-linecap="round" fill="none"/>'
        out += f'<path d="{d}" stroke="{CORAL}" stroke-width="9" stroke-linecap="round" fill="none"/>'
    return out


def body():
    return f"""
    <ellipse cx="160" cy="265" rx="92" ry="66" fill="{CORAL}" stroke="{CORAL_DARK}" stroke-width="6"/>
    <ellipse cx="160" cy="285" rx="58" ry="36" fill="{BELLY}"/>"""


def eye(cx, stalk_x, look=(0, 0), closed=False):
    stalk = f"M{stalk_x},215 Q{stalk_x},180 {cx},150"
    out = f"""
    <path d="{stalk}" stroke="{CORAL_DARK}" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="{stalk}" stroke="{CORAL}" stroke-width="11" stroke-linecap="round" fill="none"/>"""
    if closed:
        return out + f"""
    <circle cx="{cx}" cy="128" r="29" fill="{CORAL}" stroke="{CORAL_DARK}" stroke-width="5"/>
    <path d="M{cx - 16},133 Q{cx},112 {cx + 16},133" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>"""
    return out + f"""
    <circle cx="{cx}" cy="128" r="29" fill="white" stroke="{CORAL_DARK}" stroke-width="5"/>
    <circle cx="{cx + look[0]}" cy="{128 + look[1]}" r="14" fill="{INK}"/>
    <circle cx="{cx + look[0] + 5}" cy="{128 + look[1] - 5}" r="4.5" fill="white"/>"""


def brows(kind):
    if kind == "worried":
        return f"""
    <path d="M100,92 L142,78" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M178,78 L220,92" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>"""
    if kind == "raised":
        return f"""
    <path d="M178,84 Q200,70 222,84" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>"""
    return ""


def mouth(kind):
    if kind == "smile":
        return f'<path d="M136,262 Q160,284 184,262" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    if kind == "knowing":
        return f'<path d="M136,268 Q165,284 188,256" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    if kind == "flat":
        return f'<path d="M142,268 Q151,258 160,268 Q169,278 178,268" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    # An open, happy mouth.
    return f"""<path d="M130,256 Q160,264 190,256 Q186,298 160,298 Q134,298 130,256 Z"
                 fill="{INK}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M144,288 Q160,276 176,288 Q168,297 160,297 Q152,297 144,288 Z" fill="{PINK}"/>"""


def star(x, y, r, color=AMBER, rot=0):
    """A four-point sparkle."""
    k = r * 0.28
    d = (f"M0,{-r} L{k},{-k} L{r},0 L{k},{k} L0,{r} L{-k},{k} L{-r},0 L{-k},{-k} Z")
    return f'<path transform="translate({x},{y}) rotate({rot})" d="{d}" fill="{color}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>'


def bulb(x, y):
    return f"""
    <g transform="translate({x},{y})">
      <circle cx="0" cy="0" r="27" fill="{AMBER}" stroke="{INK}" stroke-width="5"/>
      <path d="M-9,4 L-3,-6 L3,4 L9,-6" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="-12" y="25" width="24" height="16" rx="4" fill="{INDIGO_LIGHT}" stroke="{INK}" stroke-width="5"/>
      <g stroke="{AMBER}" stroke-width="6" stroke-linecap="round">
        <path d="M-42,-14 L-52,-18 M-34,-38 L-42,-46 M0,-40 L0,-52 M34,-38 L42,-46 M42,-14 L52,-18"/>
      </g>
    </g>"""


def caution(x, y):
    return f"""
    <g transform="translate({x},{y})">
      <path d="M0,-38 L38,28 L-38,28 Z" fill="{AMBER}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
      <rect x="-4.5" y="-14" width="9" height="24" rx="4" fill="{INK}"/>
      <circle cx="0" cy="19" r="5.5" fill="{INK}"/>
    </g>"""


def confetti():
    bits = ""
    for x, y, w, h, rot, color in [
        (-20, 60, 16, 9, 25, PINK), (50, -30, 16, 9, -30, TEAL), (140, 20, 16, 9, 40, INDIGO),
        (230, -30, 16, 9, 15, PINK), (320, -10, 16, 9, -40, TEAL), (392, 112, 16, 9, 30, INDIGO),
        (-30, 220, 16, 9, -20, TEAL), (392, 230, 16, 9, 50, PINK),
    ]:
        bits += f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2" fill="{color}" transform="rotate({rot} {x} {y})"/>'
    for x, y, r, color in [(95, -20, 15, AMBER), (280, 30, 14, AMBER), (-5, 140, 13, AMBER), (385, 170, 15, AMBER)]:
        bits += star(x, y, r, color)
    return bits


def motion_arcs(x, y):
    return f"""
    <g fill="none" stroke="{AMBER}" stroke-width="7" stroke-linecap="round">
      <path d="M{x},{y} Q{x - 16},{y + 22} {x - 12},{y + 48}"/>
      <path d="M{x + 72},{y - 18} Q{x + 92},{y + 4} {x + 88},{y + 30}"/>
    </g>"""


def pose(name):
    """Return the back layer, arms and claws, and face settings for one pose."""
    rest_big = arm(82, 275, 60, 305) + claw(60, 305, rot=-10, scale=0.9)
    rest_small = arm(232, 285, 262, 318) + claw(262, 318, rot=18, scale=0.62)
    face = dict(look=(0, 2), closed=False, brow=None, mouth="smile")
    back, front, extras, splay = "", rest_big + rest_small, "", 0

    if name == "welcome":
        front = arm(82, 275, 56, 205) + claw(56, 205, rot=-20, scale=0.95, spread=20) + rest_small
        extras = motion_arcs(-30, 62)
        face["mouth"] = "open"
    elif name == "thinking":
        front = rest_big + arm(232, 290, 248, 348) + claw(248, 348, rot=-58, scale=0.72)
        extras = bulb(62, 52)
        face.update(look=(-9, -9), mouth="flat")
    elif name == "tip":
        front = arm(82, 275, 50, 200) + claw(50, 200, rot=-4, scale=0.95) + rest_small
        extras = star(46, 54, 26)
        face.update(look=(-7, -6), brow="raised", mouth="knowing")
    elif name == "warning":
        front = (arm(82, 270, 50, 225) + claw(50, 225, rot=-14, scale=0.9, spread=26)
                 + arm(232, 275, 268, 232) + claw(268, 232, rot=14, scale=0.75, spread=26))
        extras = caution(160, 22)
        face.update(look=(0, 3), brow="worried", mouth="flat")
    elif name == "encouraging":
        front = arm(82, 275, 42, 250) + claw(42, 250, rot=-12, scale=1.0, spread=52, thumb=True) + rest_small
        face.update(look=(3, 0), mouth="open")
    elif name == "celebration":
        front = (arm(82, 268, 44, 185) + claw(44, 185, rot=-24, scale=0.92, spread=26)
                 + arm(232, 268, 288, 170) + claw(288, 170, rot=22, scale=0.8, spread=26))
        back, splay = confetti(), 14
        face.update(closed=True, mouth="open")

    return back, front, extras, splay, face


def draw(name):
    back, front, extras, splay, f = pose(name)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -60 480 440">
    {back}
    {shell()}
    {legs(splay)}
    {body()}
    {eye(120, 130, f["look"], f["closed"])}
    {eye(200, 190, f["look"], f["closed"])}
    {brows(f["brow"])}
    {mouth(f["mouth"])}
    {front}
    {extras}
    </svg>"""


def render(name):
    """Render a pose at double size, add the white outline, and scale it down."""
    png = cairosvg.svg2png(bytestring=draw(name).encode(), output_width=OUTPUT_WIDTH * 2)
    pose_img = Image.open(io.BytesIO(png)).convert("RGBA")
    grown = pose_img.getchannel("A").filter(ImageFilter.MaxFilter(OUTLINE_WIDTH * 4 + 1))
    outline = Image.new("RGBA", pose_img.size, (255, 255, 255, 0))
    outline.putalpha(grown.filter(ImageFilter.GaussianBlur(1)))
    outline.alpha_composite(pose_img)
    return outline.resize((pose_img.width // 2, pose_img.height // 2), Image.LANCZOS)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("out_dir", type=Path, help="folder to write the seven PNGs into")
    out_dir = parser.parse_args().out_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    for name in ["neutral", "welcome", "thinking", "tip", "warning", "encouraging", "celebration"]:
        render(name).save(out_dir / f"{name}.png")
        print(f"wrote {out_dir / name}.png")


if __name__ == "__main__":
    main()
