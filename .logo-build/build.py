"""Generate the ICG logo system from the Space Grotesk outlines.

Outputs (repo: public/assets/brand/):
  icg-mark.svg          - wide ink block, accent "I", light "CG"
  icg-mark-accent.svg   - accent block, ink letters
  icg-mark-theme.svg    - CSS-var mark (var(--ink)/--bg/--accent)) for the app
  icg-lockup.svg        - mark + "ICG." wordmark (light theme)
  icg-lockup-dark.svg   - lockup for dark backgrounds
  icg-lockup-theme.svg  - CSS-var lockup for the app
  icg-avatar.svg        - square mini mark: ink block + accent "I" (favicon/social)
  exports/*.png, favicon.ico
Preview: .logo-build/preview.png
"""

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.recordingPen import RecordingPen

import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.path import Path as MplPath
from matplotlib.patches import PathPatch

# ---------------------------------------------------------------- palette
INK = '#15140f'
BG = '#faf9f6'
ACCENT = '#ffc814'
DARK_BG = '#131210'
DARK_INK = '#f6f4ec'

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'public' / 'assets' / 'brand'
EXPORTS = OUT / 'exports'
OUT.mkdir(parents=True, exist_ok=True)
EXPORTS.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------- font
font = TTFont(str(ROOT / 'SpaceGrotesk.ttf'))
instantiateVariableFont(font, {'wght': 700}, inplace=True)
UPM = font['head'].unitsPerEm
CAP = getattr(font['OS/2'], 'sCapHeight', 700) or 700
XH = getattr(font['OS/2'], 'sxHeight', 486) or 486
cmap = font.getBestCmap()
glyphSet = font.getGlyphSet()
hmtx = font['hmtx']


def advance(ch):
    return hmtx[cmap[ord(ch)]][0]


def rec_to_cubics(rec):
    """Recording (TrueType, y-up) -> clean M/L/C/Z segment list (cubics)."""
    out = []
    cur = start = None

    def quad(p0, q, p1):
        c1 = (p0[0] + 2.0 / 3 * (q[0] - p0[0]), p0[1] + 2.0 / 3 * (q[1] - p0[1]))
        c2 = (p1[0] + 2.0 / 3 * (q[0] - p1[0]), p1[1] + 2.0 / 3 * (q[1] - p1[1]))
        return c1, c2

    for cmd, pts in rec.value:
        if cmd == 'moveTo':
            cur = start = pts[0]
            out.append(('M', (cur,)))
        elif cmd == 'lineTo':
            cur = pts[0]
            out.append(('L', (cur,)))
        elif cmd == 'qCurveTo':
            pts = list(pts)
            end = pts[-1]
            offs = pts[:-1]
            if end is None:  # contour wraps back to its start
                end = ((offs[-1][0] + start[0]) / 2, (offs[-1][1] + start[1]) / 2)
            targets = [
                ((offs[i][0] + offs[i + 1][0]) / 2, (offs[i][1] + offs[i + 1][1]) / 2)
                for i in range(len(offs) - 1)
            ] + [end]
            p0 = cur
            for q, t in zip(offs, targets):
                c1, c2 = quad(p0, q, t)
                out.append(('C', (c1, c2, t)))
                p0 = t
            cur = end
        elif cmd == 'closePath':
            out.append(('Z', ()))
            cur = start
    return out


def glyph_segs(ch):
    rec = RecordingPen()
    glyphSet[cmap[ord(ch)]].draw(rec)
    return rec_to_cubics(rec)


def svg_d(segs, scale, tx, ty):
    def t(p):
        return (tx + p[0] * scale, ty - p[1] * scale)

    parts = []
    for cmd, pts in segs:
        if cmd == 'Z':
            parts.append('Z')
        elif cmd == 'M':
            parts.append('M%.2f %.2f' % t(pts[0]))
        elif cmd == 'L':
            parts.append('L%.2f %.2f' % t(pts[0]))
        else:
            c1, c2, e = (t(p) for p in pts)
            parts.append('C%.2f %.2f %.2f %.2f %.2f %.2f' % (*c1, *c2, *e))
    return ' '.join(parts)


