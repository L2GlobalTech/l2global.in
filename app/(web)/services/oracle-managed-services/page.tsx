import OracleContainer from '@/containers/services/OracleContainer'
import React from 'react'

export const metadata = {
  title: "Oracle Managed Services | 24/7 Database & Cloud Support",
  description:
    "Professional Oracle Managed Services including database administration, performance optimization, security management, and Oracle Cloud Infrastructure (OCI) support for enterprises.",
}

const page = () => {
  return (
    <div>
      <OracleContainer />
    </div>
  )
}

export default page