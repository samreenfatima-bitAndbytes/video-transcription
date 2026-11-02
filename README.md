# VideoDoc

Static web demo of the original **Video_to_Doc** Colab notebook: one operator turns a lecture/meeting into a playbook.

Pipeline: audio extract → Whisper STT → clean/chunk → document summary & FAQs → LLaMA 3.2 vision frames → playbook.

No Admin/Trainer split (not in the original notebook). Seeded jobs simulate the run locally — no API keys.

See [LOCAL_SETUP.md](./LOCAL_SETUP.md).
