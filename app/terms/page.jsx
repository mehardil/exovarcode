import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { HeroFlair } from "../../components/HeroFlair";
import { JsonLd } from "../../components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "../../lib/seo";
import { SITE } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service | Sync-Oaks",
  description:
    "The terms that govern use of the Sync-Oaks website and the general basis for project engagements, proposals, payments, and intellectual property.",
  path: "/terms/",
  image: "/og/terms.png",
  imageAlt: "Sync-Oaks terms",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Terms" }];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--legal">
        <HeroFlair variant="legal" label="Legal" />
        <div className="container-narrow">
          <p className="eyebrow">Legal</p>
          <h1>Terms of service</h1>
          <p className="lead">Last updated: 8 January 2026.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow prose">
          <h2>Using this website</h2>
          <p>
            This website is operated by {SITE.legalName}. By using it, you agree to these
            terms. If you do not agree, please do not use the site. The content is provided
            for general information and does not create a client relationship on its own.
          </p>

          <h2>Project engagements</h2>
          <p>
            Work begins only after both parties agree to a written proposal or statement of
            work. That document defines the scope, deliverables, timeline, price, payment
            schedule, and assumptions. If there is a conflict between these terms and a
            signed proposal, the signed proposal controls.
          </p>

          <h2>Quotes and estimates</h2>
          <p>
            Prices shown on this site are starting points, not offers. Final pricing depends
            on scope, complexity, content readiness, integrations, and timeline. Estimates
            are based on the information available at the time and may change if the scope
            changes.
          </p>

          <h2>Client responsibilities</h2>
          <ul>
            <li>Provide accurate project information and timely feedback.</li>
            <li>Supply content, access, and approvals needed to complete the work.</li>
            <li>Ensure you have the rights to any content, trademarks, or data you provide.</li>
            <li>Keep credentials secure and grant only the access required for the project.</li>
          </ul>

          <h2>Payments</h2>
          <p>
            Payment terms are set in the proposal. Unless stated otherwise, projects require
            a deposit before work begins, with remaining milestones invoiced as described.
            Late payments may pause work. Fees for completed work are non-refundable unless
            the proposal says otherwise.
          </p>

          <h2>Intellectual property</h2>
          <p>
            On full payment, you receive ownership of the final custom deliverables produced
            for your project, excluding third-party assets, open-source libraries, and our
            pre-existing tools or templates. Those remain under their respective licenses.
            We may retain the right to describe the project in a portfolio only with your
            permission.
          </p>

          <h2>Third-party services</h2>
          <p>
            Projects may rely on third-party platforms such as hosting, email, analytics, or
            payment providers. Their terms and availability apply. We are not responsible for
            outages, pricing changes, or policy decisions made by those providers.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Each party agrees to protect the other&rsquo;s confidential information and use it
            only for the project. This obligation does not apply to information that is public,
            independently developed, or required to be disclosed by law.
          </p>

          <h2>Warranties and limitations</h2>
          <p>
            We aim to deliver professional work, but the website and its content are provided
            &ldquo;as is&rdquo; without warranties of any kind to the extent permitted by law.
            We are not liable for indirect, incidental, or consequential losses, including lost
            profits or lost data. Our total liability for a project is limited to the fees paid
            for that project.
          </p>
          <p>
            Nothing on this site guarantees search rankings, traffic, revenue, or specific
            business outcomes. Search engines and advertising platforms operate independently.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate a project for material breach if the breach is not
            cured within a reasonable period after written notice. On termination, you pay for
            work completed and approved up to that point, and we hand over applicable
            deliverables.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of Pakistan. Disputes will be handled in the
            courts of Islamabad, Pakistan, unless a signed proposal says otherwise.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. The date at the top shows the latest
            revision. Continued use of the site after a change means you accept the updated
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? <Link href="/contact/">Send a message</Link>.
          </p>

          <p className="form-note">
            These terms are a practical starting point, not legal advice. The owner should have
            them reviewed by a qualified lawyer before relying on them.
          </p>
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema(breadcrumbs)] }} />
    </>
  );
}
