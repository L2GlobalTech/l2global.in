
import React from 'react';
import SectionHeader from './SectionHeader';
import Divider from './Divider';
import CareersSection from './CareersSection';
import { fetchJobOpenings } from '@/actions/careerOpeningsAction';

const CareerOpenings = async () => {
    const initialJobs = await fetchJobOpenings();

    return (
        <div className='bg-[#F6F5F8] py-8 md:py-14'>
            <div>
                <Divider label='Come join us' pillClassName='bg-white' aos="" />
                <SectionHeader
                    title='Career Openings'
                    desc='We’re always looking for creative, talented self-starters to join the L2 Global family. Check out our open roles below and fill out an application.'
                    aosTitle=""
                    aosDesc=""
                />
            </div>
            <div className='container mx-auto mt-4 md:mt-8'>
                <CareersSection initialJobs={initialJobs} />
            </div>
        </div>
    );
};

export default CareerOpenings;