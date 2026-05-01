'use client'
import React, { useState } from 'react'

interface FAQ { q: string; a: string }

export default function ServiceFAQ({ faqs, serviceName }:
    { faqs: FAQ[]; serviceName: string }) {
    const [open, setOpen] = useState<number | null>(null)

    const schema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
    }

    return (
        <section className='py-16 container mx-auto px-4'>
            <script type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className='text-center mb-10'>
                <h2 className='text-3xl font-semibold tracking-tight'>
                    Frequently Asked Questions — {serviceName}
                </h2>
            </div>
            <div className='max-w-3xl mx-auto space-y-3'>
                {faqs.map((f, i) => (
                    <div key={i} className='border border-gray-100 rounded-xl overflow-hidden'>
                        <button
                            className='w-full text-left px-5 py-4 font-medium flex justify-between
                items-center hover:bg-gray-50'
                            onClick={() => setOpen(open === i ? null : i)}>
                            {f.q}
                            <span className='text-[#074FDA] ml-4'>{open === i ? '−' : '+'}</span>
                        </button>
                        {open === i && (
                            <div className='px-5 pb-4 text-[#6F6C90] text-sm leading-relaxed'>{f.a}</div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
