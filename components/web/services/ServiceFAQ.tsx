'use client'
import React, { useState } from 'react'

interface FAQ { q: string; a: string }

export default function ServiceFAQ({ faqs, serviceName }:
    { faqs: FAQ[]; serviceName: string }) {
    const [open, setOpen] = useState<number | null>(0) // First FAQ open by default

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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
            <div className='text-center mb-10'>
                <h2 className='text-3xl font-semibold tracking-tight'>
                    Frequently Asked Questions — {serviceName}
                </h2>
            </div>
            <div className='max-w-3xl mx-auto space-y-3'>
                {faqs.map((f, i) => (
                    <div
                        key={i}
                        className='border border-gray-100 rounded-xl overflow-hidden'
                        itemScope
                        itemType="https://schema.org/Question"
                    >
                        <button
                            className='w-full text-left px-5 py-4 font-medium flex justify-between
                                items-center hover:bg-gray-50 transition-colors duration-200'
                            onClick={() => setOpen(open === i ? null : i)}
                            aria-expanded={open === i}
                            aria-controls={`faq-answer-${i}`}
                            itemProp="name"
                        >
                            {f.q}
                            <span
                                className={`text-[#074FDA] ml-4 text-xl transition-transform duration-300 select-none ${
                                    open === i ? 'rotate-45' : ''
                                }`}
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>

                        {/*
                          CRITICAL SEO FIX: Answer is ALWAYS in the DOM.
                          CSS max-height controls visual expand/collapse.
                          Google can read the answer even when visually collapsed.
                        */}
                        <div
                            id={`faq-answer-${i}`}
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                open === i
                                    ? 'max-h-[600px] opacity-100'
                                    : 'max-h-0 opacity-0'
                            }`}
                            itemScope
                            itemType="https://schema.org/Answer"
                            itemProp="acceptedAnswer"
                            aria-hidden={open !== i}
                        >
                            <div
                                className='px-5 pb-5 pt-1 text-[#6F6C90] text-sm leading-relaxed'
                                itemProp="text"
                            >
                                {f.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
