import HeroSection from '@/components/web/HeroSection'
import TeamSection from '@/components/web/TeamSection'
import React from 'react'
import heroImage from '@/public/assets/web/team/hero.png'
import HeroCTA from '@/components/web/HeroCTA'



const TeamContainer = () => {
    return (
        <div>
            <div>
                <HeroSection
                    label="Team"
                    title="Meet The People Who Make It Happen."
                    description="L2 Global Technology Pvt. Ltd. is powered by a diverse team of professionals driven by collaboration, expertise, and innovation."
                    image={heroImage}
                    btnName='Contact Us Now'
                />
            </div>
            <div>
                <TeamSection />
            </div>

            <div className='mt-4 md:mt-8'>
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

export default TeamContainer