def mpl_path(segs, scale, tx, ty):
    def t(p):
        return (tx + p[0] * scale, ty - p[1] * scale)

    verts, codes = [], []
    for cmd, pts in segs:
        if cmd == 'M':
            codes.append(MplPath.MOVETO)
            verts.append(t(pts[0]))
        elif cmd == 'L':
            codes.append(MplPath.LINETO)
            verts.append(t(pts[0]))
        elif cmd == 'C':
            codes.extend([MplPath.CURVE4] * 3)
            verts.extend(t(p) for p in pts)
        else:
            codes.append(MplPath.CLOSEPOLY)
            verts.append(t(pts[0]) if pts else (0, 0))
    return MplPath(verts, codes)


def rounded_rect_path(x, y, w, h, r):
    k = 0.5522847498 * r
    verts = [
        (x + r, y), (x + w - r, y), (x + w - r + k, y), (x + w, y + r - k), (x + w, y + r),
        (x + w, y + h - r), (x + w, y + h - r + k), (x + w - r + k, y + h), (x + w - r, y + h),
        (x + r, y + h), (x + r - k, y + h), (x, y + h - r + k), (x, y + h - r),
        (x, y + r), (x, y + r - k), (x + r - k, y), (x + r, y),
    ]
    codes = [MplPath.MOVETO, MplPath.LINETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
             MplPath.LINETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
             MplPath.LINETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
             MplPath.LINETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
    return MplPath(verts, codes)


# ---------------------------------------------------------------- geometry
BW, BH = 92.0, 64.0     # main mark viewBox (wide rounded rect)
RAD = 17.0              # corner radius (~ --r-sm ratio: 8px on 30px)
CAP_PX = 26.0           # letter cap height inside the mark
TRACK = -0.02           # em tracking, matches headings' letter-spacing
MINI = 64.0             # square avatar/favicon block
MINI_CAP = 40.0         # "I" cap height in the mini mark

SEGS = {ch: glyph_segs(ch) for ch in set('ICG.reborns')}


def layout_word(word, cap_px):
    """Return (scale, [(ch, x_offset)], total_width)."""
    scale = cap_px / CAP
    track_px = TRACK * UPM * scale
    xs, x = [], 0.0
    for ch in word:
        xs.append((ch, x))
        x += advance(ch) * scale + track_px
    return scale, xs, x - track_px


def mark_word_layout():
    scale, xs, w = layout_word('ICG', CAP_PX)
    x0 = (BW - w) / 2
    baseline = BH / 2 + CAP_PX / 2
    return scale, xs, x0, baseline


def mark_svg(block_fill, i_fill, cg_fill):
    scale, xs, x0, baseline = mark_word_layout()
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BW:.0f} {BH:.0f}" role="img" aria-label="ICG">',
        f'  <rect width="{BW:.0f}" height="{BH:.0f}" rx="{RAD:.0f}" fill="{block_fill}"/>',
    ]
    for ch, xo in xs:
        fill = i_fill if ch == 'I' else cg_fill
        parts.append(f'  <path d="{svg_d(SEGS[ch], scale, x0 + xo, baseline)}" fill="{fill}"/>')
    parts.append('</svg>')
    return '\n'.join(parts) + '\n'


def mini_svg(block_fill, i_fill):
    scale = MINI_CAP / CAP
    w = advance('I') * scale
    x0 = (MINI - w) / 2
    baseline = MINI / 2 + MINI_CAP / 2
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {MINI:.0f} {MINI:.0f}" role="img" aria-label="ICG">\n'
        f'  <rect width="{MINI:.0f}" height="{MINI:.0f}" rx="{RAD:.0f}" fill="{block_fill}"/>\n'
        f'  <path d="{svg_d(SEGS["I"], scale, x0, baseline)}" fill="{i_fill}"/>\n'
        f'</svg>\n'
    )


