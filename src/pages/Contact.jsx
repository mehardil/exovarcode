import React from "react";
import { SITE, phoneHref } from "../config/site";
import { EmailForm } from "../components/EmailForm";
import { SectionIntro } from "../components/SectionIntro";

export function Contact({ openBooking, setSuccess }) {
  return (
    <>
      <SectionIntro label="Contact" title="Tell us what you want to build." />
      <section className="contact-grid wrap">
        <div className="contact-panel">
          <h3>Direct Contact</h3>
          <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p>Phone / WhatsApp: <a href={phoneHref()}>{SITE.phone}</a></p>
          <p>Location: Islamabad, Pakistan. Serving clients worldwide.</p>
          <div className="contact-actions">
            <button className="primary" onClick={openBooking}>Book Meeting</button>
            <a className="secondary link-button" href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className="meeting-card">
            <span>Google Meet</span>
            <a href={SITE.googleMeet} target="_blank" rel="noreferrer">Open Meet</a>
          </div>
          <div className="meeting-card">
            <span>Zoom Meeting</span>
            <a href={SITE.zoom} target="_blank" rel="noreferrer">Open Zoom</a>
          </div>
        </div>
        <EmailForm
          className="form-card"
          subject="New XoCODE website inquiry"
          formName="Contact Form Inquiry"
          message="New structured website inquiry for XoCODE"
          onSubmitted={() => setSuccess(`Your inquiry was submitted to ${SITE.email}.`)}
        >
          <input type="hidden" name="Inquiry Source" value="XoCODE Contact Page" />
          <input type="hidden" name="Form Purpose" value="New project inquiry / consultation request" />
          <div className="form-row">
            <label>Business Name<input required name="01 - Business Name" placeholder="Company or brand name" /></label>
            <label>Your Name<input required name="02 - Contact Person Name" placeholder="Full name" /></label>
          </div>
          <div className="form-row">
            <label>Email<input required type="email" name="03 - Email Address" placeholder="name@example.com" /></label>
            <label>Phone / WhatsApp<input name="04 - Phone or WhatsApp" placeholder="+92 ..." /></label>
          </div>
          <div className="form-row">
            <label>Location<input name="05 - Location" placeholder="City, Country" /></label>
            <label>Preferred Contact
              <select name="06 - Preferred Contact Method">
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Phone Call</option>
                <option>Google Meet</option>
                <option>Zoom Meeting</option>
              </select>
            </label>
          </div>
          <label>Service
            <select name="07 - Service Needed">
              <option>Full-Stack Development</option>
              <option>SEO Growth</option>
              <option>Digital Marketing</option>
              <option>Cloud & DevOps</option>
              <option>Data Engineering</option>
              <option>Automation Systems</option>
              <option>Multiple Services</option>
              <option>Not Sure / Need Guidance</option>
            </select>
          </label>
          <div className="form-row">
            <label>Budget
              <select name="08 - Budget Range">
                <option>Under $100</option>
                <option>$100 - $500</option>
                <option>$500 - $2,000</option>
                <option>$2,000+</option>
                <option>Need guidance</option>
              </select>
            </label>
            <label>Timeline
              <select name="09 - Project Timeline">
                <option>ASAP</option>
                <option>1 - 2 weeks</option>
                <option>1 month</option>
                <option>2 - 3 months</option>
                <option>Flexible</option>
              </select>
            </label>
          </div>
          <label>Meeting Preference
            <select name="10 - Meeting Preference">
              <option>Google Meet</option>
              <option>Zoom Meeting</option>
              <option>WhatsApp Call</option>
              <option>Phone Call</option>
              <option>Email first</option>
            </select>
          </label>
          <label>Existing Website or Reference Link<input name="11 - Existing Website or Reference Link" placeholder="https://..." /></label>
          <label>Project Goals<textarea required name="12 - Project Goals" placeholder="What do you want to achieve? Leads, sales, automation, better SEO, new website, dashboard, etc." /></label>
          <label>Detailed Requirements<textarea name="13 - Detailed Requirements" placeholder="Pages, features, integrations, design ideas, competitors, deadline notes, or anything important." /></label>
          <label>Extra Notes<textarea name="14 - Extra Notes" placeholder="Any additional information we should know before replying." /></label>
          <input type="hidden" name="15 - Reply Instructions" value="Reply to the client using the email and phone/WhatsApp provided above." />
          <button className="primary full" type="submit">Send Complete Inquiry</button>
        </EmailForm>
      </section>
    </>
  );
}
