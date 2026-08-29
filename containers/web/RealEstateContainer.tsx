'use client'
import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/services/real-estate-hero.png'
import ServiceSubHero from '@/components/web/ServiceSubHero'
import subheroImg from '@/public/assets/web/services/real-estate-subhero.png'
import InnovationStatsSection from '@/components/web/InnovationStatsSection'
import Divider from '@/components/web/Divider'
import SectionHeader from '@/components/web/SectionHeader'
import DeveloperCard from '@/components/web/DeveloperCard'
import developerImg from '@/public/assets/web/services/real-estate-developer.png'
import ProcessSteps, { StepItem } from '@/components/web/ProcessSteps'
import img1 from '@/public/assets/web/services/step1-img.svg'
import img2 from '@/public/assets/web/services/step2-img.svg'
import img3 from '@/public/assets/web/services/step3-img.svg'
import img4 from '@/public/assets/web/services/step4-img.svg'
import img5 from '@/public/assets/web/services/step5-img.svg'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'

const realEstateFaqs = [
    {
        q: 'Do you build Salesforce solutions for real estate businesses near me?',
        a: 'Yes. L2 Global delivers real estate technology and Salesforce solutions across the USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'What real estate technology services does L2 Global offer?',
        a: 'Property management systems, customer portals, real-time dashboards and AI-driven analytics built on Salesforce for developers, agencies and investors.'
    },
    {
        q: 'How much does a real estate CRM implementation cost?',
        a: 'Costs vary by scope and property portfolio size. Free scoping consultation available to provide an accurate estimate for your business.'
    },
    {
        q: 'Can you integrate our existing property management tools with Salesforce?',
        a: 'Yes. We specialise in integrating property management, listing and CRM systems into a single Salesforce-based platform.'
    },
]


const steps: StepItem[] = [
  {
    step: 'STEP 1',
    title: 'Consulting',
    description: 'Understand requirements and define strategy.',
    image: img1.src,
    bgColor: 'bg-[#F6F5F8]',
    dotColor: 'bg-[#5062E5]',
    stepColor: 'text-[#5062E5]',
  },
  {
    step: 'STEP 2',
    title: 'Solutions',
    description: 'Design tailored, scalable solutions.',
    image: img2.src,
    bgColor: 'bg-[#FCECED]',
    dotColor: 'bg-[#E8505C]',
    stepColor: 'text-[#E8505C]',
  },
  {
    step: 'STEP 3',
    title: 'Develop',
    description: 'Build reliable, high-quality systems.',
    image: img3.src,
    bgColor: 'bg-[#FFF7E3]',
    dotColor: 'bg-[#FFBC12]',
    stepColor: 'text-[#FFBC12]',
  },
  {
    step: 'STEP 4',
    title: 'Deploy',
    description: 'Launch smoothly with full testing.',
    image: img4.src,
    bgColor: 'bg-[#EAF6FF]',
    dotColor: 'bg-[#61C5F8]',
    stepColor: 'text-[#61C5F8]',
  },
  {
    step: 'STEP 5',
    title: 'Support',
    description: 'Maintain, monitor, and optimise continuously.',
    image: img5.src,
    bgColor: 'bg-[#FFF4E8]',
    dotColor: 'bg-[#FF931A]',
    stepColor: 'text-[#FF931A]',
  },
]

const RealEstateContainer = () => {
  return (
    <div>
      {/* Hero section */}
      <div>
        <HeroSection
          label="Real Estate"
          title="Innovating Real Estate Solutions"
          description="L2 Global Technology Ltd. develops advanced real estate software that streamlines property management, enhances transparency, and meets global standards."
          image={heroImage}
        />
      </div>

      {/* Sub Hero */}
      <div data-aos="fade-up" >
        <ServiceSubHero
          label="Real Estate Software Development Services"
          title="Smart Real Estate Solutions Built for the Future"
          description={
            <>
              We create intelligent tools that redefine how the real estate industry operates.From property management systems to customer portals, our solutions improve efficiency and transparency. L2 Global combines innovation and technology to help realtors, builders, and investors make data-driven decisions and manage operations seamlessly.
            </>
          }
          image={subheroImg.src}
        />
      </div>

      <div data-aos="fade-up"  className='bg-[#F6F5F8]'>
        <div className='container mx-auto'>
         <InnovationStatsSection
            title={
              <>
                Numbers That Define Our <br />
                Journey
              </>
            }
            description={
              <>
                <p>
                  Every project reflects our passion for innovation and excellence, delivering measurable success in real estate technology through engaging, outcome-driven solutions
                </p>
                <p>
                  Through thoughtful design and modern technology, we help developers and agencies adapt and thrive—turning ideas into seamless property experiences.
                </p>
              </>
            }
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
            secondBoxColor='bg-white'
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

      <div data-aos="fade-up" >
        <ProcessSteps steps={steps} />
      </div>

      <div data-aos="fade-up" >
        <div className="mb-4">
          <Divider className="text-black" blur={true} pillClassName='bg-[#F6F6F9]' label={'Our Developers'} />
        </div>
        <div className='mt-1'>
          <SectionHeader title='The Talent Powering Every Success' desc='Behind every project is a passionate team of experts dedicated to turning ideas into impactful, high-quality real estate software solutions.' />
        </div>
        <DeveloperCard
          paragraphs={[
            "Our development team combines deep technical expertise with a strong understanding of modern property management platforms to build reliable, future-ready digital solutions. We focus on creating systems that are intuitive, secure, and adaptable to evolving market needs, ensuring long-term value for developers, agencies and investors alike.",
            "Our developers are the driving force behind every innovative solution we create. With a perfect blend of creativity, technical expertise, and attention to detail, they design and build software that transforms how the real estate industry operates. Focused on quality, scalability, and performance, our team ensures each project delivers seamless user experiences and measurable results that align with your vision.",
            "At L2 Global, our developers bring vision to life through code, creativity, and collaboration. They focus on crafting intelligent, efficient systems that simplify property management and transactions. Every project reflects their dedication to innovation, precision, and the pursuit of excellence in real estate technology."
          ]}
          buttonLabel="Get A Quote"
          phoneLabel="Take a Call"
          phoneNumber="+91 90000 14701"
          image={developerImg.src}
          badgeText={`Expert\nDeveloper\nTeam`}
        />
      </div>

      <ServiceFAQ faqs={realEstateFaqs} serviceName='Real Estate Technology' />

      <div data-aos="fade-up">
        <HeroCTA
          tag="Let's Grow Together"
          heading="Expand Your Business with Us!"
          description="Partner with L2 Global Technology Ltd. to accelerate growth through innovative design, technology, and digital strategy."
          primaryBtnText="Book Free Consultation"
          primaryBtnLink="/contact-us"
          secondaryBtnText="View Services"
          secondaryBtnLink="/services"
        />

      </div>

    </div>
  )
}

export default RealEstateContainer