import Image from "next/image";
import React from "react";
import img1 from '@/public/assets/web/about-us/img1.png'
import img2 from '@/public/assets/web/about-us/img2.png'
import img3 from '@/public/assets/web/about-us/img3.png'
import img4 from '@/public/assets/web/about-us/img4.png'
import img5 from '@/public/assets/web/about-us/img5.png'
import icon1 from '@/public/assets/web/about-us/icon1.png'
import icon2 from '@/public/assets/web/about-us/icon2.png'
import icon3 from '@/public/assets/web/about-us/icon3.png'
import icon4 from '@/public/assets/web/about-us/icon4.png'
import icon5 from '@/public/assets/web/about-us/icon5.png'

const steps = [
    {
        step: "1",
        title: "Consulting",
        desc: "Understand requirements and define strategy.",
        icon: icon1.src,
        image: img1.src,
        color: "text-[#CCE9FF]",
        iconBg: "bg-[#0092FF0D]",
        borderColor: "bg-[#0092FF]",
    },
    {
        step: "2",
        title: "Consulting",
        desc: "Understand requirements and define strategy.",
        icon: icon2.src,
        image: img2.src,
        color: "text-[#FFD3C5]",
        iconBg: "bg-[#FFF8F5]",
        borderColor: "bg-[#FF6C3F]",
    },
    {
        step: "3",
        title: "Consulting",
        desc: "Understand requirements and define strategy.",
        icon: icon3.src,
        image: img3.src,
        color: "text-[#D0CAE1]",
        iconBg: "bg-[#F9F8FB]",
        borderColor: "bg-[#897BB5]",
    },
    {
        step: "4",
        title: "Consulting",
        desc: "Understand requirements and define strategy.",
        icon: icon4.src,
        image: img4.src,
        color: "text-[#FFE4A0]",
        iconBg: "bg-[#FFF8E7]",
        borderColor: "bg-[#FFBC12]",
    },
    {
        step: "5",
        title: "Consulting",
        desc: "Understand requirements and define strategy.",
        icon: icon5.src,
        image: img5.src,
        color: "text-[#FFC8DB]",
        iconBg: "bg-[#FFF8FB]",
        borderColor: "bg-[#FF76A6]",
    },
];

export default function ProcessGrid() {
    return (
        <section className="pb-16">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 auto-rows-[260px]">
                {steps.map((item, index) => {
                    const isEven = index % 2 === 1;
                    const delay = index * 150;

                    return (
                        <React.Fragment key={index}>
                            {/* TEXT BLOCK */}
                            <div
                                className={`bg-white relative p-6 ${isEven ? "lg:order-2" : "lg:order-1"
                                    }`}
                                data-aos={isEven ? "zoom-in" : "zoom-out" }
                                data-aos-delay={delay}
                                data-aos-duration="800"
                                data-aos-once="true"
                            >
                                {/* RIGHT BORDER */}
                                <span
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-28 ${item.borderColor}`}
                                />

                                {/* STEP NUMBER */}
                                <div
                                    className={`absolute right-6 top-4 text-9xl font-extrabold opacity-40 ${item.color}`}
                                >
                                    {item.step}
                                </div>

                                {item.icon && (
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${item.iconBg}`}
                                    >
                                        <Image src={item.icon} alt={item.title} width={30} height={30} />
                                    </div>
                                )}

                                <div className="mt-24">
                                    <h4 className="font-semibold text-lg text-black">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-gray-500 mt-2 max-w-[220px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* IMAGE BLOCK */}
                            <div
                                className={`relative w-full h-full ${isEven ? "lg:order-1" : "lg:order-2"
                                    }`}
                                data-aos={isEven ? "zoom-in" : "zoom-out"}
                                data-aos-delay={delay + 150}
                                data-aos-duration="800"
                                data-aos-once="true"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 20vw"
                                />
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
