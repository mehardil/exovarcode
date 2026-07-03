import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function TextReveal({ children, className = "", as = "h2" }) {
  const Tag = as;
  const words = typeof children === "string" ? children.split(" ") : [];

  if (!words.length) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <Tag className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0.28em" }}>
        {words.map((w, i) => (
          <motion.span key={i} variants={word} style={{ display: "inline-block" }}>
            {w}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
