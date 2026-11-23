import { CheckCircle2, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "../lib/site";
import { LeadForm } from "./LeadForm";

export function BookingSection({
  source = "website",
  defaultService = "",
  eyebrow = "Start a project",
  title = "Two ways to start. Both reach the owner.",
  intro = "Pick the path that suits you. Message on WhatsApp for a quick conversation, or send a short brief and we will reply within one business day.",
  id = "book",
}) {
  return (
    <section className="section section-border" id={id}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-lead">{intro}</p>
        </div>

        <div className="booking-grid">
          <div className="booking-options">
            <div className="option-card">
              <span className="tag">Option A</span>
              <h3 style={{ marginTop: "0.7rem" }}>Chat on WhatsApp</h3>
              <p>
                Best for a quick question, a timeline check, or an intro conversation.
                It opens with a prefilled message so you do not have to start from scratch.
              </p>
              <a
                href={whatsappUrl("Hi Sync-Oaks, I'd like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-block btn-lg"
                data-track="cta_whatsapp"
                data-track-location={`booking_${source}`}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Open WhatsApp
              </a>
              <div className="option-meta">
                <Clock size={13} aria-hidden="true" />
                Typical reply: within a few business hours
              </div>
            </div>

            <div className="option-card">
              <span className="tag">Option B</span>
              <h3 style={{ marginTop: "0.7rem" }}>Send an email brief</h3>
              <p>
                Use the short form. It goes directly to the owner inbox with your
                reply-to address, so replying to our response reaches you.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={15} aria-hidden="true" />Only four short fields</li>
                <li><ShieldCheck size={15} aria-hidden="true" />Spam-protected and stored safely</li>
                <li><Clock size={15} aria-hidden="true" />Reply within one business day</li>
              </ul>
            </div>
          </div>

          <LeadForm source={source} defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
