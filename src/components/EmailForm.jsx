import React from "react";
import { SITE, mailto } from "../config/site";

export function EmailForm({ children, subject, message, onSubmitted, className = "modal-form", formName = "XoCODE Form" }) {
  const fallbackBody = "Please send this request to XoCODE.";
  const submittedAt = new Date().toLocaleString();

  return (
    <>
      <iframe className="hidden-frame" name="email-submit-frame" title="Email submission status" />
      <form
        className={className}
        action={SITE.formEndpoint}
        method="POST"
        target="email-submit-frame"
        onSubmit={() => window.setTimeout(onSubmitted, 500)}
      >
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={window.location.href} />
        <input type="hidden" name="Form Name" value={formName} />
        <input type="hidden" name="Website" value={SITE.name} />
        <input type="hidden" name="Destination Email" value={SITE.email} />
        <input type="hidden" name="Submitted At" value={submittedAt} />
        <input type="hidden" name="Submitted From Page" value={window.location.href} />
        {children}
      </form>
      <a className="email-fallback" href={mailto(subject, message || fallbackBody)}>
        Email fallback
      </a>
    </>
  );
}
