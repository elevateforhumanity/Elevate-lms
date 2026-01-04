"""
Packet Generator
Generate certification packets from master profile
"""

import json
from datetime import datetime

def generate_packet(profile_path: str, certification_type: str) -> dict:
    """Generate packet from master profile"""

    # Load master profile
    with open(profile_path, 'r') as f:
        profile = json.load(f)

    # Map profile data to certification fields
    packet = {
        "packet_number": f"PKT_{datetime.now().strftime('%Y%m%d')}_{1:03d}",
        "certification_type": certification_type,
        "status": "draft",
        "created_at": datetime.now().isoformat(),
        "fields": {}
    }

    # Map common fields
    if certification_type == "buy_indiana":
        packet["fields"] = {
            "business_name": profile.get("entities", {}).get("2exclusive", {}).get("legal_name"),
            "ein": profile.get("entities", {}).get("2exclusive", {}).get("ein"),
            "address": profile.get("business", {}).get("primary_address", {}).get("street"),
            "phone": profile.get("owner", {}).get("contact", {}).get("business_phone"),
        }

    elif certification_type == "8a_business_development":
        packet["fields"] = {
            "business_name": profile.get("entities", {}).get("selfish_inc", {}).get("legal_name"),
            "ein": profile.get("entities", {}).get("selfish_inc", {}).get("ein"),
            "owner_name": profile.get("owner", {}).get("full_name"),
            "owner_ssn": profile.get("owner", {}).get("ssn"),
            "owner_race": profile.get("owner", {}).get("race_ethnicity"),
        }

    return packet

if __name__ == "__main__":
    packet = generate_packet("../../data/master_profile.json", "buy_indiana")
    print(json.dumps(packet, indent=2))
