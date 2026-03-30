"use client";

import Image from "next/image";
import clsx from "clsx";
import Marquee from "react-fast-marquee";

type Logo = {
    id: string;
    src: string;
    alt: string;
};

type CarouselProps = {
    items: Logo[];
    className?: string;
    autoplay?: boolean;
    speed?: number;
    direction?: "left" | "right" | "up" | "down" | undefined
};

export default function WhyTheyWorkWithUsCarousel({
    items,
    className,
    autoplay = true,
    speed = 40, // marquee speed (px/sec)
    direction = 'left',
}: CarouselProps) {
    return (
        <div className="py-1">
            {/* Marquee */}
            <div className={clsx("w-full overflow-hidden", className)}>
                <Marquee
                    direction={direction}
                    pauseOnHover
                    play={autoplay}
                    speed={speed}
                    gradient={false}
                >
                    {items.map((logo) => (
                        <div key={logo.id} className="px-2">
                            <div className="flex items-center justify-center">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}

                                    className="h-26 w-[200px] object-cover border border-gray-200 bg-white p-1 rounded-2xl px-4 py-2 shadow-xs mb-5"
                                />
                            </div>
                        </div>

                    ))}
                </Marquee>
            </div>
        </div>
    );
}
