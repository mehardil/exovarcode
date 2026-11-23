export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <span className="page-loader-ring" aria-hidden="true" />
      <span className="page-loader-text">Loading</span>
    </div>
  );
}
