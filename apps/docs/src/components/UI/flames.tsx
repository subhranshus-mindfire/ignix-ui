import React, { useEffect, useRef, FC } from 'react';
import { gsap, Power2, Linear } from 'gsap';

// --- Type Definitions ---
interface Point {
  x: number;
  y: number;
}

interface PathPoint {
  type: string;
  points: number[];
}

declare global {
  interface Window {
    Snap: any;
  }
}

// --- Style Component for Blend Mode ---
// Tailwind CSS doesn't have a default utility for mix-blend-mode,
// so we inject this single, critical style directly.
const BlendModeStyle: FC = () => (
  <style>{`
    .flame {
      /* Using 'screen' or 'lighten' can create a nice effect on dark backgrounds */
      /* For a solid color look on any background, 'normal' is best. */
      mix-blend-mode: normal;
    }
  `}</style>
);

/**
 * FlameAnimation Component (TypeScript + Tailwind CSS)
 * This component creates a procedural flame animation using Snap.svg and GSAP.
 * It now dynamically loads its own dependencies and uses Tailwind for styling.
 * The background is transparent and colors match the Mindfire logo.
 */
const FlameAnimation: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const flameTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const stageManagerRef = useRef<any>(null);

  useEffect(() => {
    // Function to dynamically load a script
    const loadScript = (src: string, onReady: () => void) => {
      // Prevent adding duplicate scripts
      if (document.querySelector(`script[src="${src}"]`)) {
        onReady();
        return document.querySelector(`script[src="${src}"]`);
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onReady;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.body.appendChild(script);
      return script;
    };

    // --- Animation Logic (to be run after script loads) ---
    const initializeAnimation = () => {
      if (!svgRef.current) return;

      class Flame {
        id: string;
        group: any;
        startPoint: Point;
        endPoint: Point;
        startThickness: number;
        endThickness: number;
        guidePosition: number;
        frequency: number;
        amplitude: number;
        height: number;
        endHeight: number;
        y: number;
        particle: boolean;
        guide: Point[];
        body: any;

        constructor(svg: any, start: Point, end: Point, width: number, particle: boolean) {
          this.id = String(Math.round(Math.random() * 999999999999999));
          this.group = svg.group();
          this.group.addClass('flame');
          this.startPoint = start;
          this.endPoint = end;
          this.startThickness = width + Math.round(Math.random() * 50);
          this.endThickness = 10 + Math.round(Math.random() * 10);
          this.guidePosition = Math.random() * 100;
          this.frequency = 0.01 + Math.random() * 0.008;
          this.amplitude = 40 + Math.random() * 40;
          this.height = 500;
          this.endHeight = 100 + Math.round(Math.random() * 400);
          this.y = Math.random() * 100;
          this.particle = particle;
          this.guide = [];
          
          // Use a single red color to match the Mindfire logo
          const colors = ['#FF0000', '#DA1F05', '#F33C04', '#FE650D'];
          const flameColor = colors[Math.floor(Math.random() * colors.length)];

          this.body = this.group.path().attr({
            fill: flameColor,
            opacity: this.particle ? 0.6 : 1, // Make particles slightly more transparent
            stroke: 'none'
          });
          this.updateGuide();
        }
        remove = () => this.group.remove();
        updateGuide = () => {
            this.guide = [];
            const height = this.startPoint.y - this.endPoint.y;
            const widthChange = this.startPoint.x - this.endPoint.x;
            let y = this.startPoint.y;
            while (y-- >= this.endPoint.y) {
                const x = this.startPoint.x + (widthChange - (widthChange / height) * y);
                const wave = Math.sin(y * this.frequency + this.guidePosition);
                this.guide.push({ y, x: x + (wave * this.amplitude / 2 + this.amplitude / 2) });
            }
        };
        start = (onComplete: (flame: Flame) => void) => {
            gsap.to(this, {
                duration: this.particle ? (0.2 + Math.random()) : (0.5 + Math.random()),
                y: this.guide.length,
                height: this.endHeight,
                ease: this.particle ? Linear.easeNone : Power2.easeIn,
                onComplete,
                onCompleteParams: [this]
            });
        };
        getPointAlongGuide = (y: number, offsetXPercentage: number): Point => {
            if (!this.guide.length) return { x: 0, y: 0 };
            const guideY = Math.max(0, Math.min(this.guide.length - 1, Math.floor(y)));
            const p = this.guide[guideY];
            if (!p) return { x: 0, y: 0 };
            const percentageAlongGuide = guideY / this.guide.length;
            const thickness = this.startThickness + (this.endThickness - this.startThickness) * percentageAlongGuide;
            const xOffset = (thickness / 2) * (offsetXPercentage / 100);
            return { x: p.x + xOffset, y: p.y };
        };
        drawPath = (pathPoints: PathPoint[]): string => {
            return pathPoints.map(p => {
                const subPoints: number[] = [];
                for (let j = 0; j < p.points.length / 2; j++) {
                    const pointData = p.points.slice(j * 2, j * 2 + 2);
                    const point = this.getPointAlongGuide(pointData[1], pointData[0]);
                    subPoints.push(point.x, point.y);
                }
                return p.type + subPoints.join(' ');
            }).join(' ') + 'Z';
        };
        draw = () => {
            if (this.height > 0) {
                const y = Math.round(this.y);
                const height = Math.round(this.height);
                const body: PathPoint[] = [{ type: 'M', points: [] }];
                for (let i = 0; i <= 36; i++) {
                    const angle = (i / 36) * Math.PI * 2;
                    const x = Math.sin(angle) * (i / 36 * 100);
                    const yOffset = y - (i / 36 * height);
                    body[0].points.push(x, yOffset);
                }
                this.body.attr({ d: this.drawPath(body) });
            }
        };
      }

      class StageManager {
        svg: any;
        fire: { [key: string]: Flame };
        size: { width: number; height: number };

        constructor(svgElement: SVGSVGElement) {
          this.svg = window.Snap(svgElement);
          this.fire = {};
          this.size = { width: 400, height: 800 };
          this.svg.attr({ viewBox: `0 0 ${this.size.width} ${this.size.height}` });
        }
        addFlame = () => {
            const particle = Math.random() > 0.8;
            const start: Point = { x: this.size.width / 2, y: this.size.height - 40 };
            const end: Point = { x: (this.size.width / 4) + Math.random() * (this.size.width / 2), y: particle ? -20 : this.size.height / 3 };
            const flame = new Flame(this.svg, start, end, this.size.width / 4, particle);
            flame.start(this.removeFlame);
            this.fire[flame.id] = flame;
        };
        removeFlame = (flame: Flame) => {
            if (this.fire[flame.id]) {
                flame.remove();
                delete this.fire[flame.id];
            }
        };
        tick = () => {
            for (const i in this.fire) this.fire[i].draw();
            animationFrameId.current = requestAnimationFrame(this.tick);
        };
        clear = () => {
            for (const i in this.fire) this.fire[i].remove();
            this.fire = {};
            this.svg.clear();
        };
      }

      stageManagerRef.current = new StageManager(svgRef.current!);
      stageManagerRef.current.tick();

      const makeFlame = () => {
        if (stageManagerRef.current) {
            stageManagerRef.current.addFlame();
            flameTimeoutId.current = setTimeout(makeFlame, Math.random() * 60);
        }
      };
      makeFlame();
    };

    // --- Component Mount Logic ---
    const script = loadScript('https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js', initializeAnimation);

    // --- Cleanup Logic ---
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (flameTimeoutId.current) clearTimeout(flameTimeoutId.current);
      gsap.globalTimeline.clear();
      if (stageManagerRef.current) stageManagerRef.current.clear();
      // Only remove the script if this is the last component instance
      if (script && !document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"]')) {
          document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <BlendModeStyle />
      {/* The background is now transparent. It will inherit the parent's background. */}
      <div className="w-full h-full m-0 p-0 overflow-hidden text-center">
        <svg ref={svgRef} className="w-full h-full" preserveAspectRatio="xMidYMid meet" />
      </div>
    </>
  );
};

export default FlameAnimation;