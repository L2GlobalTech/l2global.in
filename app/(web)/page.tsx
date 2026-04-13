// import Divider from '@/components/web/Divider';
// import LogosCarousel from '@/components/web/LogosCarousel';
// import React from 'react'
// import img1 from '@/public/assets/web/home/trustedPartners/hotel-palacio.png'
// import img2 from '@/public/assets/web/home/trustedPartners/lounge-deck.png'
// import img3 from '@/public/assets/web/home/trustedPartners/pradati.png'
// import img4 from '@/public/assets/web/home/trustedPartners/prime-bakes.png'
// import img5 from '@/public/assets/web/home/trustedPartners/saimika.png'
// import img6 from '@/public/assets/web/home/trustedPartners/the-time-square.png'
// import img7 from '@/public/assets/web/home/trustedPartners/veda.png'
// import awarImg1 from '@/public/assets/web/home/awards/app-futura.png'
// import awarImg2 from '@/public/assets/web/home/awards/clutch.png'
// import awarImg3 from '@/public/assets/web/home/awards/design.png'
// import awarImg4 from '@/public/assets/web/home/awards/finalist.png'
// import awarImg5 from '@/public/assets/web/home/awards/mobile-app.png'
// import awarImg6 from '@/public/assets/web/home/awards/top-artificial.png'
// import awarImg7 from '@/public/assets/web/home/awards/mobile-app.png'
// import AboutSection from '@/components/web/AboutSection';
// import { Headset, IdCardLanyard, Mail, MapPin, Rocket, Save, UserRound } from 'lucide-react';
// // import LucideIcon from '@/components/shared/LucideIcon';
// import WorkingProcess from '@/components/web/WorkingProcess';
// import HeroCTA from '@/components/web/HeroCTA';
// import TestimonialCarousel from '@/components/web/TestimonialCarousel';
// import ContactItem from '@/components/web/ContactItem';
// import ContactForm from '@/components/web/ContactForm';
// import clsx from "clsx";
// import IndustriesSection from '@/components/web/IndustriesSection';
// import HeroCarousel from '@/components/web/HeroCarousel';
// import aboutUsImage from '@/public/assets/web/home/home-about-us.png'
// import Services from '@/components/web/Services';
// import MemberLogosSection from '@/components/web/MemberLogosSection';
// import rocket from '@/public/assets/web/icons/rocket.svg'
// import user from '@/public/assets/web/icons/user.svg'
// import employee from '@/public/assets/web/icons/employee.svg'
// import Image from 'next/image';


// const page = () => {

//     const partnersLogos = [
//         { id: "partner-1", src: img1.src, alt: "Time Square", width: 220, height: 60 },
//         { id: "partner-2", src: img2.src, alt: "Pragati Manor", width: 200, height: 60 },
//         { id: "partner-3", src: img3.src, alt: "Veda", width: 180, height: 60 },
//         { id: "partner-4", src: img4.src, alt: "Sa-I-Mika", width: 200, height: 60 },
//         { id: "partner-5", src: img5.src, alt: "NXX", width: 180, height: 60 },
//         { id: "partner-6", src: img6.src, alt: "Prime Bakes", width: 220, height: 60 },
//         { id: "partner-7", src: img7.src, alt: "Hotel Palacio", width: 200, height: 60 },

//         // repeated logos are OK, IDs must be different
//         { id: "partner-8", src: img4.src, alt: "Sa-I-Mika", width: 200, height: 60 },
//         { id: "partner-9", src: img5.src, alt: "NXX", width: 180, height: 60 },
//     ];


//     const awards = [
//         { id: "1", src: awarImg1.src, alt: "Time Square", width: 220, height: 60 },
//         { id: "2", src: awarImg2.src, alt: "Pragati Manor", width: 200, height: 60 },
//         { id: "3", src: awarImg3.src, alt: "Veda", width: 180, height: 60 },
//         { id: "4", src: awarImg4.src, alt: "Sa-I-Mika", width: 200, height: 60 },
//         { id: "5", src: awarImg5.src, alt: "NXX", width: 180, height: 60 },
//         { id: "6", src: awarImg6.src, alt: "Prime Bakes", width: 220, height: 60 },
//         { id: "7", src: awarImg7.src, alt: "Hotel Palacio", width: 200, height: 60 },
//         { id: "8", src: awarImg4.src, alt: "Prime Bakes", width: 220, height: 60 },
//         { id: "9", src: awarImg5.src, alt: "Hotel Palacio", width: 200, height: 60 },
//         { id: "4", src: awarImg4.src, alt: "Sa-I-Mika", width: 200, height: 60 },
//         { id: "5", src: awarImg5.src, alt: "NXX", width: 180, height: 60 },
//         { id: "6", src: awarImg6.src, alt: "Prime Bakes", width: 220, height: 60 },
//     ];

