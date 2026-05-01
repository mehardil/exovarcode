import React, { useMemo, useState } from "react";
import { SITE } from "../config/site";
import { EmailForm } from "./EmailForm";
import { Modal } from "./Modal";

function toCalendarDate(date, time, offsetMinutes = 0) {
  if (!date || !time) {
    return "";
  }

  const value = new Date(`${date}T${time}`);
  value.setMinutes(value.getMinutes() + offsetMinutes);
  return value.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildGoogleCalendarInvite(booking) {
  const start = toCalendarDate(booking.date, booking.time);
  const end = toCalendarDate(booking.date, booking.time, 30);
  const dates = start && end ? `${start}/${end}` : "";
  const details = [
    `Client: ${booking.name || "Not provided"}`,
    `Business: ${booking.business || "Not provided"}`,
    `Email: ${booking.email || "Not provided"}`,
    `Phone: ${booking.phone || "Not provided"}`,
    `Service: ${booking.service || "Not provided"}`,
    `Meeting Format: ${booking.format}`,
    "",
    `Agenda: ${booking.agenda || "Not provided"}`,
    `Project Link: ${booking.projectLink || "Not provided"}`,
    `Extra Notes: ${booking.notes || "Not provided"}`,
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `XoCODE Meeting - ${booking.business || booking.name || "New Client"}`,
    details,
    location: booking.format,
    add: [SITE.email, booking.email].filter(Boolean).join(","),
  });

  if (dates) {
    params.set("dates", dates);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function BookingModal({ close, done }) {
  const [booking, setBooking] = useState({
    format: "Google Meet",
    service: "Full-Stack Development",
    name: "",
    business: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    agenda: "",
    projectLink: "",
    notes: "",
  });

  const update = (key, value) => setBooking((current) => ({ ...current, [key]: value }));

  const calendarInvite = useMemo(() => buildGoogleCalendarInvite(booking), [booking]);
  const meetingActionLink = booking.format === "Zoom Meeting" ? SITE.zoom : SITE.googleMeet;

  return (
    <Modal close={close} title="Book a Meeting" subtitle="Choose Google Meet, Zoom, WhatsApp, or phone.">
      <div className="invite-summary">
        <span>Invite will be included in email</span>
        <strong>{booking.format}</strong>
        <p>The booking email includes the selected platform, preferred schedule, and a prefilled Google Calendar invite URL.</p>
      </div>
      <EmailForm
        subject="Book a meeting with XoCODE"
        formName="Meeting Booking Request"
        message="Structured meeting booking request for XoCODE"
        onSubmitted={() => done(`Meeting request submitted to ${SITE.email}.`)}
      >
        <input type="hidden" name="Booking Source" value="XoCODE Booking Modal" />
        <input type="hidden" name="Booking Purpose" value="Meeting consultation request" />
        <input type="hidden" name="Meeting Invite Platform" value={booking.format} />
        <input type="hidden" name="Meeting Action Link" value={meetingActionLink} />
        <input type="hidden" name="Google Calendar Invite URL" value={calendarInvite} />
        <input type="hidden" name="Invite Delivery Request" value="Create the selected Google Meet or Zoom invite and send it to the client email listed in this form." />
        <div className="form-row">
          <label>Your Name<input required name="01 - Name" placeholder="Full name" value={booking.name} onChange={(event) => update("name", event.target.value)} /></label>
          <label>Business Name<input name="02 - Business Name" placeholder="Company or brand name" value={booking.business} onChange={(event) => update("business", event.target.value)} /></label>
        </div>
        <div className="form-row">
          <label>Email<input required type="email" name="03 - Email Address" placeholder="name@example.com" value={booking.email} onChange={(event) => update("email", event.target.value)} /></label>
          <label>Phone / WhatsApp<input name="04 - Phone or WhatsApp" placeholder="+92 ..." value={booking.phone} onChange={(event) => update("phone", event.target.value)} /></label>
        </div>
        <label>Service
          <select name="05 - Service of Interest" value={booking.service} onChange={(event) => update("service", event.target.value)}>
            <option>Full-Stack Development</option>
            <option>SEO Growth</option>
            <option>Digital Marketing</option>
            <option>Cloud & DevOps</option>
            <option>Automation</option>
            <option>Multiple Services</option>
            <option>General Consultation</option>
          </select>
        </label>
        <div className="form-row">
          <label>Date<input type="date" name="06 - Preferred Date" value={booking.date} onChange={(event) => update("date", event.target.value)} /></label>
          <label>Time<input type="time" name="07 - Preferred Time" value={booking.time} onChange={(event) => update("time", event.target.value)} /></label>
        </div>
        <label>Meeting Format
          <select name="08 - Meeting Format" value={booking.format} onChange={(event) => update("format", event.target.value)}>
            <option>Google Meet</option>
            <option>Zoom Meeting</option>
            <option>WhatsApp Call</option>
            <option>Phone Call</option>
          </select>
        </label>
        <label>Meeting Agenda<textarea required name="09 - Meeting Agenda" placeholder="What should we discuss in the meeting?" value={booking.agenda} onChange={(event) => update("agenda", event.target.value)} /></label>
        <label>Project / Website Link<input name="10 - Project or Website Link" placeholder="https://..." value={booking.projectLink} onChange={(event) => update("projectLink", event.target.value)} /></label>
        <label>Extra Notes<textarea name="11 - Extra Notes" placeholder="Any timing, timezone, or project details we should know." value={booking.notes} onChange={(event) => update("notes", event.target.value)} /></label>
        <input type="hidden" name="12 - Reply Instructions" value="Use the Google Calendar Invite URL or selected meeting platform link above, then send the confirmed invite to the client email." />
        <button className="primary full" type="submit">Send Meeting Booking Email</button>
      </EmailForm>
    </Modal>
  );
}
