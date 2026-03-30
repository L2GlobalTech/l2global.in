'use client'

import Image from 'next/image'
import { PhoneCall } from 'lucide-react'
import GradientButton from '../shared/GradientButton'
import PrimaryButton from '../shared/PrimaryButton'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface DeveloperCardProps {
  paragraphs: string[]
  buttonLabel: string
  phoneLabel: string
  phoneNumber: string
  image: string
  badgeText: string
}

const DeveloperCard = ({
  paragraphs,
  buttonLabel,
  phoneLabel,
  phoneNumber,
  image,
  badgeText,
}: DeveloperCardProps) => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
    })
    AOS.refresh()
  }, [])

  return (
    <div className="w-full bg-white pb-10 pt-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div
            className="space-y-6 text-center lg:text-left"
            data-aos="fade-right"
          >
            {paragraphs.map((text, index) => (
              <p
                key={index}
                className="text-sm md:text-lg text-[#515151] leading-relaxed"
                style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {text}
              </p>
            ))}

            {/* CTA */}
            <div
              className="flex flex-wrap md:justify-start items-center justify-center gap-6 mt-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <PrimaryButton
                label={buttonLabel}
                href="/contact-us"
                icon={
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path
                      d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                      fill="white"
                    />
                  </svg>
                }
              />

              <div
                className="flex items-center gap-3"
                data-aos="fade-up"
                data-aos-delay="750"
              >
                <div className="h-14 w-14 rounded-xl bg-[#F6F6F9] flex items-center justify-center">
                  <LucideIcons.PhoneCall color="#021B79" size={25} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{phoneLabel}</p>
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="font-semibold text-[#030714] text-xl hover:text-[#F15A23] transition"
                  >
                    {phoneNumber}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div
            className="relative flex justify-center items-center h-full"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="relative bg-[#F9FAFB] flex justify-center items-center rounded-3xl p-6 w-full h-full">
              <div className="flex justify-center">
                <Image
                  src={image}
                  alt="Developer"
                  width={420}
                  height={420}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DeveloperCard
