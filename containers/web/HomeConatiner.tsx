import LogosCarousel from '@/components/web/LogosGrid';
import img1 from '@/public/assets/web/partners/logo2.svg'
import img2 from '@/public/assets/web/partners/logo3.svg'
import img3 from '@/public/assets/web/partners/logo4.svg'
import img4 from '@/public/assets/web/partners/logo5.svg'
import img5 from '@/public/assets/web/partners/logo6.svg'
import img6 from '@/public/assets/web/partners/logo7.svg'
import img7 from '@/public/assets/web/partners/logo8.svg'
import img8 from '@/public/assets/web/partners/logo9.svg'
import img9 from '@/public/assets/web/partners/logo10.svg'
import img10 from '@/public/assets/web/partners/logo11.svg'


import AboutSection from '@/components/web/AboutSection';
import { Building2, ClipboardPlus, Factory, GraduationCap, Headset, IdCardLanyard, Mail, MapPin, Rocket, Save, Trophy, UserRound } from 'lucide-react';
// import LucideIcon from '@/components/shared/LucideIcon';
import WorkingProcess from '@/components/web/WorkingProcess';
import HeroCTA from '@/components/web/HeroCTA';
import TestimonialCarousel from '@/components/web/TestimonialCarousel';
import ContactForm from '@/components/web/ContactForm';
import IndustriesSection from '@/components/web/IndustriesSection';
import HeroCarousel from '@/components/web/HeroCarousel';
import aboutUsImage from '@/public/assets/web/home/home-about-us.png'
import Services from '@/components/web/Services';
import MemberLogosSection from '@/components/web/MemberLogosSection';
import rocket from '@/public/assets/web/icons/rocket.svg'
import user from '@/public/assets/web/icons/user.svg'
import employee from '@/public/assets/web/icons/employee.svg'
import Image from 'next/image';

import ind1 from '../../public/assets/web/home/industriesSection/education.svg';
import ind2 from '../../public/assets/web/home/industriesSection/real-estate-icon.svg';
import ind3 from '../../public/assets/web/home/industriesSection/healthcare-icon.svg';
import ind4 from '../../public/assets/web/home/industriesSection/manufacturing-icon.svg';
import ind5 from '../../public/assets/web/home/industriesSection/ngo-icon.svg';
import AwardsSection from '@/components/web/home/AwardsSection';
import ContactSection from '@/components/web/ContactSection';

const HomeConatiner = () => {

    const partnersLogos = [
        { id: "partner-1", src: img1.src, alt: "partner-1", },
        { id: "partner-2", src: img2.src, alt: "partner-2", },
        { id: "partner-3", src: img3.src, alt: "partner-3", },
        { id: "partner-4", src: img4.src, alt: "partner-4", },
        { id: "partner-5", src: img5.src, alt: "partner-5", },
        { id: "partner-6", src: img6.src, alt: "partner-6", },
        { id: "partner-7", src: img7.src, alt: "partner-7", },
        { id: "partner-8", src: img8.src, alt: "partner-8", },
        { id: "partner-9", src: img9.src, alt: "partner-9", },
        { id: "partner-9", src: img10.src, alt: "partner-10", },
    ];


    const industriesItems = [
        {
            id: 1,
            title: "Education",
            desc: "We deliver innovative digital solutions that enhance learning experiences and streamline operations for educational institutions.",
            rightTitle: "Education for a Bright Tomorrow",
            rightDesc: "We deliver innovative digital solutions that enhance learning experiences and streamline operations for educational institutions.",
            iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
            icon: ind1,
            rightImage: "/assets/web/home/industriesSection/education.png",
            rightBottomIcon: <GraduationCap size={26} color="white" />
        },
        {
            id: 2,
            title: "Real Estate Services",
            desc: "We provide smart digital solutions that help real estate businesses manage properties, engage clients, and accelerate growth efficiently.",
            iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
            icon: ind2,
            rightImage: "/assets/web/home/industriesSection/real-estate-services.png",
            rightDesc: "We provide smart digital solutions that help real estate businesses manage properties, engage clients, and accelerate growth efficiently.",
            rightTitle: 'Real Estate Services',
            rightBottomIcon: <Building2 color="white" size={26} />
        },
        {
            id: 3,
            title: "Health Care",
            desc: "We deliver secure and innovative digital solutions that enhance patient care, streamline operations, and support modern healthcare services.",
            iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
            icon: ind3,
            rightImage: "/assets/web/home/industriesSection/health-care.png",
            rightDesc: 'We deliver secure and innovative digital solutions that enhance patient care, streamline operations, and support modern healthcare services.',
            rightTitle: 'Health Care',
            rightBottomIcon: <ClipboardPlus color="white" size={26} />
        },
        {
            id: 4,
            title: "Manufacturing",
            desc: "We provide intelligent digital solutions that optimize manufacturing processes, improve productivity, and support scalable industrial growth.",
            iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
            icon: ind4,
            rightImage: "/assets/web/home/industriesSection/manufacturing.png",
            rightDesc: 'We provide intelligent digital solutions that optimize manufacturing processes, improve productivity, and support scalable industrial growth.',
            rightTitle: 'Manufacturing',
            rightBottomIcon: <Factory color="white" size={26} />
        },
        {
            id: 5,
            title: "Non Profit Org",
            desc: "We empower non-profit organizations with impactful digital solutions that amplify outreach, improve efficiency, and drive meaningful change.",
            iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
            icon: ind5,
            rightImage: "/assets/web/home/industriesSection/non-profit-org.png",
            rightDesc: 'We empower non-profit organizations with impactful digital solutions that amplify outreach, improve efficiency, and drive meaningful change.',
            rightTitle: 'Non Profit Org',
            rightBottomIcon: <Trophy color="white" size={26} />
        },
    ];

    return (
        <div className='relative' >


            {/* hero */}
            <div>
                <HeroCarousel />
            </div>

            {/* trusted partners */}
            <div className='bg-[#F6F5F8]'>
                <LogosCarousel
                    items={partnersLogos}
                    label="Trusted Partners Worldwide for Success"
                />
            </div>

            {/* about */}
            <div className='pt-10'>
                <AboutSection
                    title="Who We Are. Learn About Us"
                    subtitle="L2 Global Technology Ltd. is a Professional Design Agency providing innovative and creative digital solutions."
                    imageSrc={aboutUsImage.src}
                    buttonText="Read More"
                    contactLabel="Take a Quote"
                    contactNumber="+91 90000 14701"
                    stats={[
                        { id: "1", icon: <Image src={rocket} alt='rocket' height={0} width={0} className='object-contain' />, value: '182 +', label: "Completed Projects" },
                        { id: "2", icon: <Image src={user} alt='rocket' height={0} width={0} className='object-contain' />, value: "1682 +", label: "Happy Customers" },
                        { id: "3", icon: <Image src={employee} alt='rocket' height={0} width={0} className='object-contain' />, value: "45 +", label: "Expert Employees" },
                    ]}
                />
            </div>

            <div className='mt-16'>
                <Services />
            </div>

            <div>
                {/* <LogosCarousel
                    items={awards}
                    label="Celebrating Our Awards and Milestones"
                    autoplay
                    speed={60}
                    dotColorClass="bg-[#FF6A1A]"
                /> */}

                <AwardsSection />

            </div>

            <div>
                <WorkingProcess />
            </div>

            <div>
                <IndustriesSection items={industriesItems} />
                <div>
                    <MemberLogosSection />
                </div>
            </div>

            <div>
                <TestimonialCarousel />
            </div>

            <div>
                <ContactSection />
            </div>

            <div>
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

        </div>
    )
}

export default HomeConatiner;