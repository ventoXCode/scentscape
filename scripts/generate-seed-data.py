"""
Generate seed data for ScentScape from the Parfumo TidyTuesday dataset.

Downloads 59K fragrances from the public Parfumo dataset, curates the top ~100
well-known fragrances with complete note pyramids, and outputs a TypeScript
seed file compatible with the Medusa FragranceData model.

Usage:
    source .venv/bin/activate
    python generate-seed-data.py

Output:
    ../apps/api/src/scripts/seed-data.ts
"""

import pandas as pd
import json
import re
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
CSV_PATH = os.path.join(DATA_DIR, "parfumo_clean.csv")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "apps", "api", "src", "scripts", "seed-data.ts")

# Download dataset if not present
if not os.path.exists(CSV_PATH):
    import urllib.request
    os.makedirs(DATA_DIR, exist_ok=True)
    url = "https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-12-10/parfumo_data_clean.csv"
    print(f"Downloading dataset from {url}...")
    urllib.request.urlretrieve(url, CSV_PATH)

# ─── Map accords to the Michael Edwards fragrance families ───────────────────

ACCORD_TO_FAMILY = {
    # Fresh family
    "citrus": "Fresh", "aquatic": "Fresh", "green": "Fresh",
    "fresh": "Fresh", "aromatic": "Fresh", "ozonic": "Fresh",
    "marine": "Fresh", "herbal": "Fresh", "fougere": "Fresh",
    "tropical": "Fresh", "watery": "Fresh",
    # Floral family
    "floral": "Floral", "white floral": "Floral", "rose": "Floral",
    "powdery": "Floral", "soft floral": "Floral", "violet": "Floral",
    "iris": "Floral", "jasmine": "Floral", "tuberose": "Floral",
    # Amber family
    "oriental": "Amber", "amber": "Amber", "warm spicy": "Amber",
    "sweet": "Amber", "balsamic": "Amber", "vanilla": "Amber",
    "resinous": "Amber", "caramel": "Amber", "honey": "Amber",
    "animalic": "Amber", "cinnamon": "Amber",
    # Woody family
    "woody": "Woody", "earthy": "Woody", "mossy": "Woody",
    "smoky": "Woody", "leather": "Woody", "oud": "Woody",
    "sandalwood": "Woody", "cedar": "Woody", "vetiver": "Woody",
    "patchouli": "Woody", "musky": "Woody", "tobacco": "Woody",
    "dark": "Woody",
}

# Map accords to occasion/season/gender heuristics
ACCORD_OCCASION_MAP = {
    "fresh": ["Office", "Casual"], "citrus": ["Office", "Casual"],
    "aquatic": ["Casual", "Outdoor"], "green": ["Office", "Casual"],
    "floral": ["Date Night", "Special Event"], "rose": ["Date Night"],
    "sweet": ["Date Night", "Casual"], "vanilla": ["Date Night"],
    "oriental": ["Date Night", "Special Event"], "amber": ["Special Event"],
    "woody": ["Office", "Special Event"], "leather": ["Special Event"],
    "oud": ["Special Event"], "smoky": ["Special Event"],
    "powdery": ["Office"], "aromatic": ["Office", "Casual"],
    "spicy": ["Date Night", "Special Event"],
}

ACCORD_SEASON_MAP = {
    "fresh": ["Spring", "Summer"], "citrus": ["Spring", "Summer"],
    "aquatic": ["Summer"], "green": ["Spring"],
    "floral": ["Spring", "Summer"], "fruity": ["Spring", "Summer"],
    "sweet": ["Fall", "Winter"], "vanilla": ["Fall", "Winter"],
    "oriental": ["Fall", "Winter"], "amber": ["Fall", "Winter"],
    "woody": ["Fall", "Winter"], "leather": ["Fall", "Winter"],
    "oud": ["Winter"], "smoky": ["Winter"],
    "warm spicy": ["Fall", "Winter"], "spicy": ["Fall", "Winter"],
    "powdery": ["Spring", "Fall"],
}

# Concentration mapping
CONC_MAP = {
    "eau de parfum": "EDP",
    "eau de toilette": "EDT",
    "eau de cologne": "EDC",
    "parfum": "Parfum",
    "extrait de parfum": "Extrait",
    "extrait": "Extrait",
    "perfume": "Parfum",
    "cologne": "EDC",
}

# ─── Curated list of iconic fragrances to prioritize ─────────────────────────

