'use client'
import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/services/non-profit-hero.png'
import ServiceSubHero from '@/components/web/ServiceSubHero'
import subheroImg from '@/public/assets/web/services/non-profit-subhero.png'
import InnovationStatsSection from '@/components/web/InnovationStatsSection'
import Divider from '@/components/web/Divider'
import SectionHeader from '@/components/web/SectionHeader'
import DeveloperCard from '@/components/web/DeveloperCard'
import developerImg from '@/public/assets/web/services/non-profit-developer.png'
import ProcessSteps, { StepItem } from '@/components/web/ProcessSteps'
import img1 from '@/public/assets/web/services/step1-img.svg'
import img2 from '@/public/assets/web/services/step2-img.svg'
import img3 from '@/public/assets/web/services/step3-img.svg'
import img4 from '@/public/assets/web/services/step4-img.svg'
import img5 from '@/public/assets/web/services/step5-img.svg'
import HeroCTA from '@/components/web/HeroCTA'


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

const NonProfitContainer = () => {
  return (
    <div>
      {/* Hero section */}
      <div>
        <HeroSection
          label="Non-Profit Organization"
          title="Empowering Non-Profits Through Technology"
          description="L2 Global Technology Ltd. creates tailored software solutions that help non-profit organizations streamline operations, enhance transparency, and make a lasting social impact."
          image={heroImage}
        />
      </div>

      {/* Sub Hero */}
      <div data-aos="fade-up" >
        <ServiceSubHero
          label="Non-Profit Software Development Services"
          title="Innovative Digital Solutions for Meaningful Impact"
          description={
            <>
              We design intelligent, scalable platforms that enable non-profits to manage donations, track programs, and engage with communities effectively. From fundraising portals to volunteer management systems, our solutions bring clarity, collaboration, and efficiency to your mission. L2 Global empowers organizations to drive positive change through technology that is reliable, accessible, and built for long-term growth.
            </>
          }
          image={subheroImg.src}
        />
      </div>

      <div data-aos="fade-up" className='bg-[#F6F5F8]'>
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
                  Every project reflects our passion for innovation and excellence, delivering measurable success in digital education through engaging, outcome-driven solutions
                </p>
                <p>
                  Through thoughtful design and modern technology, we help institutions adapt and thrive—turning ideas into meaningful learning experiences.
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
          <SectionHeader title='The Talent Powering Every Success' desc='Behind every project is a passionate team of experts dedicated to turning ideas into impactful, high-quality education software solutions.' />
        </div>
        <DeveloperCard
          paragraphs={[
            "Our development team combines deep technical expertise with a strong understanding of modern education platforms to build reliable, future-ready digital solutions. We focus on creating systems that are intuitive, secure, and adaptable to evolving learning needs, ensuring long-term value for institutions and learners alike.",
            "Our developers are the driving force behind every innovative solution we create. With a perfect blend of creativity, technical expertise, and attention to detail, they design and build software that transforms the education landscape. Focused on quality, scalability, and performance, our team ensures each project delivers seamless user experiences and measurable results that align with your vision.",
            "At L2 Global, our developers bring vision to life through code, creativity, and collaboration. They focus on crafting intelligent, efficient systems that simplify learning and management. Every project reflects their dedication to innovation, precision, and the pursuit of excellence in education technology."
          ]}
          buttonLabel="Get A Quote"
          phoneLabel="Take a Call"
          phoneNumber="+91 97403 39495"
          image={developerImg.src}
          badgeText={`Expert\nDeveloper\nTeam`}
        />
      </div>

      <div data-aos="fade-up">
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

export default NonProfitContainer