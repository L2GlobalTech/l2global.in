import PrivacyPolicyContainer from '@/containers/web/PrivacyPolicyContainer'
import React from 'react'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How L2 Global Technologies collects, uses and protects your information.',
  alternates: { canonical: 'https://www.l2global.in/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | L2 Global Technologies',
    description: 'How L2 Global Technologies collects, uses and protects your information.',
    url: 'https://www.l2global.in/privacy-policy',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return <PrivacyPolicyContainer />
}

export default page
