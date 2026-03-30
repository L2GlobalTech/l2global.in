"use client";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Divider from "./Divider";
import { IIndustriesSection } from "@/types";
import clsx from "clsx";
import AOS from "aos";
import "aos/dist/aos.css";

interface IProps {
    items: IIndustriesSection[];
    color?: string;
}

const AUTO_TIME = 5000;
const FADE_OUT_TIME = 800;

const IndustriesSection: FC<IProps> = ({ items, color = "bg-[#F15A23]" }) => {

    const hasAnimated = useRef(false);


    const [openId, setOpenId] = useState(1);
    const [progress, setProgress] = useState(0);
    const [animateBar, setAnimateBar] = useState(true);
    const [animationClass, setAnimationClass] = useState("animate__fadeIn");

    const activeItem = items.find((i) => i.id === openId);

    useEffect(() => {
        if (hasAnimated.current) return;

        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            offset: 150,
            once: true,
            mirror: false,
            disableMutationObserver: true,
        });

        hasAnimated.current = true;
    }, []);

    useEffect(() => {
        setAnimationClass("animate__fadeIn");
        const fadeOutTimer = setTimeout(() => {
            setAnimationClass("animate__fadeOut");
        }, AUTO_TIME - FADE_OUT_TIME);
        return () => clearTimeout(fadeOutTimer);
    }, [openId]);

    useEffect(() => {
        setAnimateBar(false);
        setProgress(0);

        const startAnimTimeout = setTimeout(() => setAnimateBar(true), 20);

        const bar = setInterval(() => {
            setProgress((p) => (p < 100 ? p + 2 : 100));
        }, AUTO_TIME / 58);

        const slide = setTimeout(() => {
            const currentIndex = items.findIndex((i) => i.id === openId);
            const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
            setOpenId(items[nextIndex].id);
        }, AUTO_TIME);

        return () => {
            clearInterval(bar);
            clearTimeout(slide);
            clearTimeout(startAnimTimeout);
        };
    }, [openId, items]);

    return (
        <div className="mt-8 mb-4 md:mb-0">

            <Divider className="text-black" blur label="Industries We Serve" />


            <div className="container mx-auto px-4 sm:px-6 lg:px-10 md:mt-4 bg-white py-8 rounded-2xl">

                <SectionHeader
                    title="Explore the Sectors We Work With"
                    desc="L2 Global Technology Ltd. delivers tailored digital solutions across diverse industries."
                />


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-4 md:pb-14 mt-8">
                    <div className="flex flex-col gap-4"  data-aos="fade-up" data-aos-delay="200" data-aos-duration="800" data-aos-once="true" >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                // data-aos="fade-up"
                                // data-aos-delay={index * 150}
                                className={clsx(
                                    "rounded-xl sm:rounded-2xl border border-[#EDEDEDF9] transition-all duration-500 hover:border-[#FF6A1A]",
                                    openId === item.id
                                        ? "bg-[#F9F9F9]"
                                        : "bg-white"
                                )}
                            >
                                <button
                                    onClick={() => setOpenId(item.id)}
                                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left"
                                >
                                    <div>
                                        {openId === item.id && (
                                            <Image src={item.icon} width={60} height={60} alt="icon" />
                                        )}

                                        <h3 className={`${openId === item.id ? "mt-5 " : "mt-0"}text-lg sm:text-xl font-semibold`} style={{ letterSpacing: "-1px" }}>
                                            {item.title}
                                        </h3>

                                        {openId === item.id && (
                                            <p className="text-gray-600 text-sm sm:text-base mt-1 max-w-md" style={{ letterSpacing: "-0.5px" }}>
                                                {item.desc}
                                            </p>
                                        )}
                                    </div>

                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                        ${openId === item.id ? `${color} text-white` : "bg-gray-200"}`}
                                    >
                                        {openId === item.id ? <Minus size={18} /> : <Plus size={18} />}
                                    </div>
                                </button>

                                {openId === item.id && (
                                    <div className="px-4 pb-4">
                                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${color}`}
                                                style={{
                                                    width: `${progress}%`,
                                                    transition: animateBar ? "width 0.15s linear" : "none",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div
                        className="bg-[#F9F9F9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-8"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        {activeItem?.rightImage && (
                            <Image
                                key={`img-${openId}`}
                                src={activeItem.rightImage}
                                width={360}
                                height={360}
                                alt="Industry"
                                className={`w-full max-w-xs sm:max-w-md object-contain animate__animated ${animationClass}`}
                            />
                        )}

                        {activeItem?.rightTitle && (
                            <div
                                key={`card-${openId}`}
                                className={`bg-white w-full max-w-xl rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex gap-4 items-start animate__animated ${animationClass}`}
                            >
                                <div className="bg-linear-to-b from-[#F15A23] to-[#FF8558] rounded-full p-3">
                                    {activeItem.rightBottomIcon}
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold" style={{ letterSpacing: "-1px" }}>
                                        {activeItem.rightTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1" style={{ letterSpacing: "-0.5px" }}>
                                        {activeItem.rightDesc}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustriesSection;
