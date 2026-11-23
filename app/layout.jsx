import { Sora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StickyCTA, FloatingWhatsApp } from "../components/FloatingCTAs";
import { ExitIntent } from "../components/ExitIntent";
import { Analytics } from "../components/Analytics";
import { ScrollSpider } from "../components/ScrollSpider";
import { JsonLd } from "../components/JsonLd";
import { readingSchemaTypes } from "../lib/seo";
import { SITE, SITE_URL } from "../lib/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sync-Oaks | Websites, Apps & Automation That Win Clients",
    template: "%s",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: `${SITE_URL}/about/` }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "web development agency",
    "web development agency USA",
    "SEO agency UK",
    "web development company UAE",
    "Next.js development",
    "technical SEO",
    "business automation",
    "cloud DevOps",
    "data analytics",
    "lead generation systems",
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: SITE.name,
    title: "Sync-Oaks | Websites, Apps & Automation That Win Clients",
    description: SITE.description,
    images: [
      {
        url: `${SITE_URL}/og/default.png`,
        width: 1200,
        height: 630,
        alt: "Sync-Oaks digital product studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sync-Oaks | Websites, Apps & Automation That Win Clients",
    description: SITE.description,
    images: [`${SITE_URL}/og/default.png`],
  },
  icons: {
    icon: [
      { url: "/sync-oaks-favicon.svg", type: "image/svg+xml" },
      { url: "/sync-oaks-favicon.png", type: "image/png" },
    ],
    apple: "/sync-oaks-favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060709" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('so-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}document.documentElement.classList.add('js');})();`}
        </Script>
        <a className="skip-link" href="#main">Skip to content</a>
        <Analytics />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
        <FloatingWhatsApp />
        <ScrollSpider />
        <ExitIntent />
        <JsonLd data={readingSchemaTypes()} />
        <script
          id="reveal-fallback"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function s(){var e=document.querySelectorAll('.reveal:not(.is-visible)');for(var i=0;i<e.length;i++){e[i].classList.add('is-visible');}}if(!('IntersectionObserver' in window)){s();return;}function c(){if(!window.__soRevealReady){s();}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){setTimeout(c,2200);});}else{setTimeout(c,2200);}})();",
          }}
        />
        <script
          id="menu-fallback"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function init(){var b=document.querySelector('.site-header .nav-toggle');var d=document.getElementById('mobile-menu');if(!b||!d)return;function setOpen(o){if(window.__soHydrated)return;d.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':'';}b.addEventListener('click',function(e){if(window.__soHydrated)return;e.preventDefault();setOpen(!d.classList.contains('is-open'));});d.addEventListener('click',function(e){if(window.__soHydrated)return;if(e.target.closest('a'))setOpen(false);});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();",
          }}
        />
      </body>
    </html>
  );
}
