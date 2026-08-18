#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tao PHOI CANH kien truc bang AI cho tung du an cua K3 Design.

QUAN TRONG: day la anh PHOI CANH do AI dung, KHONG phai anh chup cong trinh
that. Moi anh sinh ra deu duoc dong nhan "PHOI CANH MINH HOA" o goc duoi.

--- Chuan bi (chi lam 1 lan) ---

  1. Lay API key mien phi tai  https://aistudio.google.com/apikey
  2. Tao file  C:\\Users\\<ten-may>\\.claude\\.env  voi mot dong:
         GEMINI_API_KEY=dan-key-vao-day
  3. Cai thu vien:
         pip install google-genai pillow

--- Chay ---

  python scripts/generate-project-images.py            # tao toan bo
  python scripts/generate-project-images.py --only nha-pho-thao-dien
  python scripts/generate-project-images.py --pro      # dung model chat luong cao hon
  python scripts/generate-project-images.py --dry-run  # chi in prompt, khong goi API

Anh sinh ra nam trong  public/images/projects/  duoi dang .webp
Sau do chay:  node scripts/sync-project-images.mjs   de cap nhat duong dan.
"""

import argparse
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images" / "projects"

# ------------------------------------------------------------------
# Nap GEMINI_API_KEY tu cac vi tri thong dung
# ------------------------------------------------------------------

def load_env():
    for p in [
        ROOT / ".env",
        Path.home() / ".claude" / ".env",
        Path.home() / ".claude" / "skills" / ".env",
    ]:
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip("\"'"))


load_env()

MODEL_FLASH = "gemini-2.5-flash-image"
MODEL_PRO = "gemini-3-pro-image-preview"

# ------------------------------------------------------------------
# Phong cach chung — giu cho moi anh cung mot ngon ngu thi giac
# ------------------------------------------------------------------

STYLE = (
    "professional architectural visualization, photorealistic 3D render, "
    "shot on 24mm tilt-shift lens, natural daylight, soft realistic shadows, "
    "clean composition, no people, no text, no watermark, no signage lettering, "
    "tropical Vietnamese urban context, lush green tropical planting, "
    "high dynamic range, muted natural colour grading with cool blue sky"
)

# ------------------------------------------------------------------
# Mo ta tung anh — bam sat noi dung trong src/data/projects.ts
# ------------------------------------------------------------------

PROJECTS = {
    "nha-pho-thao-dien": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior street view of a narrow 4-storey Vietnamese townhouse on a "
             "5-metre-wide plot in Thao Dien, Ho Chi Minh City. Contemporary facade "
             "with vertical concrete louvre fins shading west-facing windows, slim "
             "balconies with dark metal railings, warm timber entrance door, small "
             "car port at ground level. Neighbouring houses on both sides. Late "
             "afternoon light."),
            ("1",
             "Same narrow townhouse seen straight on from the internal access lane, "
             "emphasising the rhythm of concrete sun-shading fins across the facade "
             "and the recessed balconies. Motorbike-free clean street, tropical "
             "street trees."),
            ("2",
             "Interior of a four-storey skylight void in a Vietnamese townhouse. "
             "Off-centre light well running the full height of the building, steel "
             "fishbone staircase with open timber treads, daylight falling all the "
             "way down to the ground floor, white walls, potted plants at the base."),
            ("3",
             "Interior of an open-plan kitchen and dining area in a modern Vietnamese "
             "townhouse. Island counter in pale stone, full-height fitted cabinetry "
             "in warm oak, dining table for six, pendant lights, natural light from "
             "a skylight void on the left."),
            ("4",
             "Master bedroom in a modern Vietnamese townhouse facing a rear garden. "
             "Large sliding glass door, sheer curtains, low platform bed with linen "
             "bedding, built-in wardrobe in warm timber, morning light."),
        ],
    },
    "biet-thu-long-an": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a single-plus-one-storey garden villa in Ben Luc, Long An, "
             "Vietnam. L-shaped plan opening to the south-east, wide covered veranda "
             "with slender columns, pitched tiled roof with ventilated ridge, raised "
             "plinth above the surrounding garden, large reflecting retention pond in "
             "the foreground mirroring the house, tropical fruit trees."),
            ("1",
             "The main villa volume viewed across the retention pond, reflections on "
             "still water, pitched tile roof, warm timber screens, dense tropical "
             "garden behind. Golden hour."),
            ("2",
             "Wide covered veranda of a tropical villa connecting the living room to "
             "the garden. Polished concrete floor, rattan lounge furniture, timber "
             "ceiling slats, view out to lawn and trees, deep shade with bright "
             "garden beyond."),
            ("3",
             "Double-height living room of a tropical Vietnamese villa. Exposed "
             "timber roof structure, clerestory windows, reclaimed brick feature wall, "
             "large sofa, ceiling fan, cross ventilation, soft natural light."),
        ],
    },
    "van-phong-tan-binh": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a two-storey commercial office building in Tan Binh district, "
             "Ho Chi Minh City. Clean glass curtain wall facade with horizontal shading "
             "fins, dark metal frames, glazed double-height entrance lobby, small "
             "landscaped forecourt, street trees."),
            ("1",
             "Open-plan office floor for around 80 staff. Rows of light timber desks "
             "with monitors, acoustic baffle ceiling, glazed meeting pods along one "
             "side, large windows with city view, even bright lighting, indoor plants."),
            ("2",
             "Corporate meeting room and adjacent pantry in a modern Vietnamese office. "
             "Long meeting table, double-glazed acoustic glass partition, pantry with "
             "counter and bar stools, warm timber and navy blue accents."),
        ],
    },
    "nha-pho-go-vap": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a renovated three-storey townhouse in Go Vap, Ho Chi Minh "
             "City. Fresh rendered facade in off-white, new aluminium windows, slim "
             "metal balcony railing, restored ground floor entrance, older neighbouring "
             "houses either side showing the contrast of the renovation."),
            ("1",
             "Front elevation of the same renovated Vietnamese townhouse seen from the "
             "street, clean simple facade, new external waterproof render, subtle "
             "horizontal banding, tropical planting at the entrance."),
            ("2",
             "Renovated staircase in a Vietnamese townhouse lit by a new roof skylight. "
             "White walls, terrazzo steps, slim black steel handrail, daylight washing "
             "down the stairwell, indoor plants on the landing."),
        ],
    },
    "nha-xuong-binh-duong": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a 2400 square metre pre-engineered steel factory in Ben Cat, "
             "Binh Duong, Vietnam. Long gable roof with ridge ventilators, light grey "
             "metal cladding with a continuous band of clerestory windows, three roller "
             "shutter loading doors, wide concrete yard, attached two-storey office "
             "block at the end."),
            ("1",
             "Interior of an empty pre-engineered steel factory with a 24 metre clear "
             "span and no central columns. Exposed white steel portal frames, polished "
             "concrete floor, daylight from ridge skylights and clerestory windows, "
             "high bay lighting."),
            ("2",
             "Two-storey administration office block attached to an industrial factory "
             "in Vietnam. Simple modern facade, glazed stair core, aluminium windows, "
             "landscaped entrance, company car park."),
        ],
    },
    "biet-thu-binh-chanh": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a semi-detached three-storey villa in a gated compound in "
             "Binh Chanh, Ho Chi Minh City. Contemporary facade with warm stone "
             "cladding and vertical timber screens, front garden and driveway, matching "
             "neighbouring villa attached on one side, uniform compound streetscape."),
            ("1",
             "Front elevation and forecourt of a modern semi-detached Vietnamese villa. "
             "Stone and render facade, tall entrance portal, manicured front garden, "
             "paved driveway, evening light with warm interior glow."),
            ("2",
             "Double-height entrance hall of a modern Vietnamese villa organised around "
             "a central courtyard. Full-height glazing to a planted internal courtyard, "
             "floating staircase, pale stone floor, abundant daylight."),
        ],
    },
    "showroom-quan-7": {
        "aspect": "3:2",
        "shots": [
            ("cover",
             "Exterior of a two-storey furniture showroom in District 7, Ho Chi Minh "
             "City. Full-height frameless glass shopfront, slim dark mullions, "
             "cantilevered entrance canopy, warm interior lighting visible through the "
             "glass, evening blue hour, street trees."),
            ("1",
             "Interior of a furniture showroom with staggered zig-zag display "
             "vignettes. Polished concrete floor, adjustable track lighting, sofa and "
             "dining room settings, a bright accent light feature at the far end of the "
             "route drawing the eye deeper into the space."),
            ("2",
             "Customer consultation corner inside a furniture showroom. Round table with "
             "material and finish samples laid out, comfortable armchairs, shelving with "
             "fabric swatches, warm focused lighting."),
        ],
    },
}


def build_prompt(desc: str) -> str:
    return f"{desc}\n\nStyle: {STYLE}"


def stamp(path: Path, text: str = "PHỐI CẢNH MINH HỌA"):
    """Dong nhan len goc duoi trai de nguoi xem biet day la phoi canh."""
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("  (bo qua dong nhan: chua cai pillow)")
        return

    img = Image.open(path).convert("RGBA")
    w, h = img.size
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    size = max(14, int(w * 0.018))
    font = None
    for name in ("segoeui.ttf", "arial.ttf", "DejaVuSans.ttf"):
        try:
            font = ImageFont.truetype(name, size)
            break
        except Exception:
            continue
    if font is None:
        font = ImageFont.load_default()

    pad = int(w * 0.018)
    box = d.textbbox((0, 0), text, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    x, y = pad, h - th - pad * 2

    d.rounded_rectangle(
        [x - pad * 0.6, y - pad * 0.5, x + tw + pad * 0.6, y + th + pad * 0.7],
        radius=int(size * 0.5),
        fill=(0, 46, 110, 205),
    )
    d.text((x, y), text, font=font, fill=(255, 255, 255, 235))

    Image.alpha_composite(img, layer).convert("RGB").save(path, "WEBP", quality=86)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="chi tao cho mot du an (slug)")
    ap.add_argument("--pro", action="store_true", help="dung model chat luong cao hon")
    ap.add_argument("--dry-run", action="store_true", help="chi in prompt")
    args = ap.parse_args()

    targets = (
        {args.only: PROJECTS[args.only]} if args.only and args.only in PROJECTS
        else PROJECTS
    )
    if args.only and args.only not in PROJECTS:
        print(f"Khong co du an '{args.only}'. Cac slug hop le:")
        for k in PROJECTS:
            print("   ", k)
        sys.exit(1)

    total = sum(len(v["shots"]) for v in targets.values())
    print(f"Se tao {total} anh cho {len(targets)} du an.\n")

    if args.dry_run:
        for slug, cfg in targets.items():
            for name, desc in cfg["shots"]:
                print(f"--- {slug}-{name} ({cfg['aspect']}) ---")
                print(build_prompt(desc)[:400], "...\n")
        return

    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        print("Chua co GEMINI_API_KEY.")
        print("Tao file  %s  voi noi dung:" % (Path.home() / ".claude" / ".env"))
        print("   GEMINI_API_KEY=dan-key-vao-day")
        print("Lay key mien phi tai https://aistudio.google.com/apikey")
        sys.exit(1)

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("Chua cai thu vien. Chay:  pip install google-genai pillow")
        sys.exit(1)

    client = genai.Client(api_key=key)
    model = MODEL_PRO if args.pro else MODEL_FLASH
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    ok = fail = 0
    for slug, cfg in targets.items():
        for name, desc in cfg["shots"]:
            out = OUT_DIR / f"{slug}-{name}.webp"
            print(f"[{ok + fail + 1}/{total}] {out.name} ...", end=" ", flush=True)
            try:
                resp = client.models.generate_content(
                    model=model,
                    contents=build_prompt(desc),
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE", "TEXT"],
                        image_config=types.ImageConfig(aspect_ratio=cfg["aspect"]),
                    ),
                )
                data = None
                for part in resp.candidates[0].content.parts:
                    inline = getattr(part, "inline_data", None)
                    if inline and inline.mime_type.startswith("image/"):
                        data = inline.data
                        break
                if not data:
                    print("khong tra ve anh")
                    fail += 1
                    continue

                out.write_bytes(data)
                stamp(out)
                print("xong")
                ok += 1
                time.sleep(1.2)  # tranh vuot gioi han goi
            except Exception as e:
                print("loi:", str(e)[:120])
                fail += 1

    print(f"\nHoan tat: {ok} anh thanh cong, {fail} loi.")
    if ok:
        print("Buoc tiep theo:  node scripts/sync-project-images.mjs")


if __name__ == "__main__":
    main()
