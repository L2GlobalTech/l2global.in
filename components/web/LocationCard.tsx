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
                "group w-full h-full bg-white rounded-2xl p-4 flex flex-col justify-between",
                "border transition-all duration-300 shadow-xs hover:shadow-md",
                "border-gray-200 hover:border-orange-500"
            )}
        >
            {/* Standardized Aspect Ratio Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content with standardized text slot heights */}
            <div className="mt-4 flex-1 flex flex-col">
                <h3
                    className="text-lg font-semibold text-black min-h-[3.25rem] line-clamp-2 leading-tight flex items-start"
                    style={{ letterSpacing: '-0.5px' }}
                >
                    {title}
                </h3>

                <p
                    className="mt-2 text-sm text-gray-500 leading-relaxed min-h-[3.5rem] flex-1 line-clamp-3"
                    style={{ letterSpacing: '-0.5px' }}
                >
                    {address}
                </p>
            </div>

            {/* Pinned Bottom CTA Button */}
            <button
                className={clsx(
                    "mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium",
                    "border transition-all duration-300",
                    "bg-white text-black border-gray-200",
                    "group-hover:bg-[#F15A23] group-hover:text-white group-hover:border-[#F15A23] cursor-pointer"
                )}
                style={{ letterSpacing: '-0.5px' }}
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(address)}`, '_blank')}
            >
                View on Google Maps
            </button>
        </div>
    )
}

export default LocationCard
