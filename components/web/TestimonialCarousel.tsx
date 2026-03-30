"use client";

import Slider from "react-slick";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Divider from "./Divider";

const testimonials = [
  {
    id: 1,
    title: "“The most reliable design agency we’ve worked with”",
    desc: "From initial brainstorming to final delivery, the team demonstrated exceptional creativity and attention to detail. Their ability to understand our brand and translate it into impactful digital designs truly set them apart.",
    name: "Sophia Moore",
    role: "Marketing Head at BrightEdge Solutions",
    img: "/assets/web/home/img-persion1.png",
  },
  {
    id: 2,
    title: "“Exceptional quality and innovative ideas”",
    desc: "The team consistently delivered high-quality designs backed by innovative thinking. Their structured approach, clear communication, and commitment to deadlines made the entire collaboration smooth and efficient.",
    name: "Adam Smith",
    role: "Founder of TechNova Labs",
    img: "/assets/web/home/img-persion1.png",
  },
  {
    id: 3,
    title: "“Professional, creative, and easy to collaborate with”",
    desc: "Working with L2 Global was a seamless experience. They took the time to understand our requirements and delivered creative solutions that aligned perfectly with our business goals and long-term vision.",
    name: "Mike Warren",
    role: "CEO of NextWave Technologies",
    img: "/assets/web/home/img-persion1.png",
  },
  {
    id: 4,
    title: "“A partner we can truly rely on”",
    desc: "Their team brought clarity and confidence to our project by combining technical expertise with strong design sensibilities. The results exceeded our expectations and significantly improved user engagement.",
    name: "Emily Carter",
    role: "Product Manager at Innovex Corp",
    img: "/assets/web/home/img-persion1.png",
  },
  {
    id: 5,
    title: "“Outstanding collaboration and execution”",
    desc: "From planning to execution, every stage of the project was handled with professionalism. The team was responsive, adaptable, and delivered solutions that were both functional and visually impressive.",
    name: "Daniel Roberts",
    role: "Operations Director at CloudSphere",
    img: "/assets/web/home/img-persion1.png",
  },
  {
    id: 6,
    title: "“Creative solutions backed by strong expertise”",
    desc: "L2 Global combined creative thinking with technical excellence to deliver a product that truly reflected our brand values. Their proactive approach and attention to detail made a noticeable difference.",
    name: "Rachel Thompson",
    role: "Head of Digital Strategy at Elevate Studios",
    img: "/assets/web/home/img-persion1.png",
  },
];

export default function TestimonialCarousel() {
  const sliderRef = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_: any, next: number) => setCurrent(next),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
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
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t, i) => {
            const isCenter = isMobile
              ? true
              : i === current ||
                (current > testimonials.length - 3 &&
                  i === (current - testimonials.length) % testimonials.length);

            return (
              <div
                key={t.id}
                className="px-0 md:px-4 transition-all duration-500"
              >
                <div
                  className={`
                    bg-white p-8 rounded-3xl flex flex-col justify-between
                    transition-all duration-500 m-5 md:m-0 h-full!
                    ${
                      isCenter
                        ? "border border-[#FF6A1A] scale-100 shadow-xl"
                        : "border border-transparent scale-[0.94] opacity-70"
                    }
                  `}
                >
                  <div>
                    <h3
                      className={`text-[22px] font-semibold transition-colors duration-500 ${
                        isCenter ? "text-[#FF6A1A]" : "text-gray-900"
                      }`}
                      style={{ letterSpacing: "-1px" }}
                    >
                      {t.title}
                    </h3>

                    <p className="text-gray-600 mt-3 text-md leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={45}
                      height={45}
                      className="rounded-full object-cover bg-[#feebe2]"
                    />
                    <div>
                      <p
                        className={`font-semibold transition-colors duration-500 ${
                          isCenter ? "text-[#FF6A1A]" : "text-gray-900"
                        }`}
                      >
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="flex justify-center items-end gap-6 h-40 md:h-60 lg:h-80 pb-6 md:pb-10 lg:pb-16 -mt-10 md:-mt-20 lg:-mt-40 bg-[url('/assets/web/home/bg-testimonials.png')] bg-cover bg-center">
        <button
          className="w-10 h-10 md:w-12 md:h-12 bg-[#5A59FF] text-white flex items-center justify-center rounded-full shadow-md hover:scale-105 transition"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          className="w-10 h-10 md:w-12 md:h-12 bg-[#5A59FF] text-white flex items-center justify-center rounded-full shadow-md hover:scale-105 transition"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
}
