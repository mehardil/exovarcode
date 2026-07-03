export default function Marquee({ children, speed = 28, reverse = false, className = "" }) {
  return (
    <div className={`marquee-wrap ${className}`}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
