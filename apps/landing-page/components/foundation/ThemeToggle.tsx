"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center group"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 bg-foreground/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
      <div className="relative w-4 h-4 overflow-hidden">
        <motion.div
           animate={{ y: isDark ? "-50%" : "0%" }}
           transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col space-y-4"
        >
          {/* Sun Icon (Light Mode) */}
          <div className="w-4 h-4 rounded-full border-2 border-foreground flex items-center justify-center" />
          {/* Moon Icon (Dark Mode) */}
          <div className="w-4 h-4 rounded-full bg-foreground" />
        </motion.div>
      </div>
    </button>
  );
};
