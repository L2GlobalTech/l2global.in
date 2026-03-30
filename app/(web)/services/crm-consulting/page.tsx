import CrmContainer from '@/containers/services/CrmContainer'
import React from 'react'

export const metadata = {
  title: "CRM Consulting Services | Strategy, Implementation & Optimization",
  description:
    "Expert CRM consulting services to help businesses implement, customize, and optimize CRM platforms for better customer engagement, sales growth, and operational efficiency.",
}

const page = () => {
  return (
    <div>
      <CrmContainer />
    </div>
  )
}

export default page