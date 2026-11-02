export const DEMO_PASSWORD = "DemoPass1!";

/** Single operator — mirrors the original Colab notebook (no Admin/Trainer split). */
export const DEMO_USERS = [
  {
    id: "u-operator",
    email: "demo@videodoc.example",
    password: DEMO_PASSWORD,
    fullName: "Sam Ortiz",
    role: "operator",
    org: "Northline Training",
  },
];

export const PIPELINE_STEPS = [
  { id: "audio", label: "Extract audio", detail: "MoviePy splits audio from the source video" },
  { id: "stt", label: "Speech-to-text", detail: "Whisper (Hugging Face) transcribes with timestamps" },
  { id: "clean", label: "Clean transcript", detail: "Strip fillers, fix spacing, chunk by tokens" },
  { id: "summary", label: "Document summary", detail: "LLM drafts docs + FAQ extracts per chunk" },
  { id: "frames", label: "Frame vision", detail: "Sample frames + LLaMA 3.2 vision captions" },
  { id: "playbook", label: "Build playbook", detail: "Merge summary + frames into training steps" },
];

const MODELS = {
  stt: "openai/whisper-large-v3-turbo",
  vision: "llama-3.2-11b-vision",
  writer: "llama-3.1-8b",
};

const ASANA_TRANSCRIPT = `Welcome to the Asana project management activation session. Today we will walk through creating a workspace, inviting your team, setting up projects, and defining task rules so everyone knows what done looks like. First, open Asana and create a workspace named Northline Training. Add sections for Intake, In Progress, and Done. Next, invite collaborators with edit access and share the project overview. Create a template project with recurring tasks for weekly standups. Configure custom fields for priority and owner. Finally, review sharing permissions and answer common questions about guest access and notifications.`;

const ASANA_SUMMARY = `## Asana PM Software Activation — Summary

### Overview
This session activates Asana for a training cohort: workspace setup, project structure, collaboration, and recurring rituals.

### Key topics
1. Create and name the workspace
2. Build Intake → In Progress → Done sections
3. Invite collaborators with the right access
4. Template projects and recurring standup tasks
5. Custom fields for priority and owner
6. Sharing permissions and guest limits

### FAQs
**Q: Can guests edit tasks?**  
A: Guests can comment; edit access requires a full seat.

**Q: How do recurring standups work?**  
A: Use a template task with a weekly recurrence on the standup project.

**Q: Where should intake live?**  
A: Keep a dedicated Intake section so new requests are triaged before work starts.`;

const ASANA_PLAYBOOK = [
  {
    step: 1,
    title: "Create the workspace",
    body: "Open Asana and create a workspace named Northline Training for this cohort.",
    frame: "/img/frames/asana_0s.jpg",
    frameLabel: "asana_0s.jpg",
  },
  {
    step: 2,
    title: "Structure the board",
    body: "Add sections for Intake, In Progress, and Done so work moves in a clear path.",
    frame: "/img/frames/asana_10s.jpg",
    frameLabel: "asana_10s.jpg",
  },
  {
    step: 3,
    title: "Invite the team",
    body: "Invite collaborators with edit access and share the project overview link.",
    frame: "/img/frames/asana_20s.jpg",
    frameLabel: "asana_20s.jpg",
  },
  {
    step: 4,
    title: "Template the project",
    body: "Create a template project with recurring tasks for weekly standups.",
    frame: "/img/frames/asana_30s.jpg",
    frameLabel: "asana_30s.jpg",
  },
  {
    step: 5,
    title: "Add custom fields",
    body: "Configure priority and owner fields so reporting stays consistent.",
    frame: "/img/frames/asana_40s.jpg",
    frameLabel: "asana_40s.jpg",
  },
  {
    step: 6,
    title: "Review sharing rules",
    body: "Confirm guest vs member permissions and notification defaults.",
    frame: "/img/frames/asana_50s.jpg",
    frameLabel: "asana_50s.jpg",
  },
  {
    step: 7,
    title: "FAQ checkpoint",
    body: "Cover guest edit limits, recurring standup setup, and intake triage.",
    frame: "/img/frames/asana_60s.jpg",
    frameLabel: "asana_60s.jpg",
  },
  {
    step: 8,
    title: "Close & next steps",
    body: "Save the playbook, assign owners, and schedule the first standup.",
    frame: "/img/frames/asana_70s.jpg",
    frameLabel: "asana_70s.jpg",
  },
];

