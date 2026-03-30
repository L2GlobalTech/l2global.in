import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './ServiceProcessSteps.module.css'
import { Search, PanelsTopLeft, CodeXml, TestTubeDiagonal, HeartHandshake } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Requirement Analysis",
        desc: "Deep discovery sessions to map your business needs and define clear technical requirements.",
        icon: Search,
        color: "#195DF0",
    },
    {
        number: "02",
        title: "Architecture Design",
        desc: "Craft a scalable, secure blueprint aligned to your enterprise ecosystem.",
        icon: PanelsTopLeft,
        color: "#7B49DF",
    },
    {
        number: "03",
        title: "Implementation",
        desc: "Agile delivery with best practices, clean code, and iterative feedback loops.",
        icon: CodeXml,
        color: "#FF8D29",
    },
    {
        number: "04",
        title: "Testing & Optimization",
        desc: "Rigorous QA, performance validation, and continuous improvement cycles.",
        icon: TestTubeDiagonal,
        color: "#31C47A",
    },
    {
        number: "05",
        title: "Ongoing Support",
        desc: "24/7 managed services, proactive monitoring, and continuous enhancement.",
        icon: HeartHandshake,
        color: "#25B4D0",
    },
];

const ServiceProcessSteps = () => {

    return (
        <div>
            <div className='py-20 container mx-auto px-5 md:px-0'>

                <div className="flex justify-center items-center pb-4 sm:pb-5 px-4" data-aos="fade-up">
                    <div
                        className="text-sm sm:text-base md:text-lg font-medium bg-[#F6F6F9] px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px]"
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        Our Process
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                </div>

                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] leading-tight px-4 tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    How We <span className={styles.gradientText}>Deliver Excellence</span>
                </h1>

                <p
                    className="text-sm sm:text-base md:text-lg text-[#707A8F] text-center mt-3 px-4 leading-relaxed tracking-[-0.3px] sm:tracking-[-0.5px]"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    A proven 5-step methodology ensuring seamless delivery,
                    <br className="hidden md:block" /> every single time.
                </p>

                <div className={`${styles.wrapper} relative`}>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10">
                        <div className={styles.gradientLine}></div>

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={index}
                                    className={styles.card}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 300}
                                >
                                    <div className={styles.number}>{step.number}</div>

                                    <div
                                        className={styles.iconBox}
                                        style={{ color: step.color }}
                                    >
                                        <Icon size={20} />
                                    </div>

                                    <div
                                        className={styles.stepLabel}
                                        style={{ color: step.color }}
                                    >
                                        Step {step.number}
                                    </div>

                                    <h3 className={styles.title}>{step.title}</h3>
                                    <p className={styles.desc}>{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceProcessSteps