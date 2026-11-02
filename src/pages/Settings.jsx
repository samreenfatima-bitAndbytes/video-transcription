import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Settings() {
  const { user } = useAuth();
  const { usage, resetDemo } = useStore();

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Settings</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            Operator profile &amp; notebook model defaults
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <dl className="detail-dl">
            <div>
              <dt>Name</dt>
              <dd>{user?.fullName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user?.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Operator (single-user demo)</dd>
            </div>
            <div>
              <dt>Workspace</dt>
              <dd>{user?.org}</dd>
            </div>
          </dl>
        </div>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Pipeline stack</h3>
          <p className="muted" style={{ marginTop: 0 }}>
            Labels match the Colab notebook. Here they are simulated — no live model calls.
          </p>
          <aside className="ai-note ai-note-compact">
            <strong>Real requirement</strong>
            <p>
              Live STT + LLM + vision need Colab/GPU or hosted APIs (Hugging Face / OpenAI-style
              keys), model downloads or endpoints, and storage for uploads. This Vercel demo has
              none of that wired.
            </p>
          </aside>
          <dl className="detail-dl">
            <div>
              <dt>Runtime</dt>
              <dd>Google Colab / Hugging Face (original)</dd>
            </div>
            <div>
              <dt>Speech-to-text</dt>
              <dd>Whisper large-v3-turbo</dd>
            </div>
            <div>
              <dt>Vision</dt>
              <dd>LLaMA 3.2 vision</dd>
            </div>
            <div>
              <dt>Playbook LLM</dt>
              <dd>LLaMA 3.1 instruct</dd>
            </div>
            <div>
              <dt>Videos processed (demo)</dt>
              <dd>{usage.videosProcessed}</dd>
            </div>
            <div>
              <dt>Playbooks ready (demo)</dt>
              <dd>{usage.playbooksReady}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ marginTop: "1rem" }}
            onClick={resetDemo}
          >
            Reset demo data
          </button>
        </div>
      </div>
    </div>
  );
}
