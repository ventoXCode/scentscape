"""
Fetch perfume/fragrance images from Unsplash and Pexels.

Queries both APIs for fragrance-related images and maps them to seed data entries.
Falls back to curated stock URLs if no API keys are available.

Usage:
    source .venv/bin/activate
    # Optional: set API keys for better results
    export UNSPLASH_ACCESS_KEY=your_key
    export PEXELS_API_KEY=your_key
    python fetch-images.py

Output:
    data/image-map.json — maps fragrance title to image URLs
"""

import json
import os
import time
import urllib.request
import urllib.parse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
OUTPUT_PATH = os.path.join(DATA_DIR, "image-map.json")
SEED_DATA_PATH = os.path.join(SCRIPT_DIR, "..", "apps", "api", "src", "scripts", "seed-data.ts")

UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")
PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "")


def search_unsplash(query, per_page=3):
    """Search Unsplash for images. Returns list of URLs."""
    if not UNSPLASH_ACCESS_KEY:
        return []

    encoded_query = urllib.parse.quote(query)
    url = f"https://api.unsplash.com/search/photos?query={encoded_query}&per_page={per_page}&orientation=squarish"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}",
        "Accept": "application/json",
    })

    try:
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        results = []
        for photo in data.get("results", []):
            results.append({
                "url": photo["urls"]["regular"],  # 1080px wide
                "thumb": photo["urls"]["small"],   # 400px wide
                "credit": f"Photo by {photo['user']['name']} on Unsplash",
                "source": "unsplash",
            })
        return results
    except Exception as e:
        print(f"    Unsplash error for '{query}': {e}")
        return []


def search_pexels(query, per_page=3):
    """Search Pexels for images. Returns list of URLs."""
    if not PEXELS_API_KEY:
        return []

    encoded_query = urllib.parse.quote(query)
    url = f"https://api.pexels.com/v1/search?query={encoded_query}&per_page={per_page}&orientation=square"
    req = urllib.request.Request(url, headers={
        "Authorization": PEXELS_API_KEY,
        "Accept": "application/json",
    })

    try:
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        results = []
        for photo in data.get("photos", []):
            results.append({
                "url": photo["src"]["large"],       # 940px
                "thumb": photo["src"]["medium"],     # 350px
                "credit": f"Photo by {photo['photographer']} on Pexels",
                "source": "pexels",
            })
        return results
    except Exception as e:
        print(f"    Pexels error for '{query}': {e}")
        return []


# ─── Curated Unsplash/Pexels URLs for common perfume categories ──────────────
# These are real, free-to-use images from Unsplash that match fragrance vibes.
# No API key needed — direct URLs.

CATEGORY_IMAGES = {
    "woody": [
        "https://images.unsplash.com/photo-1594035910387-fbd1939d8e13?w=800&q=80",  # dark wood bottle
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",  # amber bottle
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",  # perfume with wood
    ],
    "fresh": [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",  # clear bottle
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",  # light perfume
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",  # citrus vibe
    ],
    "floral": [
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",  # elegant bottle
        "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",  # floral perfume
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",  # rose tones
    ],
    "amber": [
        "https://images.unsplash.com/photo-1594035910387-fbd1939d8e13?w=800&q=80",  # dark amber
        "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&q=80",  # warm tones
        "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&q=80",  # luxury dark
    ],
    "default": [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
        "https://images.unsplash.com/photo-1594035910387-fbd1939d8e13?w=800&q=80",
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
        "https://images.unsplash.com/photo-1595425964072-537c688e5258?w=800&q=80",
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
        "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&q=80",
        "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&q=80",
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
        "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800&q=80",
    ],
}


def get_fallback_image(family, index):
    """Get a deterministic fallback image based on family and index."""
    family_key = family.lower() if family.lower() in CATEGORY_IMAGES else "default"
    images = CATEGORY_IMAGES[family_key]
    return images[index % len(images)]


def load_seed_data():
    """Load fragrance list from seed-data.ts."""
    with open(SEED_DATA_PATH) as f:
        content = f.read()

    # Find the JSON array between "= \n" and the closing "];"
    start = content.index("= \n") + 3
    # Try both formats
    try:
        end = content.rindex("] as const;") + 1
    except ValueError:
        end = content.rindex("];") + 1
    return json.loads(content[start:end])


