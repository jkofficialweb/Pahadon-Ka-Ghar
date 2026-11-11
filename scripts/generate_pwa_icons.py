import zlib
import struct
import math
import os

def create_png(width, height, draw_func):
    """Generates an RGBA PNG from pure Python standard library."""
    # PNG signature
    png = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = struct.pack('>I', zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff)
    png += struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + ihdr_crc

    # Raw pixel data with filter byte 0 at start of each scanline
    raw_lines = []
    for y in range(height):
        line = bytearray([0]) # Filter type 0 (None)
        for x in range(width):
            r, g, b, a = draw_func(x, y, width, height)
            line.extend((r, g, b, a))
        raw_lines.append(bytes(line))

    compressed = zlib.compress(b''.join(raw_lines), level=9)
    idat_crc = struct.pack('>I', zlib.crc32(b'IDAT' + compressed) & 0xffffffff)
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed + idat_crc

    # IEND chunk
    iend_crc = struct.pack('>I', zlib.crc32(b'IEND') & 0xffffffff)
    png += struct.pack('>I', 0) + b'IEND' + iend_crc
    return png

def point_in_triangle(px, py, x1, y1, x2, y2, x3, y3):
    d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
    d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3)
    d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1)
    has_neg = (d1 < 0) or (d2 < 0) or (d3 < 0)
    has_pos = (d1 > 0) or (d2 > 0) or (d3 > 0)
    return not (has_neg and has_pos)

def render_retreat_icon(x, y, w, h, maskable=False):
    # Normalize coordinates to 0.0 - 1.0
    nx = x / float(w)
    ny = y / float(h)

    # If maskable, scale to central 80% safe zone
    if maskable:
        cx, cy = 0.5, 0.5
        scale = 0.80
        nx = (nx - cx) / scale + cx
        ny = (ny - cy) / scale + cy

    # Background gradient: deep slate/pine mountain sky
    sky_r = int(15 + (40 - 15) * ny)
    sky_g = int(23 + (55 - 23) * ny)
    sky_b = int(42 + (75 - 42) * ny)

    # Outside safe zone in maskable mode
    if maskable and (nx < 0.0 or nx > 1.0 or ny < 0.0 or ny > 1.0):
        return 15, 23, 42, 255

    r, g, b = sky_r, sky_g, sky_b

    # Glowing Sun (Dawn over Harmukh)
    sun_cx, sun_cy = 0.22, 0.22
    dist_sun = math.hypot(nx - sun_cx, ny - sun_cy)
    if dist_sun < 0.08:
        return 251, 191, 36, 255 # Amber sun
    elif dist_sun < 0.12:
        blend = (0.12 - dist_sun) / 0.04
        r = int(r * (1 - blend) + 245 * blend)
        g = int(g * (1 - blend) + 158 * blend)
        b = int(b * (1 - blend) + 11 * blend)

    # Distant left peak (slate grey)
    if point_in_triangle(nx, ny, 0.05, 0.65, 0.28, 0.25, 0.52, 0.65):
        r, g, b = 148, 163, 184
        # Snowcap
        if ny < 0.38 and point_in_triangle(nx, ny, 0.20, 0.38, 0.28, 0.25, 0.36, 0.38):
            r, g, b = 255, 255, 255

    # Main Majestic Himalayan Mountain (Harmukh / Sonamarg peak)
    if point_in_triangle(nx, ny, 0.30, 0.72, 0.65, 0.16, 0.98, 0.72):
        if nx > 0.65: # Mountain shadow side
            r, g, b = 100, 116, 139
        else: # Mountain sun side
            r, g, b = 203, 213, 225
        # Crisp Snow Cap
        if ny < 0.35:
            r, g, b = 255, 255, 255

    # Coniferous Pine Trees
    if point_in_triangle(nx, ny, 0.10, 0.76, 0.16, 0.60, 0.22, 0.76) or \
       point_in_triangle(nx, ny, 0.18, 0.75, 0.24, 0.58, 0.30, 0.75) or \
       point_in_triangle(nx, ny, 0.70, 0.76, 0.76, 0.59, 0.72, 0.76) or \
       point_in_triangle(nx, ny, 0.78, 0.75, 0.84, 0.57, 0.90, 0.75):
        r, g, b = 4, 120, 87

    # Sindh River Flow (Turquoise glacial torrent)
    river_top = 0.80 - 0.08 * math.sin(nx * 3.14)
    if ny > river_top:
        r, g, b = 2, 132, 199 # Deep turquoise
        # River foam ripples
        if abs(ny - (river_top + 0.05)) < 0.015:
            r, g, b = 165, 243, 252 # Cyan froth

    # Pahadon Ka Ghar Traditional Alpine Timber Chalet
    # Roof (Warm Amber)
    if point_in_triangle(nx, ny, 0.34, 0.68, 0.50, 0.52, 0.66, 0.68):
        r, g, b = 217, 119, 6
    # Roof overhang
    elif ny >= 0.675 and ny <= 0.69 and nx >= 0.32 and nx <= 0.68:
        r, g, b = 245, 158, 11
    # Chalet Wall (Rich Kashmiri Cedar Wood)
    elif nx >= 0.38 and nx <= 0.62 and ny > 0.69 and ny <= 0.84:
        r, g, b = 120, 53, 15
        # Timber grooves
        if int(ny * 100) % 4 == 0:
            r, g, b = 69, 26, 3
        # Left Glowing Warm Window
        if nx >= 0.41 and nx <= 0.46 and ny >= 0.72 and ny <= 0.77:
            r, g, b = 254, 240, 138 # Warm golden light
        # Right Glowing Warm Window
        if nx >= 0.54 and nx <= 0.59 and ny >= 0.72 and ny <= 0.77:
            r, g, b = 254, 240, 138
        # Wooden Door
        if nx >= 0.48 and nx <= 0.52 and ny >= 0.75 and ny <= 0.84:
            r, g, b = 69, 26, 3

    return r, g, b, 255

os.makedirs('public', exist_ok=True)

# 1. 512x512 Standard
print("Generating pwa-512x512.png...")
png512 = create_png(512, 512, lambda x, y, w, h: render_retreat_icon(x, y, w, h, False))
with open('public/pwa-512x512.png', 'wb') as f:
    f.write(png512)

# 2. 192x192 Standard
print("Generating pwa-192x192.png...")
png192 = create_png(192, 192, lambda x, y, w, h: render_retreat_icon(x, y, w, h, False))
with open('public/pwa-192x192.png', 'wb') as f:
    f.write(png192)

# 3. 180x180 Apple Touch Icon
print("Generating apple-touch-icon.png...")
png180 = create_png(180, 180, lambda x, y, w, h: render_retreat_icon(x, y, w, h, False))
with open('public/apple-touch-icon.png', 'wb') as f:
    f.write(png180)

# 4. 512x512 Maskable (with safe zone)
print("Generating pwa-maskable-512x512.png...")
png_mask = create_png(512, 512, lambda x, y, w, h: render_retreat_icon(x, y, w, h, True))
with open('public/pwa-maskable-512x512.png', 'wb') as f:
    f.write(png_mask)

# 5. 32x32 Favicon
print("Generating favicon.ico...")
png32 = create_png(32, 32, lambda x, y, w, h: render_retreat_icon(x, y, w, h, False))
with open('public/favicon.ico', 'wb') as f:
    f.write(png32)

print("All PWA PNG icons and favicon successfully generated!")
