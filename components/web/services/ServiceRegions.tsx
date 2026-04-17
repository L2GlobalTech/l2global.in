// components/web/services/ServiceRegions.tsx — CREATE NEW FILE
'use client'
import React from 'react'

const regions = [
    {
        flag: '🇬🇧', region: 'United Kingdom', color: '#185FA5',
        cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds',
            'Bristol', 'Glasgow', 'Liverpool', 'Sheffield', 'Nottingham']
    },
    {
        flag: '🇺🇸', region: 'United States', color: '#0F6E56',
        cities: ['New York', 'Texas', 'California', 'Chicago', 'Florida',
            'Houston', 'Los Angeles', 'Boston', 'Seattle', 'Atlanta']
    },
    {
        flag: '🇦🇪', region: 'UAE & Gulf', color: '#BA7517',
        cities: ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City',
            'Manama', 'Muscat', 'Sharjah', 'Jeddah', 'Al Khobar']
    },
    {
        flag: '🇮🇳', region: 'India', color: '#533AB7',
        cities: ['Vijayawada', 'Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai']
    },
]

export default function ServiceRegions({ serviceName }: { serviceName: string }) {
    return (
        <section className='py-16 bg-[#F6F5F8]'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-10'>
                    <span className='inline-flex items-center gap-2 bg-white px-4 py-1 rounded-full
            text-sm font-medium mb-4 border border-gray-100'>
                        <span className='w-2 h-2 bg-orange-500 rounded-full' />
                        Global Coverage
                        <span className='w-2 h-2 bg-orange-500 rounded-full' />
                    </span>
                    <h2 className='text-3xl md:text-4xl font-semibold tracking-tight mt-4'>
                        {serviceName} — Cities & Regions We Serve
                    </h2>
                    <p className='text-[#6F6C90] mt-3 max-w-xl mx-auto'>
                        Our consultants deliver {serviceName.toLowerCase()} remotely and on-site
                        across the UK, USA, Gulf and India.
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {regions.map((r) => (
                        <div key={r.region} className='bg-white rounded-2xl p-5 border border-gray-100
              hover:border-orange-300 transition-all duration-300'>
                            <div className='flex items-center gap-3 mb-4'>
                                <span className='text-2xl'>{r.flag}</span>
                                <h3 className='font-semibold text-base' style={{ color: r.color }}>{r.region}</h3>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {r.cities.map(city => (
                                    <span key={city}
                                        className='text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600
                    border border-gray-100'>{city}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-8'>
                    <p className='text-[#6F6C90] text-sm'>
                        Don't see your city?
                        <a href='/contact-us' className='text-[#074FDA] font-semibold hover:underline ml-1'>
                            Contact us for a free consultation
                        </a>.
                    </p>
                </div>
            </div>
        </section>
    )
}
