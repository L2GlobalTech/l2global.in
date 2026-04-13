"use client";
import React from 'react'
import SectionHeader from '../SectionHeader'
import mainImg from '../../../public/assets/web/contact-us/Social-Media/social-img.png'
import whatsapp from '../../../public/assets/web/contact-us/Social-Media/whatsapp.svg'
import youtube from '../../../public/assets/web/contact-us/Social-Media/youtube.svg'
import linkedin from '../../../public/assets/web/contact-us/Social-Media/linkedin.svg'
import instagram from '../../../public/assets/web/contact-us/Social-Media/instagram.svg'
import twitter from '../../../public/assets/web/contact-us/Social-Media/twitter.svg'

const iconBase = "md:h-32 md:w-32 h-18 w-18 object-contain cursor-pointer absolute bg-white md:rounded-4xl rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu scale-100 hover:scale-110"


const SocialMediaSection = () => {
    return (
        <div className="container mx-auto px-5 md:px-0">
            <div className="mt-1 md:mt-8" data-aos="fade-up">
                <SectionHeader
                    title="Follow us on social media"
                    desc="Stay connected with us for the latest updates, design inspiration, project highlights, and behind-the-scenes moments from our journey."
                />
            </div>

            <div className="flex justify-center items-center py-12 md:py-20" >
                <div className="relative flex justify-center items-center">
                    <img src={mainImg.src} alt="social media" className="w-4/5 h-full" data-aos="zoom-out" />

                    {/* Social IMages */}
                    <div className={`${iconBase} -top-6 md:left-24 left-14 hover:shadow-[0_0_35px_#25D366]`} data-aos="zoom-in" data-aos-delay="200" onClick={() => window.open('https://wa.me/+447442586325', '_blank')}>
                        <img src={whatsapp.src} alt="whatsapp" />
                    </div>

                    <div className={`${iconBase} -top-6 md:right-24 right-16 hover:shadow-[0_0_35px_#FF0000]`} data-aos="zoom-in" data-aos-delay="400" onClick={() => window.open('https://www.youtube.com/@l2globaltechnologies', '_blank')}>
                        <img src={youtube.src} alt="youtube" />
                    </div>

                    <div className={`${iconBase} top-[45%] right-8 -translate-y-1/2 hover:shadow-[0_0_35px_#0A66C2]`} data-aos="zoom-in" data-aos-delay="600" onClick={() => window.open('https://www.linkedin.com/company/l2-global-technologies', '_blank')}>
                        <img src={linkedin.src} alt="linkedin" />
                    </div>

                    <div className={`${iconBase} bottom-12 md:left-18 left-5 hover:shadow-[0_0_35px_#E4405F]`} data-aos="zoom-in" data-aos-delay="800" onClick={() => window.open('https://www.instagram.com/l2globaltechnologies', '_blank')}>
                        <img src={instagram.src} alt="instagram" />
                    </div>

                    <div className={`${iconBase} md:bottom-10 bottom-4 right-12 hover:shadow-[0_0_35px_#000000]`} data-aos="zoom-in" data-aos-delay="1000" onClick={() => window.open('https://twitter.com/l2globaltech', '_blank')}>
                        <img src={twitter.src} alt="twitter" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialMediaSection
