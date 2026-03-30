'use client'

import Image from 'next/image'
import React from 'react'
import clsx from 'clsx'

interface LocationCardProps {
    image: string
    title: string
    address: string
    active?: boolean
}

const LocationCard = ({
    image,
    title,
    address,
    active = false,
}: LocationCardProps) => {
    return (
        <div
            className={clsx(
                "group w-full md:max-w-[280px] bg-white rounded-2xl p-4",
                "border transition-all duration-500",
                "border-gray-200 hover:border-orange-500"
            )}
        >
            {/* Image */}
            <div className="rounded-xl overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={0}
                    height={0}
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-black" style={{ letterSpacing: '-0.5px' }}>
                    {title}
                </h3>

                <p className="md:text-sm text-md text-gray-500 leading-relaxed" style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}>
                    {address}
                </p>
            </div>

            {/* Button */}
            <button
                className={clsx(
                    "mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium",
                    "border transition-all duration-300",
                    "bg-white text-black border-gray-200",
                    "group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 cursor-pointer  transition-all duration-500"
                )}
                style={{ letterSpacing: '-0.5px' }}
            >
                View on Google Maps
            </button>
        </div>
    )
}

export default LocationCard
