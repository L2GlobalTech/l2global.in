"use client";

import { useEffect } from "react";
import { SearchCheck, PencilRuler, Rocket, Cog, MessageSquare, PackageCheck, } from "lucide-react";
import Divider from "./Divider";
import SectionHeader from "./SectionHeader";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
    {
        id: 1,
        title: "Research & Content Planning",
        desc: "We analyze goals and audience insights to craft a clear strategic direction.",
        icon: SearchCheck,
    },
    {
        id: 2,
        title: "Creative Design",
        desc: "Transforming ideas into engaging visuals that align with your brand identity.",
        icon: PencilRuler,
    },
    {
        id: 3,
        title: "Development & Execution",
        desc: "Building robust, scalable digital solutions with clean and efficient code.",
        icon: Rocket,
    },
    {
        id: 4,
        title: "Product Prototyping",
        desc: "Creating interactive mockups to visualize, test, and refine the final experience.",
        icon: Cog,
    },
    {
        id: 5,
        title: "Feedback & Refinement",
        desc: "Collaborating closely with clients to enhance quality and ensure satisfaction.",
        icon: MessageSquare,
    },
    {
        id: 6,
        title: "Final Delivery & Support",
        desc: "Delivering the finished product with ongoing support for long-term success.",
        icon: PackageCheck,
    },
];

export default function WorkingProcess() {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 150,
            anchorPlacement: "top-bottom",
        });
        AOS.refresh();
    }, []);

    return (
        <section className="pt-2 md:pt-4 pb-4 md:pb-16 mt-4 md:mt-8 bg-[#F8F7FA]">
            <div className="mb-1 md:mb-4">
                <Divider label="Working Process" pillClassName="bg-white" />
            </div>

            <div className="container mx-auto">
                <SectionHeader
                    title="Explore Our 6 Step Working Process"
                    desc="Our 6-step working process ensures clarity, creativity, and consistency from concept to completion"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 md:px-6 mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            data-aos="zoom-in"
                            data-aos-delay={index * 500}
                            className="
                                group rounded-2xl p-7 bg-white cursor-pointer
                                border border-[#E7E7E7]
                                transition-all duration-300 ease-out
                                hover:border-[#FF6A1A]
                                hover:-translate-y-2
                                hover:shadow-[0_0_25px_rgba(255,85,0,0.15)]
                            "
                        >
                            <div className="flex items-center justify-between">
                                <div className="relative text-black">
                                    <div
                                        className="
                                            absolute -top-1 -left-1 h-8 w-8 rounded-full 
                                            bg-gray-200/80 
                                            transition-colors duration-300
                                            group-hover:bg-[#E66322]/80
                                        "
                                    />
                                    <step.icon className="w-10 h-10 relative z-10" />
                                </div>

                                <p
                                    className="
                                        text-4xl font-semibold text-gray-300
                                        transition-colors duration-300
                                        group-hover:text-[#E66322]
                                    "
                                >
                                    {step.id.toString().padStart(2, "0")}
                                </p>
                            </div>

                            <h3
                                className="
                                    mt-14 text-2xl font-semibold text-black
                                    transition-colors duration-300
                                    group-hover:text-[#E66322]
                                "
                                style={{ letterSpacing: "-1px" }}
                            >
                                {step.title}
                            </h3>

                            <p
                                className="text-gray-600 text-sm mt-2"
                                style={{ letterSpacing: "-1px" }}
                            >
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
