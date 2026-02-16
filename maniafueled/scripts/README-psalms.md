# Importing Psalms (World English Bible)

The devotions feature uses `data/psalms.json` with shape:

```json
[
  { "number": 1, "verses": [ { "verseNumber": 1, "text": "..." }, ... ] },
  ...
]
```

## Option 1: GitHub (recommended — single request, no rate limit)

```bash
node maniafueled/scripts/fetch-psalms-from-github.mjs
```

- Fetches the full WEB Psalms from [TehShrike/world-english-bible](https://github.com/TehShrike/world-english-bible) (`json/psalms.json`).
- One HTTP request; converts the repo’s line-based format into the `{ number, verses }` format above.

## Option 2: bible-api.com

```bash
node maniafueled/scripts/fetch-psalms.mjs
```

- Fetches one Psalm per request from https://bible-api.com (WEB).
- **Rate limit**: the API often returns 429 after ~15–25 requests. The script uses a 1.5s delay; if you still hit limits, increase the delay in the script or run in batches.

## Other projects (e.g. fxtranscription)

If another project of yours (e.g. fxtranscription) already imports scripture, reuse the same source and conversion logic there so both use the same data pipeline.
