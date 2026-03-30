import SapContainer from '@/containers/services/SapContainer'
import React from 'react'

export const metadata = {
  title: "SAP Integration with Salesforce | Secure Enterprise Connectivity",
  description:
    "Seamless SAP and Salesforce integration services enabling real-time data synchronization, process automation, and secure enterprise connectivity across systems.",
}

const page = () => {
    return (
        <div>
            <SapContainer />
        </div>
    )
}

export default page