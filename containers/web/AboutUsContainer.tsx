import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/about-us/hero-img.png'
import InnovationStatsSection from '@/components/web/InnovationStatsSection'
import Divider from '@/components/web/Divider'
import SectionHeader from '@/components/web/SectionHeader'
import IndustriesSection from '@/components/web/IndustriesSection'
import TeamGrid from '@/components/web/TeamGrid'
import ProcessGrid from '@/components/web/ProcessGrid'
import HeroCTA from '@/components/web/HeroCTA'
import WhyTheyWorkWithUs from '@/components/web/WhyTheyWorkWithUs'
import AboutIndustriesSection from '@/components/web/AboutIndustriesSection'
import ind1 from '../../public/assets/web/home/industriesSection/education.svg';
import ind2 from '../../public/assets/web/home/industriesSection/real-estate-icon.svg';
import ind3 from '../../public/assets/web/home/industriesSection/healthcare-icon.svg';
import ind4 from '../../public/assets/web/home/industriesSection/manufacturing-icon.svg';
import ind5 from '../../public/assets/web/home/industriesSection/ngo-icon.svg';

const industriesItems = [
    {
        id: 1,
        title: "Education",
        desc: "We deliver innovative digital solutions that enhance learning experiences and streamline operations for educational institutions.",
        // rightTitle: "Education for a Bright Tomorrow",
        // rightDesc: "We deliver innovative digital solutions that enhance learning experiences and streamline operations for educational institutions.",
        iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
        icon: ind1,
        rightImage: "/assets/web/home/industriesSection/education.png",
        // rightBottomIcon: <GraduationCap size={26} color="white" />
    },
    {
        id: 2,
        title: "Real Estate Services",
        desc: "We provide smart digital solutions that help real estate businesses manage properties, engage clients, and accelerate growth efficiently.",
        iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
        icon: ind2,
        rightImage: "/assets/web/home/industriesSection/real-estate-services.png",
        // rightDesc: "We provide smart digital solutions that help real estate businesses manage properties, engage clients, and accelerate growth efficiently.",
        // rightTitle: 'Real Estate Services',
        // rightBottomIcon: <Building2 color="white" size={26} />
    },
    {
        id: 3,
        title: "Health Care",
        desc: "We deliver secure and innovative digital solutions that enhance patient care, streamline operations, and support modern healthcare services.",
        iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
        icon: ind3,
        rightImage: "/assets/web/home/industriesSection/health-care.png",
        // rightDesc: 'We deliver secure and innovative digital solutions that enhance patient care, streamline operations, and support modern healthcare services.',
        // rightTitle: 'Health Care',
        // rightBottomIcon: <ClipboardPlus color="white" size={26} />
    },
    {
        id: 4,
        title: "Manufacturing",
        desc: "We provide intelligent digital solutions that optimize manufacturing processes, improve productivity, and support scalable industrial growth.",
        iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
        icon: ind4,
        rightImage: "/assets/web/home/industriesSection/manufacturing.png",
        // rightDesc: 'We provide intelligent digital solutions that optimize manufacturing processes, improve productivity, and support scalable industrial growth.',
        // rightTitle: 'Manufacturing',
        // rightBottomIcon: <Factory color="white" size={26} />
    },
    {
        id: 5,
        title: "Non Profit Org",
        desc: "We empower non-profit organizations with impactful digital solutions that amplify outreach, improve efficiency, and drive meaningful change.",
        iconBg: "bg-gradient-to-b from-[#92A7FF] to-[#5C7BFF]",
        icon: ind5,
        rightImage: "/assets/web/home/industriesSection/non-profit-org.png",
        // rightDesc: 'We empower non-profit organizations with impactful digital solutions that amplify outreach, improve efficiency, and drive meaningful change.',
        // rightTitle: 'Non Profit Org',
        // rightBottomIcon: <Trophy color="white" size={26} />
    },
];


const AboutUsContainer = () => {
    return (
        <div>
            {/* hero section */}
            <div>
                <HeroSection
                    label="About us"
                    title="About L2 Global Technology Ltd."
                    description="L2 Global Technology Ltd. provides turnkey digital solutions that are innovative, sustainable, and meet international standards."
                    image={heroImage}
                />
            </div>

            {/* About the Company */}
            <div className='pt-10'>
                <div className="md:mb-4">
                    <Divider className="text-black" blur={true} pillClassName='bg-[#F6F6F9]' label={'About the Company'} />
                </div>
                <div className='mt-1 md:mt-8'>
                    <SectionHeader title='Discover Who We Truly Are' desc='Learn about L2 Global Technology Ltd. and our passion for creating innovative digital solutions.' />
                </div>
                <div className='container mx-auto'>
                    <InnovationStatsSection
                        title={
                            <>
                                Innovators delivering creative <br />
                                digital design solutions.
                            </>
                        }
                        description={
                            <>
                                <p>
                                    Global Technologies is recognized for its excellence across key technologies and its ability to deliver projects with efficiency and precision. With a strong foundation of industry experience and specialized technical expertise, we design and implement reliable IT solutions that scale nationally.
                                </p>
                                <p>
                                    Our approach combines innovation, structured project management, and a deep understanding of client needs to deliver impactful, future-ready digital solutions.
                                </p>
                            </>
                        }
                        btn="Let's Connect"
                        btnLink="/contact-us"

                        firstBoxNumber="700"
                        firstBoxTitle={
                            <>
                                <div className="text-lg mb-1 font-medium">Projects Completed</div>
                                <div className="text-sm font-thin">
                                    Successfully delivered projects across industries with quality, performance, and timely execution.
                                </div>
                            </>
                        }

                        secondBoxNumber="38"
                        secondBoxTitle={
                            <>
                                <div className="text-lg mb-1 font-medium">Currently Ongoing Projects</div>
                                <div className="text-sm font-thin">
                                    Actively managing live projects with agile processes and continuous client collaboration.
                                </div>
                            </>
                        }

                        thirdBoxNumber="25"
                        thirdBoxTitle={
                            <>
                                <div className="text-lg mb-1 font-medium">Award-Winning Salesforce Projects</div>
                                <div className="text-sm font-thin">
                                    Recognized Salesforce solutions delivering innovation and measurable business impact.
                                </div>
                            </>
                        }

                        fourthBoxNumber="15"
                        fourthBoxTitle={
                            <>
                                <div className="text-lg mb-1 font-medium">Years of Experience</div>
                                <div className="text-sm font-thin">
                                    Years of proven expertise in building scalable, reliable, and future-ready digital solutions.
                                </div>
                            </>
                        }
                    />

                </div>
            </div>

            {/* How we are */}
            <div >
                <AboutIndustriesSection items={industriesItems} color='bg-[#F15A23]' />
            </div>

            <div className='py-14'>
                <div>
                    <Divider className="text-black" blur label="Our Directors" />
                    <SectionHeader
                        title="Meet the People Behind Our Back"
                    />
                </div>
                <div className='container mx-auto'>
                    <TeamGrid />
                </div>
            </div>

            <div className='bg-[#F6F5F8] pt-12 pb-8'>
                <div>
                    <Divider className="text-black" pillClassName='bg-white' blur label="Working Process" />
                    <SectionHeader
                        title="Explore Our 5 Step Working Process"
                        desc='Our 6-step working process ensures clarity, creativity, and consistency from concept to completion'
                    />
                </div>
                <div className='container mx-auto'>
                    <ProcessGrid />
                </div>
            </div>

            <div >
                <WhyTheyWorkWithUs />
            </div>

            <div className=' pt-2 md:pt-8 lg:pt-12'>
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

export default AboutUsContainer