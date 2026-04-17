"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

/**
 * ScrollReveal - High-fidelity "Institutional Reveal" component.
 * Uses a clean fade-in-up transition for sections as they enter the viewport.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  width = "100%",
  delay = 0.2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
