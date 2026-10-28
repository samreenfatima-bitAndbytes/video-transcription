# VideoDoc — local setup

Vite + React web workspace for Vercel. Simulates the Colab video→playbook pipeline (Whisper STT, Hugging Face, LLaMA vision) with seeded jobs — no API keys required.

## Run locally

```bash
cd local-projects/video-to-doc-static
npm install
npm run dev
```

Open http://localhost:2120

## Demo logins

| Role    | Email                       | Password     | Focus |
|---------|-----------------------------|--------------|--------|
| Admin   | `admin@videodoc.example`    | `DemoPass1!` | Org overview, jobs monitor, team seats, usage |
| Trainer | `trainer@videodoc.example`  | `DemoPass1!` | New video, run STT→playbook, share playbooks |

## Vercel

- Root: this folder
- Build: `npm run build`
- Output: `dist`

## Source notebook

Original Colab flow: `../Video_to_Doc.ipynb` (leave untouched).
