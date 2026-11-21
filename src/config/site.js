export const SITE = {
  name: "Sync-Oaks",
  email: "mehardil13302@gmail.com",
  phone: "+92 331 905 1913",
  whatsapp: "https://wa.me/923319051913",
  googleMeet: "https://meet.google.com/new",
  zoom: "https://zoom.us/start/videomeeting",
  formEndpoint: "https://formsubmit.co/mehardil13302@gmail.com",
};

export const mailto = (subject, body) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const phoneHref = () => `tel:${SITE.phone.replace(/\s/g, "")}`;