# These are the most well-known, commercially important fragrances.
# We search for exact or close matches in the dataset.
CURATED_FRAGRANCES = [
    # Men's classics
    ("Aventus", "Creed"),
    ("Green Irish Tweed", "Creed"),
    ("Sauvage", "Dior"),
    ("Bleu de Chanel", "Chanel"),
    ("Acqua di Gio", "Giorgio Armani"),
    ("Le Male", "Jean Paul Gaultier"),
    ("1 Million", "Paco Rabanne"),
    ("Eros", "Versace"),
    ("The One", "Dolce & Gabbana"),
    ("Spicebomb", "Viktor & Rolf"),
    ("Dylan Blue", "Versace"),
    ("Terre d'Hermès", "Hermès"),
    ("Y", "Yves Saint Laurent"),
    ("Explorer", "Montblanc"),
    ("L'Homme", "Yves Saint Laurent"),
    ("Invictus", "Paco Rabanne"),
    ("Allure Homme Sport", "Chanel"),
    ("Cool Water", "Davidoff"),
    ("Luna Rossa", "Prada"),
    ("Ombre Leather", "Tom Ford"),

    # Women's classics
    ("Coco Mademoiselle", "Chanel"),
    ("J'adore", "Dior"),
    ("La Vie Est Belle", "Lancôme"),
    ("Black Opium", "Yves Saint Laurent"),
    ("Good Girl", "Carolina Herrera"),
    ("Flowerbomb", "Viktor & Rolf"),
    ("Miss Dior", "Dior"),
    ("Light Blue", "Dolce & Gabbana"),
    ("Chance", "Chanel"),
    ("Libre", "Yves Saint Laurent"),
    ("Mon Paris", "Yves Saint Laurent"),
    ("Si", "Giorgio Armani"),
    ("Angel", "Mugler"),
    ("Alien", "Mugler"),
    ("Hypnotic Poison", "Dior"),
    ("Daisy", "Marc Jacobs"),
    ("Chloe", "Chloé"),
    ("Nomade", "Chloé"),
    ("Very Good Girl", "Carolina Herrera"),

    # Niche / Unisex
    ("Baccarat Rouge 540", "Maison Francis Kurkdjian"),
    ("Tobacco Vanille", "Tom Ford"),
    ("Black Orchid", "Tom Ford"),
    ("Lost Cherry", "Tom Ford"),
    ("Oud Wood", "Tom Ford"),
    ("Neroli Portofino", "Tom Ford"),
    ("Santal 33", "Le Labo"),
    ("Rose 31", "Le Labo"),
    ("Another 13", "Le Labo"),
    ("Gypsy Water", "Byredo"),
    ("Bal d'Afrique", "Byredo"),
    ("Mojave Ghost", "Byredo"),
    ("Layton", "Parfums de Marly"),
    ("Delina", "Parfums de Marly"),
    ("Sedley", "Parfums de Marly"),
    ("Rehab", "Initio"),
    ("Side Effect", "Initio"),
    ("Oud for Greatness", "Initio"),
    ("Hacivat", "Nishane"),
    ("Ani", "Nishane"),
    ("Erba Pura", "Xerjoff"),
    ("Naxos", "Xerjoff"),
    ("BR540 Extrait", "Maison Francis Kurkdjian"),
    ("Grand Soir", "Maison Francis Kurkdjian"),
    ("Gentle Fluidity Gold", "Maison Francis Kurkdjian"),
    ("Reflection Man", "Amouage"),
    ("Interlude Man", "Amouage"),
    ("Portrait of a Lady", "Frederic Malle"),
    ("Musc Ravageur", "Frederic Malle"),
    ("Dior Homme Intense", "Dior"),
    ("Valentino Uomo Intense", "Valentino"),
    ("Stronger With You", "Emporio Armani"),
    ("Scandal", "Jean Paul Gaultier"),
    ("Born in Roma", "Valentino"),
    ("Dolce & Gabbana The One", "Dolce & Gabbana"),

    # Popular affordable / mass market
    ("Eros Flame", "Versace"),
    ("Nautica Voyage", "Nautica"),
    ("D&G Light Blue", "Dolce & Gabbana"),
    ("Montblanc Legend", "Montblanc"),
    ("Burberry Her", "Burberry"),
    ("Cloud", "Ariana Grande"),
    ("Gucci Guilty", "Gucci"),
    ("Gucci Bloom", "Gucci"),
    ("Chanel No. 5", "Chanel"),
]


def parse_notes(notes_str):
    """Parse comma-separated note string into list."""
    if pd.isna(notes_str) or not notes_str.strip():
        return []
    return [n.strip() for n in notes_str.split(",") if n.strip()]


def infer_family(accords):
    """Infer Michael Edwards family from accord list."""
    if not accords:
        return "Fresh"

    family_scores = {"Fresh": 0, "Floral": 0, "Amber": 0, "Woody": 0}
    for accord in accords:
        key = accord.lower().strip()
        if key in ACCORD_TO_FAMILY:
            family_scores[ACCORD_TO_FAMILY[key]] += 1

    return max(family_scores, key=family_scores.get) if any(family_scores.values()) else "Fresh"


def infer_concentration(conc_str, name):
    """Map concentration string to enum value."""
    if pd.notna(conc_str):
        key = conc_str.strip().lower()
        for pattern, val in CONC_MAP.items():
            if pattern in key:
                return val

    # Infer from name
    name_lower = name.lower()
    if "extrait" in name_lower:
        return "Extrait"
    if "parfum" in name_lower and "eau" not in name_lower:
        return "Parfum"
    if "eau de parfum" in name_lower or "edp" in name_lower:
        return "EDP"
    if "eau de toilette" in name_lower or "edt" in name_lower:
        return "EDT"
    if "eau de cologne" in name_lower or "edc" in name_lower:
        return "EDC"

    return "EDP"  # default


def infer_gender(name, brand):
    """Infer gender from name heuristics."""
    name_lower = name.lower()

    masc_signals = ["pour homme", "for men", "man", "homme", " him", "uomo"]
    fem_signals = ["pour femme", "for women", "woman", "femme", " her", "donna", "girl"]

    for s in masc_signals:
        if s in name_lower:
            return "Masculine"
    for s in fem_signals:
        if s in name_lower:
            return "Feminine"

    return "Unisex"


