#!/usr/bin/env python3
"""Generate PotatoBug PWA icons"""

from PIL import Image, ImageDraw, ImageFont
import os

def draw_potato_bug_icon(size):
    """Draw a PotatoBug icon at the specified size"""
    img = Image.new('RGBA', (size, size), '#0a0e1a')
    draw = ImageDraw.Draw(img)
    scale = size / 512

    # Outer glow circle
    draw.ellipse([
        int(56 * scale), int(56 * scale),
        int(456 * scale), int(456 * scale)
    ], outline='#00ffff', width=max(1, int(8 * scale)))

    # Potato body
    draw.ellipse([
        int(136 * scale), int(140 * scale),
        int(376 * scale), int(420 * scale)
    ], fill='#8B7355', outline='#00ffff', width=max(1, int(4 * scale)))

    # Bug spots
    draw.ellipse([
        int(195 * scale), int(220 * scale),
        int(245 * scale), int(280 * scale)
    ], fill='#3a2a1e')

    draw.ellipse([
        int(270 * scale), int(235 * scale),
        int(310 * scale), int(285 * scale)
    ], fill='#3a2a1e')

    draw.ellipse([
        int(238 * scale), int(288 * scale),
        int(274 * scale), int(332 * scale)
    ], fill='#3a2a1e')

    # Eyes - Left
    draw.ellipse([
        int(212 * scale), int(222 * scale),
        int(248 * scale), int(258 * scale)
    ], fill='#00ffff')

    draw.ellipse([
        int(220 * scale), int(230 * scale),
        int(240 * scale), int(250 * scale)
    ], fill='#0a0e1a')

    draw.ellipse([
        int(224 * scale), int(234 * scale),
        int(232 * scale), int(242 * scale)
    ], fill='#ffffff')

    # Eyes - Right
    draw.ellipse([
        int(264 * scale), int(222 * scale),
        int(300 * scale), int(258 * scale)
    ], fill='#00ffff')

    draw.ellipse([
        int(272 * scale), int(230 * scale),
        int(292 * scale), int(250 * scale)
    ], fill='#0a0e1a')

    draw.ellipse([
        int(276 * scale), int(234 * scale),
        int(284 * scale), int(242 * scale)
    ], fill='#ffffff')

    # Antennae tips
    draw.ellipse([
        int(152 * scale), int(112 * scale),
        int(168 * scale), int(128 * scale)
    ], fill='#ffff00')

    draw.ellipse([
        int(344 * scale), int(112 * scale),
        int(360 * scale), int(128 * scale)
    ], fill='#ffff00')

    # Bitcoin symbol
    try:
        font_size = int(80 * scale)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text = "₿"
    # Draw stroke
    for dx, dy in [(-2, -2), (-2, 2), (2, -2), (2, 2)]:
        draw.text((int(256 * scale) + dx, int(420 * scale) + dy), text,
                  fill='#ff006e', font=font, anchor="mm")
    # Draw fill
    draw.text((int(256 * scale), int(420 * scale)), text,
              fill='#ffd700', font=font, anchor="mm")

    return img

def main():
    """Generate all icon sizes"""
    output_dir = os.path.join(os.path.dirname(__file__), 'static')

    sizes = {
        'icon-32.png': 32,
        'icon-180.png': 180,
        'icon-192.png': 192,
        'icon-512.png': 512,
        'favicon.ico': 32
    }

    for filename, size in sizes.items():
        print(f"Generating {filename} ({size}x{size})...")
        icon = draw_potato_bug_icon(size)

        filepath = os.path.join(output_dir, filename)

        if filename.endswith('.ico'):
            icon.save(filepath, format='ICO', sizes=[(32, 32)])
        else:
            icon.save(filepath, 'PNG')

        print(f"  OK Saved to {filepath}")

    print("\nAll icons generated successfully!")

if __name__ == '__main__':
    main()
