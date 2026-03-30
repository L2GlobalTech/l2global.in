import React from 'react'
import SectionHeader from './SectionHeader'
import Divider from './Divider'
import CareersSection from './CareersSection'

const CareerOpenings = () => {
    return (
        <div className='bg-[#F6F5F8] py-6 md:py-10'>
            <div>
                <Divider label='Come join us' pillClassName='bg-white' />
                <SectionHeader title='Career Openings' desc='We’re always looking for creative, talented self-starters to join the L2 Global family. Check out our open roles below and fill out an application.' />
            </div>
            <div className='container mx-auto'>
                <CareersSection />
            </div>
        </div>
    )
}

export default CareerOpenings