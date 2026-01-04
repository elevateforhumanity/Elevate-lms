#!/usr/bin/env bash
# bootstrap_gitpod_claimbot.sh
# Sets up EFH ClaimBot workspace for Gitpod (headless by default).
set -euo pipefail

cat > requirements.txt <<'REQ'
playwright==1.48.0
python-dotenv==1.0.1
PyYAML==6.0.2
pandas==2.2.2
REQ

cat > README.md <<'MD'
# EFH ClaimBot — Directory Claim Assistant (Gitpod)

This assistant opens and helps pre-fill claim or submit pages for:
- Google Business Profile (assist only; manual verification required)
- Bing Places (assist/import from Google)
- Yelp for Business
- FindHelp (Aunt Bertha)
- Indiana 211
- WorkOne Indy (contact/referral)
- Indy Chamber (optional)
- Lawrence Chamber (optional)
- Indianapolis Public Library community resources (optional)

**It does not bypass captchas or required phone/email/postcard verifications.**
Use it to speed up navigation and consistent data entry.

## Quick start (Gitpod)
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m playwright install chromium
python claimbot.py --photos     # optional asset checklist
python claimbot.py --all        # or: --only yelp
```

Default Gitpod runs Playwright headless; use `--headed` if you've enabled a VNC workspace.

Edit `config.yaml` with your org info. Toggle targets in `directories.csv` (Enabled=true/false).
MD

cat > config.yaml <<'YAML'
brand_name: "Elevate for Humanity Career & Technical Institute"
legal_entity: "2Exclusive LLC-S (DBA Elevate for Humanity Career & Technical Institute)"
address_line: "7009 E 56th Street"
city: "Indianapolis"
state: "IN"
postal_code: "46226"
phone: "(317) 314-3757"
email: "elevateforhumanity@elevateforhumanity.org"
website: "https://elevateforhumanity.org"
programs_url: "https://elevateforhumanity.org/programs"
YAML

cat > directories.csv <<'CSV'
key,Platform/Directory,URL,Enabled
google,Google Business Profile,https://www.google.com/business/,true
bing,Bing Places,https://www.bingplaces.com/,true
yelp,Yelp for Business,https://biz.yelp.com/,true
findhelp,FindHelp (Aunt Bertha),https://www.findhelp.org/claim,true
in211,Indiana 211,https://in211.communityos.org/,true
workone,WorkOne Indy (Contact),https://workoneindy.com/contact-us/,true
indychamber,Indy Chamber,https://www.indychamber.com/membership/,false
lawrencechamber,Lawrence Chamber,https://lawrencechamberofcommerce.org/,false
indypl,Indianapolis Public Library – Community Resources,https://www.indypl.org/locations/community-resources,false
CSV

cat > claimbot.py <<'PY'
#!/usr/bin/env python3
import argparse
from textwrap import dedent

import pandas as pd
import yaml
from playwright.sync_api import sync_playwright

HELP_NOTES = {
    "google": "Sign in → Add your business. Use official name & address. Category: Vocational School. Verification required.",
    "bing": "After GBP is verified, choose 'Import from Google'.",
    "yelp": "Choose category: 'Vocational School' or 'Adult Education'.",
    "findhelp": "Use provider claim/submit flow. Add services under Workforce Development.",
    "in211": "Click 'Add/Update Your Agency'. Submit org + programs.",
    "workone": "Send Programs URL + ETPL/WIOA eligibility for referrals.",
    "indychamber": "Pick a membership tier to enable directory listing (optional).",
    "lawrencechamber": "Request listing via Join/Contact (optional).",
    "indypl": "Request listing under Adult Education / Workforce Development (optional).",
}

CATEGORY_HINTS = {
    "google": ["Vocational School", "Adult Education School", "Technical School"],
    "bing": ["Training Centre", "Adult Education", "Vocational School"],
    "yelp": ["Vocational School", "Adult Education", "Career Counseling"],
    "findhelp": ["Job Training", "Workforce Development", "Career Counseling"],
    "in211": ["Job Training", "Apprenticeships", "Workforce Development"],
    "workone": ["Training Provider", "Apprenticeship Sponsor"],
    "indychamber": ["Education & Training"],
    "lawrencechamber": ["Education", "Nonprofit"],
    "indypl": ["Adult Education", "Job Training"],
}

PHOTO_CHECKLIST = [
    ("Square logo", "1200×1200 PNG/JPG (transparent background if available)."),
    ("Horizontal banner", "1200×630 hero image with tagline for social previews."),
    ("Exterior photo", "Clear storefront/entrance shot."),
    ("Interior photo", "Training space or classroom."),
    ("Team photo", "Staff or instructors (optional but builds trust)."),
    ("Program proof", "Flyer, brochure, or cohort photo showing students."),
    ("Documents", "WIOA/ETPL approval letter, apprenticeship cert, or media kit (PDF)."),
]


def print_photo_checklist(df: pd.DataFrame) -> None:
    print("=== Photo & Document Checklist ===")
    for label, desc in PHOTO_CHECKLIST:
        print(f" • {label}: {desc}")

    print("\n=== Category Suggestions by Platform ===")
    for _, row in df.iterrows():
        key = row["key"]
        categories = CATEGORY_HINTS.get(key, [])
        if not categories:
            continue
        joined = ", ".join(categories)
        print(f" - {row['Platform/Directory']}: {joined}")


def main():
    parser = argparse.ArgumentParser(description="EFH Directory Claim Assistant (Gitpod)")
    parser.add_argument("--only", help="Run single target by key (e.g., yelp)")
    parser.add_argument("--all", action="store_true", help="Run all entries with Enabled=true")
    parser.add_argument("--headed", action="store_true", help="Launch visible browser (requires Gitpod VNC)")
    parser.add_argument("--photos", action="store_true", help="Print photo/document checklist and exit")
    args = parser.parse_args()

    with open("config.yaml", "r", encoding="utf-8") as f:
        cfg = yaml.safe_load(f)

    df = pd.read_csv("directories.csv")

    if args.photos:
        print_photo_checklist(df)
        return

    if args.only:
        df = df[df["key"] == args.only]
        if df.empty:
            print(f"No entry for key={args.only}")
            return
    elif args.all:
        df = df[df["Enabled"] == True]
    else:
        print("Use --only <key> or --all")
        return

    headless = not args.headed

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless)
        context = browser.new_context()
        page = context.new_page()

        for _, row in df.iterrows():
            key = row["key"]
            url = row["URL"]
            page.goto(url, wait_until="domcontentloaded")

            org = cfg["brand_name"]
            legal = cfg["legal_entity"]
            address = f"{cfg['address_line']}, {cfg['city']}, {cfg['state']} {cfg['postal_code']}"
            phone = cfg["phone"]
            email = cfg["email"]
            website = cfg["website"]
            programs = cfg["programs_url"]

            notes = HELP_NOTES.get(key, "")
            categories = CATEGORY_HINTS.get(key, [])
            print(f"\n[OPEN THIS] {row['Platform/Directory']}: {url}")
            print(f"  Notes: {notes}")
            if categories:
                print(f"  Suggested categories: {', '.join(categories)}")
            print(f"  Identity: {org} | {address} | {phone} | {email}")

            def safe_fill(selector: str, value: str) -> bool:
                try:
                    element = page.wait_for_selector(selector, timeout=2500)
                    element.fill(value)
                    return True
                except Exception:
                    return False

            if key == "yelp":
                safe_fill('input[name="businessName"]', org)
                safe_fill('input[name="businessWebsite"]', website)
                safe_fill('input[name="phone"]', ''.join([c for c in phone if c.isdigit()]))

            if key == "workone":
                safe_fill('input[name="your-name"], input[name="name"]', org)
                safe_fill('input[name="your-email"], input[name="email"]', email)
                safe_fill(
                    'input[name="your-subject"], input[name="subject"]',
                    "Training Provider Referral – Elevate for Humanity (ETPL/WIOA)",
                )
                message = dedent(
                    f"""
                    Hello WorkOne team,

                    We are {org} — a state-approved training provider (DBA of {legal}) at {address}.
                    Programs & cohorts: {programs}
                    Phone: {phone}

                    Please share with counselors/case managers for eligible referrals. Thank you!
                    """
                ).strip()
                try:
                    page.fill('textarea[name="your-message"], textarea[name="message"], textarea', message)
                except Exception:
                    pass

            print("  → Copy the URL into your local browser, complete verification, then press ENTER here to continue.")
            try:
                input()
            except KeyboardInterrupt:
                break

        print("\nAll targets processed.")
        browser.close()


if __name__ == "__main__":
    main()
PY
chmod +x claimbot.py

mkdir -p descriptions

cat > descriptions/README.txt <<'TXT'
Paste-friendly descriptions for directory listings.
TXT

cat > descriptions/google.txt <<'TXT'
Elevate for Humanity Career & Technical Institute (DBA 2Exclusive LLC-S) is a state-approved training provider and DOL apprenticeship sponsor serving Marion County and beyond. We connect education, employment & entrepreneurship through career-focused training in CPR/EMS, Barber & Esthetics Apprenticeships, Tax Preparation, HVAC & Construction, Peer Recovery, and Digital Marketing. Our mission is simple—empower people and elevate communities with affordable, real-world credentials that lead to jobs and business ownership. WorkOne and WIOA funding accepted.
TXT

cat > descriptions/bing.txt <<'TXT'
Elevate for Humanity Career & Technical Institute provides hands-on career training and apprenticeships for Indiana residents. As an approved ETPL provider and registered DOL sponsor, we help students gain credentials in healthcare, construction, beauty, business start-up and digital skills. Our goal is to prepare graduates for immediate employment or entrepreneurship while supporting economic mobility across the state.
TXT

cat > descriptions/yelp.txt <<'TXT'
Elevate for Humanity offers state-approved career certifications and apprenticeships in healthcare, construction, barber & beauty, and business start-up. All programs are eligible for WorkOne and WIOA funding. Students gain real skills and career placement support to move from training to employment or self-employment. Visit ElevateforHumanity.org to learn more or apply today.
TXT

cat > descriptions/findhelp.txt <<'TXT'
Free or grant-funded career training and apprenticeships for Indiana residents. Programs in CPR/EMS, Peer Recovery, Tax Prep, Construction Trades and more. Referrals welcome from WorkOne, case managers & community partners.
TXT

cat > descriptions/in211.txt <<'TXT'
Workforce training and apprenticeship programs for job seekers and re-entry clients. State-approved ETPL provider offering healthcare, construction, and business skills training. Scholarships and grant funding available.
TXT

cat > descriptions/workone.txt <<'TXT'
State-approved training provider offering free or funded programs in CPR, Barbering, Tax Prep, HVAC, Construction & Peer Recovery. ETPL and DOL registered to support WIOA participants and apprentices.
TXT

cat > descriptions/chamber.txt <<'TXT'
Workforce development and career training center offering state-approved apprenticeships and certifications that connect education, employment and entrepreneurship for Indiana residents.
TXT

cat > descriptions/library.txt <<'TXT'
Career & Technical Institute offering free or funded training in healthcare, construction, business and beauty fields. Helping residents earn credentials and connect to jobs or entrepreneurship.
TXT

cat > descriptions/categories.txt <<'TXT'
Suggested categories by platform (paste or select the closest match):

- Google Business Profile: Vocational School, Adult Education School, Technical School
- Bing Places: Training Centre, Adult Education, Vocational School
- Yelp for Business: Vocational School, Adult Education, Career Counseling
- FindHelp (Aunt Bertha): Job Training, Workforce Development, Career Counseling
- Indiana 211: Job Training, Apprenticeships, Workforce Development
- WorkOne Indy: Training Provider, Apprenticeship Sponsor
- Indy Chamber: Education & Training
- Lawrence Chamber: Education, Nonprofit
- Indianapolis Public Library: Adult Education, Job Training

Photo & document checklist:
- Square logo (1200×1200 PNG/JPG)
- Horizontal banner (1200×630 hero image with tagline)
- Exterior photo (entrance or building)
- Interior photo (training space or classroom)
- Team or instructor photo (optional)
- Program proof (flyer, cohort photo, or equipment shot)
- Documentation (WIOA/ETPL approval letter, apprenticeship certificates, media kit)
TXT

cat <<'OUTRO'
✅ Gitpod bootstrap ready.

1. python -m venv .venv && source .venv/bin/activate
2. pip install -r requirements.txt
3. python -m playwright install chromium
4. python claimbot.py --photos     # checklist & categories
5. python claimbot.py --all        # or: python claimbot.py --only yelp
   # Add --headed if you launched a VNC desktop for visible browser

Tips:
- Copy a description from descriptions/ into each directory profile.
- Complete any verification steps, then press ENTER to move forward.
OUTRO
