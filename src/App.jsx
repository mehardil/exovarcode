import React, { useState } from "react";
import { SITE } from "./config/site";
import { plans } from "./data/content";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SuccessModal } from "./components/Modal";
import { OrderModal } from "./components/OrderModal";
import { BookingModal } from "./components/BookingModal";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Work } from "./pages/Work";
import { Contact } from "./pages/Contact";

export function App() {
  const [page, setPage] = useState("home");
  const [activeService, setActiveService] = useState("seo");
  const [order, setOrder] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [success, setSuccess] = useState(null);

  const go = (next) => {
    setPage(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header page={page} go={go} openBooking={() => setBookingOpen(true)} />
      <main>
        {page === "home" && (
          <Home
            go={go}
            openBooking={() => setBookingOpen(true)}
            chooseService={(id) => {
              setActiveService(plans[id] ? id : "fullstack");
              go("services");
            }}
          />
        )}
        {page === "services" && (
          <Services
            activeService={activeService}
            setActiveService={setActiveService}
            selectedPlans={plans[activeService] || plans.fullstack}
            openOrder={(plan, price) => setOrder({ plan, price })}
          />
        )}
        {page === "work" && <Work />}
        {page === "contact" && <Contact openBooking={() => setBookingOpen(true)} setSuccess={setSuccess} />}
      </main>
      <Footer go={go} openBooking={() => setBookingOpen(true)} />
      <a className="float-whatsapp" href={SITE.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
      {order && (
        <OrderModal
          order={order}
          close={() => setOrder(null)}
          done={(message) => {
            setOrder(null);
            setSuccess(message);
          }}
        />
      )}
      {bookingOpen && (
        <BookingModal
          close={() => setBookingOpen(false)}
          done={(message) => {
            setBookingOpen(false);
            setSuccess(message);
          }}
        />
      )}
      {success && <SuccessModal message={success} close={() => setSuccess(null)} />}
    </>
  );
}
