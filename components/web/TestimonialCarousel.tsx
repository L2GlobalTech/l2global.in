"use client";

import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Divider from "./Divider";
import {
  fetchPublicTestimonials,
  defaultTestimonials,
} from "@/actions/testimonialsAction";
import { TestimonialRecord } from "@/types/cms";

interface TestimonialCarouselProps {
  initialTestimonials?: TestimonialRecord[];
}

export default function TestimonialCarousel({
  initialTestimonials,
}: TestimonialCarouselProps) {
  const sliderRef = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : defaultTestimonials
  );

  // Responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch dynamic testimonials from Supabase
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const liveData = await fetchPublicTestimonials();
        if (isMounted && liveData && liveData.length > 0) {
          setTestimonials(liveData);
        }
      } catch (err) {
        console.warn("Failed to load live testimonials, using defaults:", err);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const count = testimonials.length;
  const slidesToShow = isMobile ? 1 : Math.min(3, count);

  const settings = {
    dots: false,
    infinite: count > 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: slidesToShow,
    centerMode: !isMobile && count >= 3,
    centerPadding: "0px",
    beforeChange: (_: any, next: number) => setCurrent(next),
  };

  return (
    <section className="pt-8 md:pt-16 bg-[#F6F5F8] relative">
      <Divider
        pillClassName="bg-white"
        className="text-black"
        blur
        label="Testimonials"
      />

      <div className="md:mt-4 px-4 md:px-0">
        <SectionHeader
          title="Hear What Our Clients Say"
          desc="From startups to global brands, our clients value the dedication and quality that define every project we deliver."
        />
      </div>

      <div className="overflow-hidden">
        <Slider
          key={`${isMobile ? "mobile" : "desktop"}-${count}`}
          ref={sliderRef}
          {...settings}
        >
          {testimonials.map((t, i) => {
            const isCenter = isMobile
              ? true
              : count < 3
              ? true
              : i === current ||
                (current > count - 3 && i === (current - count) % count);

            return (
              <div
                key={t.id || i}
                className="px-0 md:px-4 transition-all duration-500"
              >
                <div
                  className={`
                    bg-white p-7 md:p-8 rounded-3xl flex flex-col justify-between
                    transition-all duration-500 m-5 md:m-0 h-full!
                    ${
                      isCenter
                        ? "border border-[#FF6A1A] scale-100 shadow-xl"
                        : "border border-transparent scale-[0.94] opacity-70"
                    }
                  `}
                >
                  <div>
                    {t.title && (
                      <h3
                        className={`text-[20px] md:text-[22px] font-semibold transition-colors duration-500 line-clamp-2 ${
                          isCenter ? "text-[#FF6A1A]" : "text-gray-900"
                        }`}
                        style={{ letterSpacing: "-1px" }}
                      >
                        {t.title}
                      </h3>
                    )}

                    <p className="text-gray-600 mt-3 text-sm md:text-md leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-2 border-t border-gray-50">
                    {t.img ? (
                      <img
                        src={t.img}
                        alt={t.name}
                        loading="lazy"
                        className="rounded-full object-cover w-12 h-12 border border-gray-100 shadow-xs shrink-0 bg-slate-100"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs">
                        {t.name ? t.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p
                        className={`font-semibold transition-colors duration-500 truncate ${
                          isCenter ? "text-[#FF6A1A]" : "text-gray-900"
                        }`}
                      >
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="flex justify-center items-end gap-6 h-40 md:h-60 lg:h-80 pb-6 md:pb-10 lg:pb-16 -mt-10 md:-mt-20 lg:-mt-40 bg-[url('/assets/web/home/bg-testimonials.webp')] bg-cover bg-center">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="w-10 h-10 md:w-12 md:h-12 bg-[#5A59FF] text-white flex items-center justify-center rounded-full shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          type="button"
          aria-label="Next testimonial"
          className="w-10 h-10 md:w-12 md:h-12 bg-[#5A59FF] text-white flex items-center justify-center rounded-full shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
}
