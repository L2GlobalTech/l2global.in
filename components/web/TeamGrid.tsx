"use client";

import Image from "next/image";
// import img1 from "@/public/assets/web/about-us/rajesh.png";
import img2 from "@/public/assets/web/about-us/anita.png";
import img3 from "@/public/assets/web/about-us/vikram.png";
import img4 from "@/public/assets/web/about-us/neha.png";
import img5 from "@/public/assets/web/about-us/amit.png";
import male from "@/public/assets/web/male-placeholder.svg";
import female from "@/public/assets/web/female-placeholder.svg";
import lenin from '@/public/assets/web/team/aarav.png'
import img1 from '@/public/assets/web/team/ananya.png'
import Vijay from '../../public/assets/web/team/vijay-krishna.png';

const team = [
    {
        name: "Lenin Gongati",
        role: "Salesforce Architect",
        experience: "",
        sap: true,
        img: lenin.src,
        gradient: "from-[#FFFFFF] to-[#D0DAE6]",
        text: "text-[#579AE9]",
        border: "border-[#D0DAE6]",
    },
    {
        name: "Teja Rani",
        role: "Human Resource Manager",
        experience: "",
        sap: true,
        img: img1.src,
        gradient: "from-[#FFFFFF] to-[#D2C9BF]",
        text: "text-[#9C713A]",
        border: "border-[#D2C9BF]",
    },
    {
        name: "Vijay Krishna",
        role: "SAP Consultant",
        experience: "",
        sap: true,
        img: Vijay.src,
        gradient: "from-[#FFFFFF] to-[#F1E7EE]",
        text: "text-[#A647CD]",
        border: "border-[#F1E7EE]",
    },
    {
        name: "Raju",
        role: "Director",
        experience: "",
        sap: true,
        img: img5.src,
        gradient: "from-[#FFFFFF] to-[#FEE6DB]",
        text: "text-[#F97316]",
        border: "border-[#FEE6DB]",
    },
    // {
    //     name: "Raju",
    //     role: "Director",
    //     experience: "",
    //     sap: true,
    //     img: male.src,
    //     gradient: "from-[#FFFFFF] to-[#F4DBFE]",
    //     text: "text-[#7C3AED]",
    //     border: "border-[#F4DBFE]",
    // },
];

export default function TeamGrid() {
    return (
        <div className="w-full pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
                {team.map((item, i) => (
                    <div
                        key={i}
                        data-aos="fade-up"
                        data-aos-delay={i * 300}
                        data-aos-duration="700"
                        data-aos-once="true"
                        className="p-px"
                    >
                        <div className="bg-white text-center h-full transition-transform duration-300 hover:-translate-y-1">

                            {/* Image */}
                            <div className="relative w-full h-[300px] mb-3">
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    fill
                                    className={`object-contain rounded-3xl pt-10 bg-linear-to-b ${item.gradient} border ${item.border}`}
                                />

                                {/* SAP Badge */}
                                {item.sap && (
                                    <span className="absolute top-4 right-4 text-[10px] font-semibold bg-[#0FAAFF] text-white px-2 py-1 rounded-full shadow">
                                        SAP Certified
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h4 className={`font-semibold text-2xl tracking-[-1px] mb-0 ${item.text}`}>
                                {item.name}
                            </h4>

                            {/* Role */}
                            <p className="text-sm text-[#222222] tracking-[-0.5px] mt-1">
                                {item.role}
                            </p>

                            {/* Experience */}
                            <p className="text-xs text-zinc-500 mt-1">
                                {item.experience}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
