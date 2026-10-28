import { useCallback, useMemo, useState } from "react";
import { PIPELINE_STEPS, SEED_JOBS, SEED_USAGE } from "../data/seed";
import { StoreCtx } from "./storeContext";

const STORE_KEY = "videodoc_store_v1";

const defaults = () => ({
  jobs: structuredClone(SEED_JOBS),
  usage: { ...SEED_USAGE },
});

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const base = defaults();
    return {
      ...base,
      ...parsed,
      usage: { ...base.usage, ...(parsed.usage || {}) },
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : base.jobs,
    };
  } catch {
    return null;
  }
}

function persist(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => load() || defaults());
  const [toast, setToast] = useState("");
  const [runningId, setRunningId] = useState(null);
  const [pipelineStep, setPipelineStep] = useState(-1);

  const commit = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      persist(next);
      return next;
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2200);
  }, []);

  const resetDemo = useCallback(() => {
    const next = defaults();
    persist(next);
    setState(next);
    setRunningId(null);
    setPipelineStep(-1);
    showToast("Demo data reset");
  }, [showToast]);

  const runPipeline = useCallback(
    async (jobId) => {
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job || runningId) return;
      setRunningId(jobId);
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, status: "processing" } : j)),
      }));
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        setPipelineStep(i);
        await new Promise((r) => setTimeout(r, 700));
      }
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => {
          if (j.id !== jobId) return j;
          if (j.playbook?.length) return { ...j, status: "ready" };
          // seed draft from asana template if empty
          const template = SEED_JOBS[0];
          return {
            ...j,
            status: "ready",
            transcript: j.transcript || template.transcript,
            summary: j.summary || template.summary,
            playbook: j.playbook?.length ? j.playbook : template.playbook,
            frames: j.frames?.length ? j.frames : template.frames,
          };
        }),
        usage: {
          ...s.usage,
          videosProcessed: s.usage.videosProcessed + (job.status === "queued" ? 1 : 0),
          playbooksReady: s.usage.playbooksReady + (job.status === "queued" ? 1 : 0),
        },
      }));
      setPipelineStep(-1);
      setRunningId(null);
      showToast("Playbook ready");
    },
    [commit, runningId, showToast, state.jobs]
  );

  const addJob = useCallback(
    ({ title, source }) => {
      const id = `job-${Date.now()}`;
      const job = {
        id,
        title: title.trim() || "Untitled recording",
        source: source.trim() || "Uploaded video",
        duration: "—",
        status: "queued",
        createdAt: new Date().toISOString().slice(0, 10),
        models: {
          stt: "openai/whisper-large-v3-turbo",
          vision: "llama-3.2-11b-vision",
          writer: "llama-3.1-8b",
        },
        transcript: "",
        summary: "",
        playbook: [],
        frames: [],
      };
      commit((s) => ({ ...s, jobs: [job, ...s.jobs] }));
      showToast("Job queued");
      return id;
    },
    [commit, showToast]
  );

  const value = useMemo(
    () => ({
      ...state,
      toast,
      showToast,
      resetDemo,
      runPipeline,
      addJob,
      runningId,
      pipelineStep,
      pipelineSteps: PIPELINE_STEPS,
    }),
    [state, toast, showToast, resetDemo, runPipeline, addJob, runningId, pipelineStep]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
