// "use client";

// import Image from "next/image";
// import img1 from "@/public/assets/web/home/industriesSection/oracle.png";
// import img2 from "@/public/assets/web/home/industriesSection/sap.png";
// import img3 from "@/public/assets/web/home/industriesSection/sales-force.png";

// export default function MemberLogosSection() {
//   return (
//     <div className="w-full bg-white pt-4 md:pt-10">
//       <div className="mx-auto">
//         <div className="grid grid-cols-2 lg:grid-cols-5 border border-gray-200 ">

//           {/* COLUMN 1 */}
//           <div className="col-span-full md:col-span-1 flex flex-col justify-center items-center lg:items-start 
//                           px-6 sm:px-8 py-12 border-b sm:border-r border-gray-200">
//             <span className="text-sm bg-[#F6F6F9] px-4 py-1 rounded-full flex items-center gap-2 text-black">
//               <span className="w-2 h-2 bg-orange-500 rounded-full" />
//               Member
//               <span className="w-2 h-2 bg-orange-500 rounded-full" />
//             </span>

//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mt-6 text-center lg:text-left">
//               We Are A <br /> Prove Member
//             </h2>
//           </div>

//           {/* COLUMN 2 */}
//           <div className="flex justify-center items-center py-12 border-b sm:border-r border-gray-200">
//             <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[#A12117] rounded-xl flex items-center justify-center p-4">
//               <Image
//                 src={img1}
//                 alt="Oracle"
//                 className="object-contain"
//               />
//             </div>
//           </div>
//           {/* COLUMN 4 */}
//           <div className="flex justify-center items-center py-12 border-b lg:border-r border-gray-200">
//             <Image
//               src={img3}
//               alt="Salesforce"
//               className="w-28 sm:w-36 object-contain"
//             />
//           </div>

//           {/* COLUMN 3 */}
//           <div className=" col-span-full md:col-span-1 flex justify-center items-center py-12 border-b lg:border-r border-gray-200">
//             <Image
//               src={img2}
//               alt="SAP Gold"
//               className="w-28 sm:w-36 object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "@/public/assets/web/home/industriesSection/oracle.png";
import img2 from "@/public/assets/web/home/industriesSection/sap.png";
import img3 from "@/public/assets/web/home/industriesSection/sales-force.png";

export default function MemberLogosSection() {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      mirror: false,
      offset: 120,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="mx-auto w-full bg-white pt-4 md:pt-10">
      <div className="mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-6 border border-gray-200">

          {/* LEFT EMPTY HALF BOX */}
          <div className="hidden lg:block border-r border-gray-200" />

          {/* TEXT */}
          <div
            data-aos="zoom-in"
            data-aos-delay="0"
            className="col-span-full md:col-span-1 flex flex-col justify-center items-center lg:items-start px-6 py-12 sm:border-r border-b md:border-b-0 border-gray-200"
          >
            <span className="text-lg font-medium bg-[#F6F6F9] px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-1px]">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              Member
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
            </span>

            <h2 className="text-3xl md:text-4xl font-medium leading-tight tracking-[-2px] mt-6 text-center lg:text-left">
              We Are A <br /> Prove Member
            </h2>
          </div>

          {/* ORACLE */}
          <div
            data-aos="zoom-in"
            data-aos-delay="150"
            className="flex justify-center items-center py-12 border-r border-gray-200 border-b md:border-b-0"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[#A12117] rounded-xl flex items-center justify-center p-4">
              <Image src={img1} alt="Oracle" className="object-contain" />
            </div>
          </div>

          {/* SAP DESKTOP */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="hidden md:flex justify-center items-center py-12 sm:border-r border-gray-200"
          >
            <Image src={img2} alt="SAP Gold" className="w-28 sm:w-36 object-contain" />
          </div>

          {/* SALESFORCE */}
          <div
            data-aos="zoom-in"
            data-aos-delay="450"
            className="flex justify-center items-center py-12 border-b lg:border-b-0 border-gray-200"
          >
            <Image src={img3} alt="Salesforce" className="w-28 sm:w-36 object-contain" />
          </div>

          {/* SAP MOBILE */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="col-span-full md:hidden flex justify-center items-center py-12 border-b sm:border-r border-gray-200"
          >
            <Image src={img2} alt="SAP Gold" className="w-28 sm:w-36 object-contain" />
          </div>

          {/* RIGHT EMPTY HALF BOX */}
          <div className="hidden lg:block border-l border-gray-200" />

        </div>
      </div>
    </div>
  );
}
