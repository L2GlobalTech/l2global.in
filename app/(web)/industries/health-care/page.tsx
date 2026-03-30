import HealthCareContainer from '@/containers/web/HealthCareContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'L2 Global Technologies | Health Care',
  description: '',
};

const page = () => {
  return (
    <div><HealthCareContainer /></div>
  )
}

export default page