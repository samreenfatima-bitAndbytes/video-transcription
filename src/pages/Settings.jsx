import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

export default function Settings() {
  const { user } = useAuth();
  const { usage, resetDemo } = useStore();
  const isAdmin = Boolean(user?.isAdmin);

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Settings</h2>
          <p className="muted" style={{ margin: "0.35rem 0 0" }}>
            {isAdmin ? "Org models & usage" : "Your trainer profile & pipeline defaults"}
          </p>
        </div>
      </div>

      {isAdmin ? (
        <div className="grid-2">
          <div className="panel">
            <h3 style={{ marginTop: 0 }}>Org pipeline stack</h3>
            <dl className="detail-dl">
              <div>
                <dt>Runtime</dt>
                <dd>Google Colab / Hugging Face</dd>
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
            </dl>
          </div>
          <div className="panel">
            <h3 style={{ marginTop: 0 }}>Org usage</h3>
            <dl className="detail-dl">
              <div>
                <dt>Videos</dt>
                <dd>{usage.videosProcessed}</dd>
              </div>
              <div>
                <dt>Playbooks</dt>
                <dd>{usage.playbooksReady}</dd>
              </div>
              <div>
                <dt>STT minutes</dt>
                <dd>{usage.sttMinutes}</dd>
              </div>
              <div>
                <dt>Vision frames</dt>
                <dd>{usage.visionFrames}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-ghost" style={{ marginTop: "1rem" }} onClick={resetDemo}>
              Reset demo data
            </button>
          </div>
        </div>
      ) : (
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
                <dd>Trainer</dd>
              </div>
              <div>
                <dt>Org</dt>
                <dd>{user?.org}</dd>
              </div>
            </dl>
          </div>
          <div className="panel">
            <h3 style={{ marginTop: 0 }}>Your defaults</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              New videos use Whisper STT, LLaMA 3.2 vision frames, and a playbook writer. Admins
              manage seats and org-wide usage.
            </p>
            <dl className="detail-dl">
              <div>
                <dt>STT</dt>
                <dd>whisper-large-v3-turbo</dd>
              </div>
              <div>
                <dt>Vision</dt>
                <dd>llama-3.2-11b-vision</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