def lockup_svg(block_fill, i_fill, cg_fill, word_fill):
    scale, xs, w = layout_word('reborns', 34.0)
    gap = 22.0
    width = BW + gap + w
    baseline = BH / 2 + (XH * scale) / 2
    mscale, mxs, mx0, mbaseline = mark_word_layout()
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.2f} {BH:.0f}" role="img" aria-label="ICGreborns">',
        f'  <rect width="{BW:.0f}" height="{BH:.0f}" rx="{RAD:.0f}" fill="{block_fill}"/>',
    ]
    for ch, xo in mxs:
        fill = i_fill if ch == 'I' else cg_fill
        parts.append(f'  <path d="{svg_d(SEGS[ch], mscale, mx0 + xo, mbaseline)}" fill="{fill}"/>')
    for ch, xo in xs:
        parts.append(f'  <path d="{svg_d(SEGS[ch], scale, BW + gap + xo, baseline)}" fill="{word_fill}"/>')
    parts.append('</svg>')
    return '\n'.join(parts) + '\n'


# ---------------------------------------------------------------- SVG files
(OUT / 'icg-mark.svg').write_text(mark_svg(INK, ACCENT, BG), encoding='utf-8')
(OUT / 'icg-mark-accent.svg').write_text(mark_svg(ACCENT, INK, INK), encoding='utf-8')
(OUT / 'icg-mark-theme.svg').write_text(
    mark_svg('var(--ink)', 'var(--accent)', 'var(--bg)'), encoding='utf-8')
(OUT / 'icg-lockup.svg').write_text(lockup_svg(INK, ACCENT, BG, INK), encoding='utf-8')
(OUT / 'icg-lockup-dark.svg').write_text(
    lockup_svg(DARK_INK, ACCENT, DARK_BG, DARK_INK), encoding='utf-8')
(OUT / 'icg-lockup-theme.svg').write_text(
    lockup_svg('var(--ink)', 'var(--accent)', 'var(--bg)', 'var(--ink)'),
    encoding='utf-8')
(OUT / 'icg-avatar.svg').write_text(mini_svg(INK, ACCENT), encoding='utf-8')

# ---------------------------------------------------------------- PNG render
def draw_mark(ax, ox, oy, s, block, i_fill, cg_fill):
    ax.add_patch(PathPatch(rounded_rect_path(ox, oy, BW * s, BH * s, RAD * s),
                           facecolor=block, edgecolor='none'))
    scale, xs, x0, baseline = mark_word_layout()
    for ch, xo in xs:
        fill = i_fill if ch == 'I' else cg_fill
        ax.add_patch(PathPatch(
            mpl_path(SEGS[ch], scale * s, ox + (x0 + xo) * s, oy + baseline * s),
            facecolor=fill, edgecolor='none'))


def draw_mini(ax, ox, oy, s, block, i_fill):
    ax.add_patch(PathPatch(rounded_rect_path(ox, oy, MINI * s, MINI * s, RAD * s),
                           facecolor=block, edgecolor='none'))
    scale = MINI_CAP / CAP
    w = advance('I') * scale
    x0 = (MINI - w) / 2
    baseline = MINI / 2 + MINI_CAP / 2
    ax.add_patch(PathPatch(mpl_path(SEGS['I'], scale * s, ox + x0 * s, oy + baseline * s),
                           facecolor=i_fill, edgecolor='none'))


def draw_lockup(ax, ox, oy, s, block, i_fill, cg_fill, word_fill):
    draw_mark(ax, ox, oy, s, block, i_fill, cg_fill)
    scale, xs, w = layout_word('reborns', 34.0)
    gap = 22.0
    baseline = BH / 2 + (XH * scale) / 2
    for ch, xo in xs:
        ax.add_patch(PathPatch(
            mpl_path(SEGS[ch], scale * s, ox + (BW + gap + xo) * s, oy + baseline * s),
            facecolor=word_fill, edgecolor='none'))


