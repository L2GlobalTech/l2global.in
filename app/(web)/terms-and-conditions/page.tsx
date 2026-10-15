import TermsContainer from '@/containers/web/TermsContainer'
import React from 'react'

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the L2 Global Technologies website and services.',
  alternates: { canonical: 'https://www.l2global.in/terms-and-conditions' },
  openGraph: {
    title: 'Terms & Conditions | L2 Global Technologies',
    description: 'Terms and conditions for using the L2 Global Technologies website and services.',
    url: 'https://www.l2global.in/terms-and-conditions',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return <TermsContainer />
}

export default page
