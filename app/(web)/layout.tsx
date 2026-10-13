// // import Footer from "@/components/web/Footer";
// // import MobileNavbar from "@/components/web/MobileNavbar";
// // import Navbar from "@/components/web/Navbar";
// import { ENDPOINT } from "@/configs/api";
// import type { Metadata } from "next";
// import { Urbanist } from "next/font/google";
// import { Suspense } from "react";
// import Script from "next/script";
// import Footer from "@/components/web/Footer";
// import Navbar from "@/components/web/Navbar";


// const urbanist = Urbanist({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"]
// });

// export default async function WebLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   // const fetchCountryData = async () => {
//   //   try {
//   //     const resp = await fetch(`${ENDPOINT}country`, {
//   //       next: {
//   //         revalidate: 30
//   //       }
//   //     });

//   //     const data = await resp.json();
//   //     if (data.success) {
//   //       return data.data
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }

//   // const countryData = await fetchCountryData() as ICountrySelect[];
//   return (
//     <main className={urbanist.className}>
//       <Navbar />
//       {/* <MobileNavbar /> */}
//       <div>{children}</div>
//       {/* Snipelus Analytics Script */}
//       <Footer />
//     </main>
//   );
// }


import ConversionTracking from '@/components/shared/ConversionTracking';
import AOSProvider from "@/components/shared/AOSProvider";
import FloatingWhatsAppButton from "@/components/shared/FloatingWhatsAppButton";
import Footer from "@/components/web/Footer";
import MobileHeader from "@/components/web/MobileHeader";
import Navbar from "@/components/web/Navbar";
import { Inter } from "next/font/google";


const urbanist = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${urbanist.className} relative`}>
      {/* <div className="absolute top-6 left-0 w-full z-50"> */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      {/* </div> */}
      <div>
        {children}
      </div>
      <FloatingWhatsAppButton />
      <Footer />
      <AOSProvider />
      <ConversionTracking />
    </main>
  );
}
