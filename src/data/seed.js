export const DEMO_PASSWORD = "DemoPass1!";

export const DEMO_USERS = [
  {
    id: "u-admin",
    email: "admin@videodoc.example",
    password: DEMO_PASSWORD,
    fullName: "Alex Rivera",
    role: "admin",
    isAdmin: true,
    org: "Northline Training",
  },
  {
    id: "u-user",
    email: "trainer@videodoc.example",
    password: DEMO_PASSWORD,
    fullName: "Sam Ortiz",
    role: "user",
    isAdmin: false,
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
    frame: "/img/frames/frame_0s.jpg",
    frameLabel: "frame_0s.jpg",
  },
  {
    step: 2,
    title: "Structure the board",
    body: "Add sections for Intake, In Progress, and Done so work moves in a clear path.",
    frame: "/img/frames/frame_10s.jpg",
    frameLabel: "frame_10s.jpg",
  },
  {
    step: 3,
    title: "Invite the team",
    body: "Invite collaborators with edit access and share the project overview link.",
    frame: "/img/frames/frame_20s.jpg",
    frameLabel: "frame_20s.jpg",
  },
  {
    step: 4,
    title: "Template the project",
    body: "Create a template project with recurring tasks for weekly standups.",
    frame: "/img/frames/frame_30s.jpg",
    frameLabel: "frame_30s.jpg",
  },
  {
    step: 5,
    title: "Add custom fields",
    body: "Configure priority and owner fields so reporting stays consistent.",
    frame: "/img/frames/frame_40s.jpg",
    frameLabel: "frame_40s.jpg",
  },
  {
    step: 6,
    title: "Review sharing rules",
    body: "Confirm guest vs member permissions and notification defaults.",
    frame: "/img/frames/frame_50s.jpg",
    frameLabel: "frame_50s.jpg",
  },
  {
    step: 7,
    title: "FAQ checkpoint",
    body: "Cover guest edit limits, recurring standup setup, and intake triage.",
    frame: "/img/frames/frame_60s.jpg",
    frameLabel: "frame_60s.jpg",
  },
  {
    step: 8,
    title: "Close & next steps",
    body: "Save the playbook, assign owners, and schedule the first standup.",
    frame: "/img/frames/frame_70s.jpg",
    frameLabel: "frame_70s.jpg",
  },
];

export const SEED_JOBS = [
  {
    id: "job-asana",
    title: "Asana PM Software Activation",
    source: "Lecture · UCB-CRC",
    duration: "12:40",
    status: "ready",
    createdAt: "2026-10-20",
    models: {
      stt: "openai/whisper-large-v3-turbo",
      vision: "llama-3.2-11b-vision",
      writer: "llama-3.1-8b",
    },
    transcript: ASANA_TRANSCRIPT,
    summary: ASANA_SUMMARY,
    playbook: ASANA_PLAYBOOK,
    frames: ASANA_PLAYBOOK.map((s) => ({
      name: s.frameLabel,
      src: s.frame,
      context: s.body,
    })),
  },
  {
    id: "job-standup",
    title: "Weekly Ops Standup",
    source: "Meeting recording",
    duration: "18:05",
    status: "ready",
    createdAt: "2026-10-22",
    models: {
      stt: "openai/whisper-large-v3-turbo",
      vision: "llama-3.2-11b-vision",
      writer: "llama-3.1-8b",
    },
    transcript:
      "Team reviewed blockers on the Q4 rollout, confirmed the demo script, and assigned follow-ups for CRM sync and landing copy. Action items: Sam owns FAQ refresh, Alex owns quote template.",
    summary: `## Weekly Ops Standup — Summary

### Decisions
- Keep demo script frozen through Friday
- CRM sync ships behind feature flag

### Action items
1. Sam — FAQ refresh
2. Alex — quote template

### FAQs
**Q: When does the flag flip?**  
A: After QA sign-off on Thursday.`,
    playbook: [
      {
        step: 1,
        title: "Open with blockers",
        body: "List open blockers before status updates.",
        frame: "/img/frames/frame_0s.jpg",
        frameLabel: "frame_0s.jpg",
      },
      {
        step: 2,
        title: "Freeze the demo script",
        body: "Confirm no copy changes until Friday.",
        frame: "/img/frames/frame_20s.jpg",
        frameLabel: "frame_20s.jpg",
      },
      {
        step: 3,
        title: "Assign follow-ups",
        body: "Sam owns FAQ refresh; Alex owns quote template.",
        frame: "/img/frames/frame_40s.jpg",
        frameLabel: "frame_40s.jpg",
      },
    ],
    frames: [
      {
        name: "frame_0s.jpg",
        src: "/img/frames/frame_0s.jpg",
        context: "Team board with blockers highlighted",
      },
      {
        name: "frame_20s.jpg",
        src: "/img/frames/frame_20s.jpg",
        context: "Demo script document on screen",
      },
      {
        name: "frame_40s.jpg",
        src: "/img/frames/frame_40s.jpg",
        context: "Action items assigned in chat",
      },
    ],
  },
  {
    id: "job-draft",
    title: "Onboarding walkthrough (draft)",
    source: "Internal training",
    duration: "08:12",
    status: "queued",
    createdAt: "2026-10-27",
    models: {
      stt: "openai/whisper-large-v3-turbo",
      vision: "llama-3.2-11b-vision",
      writer: "llama-3.1-8b",
    },
    transcript: "",
    summary: "",
    playbook: [],
    frames: [],
  },
];

export const SEED_USAGE = {
  videosProcessed: 14,
  playbooksReady: 11,
  sttMinutes: 186,
  visionFrames: 420,
};