def infer_occasions(accords):
    """Infer occasions from accords."""
    occasions = set()
    for accord in accords:
        key = accord.lower().strip()
        if key in ACCORD_OCCASION_MAP:
            occasions.update(ACCORD_OCCASION_MAP[key])
    return sorted(list(occasions)) if occasions else ["Casual"]


def infer_seasons(accords):
    """Infer seasons from accords."""
    seasons = set()
    for accord in accords:
        key = accord.lower().strip()
        if key in ACCORD_SEASON_MAP:
            seasons.update(ACCORD_SEASON_MAP[key])
    return sorted(list(seasons)) if seasons else ["Spring", "Fall"]


def estimate_performance(accords, concentration):
    """Estimate longevity/sillage/projection from accords + concentration."""
    # Base scores by concentration
    conc_base = {"EDC": 2.0, "EDT": 2.8, "EDP": 3.8, "Parfum": 4.3, "Extrait": 4.6}
    base = conc_base.get(concentration, 3.5)

    # Accord modifiers
    heavy_accords = {"oud", "amber", "oriental", "leather", "smoky", "tobacco",
                     "resinous", "balsamic", "animalic", "vanilla", "dark"}
    light_accords = {"citrus", "aquatic", "green", "fresh", "watery", "ozonic"}

    heavy_count = sum(1 for a in accords if a.lower() in heavy_accords)
    light_count = sum(1 for a in accords if a.lower() in light_accords)

    modifier = (heavy_count - light_count) * 0.15
    longevity = max(1.0, min(5.0, base + modifier))
    sillage = max(1.0, min(5.0, longevity - 0.2))
    projection = max(1.0, min(5.0, longevity - 0.4))

    return round(longevity, 1), round(sillage, 1), round(projection, 1)


def build_description(family, accords, brand):
    """Build a non-redundant description string."""
    adj = ""
    for a in accords:
        if a.lower() != family.lower():
            adj = a.lower()
            break
    prefix = f"{family.lower()} {adj}".strip() if adj else family.lower()
    return f"A {prefix} fragrance by {brand}"


# ─── Manual fallback data for iconic fragrances missing from Parfumo ─────────

