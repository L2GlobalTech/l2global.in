import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/contact-us/hero-img.png'
import Divider from '@/components/web/Divider'
import SectionHeader from '@/components/web/SectionHeader'
import LocationCard from '@/components/web/LocationCard'
import img1 from '@/public/assets/web/contact-us/vijayawada.png'
import img2 from '@/public/assets/web/contact-us/bengaluru.png'
import img3 from '@/public/assets/web/contact-us/london.png'
import img4 from '@/public/assets/web/contact-us/texas.png'
import img5 from '@/public/assets/web/contact-us/new-york.png'

import HeroCTA from '@/components/web/HeroCTA'
import ContactItem from '@/components/web/ContactItem'
import { Headset, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/web/ContactForm'
import clsx from 'clsx'
import Image from 'next/image'
import callimg from '../../public/assets/web/contact-us/call-Icon.svg';
import locationimg from '../../public/assets/web/contact-us/location-icon.svg';
import emailimg from '../../public/assets/web/contact-us/email-Icon.svg';
import Link from 'next/link'
import SocialMediaSection from '@/components/web/contact-us/SocialMediaSection'

const locationDetails = [
    {
        title: 'Vijayawada',
        image: img1,
        address: "1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286"
    },
    {
        title: 'Bengaluru',
        image: img2,
        address: "1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286"
    },
    {
        title: 'London',
        image: img3,
        address: "1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286"
    },
    {
        title: 'Texas',
        image: img4,
        address: "1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286"
    },
    {
        title: 'New York',
        image: img5,
        address: "1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286"
    }
]

const ContactUsContainer = () => {
    return (
        <div>
            <HeroSection
                label="Contact Us"
                title="Let’s Talk Design & Innovation"
                description="Have questions about our services or how L2 Global can power your next project? We’ll get back to you within 1 business day."
                image={heroImage}
            />

            <main className="mx-auto container py-6 md:py-12">
                <div className="space-y-6">

                    {/* Left column */}
                    <section data-aos="fade-up">
                        <div className="flex flex-col justify-center items-center lg:items-start mb-12">
                            <span
                                className="text-lg font-medium bg-[#F6F6F9] px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-1px]"
                            >
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                Contact Us
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            </span>

                            <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-[-2px] mt-6 text-center lg:text-left">
                                Get In Touch
                            </h2>
                        </div>

                        {/* Contact info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-10 mb-16">

                            <div className="flex items-center gap-4" data-aos="fade-up" data-aos-delay="100">
                                <Image src={callimg} alt="call icon" width={50} height={50} />
                                <div>
                                    <p className="text-gray-500">Call us:</p>
                                    <Link href="tel:+919000014701" className="font-semibold text-lg text-gray-900">
                                        +91 90000 14701
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-4" data-aos="fade-up" data-aos-delay="200">
                                <Image src={locationimg} alt="location icon" width={50} height={50} />
                                <div>
                                    <p className="text-gray-500">Address:</p>
                                    <p className="font-semibold text-lg text-gray-900">
                                        1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4" data-aos="fade-up" data-aos-delay="300">
                                <Image src={emailimg} alt="email icon" width={50} height={50} />
                                <div>
                                    <p className="text-gray-500">Email:</p>
                                    <p className="font-semibold text-lg text-gray-900">
                                        contactus@l2global.in
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Right column */}
                    <div className="md:grid flex flex-col-reverse md:grid-cols-12 gap-8">

                        {/* Contact Form */}
                        <section
                            className="relative col-span-7"
                            data-aos="zoom-in"
                        >
                            <div className="absolute inset-0 -z-10 rounded-3xl" />
                            <ContactForm />
                        </section>

                        {/* Map */}
                        <div className="col-span-5" data-aos="fade-up" data-aos-delay="200">
                            <div className="w-full h-[300px] sm:h-[400px] md:h-full overflow-hidden rounded-3xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=..."
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </main >

            <div className="bg-[#F6F5F8] py-8">

                <div className="mb-4" data-aos="fade-up">
                    <Divider
                        className="text-black"
                        blur={true}
                        pillClassName="bg-white"
                        label="Branches"
                    />
                </div>

                <div className="mt-1 md:mt-8" data-aos="fade-up" data-aos-delay="100">
                    <SectionHeader
                        title="Our Branches Across the Globe"
                        desc="With offices in key regions, L2 Global connects innovation and creativity to deliver solutions closer to our clients."
                    />
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {locationDetails.map((itm, index) => (
                            <div
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={index * 300}
                                data-aos-duration="700"
                            >
                                <LocationCard
                                    image={itm.image.src}
                                    title={itm.title}
                                    address={itm.address}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className='pt-14'>
                <SocialMediaSection />
            </div>

            <div className='pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Expand Your Business with Us!"
                    description="Partner with L2 Global Technology Ltd. to accelerate growth through innovative design, technology, and digital strategy."
                    primaryBtnText="Get Started"
                    primaryBtnLink="/get-started"
                    secondaryBtnText="Watch Demo"
                    secondaryBtnLink="/demo"
                />

            </div>
        </div >
    )
}

export default ContactUsContainer