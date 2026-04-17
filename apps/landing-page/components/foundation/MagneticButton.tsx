"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * MagneticButton - A high-fidelity physics-based interaction wrapper.
 * Gives elements a physical "magnetic pull" on hover using Framer Motion.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and map to a small range (max 15px pull)
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
