import HeroSection from '@/components/web/HeroSection'
import React from 'react'
import heroImage from '@/public/assets/web/career/hero-img.png'
import CareerBenefits from '@/components/web/CareerBenefits'
import LetsWorkTogether from '@/components/web/LetsWorkTogether'
import CareerOpenings from '@/components/web/CareerOpenings'


const CareerContainer = () => {
    return (
        <div>
            {/* Hero section */}
            <div>
                <HeroSection
                    label="Career"
                    title="Land Your Dream Job Without The Stress."
                    description="L2 Global Technology Pvt. Ltd. offers rewarding career opportunities where innovation, growth, and technology come together."
                    image={heroImage}
                    btnName='Explore Open Positions'
                    btnLink='/career/#current-openings'
                />
            </div>
            <div className='py-5'>
                <CareerBenefits />
            </div>
            <div id='current-openings'>
                <CareerOpenings />
            </div>
            <div>
                <LetsWorkTogether />
            </div>
        </div>
    )
}

export default CareerContainer