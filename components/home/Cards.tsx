'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
  floatingItems?: FloatingItem[];
};

const baseItems: CardItem[] = [
  {
    id: 'card-left',
    src: 'https://www.agencefoudre.com/media/site/b89fc535d3-1764264576/agence-foudre-3-1440x-q80.avif',
    baseX: -200,
    baseY: 10,
    baseRot: -2,
    z: 10,
    width: 180,
    height: 280,
    floatingItems: [
      { src: "💻 ⚡ 🎧", left: "-40px", bottom: "80px", rotation: -5 }
    ]
  },
  {
    id: 'card-middle',
    src: 'https://www.agencefoudre.com/media/site/9e2180cad6-1764264569/agence-foudre-1-1440x-q80.avif',
    baseX: 0,
    baseY: 0,
    baseRot: 0,
    z: 30,
    width: 260,
    height: 400,
    floatingItems: [
      { src: "⚡", top: "40px", left: "25%", rotation: 10 }
    ]
  },
  {
    id: 'card-right',
    src: 'https://www.agencefoudre.com/media/site/cca40ed208-1764264583/agence-foudre-2-1440x-q80.avif',
    baseX: 200,
    baseY: 10,
    baseRot: 2,
    z: 10,
    width: 180,
    height: 280,
    floatingItems: [
      { src: "🎥 ⚡ 🤜", right: "-80px", top: "160px", rotation: 5 }
    ]
  },
];

const getResponsiveItems = (): CardItem[] => {
  if (typeof window === "undefined") return baseItems;

  const w = window.innerWidth;

  if (w >= 1536) {
    // 2XL
    return baseItems.map((item) => ({
      ...item,
      width: item.width * 1.25,
      height: item.height * 1.25,
      baseX: item.baseX * 1.25,
    }));
  }

  if (w >= 1024) {
    // LG (original values)
    return baseItems;
  }

  if (w >= 768) {
    // MD
    return baseItems.map((item) => ({
      ...item,
      width: item.width * 0.85,
      height: item.height * 0.85,
      baseX: item.baseX * 0.85,
    }));
  }

  if (w >= 640) {
    // SM
    return baseItems.map((item) => ({
      ...item,
      width: item.width * 0.8,
      height: item.height * 0.8,
      baseX: item.baseX * 0.7,
    }));
  }

  // Mobile
  return baseItems.map((item) => ({
    ...item,
    width: item.width * 0.7,
    height: item.height * 0.7,
    baseX: item.baseX * 0.6,
  }));
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingRef = useRef<(HTMLDivElement | null)[]>([]);
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {

    const updateItems = () => {
      const responsive = getResponsiveItems();
      setItems(responsive);

      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        const item = responsive[index];

        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: item.baseX,
          y: item.baseY,
          rotation: item.baseRot,
        });
      });
    };

    updateItems();
    window.addEventListener("resize", updateItems);

    floatingRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        y: -12,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const { clientX, clientY } = e;

      const parallaxFactor = window.innerWidth < 640 ? 10 : 40;

      elementsRef.current.forEach((el, index) => {
        if (!el) return;

        const item = items[index];
        if (!item) return;

        const elCenterX = centerX + item.baseX;
        const elCenterY = centerY + item.baseY;

        const dx = elCenterX - clientX;
        const dy = elCenterY - clientY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const maxDist = 500;
        let pushX = 0;
        let pushY = 0;

        if (dist < maxDist) {
          const force = Math.pow((maxDist - dist) / maxDist, 2);
          const pushFactor = 120;

          pushX = (dx / dist) * force * pushFactor;
          pushY = (dy / dist) * force * pushFactor;
        }

        const mouseNormX = (clientX - centerX) / (bounds.width / 2 || 1);
        const mouseNormY = (clientY - centerY) / (bounds.height / 2 || 1);

        gsap.to(el, {
          x: item.baseX + pushX - mouseNormX * parallaxFactor,
          y: item.baseY + pushY - mouseNormY * parallaxFactor,
          rotation: item.baseRot + (pushX * 0.08),
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseLeave = () => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;

        const item = items[index];
        if (!item) return;

        gsap.to(el, {
          x: item.baseX,
          y: item.baseY,
          rotation: item.baseRot,
          duration: 1.5,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", updateItems);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };

  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[1700px] h-[350px] sm:h-[420px] md:h-[500px] lg:h-[600px] 2xl:h-[720px] overflow-visible"
    >
      <div className="relative h-full w-full pointer-events-none">

        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              elementsRef.current[index] = el;
            }}
            className="absolute left-1/2 top-[45%] pointer-events-auto"
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              zIndex: item.z,
            }}
          >

            <div className="h-full w-full overflow-hidden rounded-2xl">
              <img
                loading='lazy'
                src={item.src}
                alt="Team"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
            </div>

            {item.floatingItems?.map((float, i) => (
              <div
                key={i}
                ref={(el) => {
                  floatingRef.current[index * 10 + i] = el;
                }}
                className="absolute flex items-center justify-center bg-orange-100 p-2 sm:p-3 md:p-4 rounded-xl shadow-sm text-xl sm:text-2xl md:text-3xl md:block hidden"
                style={{
                  top: float.top,
                  bottom: float.bottom,
                  left: float.left,
                  right: float.right,
                  transform: `rotate(${float.rotation}deg)`
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