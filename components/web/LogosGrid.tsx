"use client";

import Image from "next/image";
import clsx from "clsx";
import Divider from "./Divider";
import styles from "./LogosGrid.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Logo = {
    id: string;
    src: string;
    alt: string;
};

type LogosGridProps = {
    items: Logo[];
    className?: string;
    label: string;
};

export default function LogosGrid({ items, className, label }: LogosGridProps) {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800, // animation duration
            easing: "ease-in-out", // animation easing
            once: true, // whether animation should happen only once
            mirror: false, // whether elements should animate out while scrolling past them
        });
    }, []);

    return (
        <section className="py-20">
            <div className="mb-14">
                <Divider className="text-zinc-900" pillClassName="bg-white" blur={true} label={label} />
            </div>

            <div
                className={clsx(
                    "container grid gap-6",
                    "grid-cols-2",
                    "sm:grid-cols-3",
                    "md:grid-cols-4",
                    "lg:grid-cols-5",
                    "xl:grid-cols-6",
                    className
                )}
            >
                {items.map((logo, index) => (
                    <div
                        key={logo.id}
                        className={clsx(styles.card, "p-6 flex items-center justify-center")}
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                        data-aos-once="true"
                    >
                        <div className={styles.cardContent}>
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                width={200}
                                className="object-cover transition-all duration-300 group-hover:scale-105 h-16!"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