MANUAL_FRAGRANCES = [
    {
        "title": "Le Male", "brand": "Jean Paul Gaultier",
        "description": "A fresh spicy fragrance by Jean Paul Gaultier",
        "concentration": "EDT",
        "variants": [{"title": "75mL EDT", "price": 8500}, {"title": "125mL EDT", "price": 11000}],
        "fragrance": {
            "top_notes": ["Mint", "Lavender", "Bergamot", "Cardamom"],
            "heart_notes": ["Orange Blossom", "Cinnamon", "Cumin"],
            "base_notes": ["Vanilla", "Tonka Bean", "Sandalwood", "Cedar", "Amber"],
            "accords": ["Fresh", "Sweet", "Aromatic", "Amber", "Powdery"],
            "family": "Fresh", "sub_family": "Aromatic",
            "concentration": "EDT", "longevity": 3.5, "sillage": 3.3, "projection": 3.0,
            "gender": "Masculine", "season": ["Fall", "Winter", "Spring"], "occasion": ["Casual", "Date Night"]
        }
    },
    {
        "title": "1 Million", "brand": "Paco Rabanne",
        "description": "A spicy leather fragrance by Paco Rabanne",
        "concentration": "EDT",
        "variants": [{"title": "50mL EDT", "price": 8500}, {"title": "100mL EDT", "price": 11500}],
        "fragrance": {
            "top_notes": ["Grapefruit", "Mint", "Blood Mandarin"],
            "heart_notes": ["Rose", "Cinnamon", "Spicy Notes"],
            "base_notes": ["Leather", "Amber", "Woody Notes", "Patchouli"],
            "accords": ["Spicy", "Sweet", "Leather", "Amber", "Fresh"],
            "family": "Amber", "sub_family": "Warm Spicy",
            "concentration": "EDT", "longevity": 3.5, "sillage": 3.5, "projection": 3.3,
            "gender": "Masculine", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Ombre Leather", "brand": "Tom Ford",
        "description": "A woody leather fragrance by Tom Ford",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 15000}, {"title": "100mL EDP", "price": 22000}],
        "fragrance": {
            "top_notes": ["Cardamom", "Violet Leaf"],
            "heart_notes": ["Jasmine Sambac", "Leather"],
            "base_notes": ["Patchouli", "Vetiver", "Amber", "Moss"],
            "accords": ["Leather", "Woody", "Smoky", "Amber", "Dark"],
            "family": "Woody", "sub_family": "Leather",
            "concentration": "EDP", "longevity": 4.3, "sillage": 4.0, "projection": 3.8,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Baccarat Rouge 540", "brand": "Maison Francis Kurkdjian",
        "description": "An amber sweet fragrance by Maison Francis Kurkdjian",
        "concentration": "EDP",
        "variants": [{"title": "35mL EDP", "price": 19500}, {"title": "70mL EDP", "price": 32500}],
        "fragrance": {
            "top_notes": ["Saffron", "Jasmine"],
            "heart_notes": ["Ambergris", "Cedar"],
            "base_notes": ["Fir Resin", "Cedar"],
            "accords": ["Amber", "Sweet", "Warm Spicy", "Woody"],
            "family": "Amber", "sub_family": "Soft Amber",
            "concentration": "EDP", "longevity": 4.8, "sillage": 4.5, "projection": 4.3,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Tobacco Vanille", "brand": "Tom Ford",
        "description": "An amber tobacco fragrance by Tom Ford",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 27500}, {"title": "100mL EDP", "price": 40000}],
        "fragrance": {
            "top_notes": ["Tobacco Leaf", "Spicy Notes"],
            "heart_notes": ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"],
            "base_notes": ["Dried Fruits", "Woody Notes"],
            "accords": ["Sweet", "Tobacco", "Vanilla", "Warm Spicy", "Woody"],
            "family": "Amber", "sub_family": "Soft Amber",
            "concentration": "EDP", "longevity": 4.6, "sillage": 4.2, "projection": 4.0,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Chloe", "brand": "Chloe",
        "description": "A floral powdery fragrance by Chloe",
        "concentration": "EDP",
        "variants": [{"title": "30mL EDP", "price": 7500}, {"title": "50mL EDP", "price": 10500}, {"title": "75mL EDP", "price": 13500}],
        "fragrance": {
            "top_notes": ["Peony", "Lychee", "Freesia"],
            "heart_notes": ["Rose", "Lily of the Valley", "Magnolia"],
            "base_notes": ["Cedarwood", "Amber", "Musk"],
            "accords": ["Floral", "Powdery", "Rose", "Fresh", "Woody"],
            "family": "Floral", "sub_family": "Soft Floral",
            "concentration": "EDP", "longevity": 3.5, "sillage": 3.2, "projection": 3.0,
            "gender": "Feminine", "season": ["Spring", "Summer"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Rose 31", "brand": "Le Labo",
        "description": "A floral woody fragrance by Le Labo",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 21000}, {"title": "100mL EDP", "price": 31000}],
        "fragrance": {
            "top_notes": ["Rose", "Cumin"],
            "heart_notes": ["Cedar", "Vetiver", "Amber"],
            "base_notes": ["Musk", "Guaiac Wood", "Olibanum"],
            "accords": ["Floral", "Woody", "Aromatic", "Amber"],
            "family": "Floral", "sub_family": "Floral Amber",
            "concentration": "EDP", "longevity": 4.2, "sillage": 3.8, "projection": 3.5,
            "gender": "Unisex", "season": ["Spring", "Fall"], "occasion": ["Office", "Date Night"]
        }
    },
    {
        "title": "Another 13", "brand": "Le Labo",
        "description": "A musky woody fragrance by Le Labo",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 21000}, {"title": "100mL EDP", "price": 31000}],
        "fragrance": {
            "top_notes": ["Pear"],
            "heart_notes": ["Ambroxan", "Ambrette Seeds"],
            "base_notes": ["Musk", "Moss", "Woody Amber"],
            "accords": ["Musky", "Woody", "Amber", "Clean"],
            "family": "Woody", "sub_family": "Mossy Woods",
            "concentration": "EDP", "longevity": 4.5, "sillage": 4.0, "projection": 3.8,
            "gender": "Unisex", "season": ["Spring", "Fall"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Rehab", "brand": "Initio",
        "description": "A woody aromatic fragrance by Initio",
        "concentration": "EDP",
        "variants": [{"title": "90mL EDP", "price": 29500}],
        "fragrance": {
            "top_notes": ["Lavender", "Nutmeg"],
            "heart_notes": ["Geranium", "Tobacco"],
            "base_notes": ["Musk", "Sandalwood", "Cashmeran"],
            "accords": ["Aromatic", "Woody", "Warm Spicy", "Musky"],
            "family": "Woody", "sub_family": "Aromatic",
            "concentration": "EDP", "longevity": 4.3, "sillage": 4.0, "projection": 3.8,
            "gender": "Unisex", "season": ["Fall", "Winter", "Spring"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Side Effect", "brand": "Initio",
        "description": "An amber vanilla fragrance by Initio",
        "concentration": "EDP",
        "variants": [{"title": "90mL EDP", "price": 29500}],
        "fragrance": {
            "top_notes": ["Rum", "Cinnamon"],
            "heart_notes": ["Tobacco", "Vanilla"],
            "base_notes": ["Benzoin", "Musk", "Hedione"],
            "accords": ["Sweet", "Vanilla", "Warm Spicy", "Tobacco", "Boozy"],
            "family": "Amber", "sub_family": "Soft Amber",
            "concentration": "EDP", "longevity": 4.5, "sillage": 4.2, "projection": 4.0,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Oud for Greatness", "brand": "Initio",
        "description": "A woody oud fragrance by Initio",
        "concentration": "EDP",
        "variants": [{"title": "90mL EDP", "price": 32500}],
        "fragrance": {
            "top_notes": ["Saffron", "Nutmeg", "Galbanum"],
            "heart_notes": ["Agarwood (Oud)", "Patchouli"],
            "base_notes": ["Musk", "Sandalwood"],
            "accords": ["Oud", "Woody", "Warm Spicy", "Smoky"],
            "family": "Woody", "sub_family": "Oud",
            "concentration": "EDP", "longevity": 4.8, "sillage": 4.5, "projection": 4.2,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Special Event"]
        }
    },
    {
        "title": "Grand Soir", "brand": "Maison Francis Kurkdjian",
        "description": "An amber balsamic fragrance by Maison Francis Kurkdjian",
        "concentration": "EDP",
        "variants": [{"title": "35mL EDP", "price": 15500}, {"title": "70mL EDP", "price": 24500}],
        "fragrance": {
            "top_notes": ["Amber", "Cinnamon"],
            "heart_notes": ["Benzoin", "Vanilla"],
            "base_notes": ["Tonka Bean", "Styrax", "Labdanum"],
            "accords": ["Amber", "Sweet", "Balsamic", "Vanilla", "Warm Spicy"],
            "family": "Amber", "sub_family": "Soft Amber",
            "concentration": "EDP", "longevity": 4.5, "sillage": 4.0, "projection": 3.8,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Portrait of a Lady", "brand": "Frederic Malle",
        "description": "A floral spicy fragrance by Frederic Malle",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 27500}, {"title": "100mL EDP", "price": 40000}],
        "fragrance": {
            "top_notes": ["Rose", "Raspberry", "Clove"],
            "heart_notes": ["Patchouli", "Cinnamon", "Sandalwood"],
            "base_notes": ["Frankincense", "Benzoin", "Musk", "Amber"],
            "accords": ["Floral", "Spicy", "Woody", "Rose", "Amber"],
            "family": "Floral", "sub_family": "Floral Amber",
            "concentration": "EDP", "longevity": 4.6, "sillage": 4.3, "projection": 4.0,
            "gender": "Feminine", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Chanel No 5", "brand": "Chanel",
        "description": "A floral aldehyde fragrance by Chanel",
        "concentration": "EDP",
        "variants": [{"title": "35mL EDP", "price": 11000}, {"title": "50mL EDP", "price": 14500}, {"title": "100mL EDP", "price": 19500}],
        "fragrance": {
            "top_notes": ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot"],
            "heart_notes": ["Jasmine", "Rose", "Lily of the Valley", "Iris"],
            "base_notes": ["Sandalwood", "Vanilla", "Vetiver", "Amber", "Patchouli", "Musk"],
            "accords": ["Floral", "Powdery", "Aldehyde", "Woody", "Amber"],
            "family": "Floral", "sub_family": "Soft Floral",
            "concentration": "EDP", "longevity": 4.2, "sillage": 3.8, "projection": 3.5,
            "gender": "Feminine", "season": ["Fall", "Winter", "Spring"], "occasion": ["Special Event", "Office"]
        }
    },
    {
        "title": "Gucci Bloom", "brand": "Gucci",
        "description": "A floral white floral fragrance by Gucci",
        "concentration": "EDP",
        "variants": [{"title": "30mL EDP", "price": 7500}, {"title": "50mL EDP", "price": 10500}, {"title": "100mL EDP", "price": 14000}],
        "fragrance": {
            "top_notes": ["Natural Tuberose"],
            "heart_notes": ["Jasmine", "Rangoon Creeper"],
            "base_notes": ["Sandalwood", "Musk"],
            "accords": ["Floral", "White Floral", "Powdery", "Green"],
            "family": "Floral", "sub_family": "White Floral",
            "concentration": "EDP", "longevity": 3.8, "sillage": 3.5, "projection": 3.3,
            "gender": "Feminine", "season": ["Spring", "Summer"], "occasion": ["Casual", "Date Night"]
        }
    },
    {
        "title": "Gucci Guilty", "brand": "Gucci",
        "description": "A floral amber fragrance by Gucci",
        "concentration": "EDP",
        "variants": [{"title": "30mL EDP", "price": 7500}, {"title": "50mL EDP", "price": 10500}, {"title": "90mL EDP", "price": 14000}],
        "fragrance": {
            "top_notes": ["Mandarin Orange", "Pink Pepper", "Bergamot"],
            "heart_notes": ["Lilac", "Geranium", "Rose"],
            "base_notes": ["Patchouli", "Amber", "Cedarwood"],
            "accords": ["Floral", "Amber", "Fresh", "Woody"],
            "family": "Floral", "sub_family": "Floral Amber",
            "concentration": "EDP", "longevity": 3.5, "sillage": 3.3, "projection": 3.0,
            "gender": "Feminine", "season": ["Spring", "Fall"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Nautica Voyage", "brand": "Nautica",
        "description": "A fresh aquatic fragrance by Nautica",
        "concentration": "EDT",
        "variants": [{"title": "50mL EDT", "price": 2500}, {"title": "100mL EDT", "price": 3500}],
        "fragrance": {
            "top_notes": ["Green Leaf", "Apple"],
            "heart_notes": ["Lotus", "Mimosa", "Drenched Cedarwood"],
            "base_notes": ["Musk", "Moss", "Amber", "Woody Notes"],
            "accords": ["Fresh", "Aquatic", "Green", "Woody"],
            "family": "Fresh", "sub_family": "Aquatic",
            "concentration": "EDT", "longevity": 2.8, "sillage": 2.5, "projection": 2.3,
            "gender": "Masculine", "season": ["Spring", "Summer"], "occasion": ["Casual", "Office"]
        }
    },
    {
        "title": "Montblanc Legend", "brand": "Montblanc",
        "description": "A fresh aromatic fragrance by Montblanc",
        "concentration": "EDT",
        "variants": [{"title": "30mL EDT", "price": 4500}, {"title": "50mL EDT", "price": 6500}, {"title": "100mL EDT", "price": 9000}],
        "fragrance": {
            "top_notes": ["Bergamot", "Pineapple Leaf", "Lavender"],
            "heart_notes": ["Geranium", "Apple", "Rose", "Coumarin"],
            "base_notes": ["Sandalwood", "Tonka Bean", "Musk", "Oakmoss"],
            "accords": ["Fresh", "Aromatic", "Woody", "Fruity"],
            "family": "Fresh", "sub_family": "Aromatic",
            "concentration": "EDT", "longevity": 3.0, "sillage": 2.8, "projection": 2.5,
            "gender": "Masculine", "season": ["Spring", "Summer"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Burberry Her", "brand": "Burberry",
        "description": "A fruity floral fragrance by Burberry",
        "concentration": "EDP",
        "variants": [{"title": "30mL EDP", "price": 7500}, {"title": "50mL EDP", "price": 10500}, {"title": "100mL EDP", "price": 14500}],
        "fragrance": {
            "top_notes": ["Blackberry", "Raspberry", "Strawberry", "Blackcurrant"],
            "heart_notes": ["Jasmine", "Violet"],
            "base_notes": ["Musk", "Amber", "Woody Notes"],
            "accords": ["Fruity", "Sweet", "Floral", "Amber"],
            "family": "Floral", "sub_family": "Fruity Floral",
            "concentration": "EDP", "longevity": 3.8, "sillage": 3.5, "projection": 3.3,
            "gender": "Feminine", "season": ["Spring", "Summer", "Fall"], "occasion": ["Casual", "Office"]
        }
    },
    {
        "title": "Cloud", "brand": "Ariana Grande",
        "description": "A sweet dreamy fragrance by Ariana Grande",
        "concentration": "EDP",
        "variants": [{"title": "30mL EDP", "price": 4500}, {"title": "50mL EDP", "price": 6000}, {"title": "100mL EDP", "price": 7500}],
        "fragrance": {
            "top_notes": ["Lavender Blossom", "Juicy Pear", "Bergamot"],
            "heart_notes": ["Coconut", "Praline", "Vanilla Orchid"],
            "base_notes": ["Musks", "Blonde Woods", "Cashmere"],
            "accords": ["Sweet", "Creamy", "Coconut", "Musky", "Vanilla"],
            "family": "Amber", "sub_family": "Sweet",
            "concentration": "EDP", "longevity": 3.5, "sillage": 3.2, "projection": 3.0,
            "gender": "Feminine", "season": ["Spring", "Summer", "Fall"], "occasion": ["Casual"]
        }
    },
    {
        "title": "BR540 Extrait", "brand": "Maison Francis Kurkdjian",
        "description": "An amber sweet fragrance by Maison Francis Kurkdjian",
        "concentration": "Extrait",
        "variants": [{"title": "35mL Extrait", "price": 32500}, {"title": "70mL Extrait", "price": 52500}],
        "fragrance": {
            "top_notes": ["Saffron", "Jasmine", "Bitter Almond"],
            "heart_notes": ["Ambergris", "Cedar"],
            "base_notes": ["Fir Balsam", "Cedar", "Musk"],
            "accords": ["Amber", "Sweet", "Warm Spicy", "Woody", "Balsamic"],
            "family": "Amber", "sub_family": "Soft Amber",
            "concentration": "Extrait", "longevity": 4.9, "sillage": 4.7, "projection": 4.5,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
    {
        "title": "Gentle Fluidity Gold", "brand": "Maison Francis Kurkdjian",
        "description": "A sweet vanilla fragrance by Maison Francis Kurkdjian",
        "concentration": "EDP",
        "variants": [{"title": "35mL EDP", "price": 15500}, {"title": "70mL EDP", "price": 24500}],
        "fragrance": {
            "top_notes": ["Juniper Berry", "Nutmeg", "Coriander"],
            "heart_notes": ["Musks", "Vanilla", "Amber"],
            "base_notes": ["Sandalwood", "Cedar", "Tolu Balsam"],
            "accords": ["Sweet", "Vanilla", "Woody", "Amber", "Musky"],
            "family": "Amber", "sub_family": "Sweet",
            "concentration": "EDP", "longevity": 4.0, "sillage": 3.8, "projection": 3.5,
            "gender": "Unisex", "season": ["Fall", "Winter", "Spring"], "occasion": ["Office", "Casual"]
        }
    },
    {
        "title": "Stronger With You", "brand": "Emporio Armani",
        "description": "A sweet spicy fragrance by Emporio Armani",
        "concentration": "EDT",
        "variants": [{"title": "30mL EDT", "price": 6500}, {"title": "50mL EDT", "price": 8500}, {"title": "100mL EDT", "price": 12000}],
        "fragrance": {
            "top_notes": ["Cardamom", "Pink Pepper", "Violet Leaf"],
            "heart_notes": ["Sage", "Meringue"],
            "base_notes": ["Vanilla", "Chestnut", "Suede", "Cedar"],
            "accords": ["Sweet", "Warm Spicy", "Vanilla", "Aromatic"],
            "family": "Amber", "sub_family": "Sweet",
            "concentration": "EDT", "longevity": 3.8, "sillage": 3.5, "projection": 3.3,
            "gender": "Masculine", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Casual"]
        }
    },
    {
        "title": "Dolce & Gabbana The One", "brand": "Dolce & Gabbana",
        "description": "An amber spicy fragrance by Dolce & Gabbana",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 8500}, {"title": "100mL EDP", "price": 12500}, {"title": "150mL EDP", "price": 16000}],
        "fragrance": {
            "top_notes": ["Grapefruit", "Coriander", "Basil"],
            "heart_notes": ["Cardamom", "Ginger", "Orange Blossom"],
            "base_notes": ["Amber", "Cedar", "Labdanum", "Tobacco"],
            "accords": ["Amber", "Warm Spicy", "Woody", "Sweet"],
            "family": "Amber", "sub_family": "Warm Spicy",
            "concentration": "EDP", "longevity": 3.5, "sillage": 3.2, "projection": 3.0,
            "gender": "Masculine", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Office"]
        }
    },
    {
        "title": "D&G Light Blue", "brand": "Dolce & Gabbana",
        "description": "A fresh citrus fragrance by Dolce & Gabbana",
        "concentration": "EDT",
        "variants": [{"title": "25mL EDT", "price": 4500}, {"title": "50mL EDT", "price": 7000}, {"title": "100mL EDT", "price": 10000}],
        "fragrance": {
            "top_notes": ["Sicilian Lemon", "Apple", "Cedar", "Bellflower"],
            "heart_notes": ["Bamboo", "Jasmine", "White Rose"],
            "base_notes": ["Cedar", "Musk", "Amber"],
            "accords": ["Fresh", "Citrus", "Floral", "Aquatic"],
            "family": "Fresh", "sub_family": "Citrus",
            "concentration": "EDT", "longevity": 2.8, "sillage": 2.5, "projection": 2.3,
            "gender": "Feminine", "season": ["Spring", "Summer"], "occasion": ["Casual", "Office"]
        }
    },
    {
        "title": "Chanel No. 5", "brand": "Chanel",
        "description": "A floral aldehyde fragrance by Chanel",
        "concentration": "EDP",
        "variants": [{"title": "35mL EDP", "price": 11000}, {"title": "50mL EDP", "price": 14500}, {"title": "100mL EDP", "price": 19500}],
        "fragrance": {
            "top_notes": ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot"],
            "heart_notes": ["Jasmine", "Rose", "Lily of the Valley", "Iris"],
            "base_notes": ["Sandalwood", "Vanilla", "Vetiver", "Amber", "Patchouli", "Musk"],
            "accords": ["Floral", "Powdery", "Aldehyde", "Woody", "Amber"],
            "family": "Floral", "sub_family": "Soft Floral",
            "concentration": "EDP", "longevity": 4.2, "sillage": 3.8, "projection": 3.5,
            "gender": "Feminine", "season": ["Fall", "Winter", "Spring"], "occasion": ["Special Event", "Office"]
        }
    },
    {
        "title": "Musc Ravageur", "brand": "Frederic Malle",
        "description": "An amber musky fragrance by Frederic Malle",
        "concentration": "EDP",
        "variants": [{"title": "50mL EDP", "price": 27500}, {"title": "100mL EDP", "price": 40000}],
        "fragrance": {
            "top_notes": ["Lavender", "Bergamot"],
            "heart_notes": ["Musk", "Vanilla", "Cinnamon"],
            "base_notes": ["Sandalwood", "Amber", "Gaiac Wood", "Cedar"],
            "accords": ["Amber", "Musky", "Warm Spicy", "Vanilla", "Woody"],
            "family": "Amber", "sub_family": "Warm Spicy",
            "concentration": "EDP", "longevity": 4.5, "sillage": 4.2, "projection": 4.0,
            "gender": "Unisex", "season": ["Fall", "Winter"], "occasion": ["Date Night", "Special Event"]
        }
    },
]


def generate_prices(concentration):
    """Generate realistic price variants by concentration."""
    price_ranges = {
        "EDC": [(30, 4500), (50, 6500), (100, 9500)],
        "EDT": [(30, 6500), (50, 8500), (100, 12500)],
        "EDP": [(30, 9500), (50, 14500), (100, 22500)],
        "Parfum": [(30, 15000), (50, 22500), (100, 35000)],
        "Extrait": [(30, 22500), (50, 35000), (100, 55000)],
    }
    return price_ranges.get(concentration, price_ranges["EDP"])


def find_fragrance(df, name, brand):
    """Find best match for a fragrance in the dataset."""
    # Exact name match within brand
    brand_match = df[df["Brand"].str.contains(brand, case=False, na=False)]

    if len(brand_match) > 0:
        # Try exact name
        exact = brand_match[brand_match["Name"].str.lower() == name.lower()]
        if len(exact) > 0:
            return exact.iloc[0]

        # Try contains match (prefer EDP/main variant)
        contains = brand_match[brand_match["Name"].str.contains(re.escape(name), case=False, na=False)]
        if len(contains) > 0:
            # Prefer entries with complete data
            complete = contains[
                contains["Top_Notes"].notna() &
                contains["Middle_Notes"].notna() &
                contains["Base_Notes"].notna()
            ]
            if len(complete) > 0:
                # Prefer EDP or main variant (shortest name = usually the main one)
                complete = complete.copy()
                complete["name_len"] = complete["Name"].str.len()
                return complete.sort_values("name_len").iloc[0]
            return contains.iloc[0]

    return None


def escape_ts(s):
    """Escape string for TypeScript template literal."""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("'", "\\'")


def main():
    print("Loading Parfumo dataset...")
    df = pd.read_csv(CSV_PATH)
    print(f"  Total: {len(df)} fragrances")

    # Filter to entries with complete note pyramids
    complete = df[
        df["Top_Notes"].notna() &
        df["Middle_Notes"].notna() &
        df["Base_Notes"].notna()
    ].copy()
    print(f"  With complete pyramids: {len(complete)}")

    results = []
    found = 0
    not_found = []

    # Build lookup of manual fallback fragrances — match on title only since brands vary
    manual_lookup = {}
    for m in MANUAL_FRAGRANCES:
        manual_lookup[m["title"].lower()] = m

    for name, brand in CURATED_FRAGRANCES:
        # Check manual fallback first for known missing entries
        if name.lower() in manual_lookup:
            results.append(manual_lookup[name.lower()])
            found += 1
            continue

        row = find_fragrance(complete, name, brand)
        if row is None:
            # Try with full dataset (even without complete notes, we can still use partial)
            row = find_fragrance(df, name, brand)
            if row is None:
                not_found.append(f"{name} by {brand}")
                continue

        accords = parse_notes(row["Main_Accords"])
        top_notes = parse_notes(row["Top_Notes"])
        heart_notes = parse_notes(row["Middle_Notes"])
        base_notes = parse_notes(row["Base_Notes"])

        # Skip if no notes at all
        if not top_notes and not heart_notes and not base_notes:
            not_found.append(f"{name} by {brand} (no notes)")
            continue

        concentration = infer_concentration(row.get("Concentration"), row["Name"])
        family = infer_family(accords)
        gender = infer_gender(row["Name"], brand)
        occasions = infer_occasions(accords)
        seasons = infer_seasons(accords)
        longevity, sillage, projection = estimate_performance(accords, concentration)

        # Rating (Parfumo uses 0-10 scale, convert to useful metric)
        rating = row.get("Rating_Value")

        frag = {
            "title": name,
            "brand": brand,
            "description": build_description(family, accords, brand),
            "concentration": concentration,
            "variants": [
                {"title": f"{size}mL {concentration}", "price": price}
                for size, price in generate_prices(concentration)
            ],
            "fragrance": {
                "top_notes": top_notes[:6],  # Cap at 6 per layer
                "heart_notes": heart_notes[:6],
                "base_notes": base_notes[:6],
                "accords": accords[:8],
                "family": family,
                "sub_family": accords[0] if accords else family,
                "concentration": concentration,
                "longevity": longevity,
                "sillage": sillage,
                "projection": projection,
                "gender": gender,
                "season": seasons,
                "occasion": occasions,
            },
        }
        results.append(frag)
        found += 1

    print(f"\n  Found: {found}/{len(CURATED_FRAGRANCES)}")
    if not_found:
        print(f"  Not found ({len(not_found)}):")
        for nf in not_found:
            print(f"    - {nf}")

    # If we have fewer than target, supplement with top-rated complete fragrances
    if found < 100:
        print(f"\n  Supplementing with top-rated fragrances...")
        existing_names = {r["title"].lower() for r in results}

        supplement = complete[
            complete["Rating_Value"].notna() &
            (complete["Rating_Count"] >= 50) &
            complete["Main_Accords"].notna()
        ].sort_values("Rating_Count", ascending=False)

        for _, row in supplement.iterrows():
            if found >= 100:
                break
            if row["Name"].lower() in existing_names:
                continue

            accords = parse_notes(row["Main_Accords"])
            top_notes = parse_notes(row["Top_Notes"])
            heart_notes = parse_notes(row["Middle_Notes"])
            base_notes = parse_notes(row["Base_Notes"])

            if not top_notes or not heart_notes or not base_notes:
                continue

            concentration = infer_concentration(row.get("Concentration"), row["Name"])
            family = infer_family(accords)
            gender = infer_gender(row["Name"], row["Brand"])
            occasions = infer_occasions(accords)
            seasons = infer_seasons(accords)
            longevity, sillage, projection = estimate_performance(accords, concentration)

            frag = {
                "title": row["Name"],
                "brand": row["Brand"],
                "description": build_description(family, accords, row["Brand"]),
                "concentration": concentration,
                "variants": [
                    {"title": f"{size}mL {concentration}", "price": price}
                    for size, price in generate_prices(concentration)
                ],
                "fragrance": {
                    "top_notes": top_notes[:6],
                    "heart_notes": heart_notes[:6],
                    "base_notes": base_notes[:6],
                    "accords": accords[:8],
                    "family": family,
                    "sub_family": accords[0] if accords else family,
                    "concentration": concentration,
                    "longevity": longevity,
                    "sillage": sillage,
                    "projection": projection,
                    "gender": gender,
                    "season": seasons,
                    "occasion": occasions,
                },
            }
            results.append(frag)
            existing_names.add(row["Name"].lower())
            found += 1

    print(f"\n  Final count: {len(results)} fragrances")

    # Generate TypeScript output
    ts_output = generate_typescript(results)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        f.write(ts_output)

    print(f"\n  Written to: {OUTPUT_PATH}")
    print(f"  File size: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


def generate_typescript(fragrances):
    """Generate TypeScript seed data file."""
    lines = [
        '/**',
        ' * Auto-generated fragrance seed data.',
        ' * Source: Parfumo TidyTuesday dataset (59K fragrances)',
        f' * Generated: {pd.Timestamp.now().strftime("%Y-%m-%d")}',
        f' * Count: {len(fragrances)} fragrances',
        ' */',
        '',
        'export interface SeedFragrance {',
        '  title: string;',
        '  brand: string;',
        '  description: string;',
        '  concentration: string;',
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

    # Serialize with proper formatting
    json_str = json.dumps(fragrances, indent=2, ensure_ascii=False)

    # Fix JSON to valid TypeScript (trailing commas are fine, types need casting)
    lines.append(json_str + ";")
    lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    main()
