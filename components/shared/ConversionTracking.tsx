'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      let channel: string | undefined;
      if (href.startsWith('tel:')) channel = 'phone';
      else {
        try {
          const url = new URL(href, window.location.origin);
          if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') channel = 'whatsapp';
          else if (url.hostname === 'calendly.com') channel = 'booking';
          else if (url.origin === window.location.origin && url.pathname === '/contact-us') channel = 'contact';
        } catch { return; }
      }
      if (channel) trackEvent('contact_intent', { channel, page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
