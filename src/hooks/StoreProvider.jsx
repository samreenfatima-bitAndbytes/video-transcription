import { useCallback, useMemo, useState } from "react";
import {
  PIPELINE_STEPS,
  SEED_JOBS,
  SEED_USAGE,
  getSample,
  outputsFromSample,
} from "../data/seed";
import { StoreCtx } from "./storeContext";

const STORE_KEY = "videodoc_store_v6";

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
      const sample = getSample(job.sampleId);
      const outputs = outputsFromSample(sample);
      commit((s) => ({
        ...s,
        jobs: s.jobs.map((j) => {
          if (j.id !== jobId) return j;
          if (!outputs) return { ...j, status: "ready" };
          return {
            ...j,
            status: "ready",
            ...outputs,
          };
        }),
        usage: {
          ...s.usage,
          videosProcessed: s.usage.videosProcessed + (job.status === "queued" ? 1 : 0),
          playbooksReady: s.usage.playbooksReady + (job.status === "queued" ? 1 : 0),
          sttMinutes: s.usage.sttMinutes + 8,
          visionFrames: s.usage.visionFrames + (outputs?.frames?.length || 0),
        },
      }));
      setPipelineStep(-1);
      setRunningId(null);
      showToast("Playbook ready");
    },
    [commit, runningId, showToast, state.jobs]
  );

  const queueSample = useCallback(
    (sampleId) => {
      const sample = getSample(sampleId);
      if (!sample) return null;
      const id = `job-${Date.now()}`;
      const job = {
        id,
        sampleId: sample.id,
        title: sample.title,
        source: sample.source,
        duration: sample.duration,
        status: "queued",
        createdAt: new Date().toISOString().slice(0, 10),
        models: { ...sample.models },
        thumb: sample.thumb,
        transcript: "",
        summary: "",
        playbook: [],
        frames: [],
      };
      commit((s) => ({ ...s, jobs: [job, ...s.jobs] }));
      showToast(`Queued “${sample.title}”`);
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
      queueSample,
      runningId,
      pipelineStep,
      pipelineSteps: PIPELINE_STEPS,
    }),
    [state, toast, showToast, resetDemo, runPipeline, queueSample, runningId, pipelineStep]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
