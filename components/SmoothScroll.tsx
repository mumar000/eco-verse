"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");

    useEffect(() => {
        if (isDashboardRoute) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // connect with GSAP ticker
        const onGsapTick = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(onGsapTick);

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(onGsapTick);
            lenis.destroy();
        };
    }, [isDashboardRoute]);

    return <>{children}</>;
}
