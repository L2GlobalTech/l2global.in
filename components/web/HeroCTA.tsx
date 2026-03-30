"use client";

import { ArrowRight, MoveRight } from "lucide-react";
import Divider from "./Divider";
import GradientButton from "../shared/GradientButton";
import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactPopup from "../shared/ContactPopup";

interface HeroCTAProps {
  tag?: string;
  heading: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export default function HeroCTA({
  tag = "Let's Grow Together",
  heading,
  description,
  primaryBtnText = "Get Started",
  secondaryBtnText = "Watch Demo",
}: HeroCTAProps) {

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  return (
    <section className="w-full container mx-auto flex justify-center mb-6 md:mb-12">
      <div
        className="
          w-full
          rounded-2xl sm:rounded-4xl lg:rounded-[40px]
          py-10 sm:py-10 lg:py-10
          flex flex-col items-center text-center
          shadow-[0px_0px_40px_rgba(0,0,0,0.05)]
          bg-cover bg-center bg-no-repeat
        "
        style={{ backgroundImage: "url('/assets/web/home/bg-cta.png')" }}
      >
        <div className="w-full mb-6 sm:mb-8" data-aos="fade-down" data-aos-delay="100">
          <Divider label={tag} pillClassName="bg-white" />
        </div>

        <h2
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 md:px-0
            font-medium text-black
            max-w-3xl md:tracking-[-3px] tracking-[-0.5px]
          "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {heading}
        </h2>

        <p
          className="
            text-sm sm:text-base
            text-gray-600 mt-4 px-4 md:px-0
            max-w-xl
          "
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {description}
        </p>

        <div
          className="
            mt-8 sm:mt-10
            flex flex-col sm:flex-row
            gap-4 sm:gap-6
            w-full sm:w-auto px-4 md:px-0
          "
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <PrimaryButton label='Get Started' onClick={() => setIsContactOpen(true)} icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />

          <GradientButton
            label={secondaryBtnText}
            className="
              w-full sm:w-auto justify-center
              bg-linear-to-b from-gray-800 to-gray-900
              text-white
              border border-transparent
              transition-all duration-700
              hover:bg-none
              hover:from-transparent hover:to-transparent
              hover:border-gray-800
              hover:text-gray-900"
          />
        </div>
      </div>

      <ContactPopup
        isOpen={isContactOpen}
        setIsOpen={setIsContactOpen}
      />
    </section>
  );
}
