'use client'
import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/services/manufacturing-hero.png'
import ServiceSubHero from '@/components/web/ServiceSubHero'
import subheroImg from '@/public/assets/web/services/manufacturing-subhero.png'
import InnovationStatsSection from '@/components/web/InnovationStatsSection'
import Divider from '@/components/web/Divider'
import SectionHeader from '@/components/web/SectionHeader'
import DeveloperCard from '@/components/web/DeveloperCard'
import developerImg from '@/public/assets/web/services/manufacturing-developer.png'
import ProcessSteps, { StepItem } from '@/components/web/ProcessSteps'
import img1 from '@/public/assets/web/services/step1-img.svg'
import img2 from '@/public/assets/web/services/step2-img.svg'
import img3 from '@/public/assets/web/services/step3-img.svg'
import img4 from '@/public/assets/web/services/step4-img.svg'
import img5 from '@/public/assets/web/services/step5-img.svg'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'

const manufacturingFaqs = [
    {
        q: 'Do you deliver manufacturing IT solutions near me?',
        a: 'Yes. L2 Global delivers manufacturing IT solutions across the USA, UK, Canada, Australia, Asia and Gulf, remotely worldwide. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'What manufacturing technology services does L2 Global offer?',
        a: 'SAP S/4HANA migration, MuleSoft integration and digital transformation for discrete and process manufacturers.'
    },
    {
        q: 'Can you integrate our shop-floor systems with SAP?',
        a: 'Yes. We specialise in integrating manufacturing execution systems and shop-floor data with SAP and other enterprise platforms.'
    },
    {
        q: 'How much does a manufacturing SAP implementation cost?',
        a: 'Costs vary by plant complexity and integration scope. Free scoping consultation available.'
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

const ManufacturingContainer = () => {
  return (
    <div>
      {/* Hero section */}
      <div>
        <HeroSection
          label="Manufacturing"
          title="Innovating Manufacturing Solutions"
          description="L2 Global Technology Ltd. develops custom manufacturing software that enhances productivity, ensures precision, and meets global industry standards."
          image={heroImage}
        />
      </div>

      {/* Sub Hero */}
      <div data-aos="fade-up" >
        <ServiceSubHero
          label="Manufacturing Software Development Services"
          title="Smart Manufacturing Solutions Built for Efficiency"
          description={
            <>
              We create intelligent, scalable software that empowers manufacturers to optimize production, streamline supply chains, and reduce downtime. From factory automation systems to resource planning tools, our solutions bring visibility, control, and speed to your operations. L2 Global helps manufacturing companies embrace digital transformation with innovation, precision, and real-world results.
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
                  Every project reflects our passion for innovation and excellence, delivering measurable success in digital manufacturing through engaging, outcome-driven solutions
                </p>
                <p>
                  Through thoughtful design and modern technology, we help manufacturers adapt and thrive—turning ideas into measurable operational gains.
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
          <SectionHeader title='The Talent Powering Every Success' desc='Behind every project is a passionate team of experts dedicated to turning ideas into impactful, high-quality manufacturing software solutions.' />
        </div>
        <DeveloperCard
          paragraphs={[
            "Our development team combines deep technical expertise with a strong understanding of modern manufacturing platforms to build reliable, future-ready digital solutions. We focus on creating systems that are intuitive, secure, and adaptable to evolving production needs, ensuring long-term value for manufacturers and their supply chains alike.",
            "Our developers are the driving force behind every innovative solution we create. With a perfect blend of creativity, technical expertise, and attention to detail, they design and build software that transforms shop-floor operations. Focused on quality, scalability, and performance, our team ensures each project delivers seamless user experiences and measurable results that align with your vision.",
            "At L2 Global, our developers bring vision to life through code, creativity, and collaboration. They focus on crafting intelligent, efficient systems that simplify production and supply chain management. Every project reflects their dedication to innovation, precision, and the pursuit of excellence in manufacturing technology."
          ]}
          buttonLabel="Get A Quote"
          phoneLabel="Take a Call"
          phoneNumber="+91 90000 14701"
          image={developerImg.src}
          badgeText={`Expert\nDeveloper\nTeam`}
        />
      </div>

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

      <ServiceFAQ faqs={manufacturingFaqs} serviceName='Manufacturing Technology' />

    </div>
  )
}

export default ManufacturingContainer