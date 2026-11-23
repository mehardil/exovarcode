export function HeroFlair({ variant, label }) {
  return (
    <div className={`hero-flair hero-flair--${variant}`} aria-hidden="true">
      <span className="hero-flair-word">{label}</span>
      <span className="hero-flair-ring" />
      <span className="hero-flair-ring hero-flair-ring-2" />
      <span className="hero-flair-dot" />
      <span className="hero-flair-line" />
    </div>
  );
}