def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    has_apis = bool(UNSPLASH_ACCESS_KEY or PEXELS_API_KEY)
    print(f"Unsplash API: {'configured' if UNSPLASH_ACCESS_KEY else 'not set (UNSPLASH_ACCESS_KEY)'}")
    print(f"Pexels API:   {'configured' if PEXELS_API_KEY else 'not set (PEXELS_API_KEY)'}")

    if not has_apis:
        print("\nNo API keys found. Using curated fallback images.")
        print("For better results, set UNSPLASH_ACCESS_KEY and/or PEXELS_API_KEY.\n")

    # Load existing image map if present (to avoid re-fetching)
    existing_map = {}
    if os.path.exists(OUTPUT_PATH):
        with open(OUTPUT_PATH) as f:
            existing_map = json.load(f)
        print(f"Loaded {len(existing_map)} existing image mappings.")

    fragrances = load_seed_data()
    print(f"Processing {len(fragrances)} fragrances...\n")

    image_map = {}

    for i, frag in enumerate(fragrances):
        title = frag["title"]
        brand = frag["brand"]
        family = frag["fragrance"]["family"]
        key = f"{brand} - {title}"

        # Skip if already mapped (from previous run with API)
        if key in existing_map and existing_map[key].get("source") != "fallback":
            image_map[key] = existing_map[key]
            print(f"  [{i+1}/{len(fragrances)}] {key} — cached ({existing_map[key]['source']})")
            continue

        if has_apis:
            # Try API search: "[brand] [title] perfume bottle"
            query = f"{brand} {title} perfume bottle"
            results = search_unsplash(query, per_page=1) or search_pexels(query, per_page=1)

            if not results:
                # Broader search: "[brand] perfume"
                query = f"{brand} perfume"
                results = search_unsplash(query, per_page=1) or search_pexels(query, per_page=1)

            if not results:
                # Family-based search
                query = f"{family.lower()} perfume bottle"
                results = search_unsplash(query, per_page=1) or search_pexels(query, per_page=1)

            if results:
                image_map[key] = {
                    "thumbnail": results[0]["thumb"],
                    "image": results[0]["url"],
                    "credit": results[0]["credit"],
                    "source": results[0]["source"],
                }
                print(f"  [{i+1}/{len(fragrances)}] {key} — {results[0]['source']}")
                time.sleep(0.5)  # Rate limit
                continue

        # Fallback to curated images
        fallback_url = get_fallback_image(family, i)
        image_map[key] = {
            "thumbnail": fallback_url,
            "image": fallback_url,
            "credit": "Unsplash (curated)",
            "source": "fallback",
        }
        print(f"  [{i+1}/{len(fragrances)}] {key} — fallback ({family})")

    # Save image map
    with open(OUTPUT_PATH, "w") as f:
        json.dump(image_map, f, indent=2)
    print(f"\nSaved {len(image_map)} image mappings to {OUTPUT_PATH}")

    # Now update seed-data.ts with thumbnail URLs
    update_seed_data(fragrances, image_map)


def update_seed_data(fragrances, image_map):
    """Add thumbnail field to each fragrance in seed-data.ts."""
    for frag in fragrances:
        key = f"{frag['brand']} - {frag['title']}"
        img = image_map.get(key, {})
        frag["thumbnail"] = img.get("thumbnail", None)
        frag["images"] = [img.get("image")] if img.get("image") else []

    # Re-generate TypeScript
    import pandas as pd

    lines = [
        '/**',
        ' * Auto-generated fragrance seed data with images.',
        ' * Source: Parfumo TidyTuesday dataset + Unsplash/Pexels images',
        f' * Generated: {pd.Timestamp.now().strftime("%Y-%m-%d")}',
        f' * Count: {len(fragrances)} fragrances',
        ' */',
        '',
        'export interface SeedFragrance {',
        '  title: string;',
        '  brand: string;',
        '  description: string;',
        '  concentration: string;',
        '  thumbnail: string | null;',
        '  images: string[];',
        '  variants: Array<{ title: string; price: number }>;',
        '  fragrance: {',
        '    top_notes: string[];',
        '    heart_notes: string[];',
        '    base_notes: string[];',
        '    accords: string[];',
        '    family: "Fresh" | "Floral" | "Amber" | "Woody";',
        '    sub_family: string;',
        '    concentration: "EDC" | "EDT" | "EDP" | "Parfum" | "Extrait";',
        '    longevity: number;',
        '    sillage: number;',
        '    projection: number;',
        '    gender: "Masculine" | "Feminine" | "Unisex";',
        '    season: string[];',
        '    occasion: string[];',
        '  };',
        '}',
        '',
        'export const SEED_FRAGRANCES: SeedFragrance[] = ',
    ]

    json_str = json.dumps(fragrances, indent=2, ensure_ascii=False)
    lines.append(json_str + ";")
    lines.append("")

    output = os.path.join(SCRIPT_DIR, "..", "apps", "api", "src", "scripts", "seed-data.ts")
    with open(output, "w") as f:
        f.write("\n".join(lines))

    print(f"Updated seed-data.ts with image URLs ({os.path.getsize(output) / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