//     return (
//         <div className='relative'>
//             <a
//                 href="https://wa.me/91XXXXXXXXXX"
//                 target="_blank"
//                 className="fixed bottom-6 right-6 text-white p-4 rounded-full hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50"
//             >
//                 <svg width="60" height="60" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="41" cy="41" r="41" fill="#25D366" />
//                     <path d="M57.0823 24.7123C52.7875 20.4073 47.068 18.0396 40.9898 18.0396C28.4438 18.0396 18.2348 28.2486 18.2348 40.7946C18.2348 44.8023 19.2803 48.7178 21.2688 52.1721L18.04 63.9596L30.1043 60.7923C33.4253 62.6066 37.1665 63.5598 40.9795 63.5598H40.9898C53.5255 63.5598 63.96 53.3508 63.96 40.8048C63.96 34.7266 61.377 29.0173 57.0823 24.7123ZM40.9898 59.7263C37.5868 59.7263 34.2555 58.8141 31.3548 57.0921L30.668 56.6821L23.5135 58.5578L25.42 51.5776L24.969 50.8601C23.0728 47.8466 22.0785 44.3718 22.0785 40.7946C22.0785 30.3703 30.5655 21.8833 41 21.8833C46.0533 21.8833 50.799 23.8513 54.366 27.4286C57.933 31.0058 60.1265 35.7516 60.1163 40.8048C60.1163 51.2393 51.414 59.7263 40.9898 59.7263ZM51.3628 45.5608C50.799 45.2738 48.0008 43.9003 47.478 43.7158C46.9553 43.5211 46.576 43.4288 46.1968 44.0028C45.8175 44.5768 44.731 45.8478 44.3928 46.2373C44.0648 46.6166 43.7265 46.6678 43.1628 46.3808C39.8213 44.7101 37.6278 43.3981 35.424 39.6158C34.8398 38.6113 36.0083 38.6831 37.0948 36.5101C37.2793 36.1308 37.187 35.8028 37.0435 35.5158C36.9 35.2288 35.7623 32.4306 35.2908 31.2928C34.8295 30.1858 34.358 30.3396 34.0095 30.3191C33.6815 30.2986 33.3023 30.2986 32.923 30.2986C32.5438 30.2986 31.9288 30.4421 31.406 31.0058C30.8833 31.5798 29.4175 32.9533 29.4175 35.7516C29.4175 38.5498 31.4573 41.2558 31.734 41.6351C32.021 42.0143 35.7418 47.7543 41.451 50.2246C45.059 51.7826 46.4735 51.9158 48.2775 51.6493C49.3743 51.4853 51.6395 50.2758 52.111 48.9433C52.5825 47.6108 52.5825 46.4731 52.439 46.2373C52.3058 45.9811 51.9265 45.8376 51.3628 45.5608Z" fill="white" />
//                 </svg>

//             </a>

//             {/* hero */}
//             <div>
//                 <HeroCarousel />
//             </div>

//             {/* trusted partners */}
//             <div>
//                 <LogosCarousel
//                     items={partnersLogos}
//                     label="Trusted Partners Worldwide for Success"
//                     autoplay
//                     speed={60}
//                     dotColorClass="bg-black"
//                 />

//             </div>

//             {/* about */}
//             <div>
//                 <AboutSection
//                     title="Who We Are. Learn About Us"
//                     subtitle="L2 Global Technology Ltd. is a Professional Design Agency providing innovative and creative digital solutions."
//                     description="Global Technologies is recognized for its excellence in key technologies, and efficient project management. Global Technologies builds on its experience and specialized skills to provide national scale IT solutions."
//                     imageSrc={aboutUsImage.src}
//                     buttonText="Read More"
//                     contactLabel="Take a Quote"
//                     contactNumber="+91 12345 67890"
//                     stats={[
//                         { id: "1", icon: <Image src={rocket} alt='rocket' height={0} width={0} className='h-full object-contain' />, value: "434 +", label: "Completed Projects" },
//                         { id: "2", icon: <Image src={user} alt='rocket' height={0} width={0} className='h-full object-contain' />, value: "3532 +", label: "Happy Customers" },
//                         { id: "3", icon: <Image src={employee} alt='rocket' height={0} width={0} className='h-full object-contain' />, value: "241 +", label: "Expert Employees" },
//                     ]}
//                 />
//             </div>

