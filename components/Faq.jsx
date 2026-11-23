export function Faq({ faqs, title, id }) {
  if (!faqs?.length) return null;
  return (
    <div className="faq-list" id={id}>
      {faqs.map((faq) => (
        <details className="faq-item" key={faq.q}>
          <summary>
            <span>{faq.q}</span>
          </summary>
          <div className="faq-answer">
            <p>{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
