import React, { useMemo } from "react";
import { SITE } from "../config/site";
import { EmailForm } from "./EmailForm";
import { Modal } from "./Modal";

export function OrderModal({ order, close, done }) {
  const orderId = useMemo(() => `XO-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000 + 10000)}`, []);

  return (
    <Modal close={close} title="Confirm Order" subtitle={`${order.plan} - ${order.price}`}>
      <EmailForm
        subject={`Confirm XoCODE Order ${orderId}`}
        message={`Confirm order ${orderId} for ${order.plan}`}
        onSubmitted={() => done(`Order ${orderId} was submitted to ${SITE.email}.`)}
      >
        <input type="hidden" name="Order ID" value={orderId} />
        <input type="hidden" name="Package" value={order.plan} />
        <input type="hidden" name="Price" value={order.price} />
        <div className="form-row">
          <label>Business Name<input required name="Business Name" /></label>
          <label>Contact Name<input required name="Contact Name" /></label>
        </div>
        <div className="form-row">
          <label>Email<input required type="email" name="Client Email" /></label>
          <label>Phone / WhatsApp<input name="Phone" /></label>
        </div>
        <div className="form-row">
          <label>Timeline
            <select name="Timeline">
              <option>ASAP</option>
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>Flexible</option>
            </select>
          </label>
          <label>Meeting Preference
            <select name="Meeting Preference">
              <option>Google Meet</option>
              <option>Zoom Meeting</option>
              <option>WhatsApp Call</option>
            </select>
          </label>
        </div>
        <label>Notes<textarea name="Notes" /></label>
        <label>Digital Signature<input required name="Digital Signature" /></label>
        <p className="fineprint">Confirming submits this request to {SITE.email} without needing a custom backend.</p>
        <button className="primary full" type="submit">Confirm Order & Send Email</button>
      </EmailForm>
    </Modal>
  );
}