//             <div>
//                 <Services />
//             </div>

//             <div>
//                 <LogosCarousel
//                     items={awards}
//                     label="Celebrating Our Awards and Milestones"
//                     autoplay
//                     speed={60}
//                     dotColorClass="bg-[#FF6A1A]"
//                 />
//             </div>

//             <div>
//                 <WorkingProcess />
//             </div>

//             <div>
//                 <IndustriesSection />
//                 <div>
//                     <MemberLogosSection />
//                 </div>
//             </div>

//             <div>
//                 <TestimonialCarousel />
//             </div>

//             <main className="mx-auto container py-6 md:py-12">
//                 {/* Top breadcrumb pill */}
//                 {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 shadow-sm ring-1 ring-gray-200">
//                     <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
//                     <span>Contact Us</span>
//                     <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
//                 </div> */}

//                 <div className="flex justify-center md:justify-start mb-4">
//                     <span
//                         className={clsx(
//                             // pill container
//                             "inline-flex items-center gap-2 rounded-full",
//                             "px-3 sm:px-4 py-1 sm:py-1.5",
//                             "bg-[#F6F6F9] text-sm sm:text-base",
//                             // allow gradient border option via wrapper trick
//                         )}
//                     >
//                         {/* left dot */}
//                         <span
//                             aria-hidden="true"
//                             className={clsx(
//                                 "h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0",

//                             )}
//                         />
//                         <span className="whitespace-nowrap">{'Contact Us'}</span>
//                         {/* right dot */}
//                         <span
//                             aria-hidden="true"
//                             className={clsx(
//                                 "h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0",

//                             )}
//                         />
//                     </span>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                     {/* Left column */}
//                     <section>
//                         <h1 className="text-4xl sm:text-3xl font-semibold text-gray-900 mb-10">Get In Touch</h1>

//                         <div className="space-y-10">
//                             <ContactItem
//                                 title="Call us:"
//                                 icon={<Headset size={25} color='white' />}
//                             >
//                                 +91 90000 14701
//                             </ContactItem>

//                             <ContactItem
//                                 title="Address:"
//                                 icon={<MapPin size={25} color='white' />}
//                             >
//                                 1-8, Tempalli, Gannavaram, Krishna District, Andhra Pradesh – 521286
//                             </ContactItem>

//                             <ContactItem
//                                 title="Email:"
//                                 icon={<Mail size={25} color='white' />}
//                             >
//                                 contactus@l2global.in
//                             </ContactItem>
//                         </div>
//                     </section>

//                     {/* Right column form */}
//                     <section className="relative">
//                         <div className="absolute inset-0 -z-10 rounded-3xl" />
//                         <ContactForm />
//                     </section>
//                 </div>
//             </main>

//             <div>
//                 <HeroCTA
//                     tag="Let's Grow Together"
//                     heading="Expand Your Business with Us!"
//                     description="Partner with L2 Global Technology Ltd. to accelerate growth through innovative design, technology, and digital strategy."
//                     primaryBtnText="Get Started"
//                     primaryBtnLink="/get-started"
//                     secondaryBtnText="Watch Demo"
//                     secondaryBtnLink="/demo"
//                 />

//             </div>

//         </div>
//     )
// }

// export default page;


import HomeConatiner from '@/containers/web/HomeConatiner'
import { Metadata } from 'next';
import React from 'react'

// export const metadata: Metadata = {
//     title: 'L2 Global Technologies | Home',
//     description: '',
// };
export const metadata: Metadata = {
    title: 'Salesforce, SAP & MuleSoft Consultants | UK, USA & Gulf | L2 Global',
    description:
        'L2 Global Technologies — expert Salesforce, SAP, MuleSoft and cloud integration' +
        ' consultants serving UK, USA, UAE, Saudi Arabia and Gulf businesses.' +
        ' 182+ projects delivered. Free consultation today.',
    alternates: { canonical: 'https://l2global.in' },
    openGraph: {
        title: 'Salesforce, SAP & MuleSoft Consultants | L2 Global Technologies',
        description: 'Expert IT integration for UK, USA and Gulf businesses. Free consultation.',
        url: 'https://l2global.in',
        images: ['/assets/web/og-image.png'],
    },
};


const page = () => {
    return (
        <><HomeConatiner /></>
    )
}

export default page