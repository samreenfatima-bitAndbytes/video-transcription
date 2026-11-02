# VideoDoc — local setup

Vite + React web demo of the original **Video_to_Doc Colab notebook**: one operator runs video → Whisper STT → summary → vision frames → playbook. No Admin/Trainer role split (that was not in the notebook). Seeded jobs simulate the pipeline locally — no API keys.

## Run locally

```bash
cd local-projects/video-to-doc-static
npm install
npm run dev
```

Open http://localhost:2120

## Demo login

| Role     | Email                   | Password     |
|----------|-------------------------|--------------|
| Operator | `demo@videodoc.example` | `DemoPass1!` |

## What to try

1. Sign in → **Pipeline** overview (notebook steps).
2. **New video** → pick a **sample recording** (Asana / Standup / Onboarding) — no gallery upload.
3. Queue & run — cells animate, then that sample’s matching transcript, summary, frames, and playbook appear.
4. Open the resulting **Playbook**.
5. **Reset demo data** restores the starter jobs (2 ready + 1 queued).

## Vercel

- Root: this folder
- Build: `npm run build`
- Output: `dist`

## Source notebook

Original Colab flow: `../Video_to_Doc.ipynb` (leave untouched).
