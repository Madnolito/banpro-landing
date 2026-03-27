import { motion } from "framer-motion";

type Dir = "up" | "down" | "left" | "right";

interface Props {
  children: React.ReactNode;
  delay?: number;
  dir?: Dir;
  className?: string;
}

const offsets: Record<Dir, object> = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: -40 },
  right: { x: 40 },
};

const FadeIn = ({ children, delay = 0, dir = "up", className = "" }: Props) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, ...offsets[dir] }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default FadeIn;