const STANDUP_TRANSCRIPT =
  "Team reviewed blockers on the Q4 rollout, confirmed the demo script, and assigned follow-ups for CRM sync and landing copy. Action items: Sam owns FAQ refresh, Alex owns quote template.";

const STANDUP_SUMMARY = `## Weekly Ops Standup — Summary

### Decisions
- Keep demo script frozen through Friday
- CRM sync ships behind feature flag

### Action items
1. Sam — FAQ refresh
2. Alex — quote template

### FAQs
**Q: When does the flag flip?**  
A: After QA sign-off on Thursday.`;

const STANDUP_PLAYBOOK = [
  {
    step: 1,
    title: "Open with blockers",
    body: "List open blockers before status updates.",
    frame: "/img/frames/standup_0s.jpg",
    frameLabel: "standup_0s.jpg",
  },
  {
    step: 2,
    title: "Freeze the demo script",
    body: "Confirm no copy changes until Friday.",
    frame: "/img/frames/standup_20s.jpg",
    frameLabel: "standup_20s.jpg",
  },
  {
    step: 3,
    title: "Assign follow-ups",
    body: "Sam owns FAQ refresh; Alex owns quote template.",
    frame: "/img/frames/standup_40s.jpg",
    frameLabel: "standup_40s.jpg",
  },
];

const ONBOARD_TRANSCRIPT = `Welcome to the Northline product onboarding walkthrough. We will create an account, complete the profile, invite a teammate, and run the first guided task. Start on the signup screen, enter work email, verify the inbox link, then set your display name and timezone. From the home screen open Invite, send a seat to a colleague, and accept the sample project. Finally walk through the first checklist item and mark it done so the progress bar updates.`;

const ONBOARD_SUMMARY = `## Onboarding walkthrough — Summary

### Overview
Guided first-run for a new teammate: account, profile, invite, and first checklist completion.

### Key topics
1. Sign up with work email
2. Verify and set profile defaults
3. Invite a collaborator
4. Accept the sample project
5. Complete the first checklist item

### FAQs
**Q: Can I skip email verify?**  
A: No — the demo requires verify before invites unlock.

**Q: Where is the sample project?**  
A: Home → Sample project after profile save.`;

const ONBOARD_PLAYBOOK = [
  {
    step: 1,
    title: "Open signup",
    body: "Start on the signup screen with a work email.",
    frame: "/img/frames/onboarding_0s.jpg",
    frameLabel: "onboarding_0s.jpg",
  },
  {
    step: 2,
    title: "Verify inbox",
    body: "Open the verify link, then set display name and timezone.",
    frame: "/img/frames/onboarding_10s.jpg",
    frameLabel: "onboarding_10s.jpg",
  },
  {
    step: 3,
    title: "Invite a teammate",
    body: "From Home → Invite, send a seat to a colleague.",
    frame: "/img/frames/onboarding_30s.jpg",
    frameLabel: "onboarding_30s.jpg",
  },
  {
    step: 4,
    title: "Accept sample project",
    body: "Open the sample project and review the starter checklist.",
    frame: "/img/frames/onboarding_50s.jpg",
    frameLabel: "onboarding_50s.jpg",
  },
  {
    step: 5,
    title: "Complete first item",
    body: "Mark the first checklist item done and confirm progress updates.",
    frame: "/img/frames/onboarding_70s.jpg",
    frameLabel: "onboarding_70s.jpg",
  },
];

function framesFromPlaybook(playbook) {
  return playbook.map((s) => ({
    name: s.frameLabel,
    src: s.frame,
    context: s.body,
  }));
}