def render_png(path, draw_fn, width_vb, height_vb, px):
    fig = plt.figure(figsize=(width_vb / 10, height_vb / 10), dpi=px / (width_vb / 10))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, width_vb)
    ax.set_ylim(height_vb, 0)
    ax.axis('off')
    draw_fn(ax)
    fig.savefig(path, transparent=True)
    plt.close(fig)


for size in (512, 192, 180):
    render_png(EXPORTS / f'icg-mark-{size}.png',
               lambda ax: draw_mark(ax, 0, 0, 1, INK, ACCENT, BG), BW, BH, size)
    render_png(EXPORTS / f'icg-mark-accent-{size}.png',
               lambda ax: draw_mark(ax, 0, 0, 1, ACCENT, INK, INK), BW, BH, size)
render_png(EXPORTS / 'icg-avatar-512.png',
           lambda ax: draw_mini(ax, 0, 0, 1, INK, ACCENT), MINI, MINI, 512)
render_png(EXPORTS / 'icg-avatar-180.png',
           lambda ax: draw_mini(ax, 0, 0, 1, INK, ACCENT), MINI, MINI, 180)

# favicon.ico (16/32/48) from the mini mark
from PIL import Image

img = Image.open(EXPORTS / 'icg-avatar-512.png')
img.save(OUT / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

# ---------------------------------------------------------------- preview sheet
S = 2.0
fig = plt.figure(figsize=(13, 8), dpi=110)
ax = fig.add_axes([0, 0, 1, 1])
ax.axis('off')
ax.set_xlim(0, 1430)
ax.set_ylim(880, 0)

rows = [(BG, 'LIGHT'), (DARK_BG, 'DARK')]
lockup_w = BW + 22.0 + layout_word('reborns', 34.0)[2]

for i, (bg, label) in enumerate(rows):
    ink = INK if i == 0 else DARK_INK
    y0 = 36 + i * 430
    ax.add_patch(plt.Rectangle((30, y0), 1370, 400, facecolor=bg, edgecolor='none'))
    ax.text(60, y0 + 36, label, fontsize=13, color=ink, family='monospace', alpha=0.55)

    my = y0 + 70
    if i == 0:
        draw_mark(ax, 70, my, S, INK, ACCENT, BG)
    else:  # theme version in dark: block = var(--ink) -> light
        draw_mark(ax, 70, my, S, DARK_INK, ACCENT, DARK_BG)
    ax.text(70, my + BH * S + 28, 'mark (theme)', fontsize=11, color=ink,
            family='monospace', alpha=0.55)

    mx2 = 70 + BW * S + 70
    draw_mark(ax, mx2, my, S, ACCENT, INK, INK)
    ax.text(mx2, my + BH * S + 28, 'mark · accent', fontsize=11, color=ink,
            family='monospace', alpha=0.55)

    lx = mx2 + BW * S + 90
    if i == 0:
        draw_lockup(ax, lx, my, S, INK, ACCENT, BG, INK)
    else:
        draw_lockup(ax, lx, my, S, DARK_INK, ACCENT, DARK_BG, DARK_INK)
    ax.text(lx, my + BH * S + 28, 'lockup (theme)', fontsize=11, color=ink,
            family='monospace', alpha=0.55)

    # mini mark / favicon column
    sx = lx + lockup_w * S + 100
    for j, psz in enumerate((48, 32, 24, 16)):
        ss = psz / MINI
        yy = my + j * 66
        if i == 0:
            draw_mini(ax, sx, yy, ss, INK, ACCENT)
        else:
            draw_mini(ax, sx, yy, ss, DARK_INK, ACCENT)
        ax.text(sx + psz + 14, yy + psz - 4, f'{psz}px', fontsize=10, color=ink,
                family='monospace', alpha=0.55, va='bottom')

fig.savefig(ROOT / 'preview.png')
plt.close(fig)
print('done')
