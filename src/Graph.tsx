import { instance } from "@viz-js/viz";
import { useEffect, useRef, useState } from "react";

export default function Graph({ dot }: GraphProps) {
  const graphRef = useRef<HTMLDivElement>(null);
  const [viz, setViz] = useState(null);

  useEffect(() => {
    instance().then((viz) => setViz(viz));
  }, []);

  useEffect(() => {
    if (graphRef.current && viz) {
      const svg = viz.renderSVGElement(dot);
      graphRef.current.innerHTML = "";
      graphRef.current.appendChild(svg);
    }
  }, [viz]);

  return <div ref={graphRef}></div>;
}

interface GraphProps {
  dot: string;
}
