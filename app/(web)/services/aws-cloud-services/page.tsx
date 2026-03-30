import AwsContainer from '@/containers/services/AwsContainer'
import React from 'react'

export const metadata = {
  title: "AWS Cloud Services | Scalable & Secure Cloud Solutions",
  description:
    "Expert AWS cloud services including migration, architecture design, DevOps, security, and performance optimization to help enterprises scale securely and efficiently.",
}

const page = () => {
  return (
    <div>
      <AwsContainer />
    </div>
  )
}

export default page