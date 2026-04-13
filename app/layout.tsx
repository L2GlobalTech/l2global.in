import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { Urbanist } from "next/font/google";
import "aos/dist/aos.css";
import CookieConsent from "@/components/shared/CookieConsent";
import { OrganizationSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://l2global.in'),
  title: {
    default: 'L2 Global Technologies | Salesforce, SAP & MuleSoft — UK, USA & Gulf',
    template: '%s | L2 Global Technologies',
  },
  description:
    'Expert Salesforce, SAP, MuleSoft and cloud integration consultants serving UK,' +
    ' USA, UAE, Saudi Arabia and Gulf businesses. 182+ projects. Free consultation.',
  keywords: [
    'Salesforce consulting UK', 'Salesforce consultant London', 'Salesforce consulting Dubai',
    'SAP implementation UK', 'SAP consultant London', 'SAP services UAE',
    'MuleSoft integration UK', 'MuleSoft consultant Dubai', 'MuleSoft near me',
    'CRM consulting UK', 'CRM consultant Dubai', 'IT outsourcing UK',
    'Salesforce consulting near me', 'SAP services near me', 'MuleSoft near me',
    'Salesforce partner UAE', 'SAP consulting Saudi Arabia', 'IT consulting Gulf',
    'API integration services', 'AWS cloud UK', 'Oracle managed services',
    'L2 Global Technologies',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['en_US', 'en_AE', 'en_SA', 'en_QA'],
    url: 'https://l2global.in',
    siteName: 'L2 Global Technologies',
    title: 'L2 Global Technologies | Salesforce, SAP & MuleSoft — UK, USA & Gulf',
    description: 'Expert IT integration consultants for UK, USA and Gulf businesses.',
    images: [{ url: '/assets/web/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L2 Global Technologies | UK, USA & Gulf IT Consultants',
    description: 'Salesforce, SAP, MuleSoft & cloud experts. UK · USA · UAE · India.',
    images: ['/assets/web/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1
    },
  },
};



const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YP4HCLVLZ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YP4HCLVLZ9');
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel='alternate' hrefLang='en-gb' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-us' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-ae' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-sa' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-qa' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-kw' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-bh' href='https://l2global.in' />
        <link rel='alternate' hrefLang='en-om' href='https://l2global.in' />
        <link rel='alternate' hrefLang='x-default' href='https://l2global.in' />
        <OrganizationSchema />
      </head>
      <body
        className={`antialiased ${urbanist.className}`}
      >
        {children}

        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />

        <CookieConsent />
      </body>
    </html>
  );
}
