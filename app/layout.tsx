import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { Urbanist } from "next/font/google";
import "aos/dist/aos.css";
import CookieConsent from "@/components/shared/CookieConsent";

// import {metadata, viewport} from "./metadata"

// export {metadata, viewport};

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
