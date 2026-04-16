"use client";

import Image from 'next/image'
import React, { useEffect } from 'react'
import callimg from '../../public/assets/web/contact-us/call-Icon.svg';
import locationimg from '../../public/assets/web/contact-us/location-icon.svg';
import emailimg from '../../public/assets/web/contact-us/email-Icon.svg';
import ContactForm from './ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import contactimg from '../../public/assets/web/home/contcat-us.svg'
import contactimg from '../../public/assets/web/home/ContactUs.png'

const ContactSection = () => {

    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    return (
        <div>
            <main className="mx-auto container py-6 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left column */}
                    <section data-aos="fade-out" data-aos-delay="200" data-aos-easing="ease-out-cubic">
                        <div className="flex flex-col justify-center items-center lg:items-start mb-12 ">
                            <span className="text-lg font-medium bg-[#F6F6F9] px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-1px]" style={{ letterSpacing: "-1px" }}>
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                Contact Us
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            </span>

                            <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-[-2px] mt-6 text-center lg:text-left">
                                Get In Touch
                            </h2>
                        </div>

                        <div className="space-y-10">
                            <div className='flex items-center gap-4'>
                                <Image src={callimg} alt='call icon' width={70} height={70} className='object-contain' style={{ boxShadow: '0px 0px 36px 0px #0000000F;' }} />
                                <div>
                                    <p className='text-gray-500'>Call us:</p>
                                    <p className='font-semibold text-lg text-gray-900'>+91 90000 14701</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <Image src={locationimg} alt='location icon' width={70} height={70} className='object-contain' style={{ boxShadow: '0px 0px 36px 0px #0000000F;' }} />
                                <div>
                                    <p className='text-gray-500'>Address:</p>
                                    <p className='font-semibold text-lg text-gray-900'>Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <Image src={emailimg} alt='email icon' width={70} height={70} className='object-contain' style={{ boxShadow: '0px 0px 36px 0px #0000000F;' }} />
                                <div>
                                    <p className='text-gray-500'>Email:</p>
                                    <p className='font-semibold text-lg text-gray-900'>contactus@l2global.in</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Image src={contactimg} alt='contact us' width={450} height={400} className='object-contain' />
                        </div>
                    </section>

                    {/* Right column form */}
                    <section data-aos="fade-in" data-aos-delay="400" data-aos-easing="ease-out-cubic" className="relative">
                        <div className='mt-15'>
                            <div className="absolute inset-0 -z-10 rounded-3xl" />
                            <ContactForm />
                        </div>
                    </section>

                </div>
            </main>
        </div>
    )
}

export default ContactSection;
