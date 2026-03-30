'use client'

import React from 'react'
import PrimaryButton from '../shared/PrimaryButton'

const LetsWorkTogether = () => {
    return (
        <section className="container mx-auto py-12 ">
            <div
                className="
                           px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 "
                style={{
                    backgroundImage: "url('/assets/web/career/bg-work-together.svg')",
                    borderRadius: '20px',
                    backgroundSize: 'cover',
                }}
            >

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Text */}
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 ms:tracking-[-4px] tracking-[-1px]">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                            Whether you&apos;re a fresher or an experienced professional, explore
                            L2 Glob. al Technology Pvt. Ltd. careers for opportunities to grow,
                            learn, and lead.
                        </p>
                    </div>

                    {/* Button */}
                    <div className="flex justify-start lg:justify-end">
                        <PrimaryButton
                            href="/contact-us"
                            label="Apply Now"
                            whiteBtn={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LetsWorkTogether
