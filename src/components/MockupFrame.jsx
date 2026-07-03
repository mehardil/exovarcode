/* Browser + Phone frame wrappers with inline SVG mockup content per project */

function BrowserFrame({ children, url = "yourproject.com" }) {
  return (
    <div className="browser-mockup" style={{ borderRadius: 10, overflow: "hidden", width: "100%", height: "100%" }}>
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot red" />
          <div className="browser-dot yellow" />
          <div className="browser-dot green" />
        </div>
        <div className="browser-url-bar">{url}</div>
      </div>
      <div className="browser-content" style={{ height: "calc(100% - 36px)" }}>
        {children}
      </div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: "60%",
      margin: "0 auto",
      background: "#0d1117",
      borderRadius: 28,
      border: "2px solid rgba(255,255,255,0.1)",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      aspectRatio: "9/19.5",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "40%", height: 22, background: "#0d1117",
        borderRadius: "0 0 14px 14px", zIndex: 2,
      }} />
      <div style={{ paddingTop: 24, height: "100%", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ---- Per-project mockup content ---- */

function NovaMartMockup() {
  return (
    <div style={{ background: "#f8f4ef", height: "100%", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ background: "#1a1a2e", height: 28, borderRadius: 4, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, background: "linear-gradient(135deg,#ff6b6b,#ee5a24)" }} />
        <div style={{ flex: 1, display: "flex", gap: 6 }}>
          {[40, 30, 35, 28].map((w, i) => (
            <div key={i} style={{ width: w, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
        <div style={{ width: 50, height: 16, borderRadius: 8, background: "#ee5a24" }} />
      </div>
      <div style={{ background: "linear-gradient(135deg,#ee5a24,#f9ca24)", borderRadius: 6, padding: 10, color: "#fff" }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: "#fff", marginBottom: 4 }}>SUMMER SALE — UP TO 60% OFF</div>
        <div style={{ width: "60%", height: 5, borderRadius: 3, background: "rgba(255,255,255,0.4)", marginBottom: 8 }} />
        <div style={{ width: 44, height: 14, borderRadius: 4, background: "#fff" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, flex: 1 }}>
        {[
          { c1: "#e8d5c4", c2: "#c8a882" },
          { c1: "#c4d5e8", c2: "#82a8c8" },
          { c1: "#d5e8c4", c2: "#a8c882" },
        ].map((c, i) => (
          <div key={i} style={{ background: c.c1, borderRadius: 5, padding: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ height: "55%", background: c.c2, borderRadius: 3 }} />
            <div style={{ height: 5, background: "rgba(0,0,0,0.15)", borderRadius: 2, width: "80%" }} />
            <div style={{ height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 2, width: "50%" }} />
            <div style={{ height: 10, background: "#ee5a24", borderRadius: 3, width: "70%", marginTop: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PulseMetricsMockup() {
  const bars = [35, 55, 42, 70, 48, 85, 62, 90, 72, 95];
  return (
    <div style={{ background: "#0a0e17", height: "100%", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {[
          { val: "85.2K", label: "Users", color: "#24d7c5" },
          { val: "+340%", label: "Revenue", color: "#f2b84b" },
          { val: "98.2%", label: "Uptime", color: "#7bed9f" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "#131820", borderRadius: 5, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#131820", borderRadius: 5, padding: 8, flex: 1, border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Revenue Trend</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: "70%" }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: "2px 2px 0 0",
              background: i === bars.length - 1
                ? "linear-gradient(180deg,#24d7c5,rgba(36,215,197,0.3))"
                : `rgba(36,215,197,${0.15 + (i / bars.length) * 0.25})`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AutoLeadMockup() {
  return (
    <div style={{ background: "#0f1623", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#161e30", padding: "6px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} />
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          {[50, 40, 45].map((w, i) => (
            <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
        <div style={{ width: 40, height: 14, borderRadius: 4, background: "#7c3aed" }} />
      </div>
      <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {[
            { n: "4.2×", l: "Leads", c: "#a855f7" },
            { n: "68%", l: "Conv.", c: "#24d7c5" },
            { n: "$2.1M", l: "Pipeline", c: "#f2b84b" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 5, padding: 6, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", borderRadius: 5, padding: 6, border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>Lead Pipeline</div>
          {["New — 142", "Qualified — 89", "Proposal — 45", "Closed — 28"].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", width: 70 }}>{r}</div>
              <div style={{ flex: 1, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ width: `${[100, 63, 32, 20][i]}%`, height: "100%", borderRadius: 3, background: ["#a855f7","#24d7c5","#f2b84b","#7bed9f"][i] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GreenGlowMockup() {
  return (
    <div style={{ background: "#f0f7f0", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#2d5a27", padding: "6px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#7ed56f" }} />
        <div style={{ flex: 1, display: "flex", gap: 8 }}>
          {[35, 40, 30, 35].map((w, i) => (
            <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
        <div style={{ width: 50, height: 16, borderRadius: 4, background: "#7ed56f" }} />
      </div>
      <div style={{ background: "linear-gradient(180deg,#2d5a27,#4a8a42)", padding: 14, flex: 0.5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ height: 10, width: "60%", background: "rgba(255,255,255,0.9)", borderRadius: 3, marginBottom: 6 }} />
        <div style={{ height: 6, width: "80%", background: "rgba(255,255,255,0.4)", borderRadius: 2, marginBottom: 4 }} />
        <div style={{ height: 6, width: "65%", background: "rgba(255,255,255,0.4)", borderRadius: 2, marginBottom: 10 }} />
        <div style={{ width: 55, height: 18, background: "#f2b84b", borderRadius: 5 }} />
      </div>
      <div style={{ padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, flex: 1 }}>
        {["#e8f5e8","#f0f8e8","#e8f0f5"].map((bg, i) => (
          <div key={i} style={{ background: bg, borderRadius: 5, padding: 6 }}>
            <div style={{ height: 40, background: ["#c8e6c8","#d4edda","#c8dce6"][i], borderRadius: 3, marginBottom: 5 }} />
            <div style={{ height: 5, background: "rgba(0,0,0,0.12)", borderRadius: 2, marginBottom: 3 }} />
            <div style={{ height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2, width: "70%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskFlowMockup() {
  return (
    <div style={{ background: "#1a1a2e", height: "100%", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: "#fff" }}>TaskFlow Pro</div>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#3f3d91)" }} />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["Today", "Week", "All"].map((t, i) => (
          <div key={i} style={{ padding: "3px 8px", borderRadius: 4, background: i === 0 ? "#6c63ff" : "rgba(255,255,255,0.06)", fontSize: 7, color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 600 }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        {[
          { label: "Design review", done: true, c: "#6c63ff" },
          { label: "API integration", done: true, c: "#24d7c5" },
          { label: "QA testing", done: false, c: "#f2b84b" },
          { label: "Deploy v2.1", done: false, c: "#ff7b54" },
          { label: "Client demo", done: false, c: "#a855f7" },
        ].map((task, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 5,
            padding: "5px 8px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            border: `1px solid ${task.done ? "rgba(108,99,255,0.3)" : "rgba(255,255,255,0.06)"}`,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: task.done ? task.c : "rgba(255,255,255,0.1)", border: `1.5px solid ${task.c}`, flexShrink: 0 }} />
            <div style={{ height: 5, flex: 1, borderRadius: 2, background: task.done ? `${task.c}40` : "rgba(255,255,255,0.12)", textDecoration: task.done ? "line-through" : "none" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CloudStackMockup() {
  return (
    <div style={{ background: "#06080d", height: "100%", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {[
          { label: "Uptime", val: "99.98%", c: "#7bed9f" },
          { label: "Latency", val: "12ms", c: "#24d7c5" },
          { label: "Requests/s", val: "142K", c: "#f2b84b" },
          { label: "Error Rate", val: "0.02%", c: "#ff7b54" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#10151f", borderRadius: 5, padding: 7, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: s.c }}>{s.val}</div>
            <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "#10151f", borderRadius: 5, border: "1px solid rgba(255,255,255,0.05)", padding: 8 }}>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>Infrastructure Health</div>
        {["API Gateway", "App Servers (6)", "Database Cluster", "CDN Edge"].map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7bed9f", boxShadow: "0 0 6px #7bed9f", flexShrink: 0 }} />
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", flex: 1 }}>{n}</div>
            <div style={{ fontSize: 7, color: "#7bed9f", fontWeight: 700 }}>Healthy</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FitLifeMockup() {
  return (
    <div style={{ background: "#0d1117", height: "100%", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: "#fff" }}>FitLife</div>
        <div style={{ display: "flex", gap: 3 }}>
          {"★★★★★".split("").map((s, i) => <span key={i} style={{ fontSize: 8, color: "#f2b84b" }}>{s}</span>)}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#ff7b54,#f2b84b)", borderRadius: 8, padding: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.8)" }}>Today's Goal</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: "2px 0" }}>8,240 / 10,000</div>
        <div style={{ fontSize: 6, color: "rgba(255,255,255,0.6)" }}>steps</div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2, marginTop: 6 }}>
          <div style={{ width: "82%", height: "100%", background: "#fff", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, flex: 1 }}>
        {[
          { icon: "🏃", label: "Run", val: "5.2km", c: "#ff7b54" },
          { icon: "💪", label: "Strength", val: "45min", c: "#a855f7" },
          { icon: "🧘", label: "Yoga", val: "30min", c: "#24d7c5" },
          { icon: "🔥", label: "Calories", val: "820", c: "#f2b84b" },
        ].map((a, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: 7, border: `1px solid ${a.c}30` }}>
            <div style={{ fontSize: 10 }}>{a.icon}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{a.label}</div>
            <div style={{ fontSize: 9, fontWeight: 800, color: a.c, marginTop: 1 }}>{a.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EduConnectMockup() {
  return (
    <div style={{ background: "#f8faff", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1e3a8a", padding: "6px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, background: "#3b82f6" }} />
        <div style={{ flex: 1, display: "flex", gap: 6 }}>
          {[35, 40, 30].map((w, i) => <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />)}
        </div>
        <div style={{ width: 44, height: 14, borderRadius: 4, background: "#3b82f6" }} />
      </div>
      <div style={{ padding: 8, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {[
            { n: "12K", l: "Students", c: "#1e3a8a" },
            { n: "4.9★", l: "Rating", c: "#f59e0b" },
            { n: "96%", l: "Completion", c: "#10b981" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 5, padding: 6, border: "1px solid #e5e7eb", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 6, color: "#6b7280" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {["Intro to React", "Advanced Python", "UI/UX Design", "Data Science"].map((course, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 5, padding: "5px 8px", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: ["#dbeafe","#dcfce7","#fce7f3","#fef3c7"][i], flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 5, background: "#1e3a8a", borderRadius: 2, width: "75%", marginBottom: 3 }} />
                <div style={{ height: 4, background: "#d1d5db", borderRadius: 2, width: "50%" }} />
              </div>
              <div style={{ width: 30, height: 3, background: "#e5e7eb", borderRadius: 2 }}>
                <div style={{ width: `${[85, 60, 40, 20][i]}%`, height: "100%", background: "#3b82f6", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StreamOpsMockup() {
  return (
    <div style={{ background: "#04080f", height: "100%", padding: 8, display: "flex", flexDirection: "column", gap: 6, fontFamily: "monospace" }}>
      <div style={{ display: "flex", gap: 5 }}>
        {[
          { n: "60%", l: "Cost Cut", c: "#24d7c5" },
          { n: "340", l: "Pods", c: "#7bed9f" },
          { n: "0", l: "Incidents", c: "#f2b84b" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "#0d1117", borderRadius: 4, padding: "5px 7px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "#0d1117", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)", padding: 7, overflow: "hidden" }}>
        <div style={{ fontSize: 6, color: "#24d7c5", marginBottom: 4 }}>$ kubectl get pods --all-namespaces</div>
        {["api-gateway-7f9b4  Running  2d", "worker-pool-x8k2   Running  5h", "db-primary-0       Running  12d", "cache-redis-2f4j   Running  3d"].map((line, i) => (
          <div key={i} style={{ fontSize: 6, color: ["#7bed9f","#7bed9f","#7bed9f","#f2b84b"][i], lineHeight: 1.7, opacity: 0.85 }}>{line}</div>
        ))}
      </div>
    </div>
  );
}

/* ---- Export map ---- */
export const MOCKUP_COMPONENTS = {
  novamart: NovaMartMockup,
  pulsemetrics: PulseMetricsMockup,
  autolead: AutoLeadMockup,
  greenglow: GreenGlowMockup,
  taskflow: TaskFlowMockup,
  cloudstack: CloudStackMockup,
  fitlife: FitLifeMockup,
  educonnect: EduConnectMockup,
  streamops: StreamOpsMockup,
};

export default function MockupFrame({ type = "browser", projectKey = "novamart", url }) {
  const Content = MOCKUP_COMPONENTS[projectKey] || NovaMartMockup;

  if (type === "phone") {
    return (
      <PhoneFrame>
        <Content />
      </PhoneFrame>
    );
  }

  return (
    <BrowserFrame url={url || `${projectKey}.io`}>
      <Content />
    </BrowserFrame>
  );
}
