#!/usr/bin/env python3
"""Apply the hand corrections in pipeline/landmark_fixes.json to public/data/landmarks.json.

Run it after export_meta.py. It is safe to run more than once: "set" overwrites the listed
fields of existing landmarks and "add" inserts a landmark only when its key is missing.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FIXES = os.path.join(HERE, "landmark_fixes.json")
LMS = os.path.join(HERE, "..", "public", "data", "landmarks.json")


def main():
    fixes = json.load(open(FIXES, encoding="utf-8"))
    lms = json.load(open(LMS, encoding="utf-8"))
    by_key = {}
    for l in lms:
        by_key.setdefault(l["k"], []).append(l)
    changed = added = 0
    for key, fields in fixes.get("set", {}).items():
        if key not in by_key:
            sys.exit(f"landmark {key} not found")
        for l in by_key[key]:
            for f, v in fields.items():
                if l.get(f) != v:
                    l[f] = v
                    changed += 1
    for rec in fixes.get("add", []):
        if rec["k"] not in by_key:
            lms.append(rec)
            added += 1
    with open(LMS, "w", encoding="utf-8") as fh:
        json.dump(lms, fh, ensure_ascii=False, separators=(",", ":"))
    print(f"landmarks: {changed} fields changed, {added} added, {len(lms)} total")


if __name__ == "__main__":
    main()