/** Pickable demo recordings — each has matching transcript / summary / playbook. */
export const SAMPLE_LIBRARY = [
  {
    id: "sample-asana",
    title: "Asana PM Software Activation",
    source: "Lecture · UCB-CRC",
    duration: "12:40",
    thumb: "/img/frames/asana_0s.jpg",
    blurb: "Workspace setup, board sections, invites, and sharing FAQs.",
    models: MODELS,
    transcript: ASANA_TRANSCRIPT,
    summary: ASANA_SUMMARY,
    playbook: ASANA_PLAYBOOK,
    frames: framesFromPlaybook(ASANA_PLAYBOOK),
  },
  {
    id: "sample-standup",
    title: "Weekly Ops Standup",
    source: "Meeting recording",
    duration: "18:05",
    thumb: "/img/frames/standup_0s.jpg",
    blurb: "Blockers, demo-script freeze, and action-item owners.",
    models: MODELS,
    transcript: STANDUP_TRANSCRIPT,
    summary: STANDUP_SUMMARY,
    playbook: STANDUP_PLAYBOOK,
    frames: framesFromPlaybook(STANDUP_PLAYBOOK),
  },
  {
    id: "sample-onboarding",
    title: "Onboarding walkthrough",
    source: "Internal training",
    duration: "08:12",
    thumb: "/img/frames/onboarding_0s.jpg",
    blurb: "Signup, verify, invite a teammate, finish the first checklist.",
    models: MODELS,
    transcript: ONBOARD_TRANSCRIPT,
    summary: ONBOARD_SUMMARY,
    playbook: ONBOARD_PLAYBOOK,
    frames: framesFromPlaybook(ONBOARD_PLAYBOOK),
  },
];

export function getSample(sampleId) {
  return SAMPLE_LIBRARY.find((s) => s.id === sampleId) || null;
}

/** Starter jobs so Jobs/Playbooks aren’t empty before the first queue. */
export const SEED_JOBS = [
  {
    id: "job-asana",
    sampleId: "sample-asana",
    title: "Asana PM Software Activation",
    source: "Lecture · UCB-CRC",
    duration: "12:40",
    status: "ready",
    createdAt: "2026-10-20",
    models: MODELS,
    thumb: "/img/frames/asana_0s.jpg",
    transcript: ASANA_TRANSCRIPT,
    summary: ASANA_SUMMARY,
    playbook: ASANA_PLAYBOOK,
    frames: framesFromPlaybook(ASANA_PLAYBOOK),
  },
  {
    id: "job-standup",
    sampleId: "sample-standup",
    title: "Weekly Ops Standup",
    source: "Meeting recording",
    duration: "18:05",
    status: "ready",
    createdAt: "2026-10-22",
    models: MODELS,
    thumb: "/img/frames/standup_0s.jpg",
    transcript: STANDUP_TRANSCRIPT,
    summary: STANDUP_SUMMARY,
    playbook: STANDUP_PLAYBOOK,
    frames: framesFromPlaybook(STANDUP_PLAYBOOK),
  },
  {
    id: "job-onboard-queued",
    sampleId: "sample-onboarding",
    title: "Onboarding walkthrough",
    source: "Internal training",
    duration: "08:12",
    status: "queued",
    createdAt: "2026-10-27",
    models: MODELS,
    thumb: "/img/frames/onboarding_0s.jpg",
    transcript: "",
    summary: "",
    playbook: [],
    frames: [],
  },
];

export const SEED_USAGE = {
  videosProcessed: 2,
  playbooksReady: 2,
  sttMinutes: 30,
  visionFrames: 11,
};

/** Apply the chosen sample’s prepared outputs after a simulated pipeline run. */
export function outputsFromSample(sample) {
  if (!sample) return null;
  return {
    transcript: sample.transcript,
    summary: sample.summary,
    playbook: structuredClone(sample.playbook),
    frames: structuredClone(sample.frames),
    duration: sample.duration,
    models: { ...sample.models },
    sampleId: sample.id,
  };
}
