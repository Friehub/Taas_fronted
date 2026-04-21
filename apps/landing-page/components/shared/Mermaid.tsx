"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  className?: string;
}

/**
 * Mermaid - A client-side component to render mermaid diagrams.
 * Configured for a high-fidelity, institutional monochrome aesthetic.
 */
const Mermaid: React.FC<MermaidProps> = ({ chart, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure mermaid for premium institutional monochrome look
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "Inter, sans-serif",
      themeVariables: {
        primaryColor: "#1A1C1F",
        primaryTextColor: "#E2E2E6",
        primaryBorderColor: "#3F3F46",
        lineColor: "#52525B",
        secondaryColor: "#27272A",
        tertiaryColor: "#09090B",
        mainBkg: "#09090B",
        nodeBorder: "#3F3F46",
        clusterBkg: "#111111",
        clusterBorder: "#27272A",
        titleColor: "#E2E2E6",
        edgeLabelBackground: "#1A1C1F",
        fontSize: "16px",
      },
    });

    const renderDiagram = async () => {
      if (ref.current) {
        try {
          // Clear previous content
          ref.current.innerHTML = "";
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          ref.current.innerHTML = svg;
          
          // Apply institutional styling to the generated SVG
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
            svgEl.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.5))";
            
            // Refine path strokes
            svgEl.querySelectorAll("path").forEach(path => {
              path.style.strokeWidth = "1.5px";
            });
            
            // Refine rects for glassmorphism look
            svgEl.querySelectorAll("rect").forEach(rect => {
               rect.style.rx = "8px";
               rect.style.ry = "8px";
            });
          }
        } catch (error) {
          console.error("Mermaid render error:", error);
          ref.current.innerHTML = `<div class="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">Diagram Initialization Pending...</div>`;
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div 
      className={`flex justify-center items-center w-full min-h-[300px] py-8 transition-all duration-700 ${className}`} 
      ref={ref}
    />
  );
};

export default Mermaid;
