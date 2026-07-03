import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="boot-error wrap">
          <p className="eyebrow">Sync-Oaks</p>
          <h1>Black digital product studio for websites, apps, SEO, cloud, and automation.</h1>
          <p>{this.state.error.message}</p>
          <div className="actions">
            <a className="primary fallback-link" href="mailto:support@syncoaks.com?subject=New%20Sync-Oaks%20project">
              Start a Project
            </a>
            <a className="secondary fallback-link" href="https://meet.google.com/new">
              Google Meet
            </a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function showBootError(error) {
  rootElement.innerHTML = `
    <main class="boot-error wrap">
      <p class="eyebrow">React startup issue</p>
      <h1>Sync-Oaks could not start in this browser session.</h1>
      <p>${error?.message || "Unknown startup error"}</p>
      <a class="primary fallback-link" href="mailto:support@syncoaks.com">Contact Sync-Oaks</a>
    </main>
  `;
}

try {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} catch (error) {
  showBootError(error);
}
