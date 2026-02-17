# Devotions data storage

All devotions data is stored **only in the browser** (localStorage). Nothing is sent to a server.

## Keys and meaning

| Key pattern | Meaning |
|------------|--------|
| `devotions-mood-YYYY-MM-DD` | How you said you were feeling that day: `mania`, `mixed`, `depressive`, `baseline`, or `not_sure`. |
| `devotions-vent-YYYY-MM-DD` | The “bring it to God” / vent text for that day. |
| `devotions-psalm-{1..150}` | One key per Psalm. Value is JSON: `{ "prayer": "...", "reflection": "..." }`. These are **per Psalm**, not per date — so it’s the last prayer/reflection you wrote for that Psalm. |
| `devotions-unlocked` | Session flag (cleared when you lock). |

## Viewing over time

- **Journal** (CalendarDays icon in the devotions top bar) lists all dates that have at least one of mood or vent, newest first, and shows mood + vent for each. It scans the last 2 years of possible dates.
- Psalm prayer/reflection are not shown in the Journal because they are keyed by Psalm number, not date.

## Backup / export

To keep a copy of your data you can:

1. Use the browser’s dev tools (Application → Local Storage) and copy the values for the `devotions-*` keys.
2. Or add an “Export” feature later that writes mood + vent (and optionally Psalm notes) to a JSON file.
