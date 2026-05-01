import React from "react";

export function Modal({ title, subtitle, close, children }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="modal">
        <div className="modal-top">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button onClick={close} aria-label="Close">x</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SuccessModal({ message, close }) {
  return (
    <Modal close={close} title="Request Sent" subtitle="Notification submitted">
      <div className="success">
        <strong>{message}</strong>
        <p>
          The form was submitted to the email notification service. The first submission may require
          confirming the destination inbox once.
        </p>
        <button className="primary" onClick={close}>Done</button>
      </div>
    </Modal>
  );
}
