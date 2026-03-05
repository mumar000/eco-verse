'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Interface for floating items (emojis/icons)
type FloatingItem = {
  src: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotation?: number;
};

type CardItem = {
  id: string;
  src: string;
  baseX: number;
  baseY: number;
  baseRot: number;
  z: number;
  width: number;
  height: number;
  floatingItems?: FloatingItem[]; // Har card ke apne floating icons honge
};

const items: CardItem[] = [
  {
    id: 'card-left',
    src: 'https://www.agencefoudre.com/media/site/b89fc535d3-1764264576/agence-foudre-3-1440x-q80.avif',
    baseX: -220, // Positioned further left
    baseY: 10,   // Slightly lower
    baseRot: -2, // More tilt for "human" feel
    z: 10,
    width: 220,
    height: 320,
    floatingItems: [
      { src: "💻 ⚡ 🎧", left: "-40px", bottom: "80px", rotation: -5 } // Left card badge
    ]
  },
  {
    id: 'card-middle',
    src: 'https://www.agencefoudre.com/media/site/9e2180cad6-1764264569/agence-foudre-1-1440x-q80.avif',
    baseX: 0,
    baseY: 0,
    baseRot: 0,
    z: 30, // Middle card sab se upar hogi
    width: 280,
    height: 420, // Middle card is taller
    floatingItems: [
      { src: "⚡", top: "30px", left: "25%", rotation: 10 } // Center lightning
    ]
  },
  {
    id: 'card-right',
    src: 'https://www.agencefoudre.com/media/site/cca40ed208-1764264583/agence-foudre-2-1440x-q80.avif',
    baseX: 220,
    baseY: 10,
    baseRot: 2,
    z: 10,
    width: 220,
    height: 320,
    floatingItems: [
      { src: "🎥 ⚡ 🤜", right: "-80px", top: "160px", rotation: 5 } // Right card badge
    ]
  },
];

const Cards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial Setup - GSAP se positions set karein
    elementsRef.current.forEach((el, index) => {
      if (!el) return;
      const item = items[index];
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x: item.baseX,
        y: item.baseY,
        rotation: item.baseRot,
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const { clientX, clientY } = e;

      elementsRef.current.forEach((el, index) => {
        if (!el) return;

        const item = items[index];
        const elCenterX = centerX + item.baseX;
        const elCenterY = centerY + item.baseY;

        const dx = elCenterX - clientX;
        const dy = elCenterY - clientY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const maxDist = 450;
        let pushX = 0;
        let pushY = 0;

        // Mouse repelling logic (Logic unchanged as requested)
        if (dist < maxDist) {
          const force = Math.pow((maxDist - dist) / maxDist, 2);
          const pushFactor = 80;
          pushX = (dx / dist) * force * pushFactor;
          pushY = (dy / dist) * force * pushFactor;
        }

        const mouseNormX = (clientX - centerX) / (bounds.width / 2 || 1);
        const mouseNormY = (clientY - centerY) / (bounds.height / 2 || 1);
        const parallaxFactor = 15;

        gsap.to(el, {
          x: item.baseX + pushX - mouseNormX * parallaxFactor,
          y: item.baseY + pushY - mouseNormY * parallaxFactor,
          rotation: item.baseRot + (pushX * 0.04), // Dynamic tilt on hover
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const handleMouseLeave = () => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        const item = items[index];
        gsap.to(el, {
          x: item.baseX,
          y: item.baseY,
          rotation: item.baseRot,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)', // Smooth bounce back
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[500px] w-full max-w-[1100px] overflow-visible md:h-[600px]"
    >
      <div className="relative h-full w-full pointer-events-none">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              elementsRef.current[index] = el;
            }}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              zIndex: item.z,
            }}
          >
            {/* Main Card Image */}
            <div className="h-full w-full overflow-hidden rounded-2xl">
              <img
                loading="lazy"
                src={item.src}
                alt="Team"
                className="h-full w-full select-none object-cover"
                draggable={false}
              />
            </div>

            {/* Floating Items (Emojis/Badges) */}
            {item.floatingItems?.map((float, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center bg-orange-100 px-4 py-4 rounded-xl shadow-sm text-3xl"
                style={{
                  top: float.top,
                  bottom: float.bottom,
                  left: float.left,
                  right: float.right,
                  transform: `rotate(${float.rotation}deg)`,
                }}
              >
                {float.src}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;