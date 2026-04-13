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


import AOSProvider from "@/components/shared/AOSProvider";
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
      <a
        href="https://wa.me/+447442586325"
        target="_blank"
        className="fixed bottom-6 right-6 text-white p-4 rounded-full hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50"
      >
        <svg width="60" height="60" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="41" cy="41" r="41" fill="#25D366" />
          <path d="M57.0823 24.7123C52.7875 20.4073 47.068 18.0396 40.9898 18.0396C28.4438 18.0396 18.2348 28.2486 18.2348 40.7946C18.2348 44.8023 19.2803 48.7178 21.2688 52.1721L18.04 63.9596L30.1043 60.7923C33.4253 62.6066 37.1665 63.5598 40.9795 63.5598H40.9898C53.5255 63.5598 63.96 53.3508 63.96 40.8048C63.96 34.7266 61.377 29.0173 57.0823 24.7123ZM40.9898 59.7263C37.5868 59.7263 34.2555 58.8141 31.3548 57.0921L30.668 56.6821L23.5135 58.5578L25.42 51.5776L24.969 50.8601C23.0728 47.8466 22.0785 44.3718 22.0785 40.7946C22.0785 30.3703 30.5655 21.8833 41 21.8833C46.0533 21.8833 50.799 23.8513 54.366 27.4286C57.933 31.0058 60.1265 35.7516 60.1163 40.8048C60.1163 51.2393 51.414 59.7263 40.9898 59.7263ZM51.3628 45.5608C50.799 45.2738 48.0008 43.9003 47.478 43.7158C46.9553 43.5211 46.576 43.4288 46.1968 44.0028C45.8175 44.5768 44.731 45.8478 44.3928 46.2373C44.0648 46.6166 43.7265 46.6678 43.1628 46.3808C39.8213 44.7101 37.6278 43.3981 35.424 39.6158C34.8398 38.6113 36.0083 38.6831 37.0948 36.5101C37.2793 36.1308 37.187 35.8028 37.0435 35.5158C36.9 35.2288 35.7623 32.4306 35.2908 31.2928C34.8295 30.1858 34.358 30.3396 34.0095 30.3191C33.6815 30.2986 33.3023 30.2986 32.923 30.2986C32.5438 30.2986 31.9288 30.4421 31.406 31.0058C30.8833 31.5798 29.4175 32.9533 29.4175 35.7516C29.4175 38.5498 31.4573 41.2558 31.734 41.6351C32.021 42.0143 35.7418 47.7543 41.451 50.2246C45.059 51.7826 46.4735 51.9158 48.2775 51.6493C49.3743 51.4853 51.6395 50.2758 52.111 48.9433C52.5825 47.6108 52.5825 46.4731 52.439 46.2373C52.3058 45.9811 51.9265 45.8376 51.3628 45.5608Z" fill="white" />
        </svg>

      </a>
      <Footer />
      <AOSProvider />
    </main>
  );
}
