'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/gtag'

const CALENDLY_URL = 'https://calendly.com/lenin040784/30-minute-it-discovery-call?primary_color=16b32b'

export default function LazyCalendlyEmbed() {
    const [loaded, setLoaded] = useState(false)

    // Calendly posts a message to the parent window when a booking is actually
    // confirmed — this is the only reliable "booking" signal, distinct from just
    // opening the widget (calendly_view).
    useEffect(() => {
        if (!loaded) return;

        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        const handleMessage = (e: MessageEvent) => {
            if (
                e.origin.includes('calendly.com') &&
                (e.data as { event?: string })?.event === 'calendly.event_scheduled'
            ) {
                trackEvent('calendly_booking');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [loaded]);

    if (!loaded) {
        return (
            <button
                type="button"
                onClick={() => {
                    trackEvent('calendly_view');
                    setLoaded(true);
                }}
                className="rounded-full px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(to bottom, #4684FF, #074FDA)' }}
            >
                Book a Call
            </button>
        )
    }

    return (
        <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
        />
    )
}
