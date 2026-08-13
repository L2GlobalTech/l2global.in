'use client'

import Image from 'next/image'
import React, { useEffect, useState, Fragment } from 'react'
import webLogo from '@/public/assets/web/l2-svg.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import GradientButton from '../shared/GradientButton'
import { MoveRight, Dot, Menu, Phone, ChevronDown } from 'lucide-react'
import { Menu as HeadlessMenu, Transition, Popover } from '@headlessui/react'
import PrimaryButton from '../shared/PrimaryButton'
import ContactPopup from '../shared/ContactPopup'
import { trackEvent } from '@/lib/gtag'

/* data */
const industries = [
  { label: 'Education', href: '/industries/education' },
  { label: 'Healthcare', href: '/industries/health-care' },
  { label: 'Real Estate', href: '/industries/real-estate' },
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Non Profit Organizations', href: '/industries/non-profit' },
]

// Services
const services = [
  { label: 'Salesforce Consulting Services', href: '/services/salesforce-services' },
  { label: 'SAP & Salesforce Integration', href: '/services/sap-link-by-salesforce' },
  { label: 'MuleSoft Integration Services', href: '/services/mulesoft' },
  { label: 'Oracle Managed Services', href: '/services/oracle-managed-services' },
  { label: 'API Integration Services', href: '/services/api-integration' },
  { label: 'AWS Cloud Migration & DevOps', href: '/services/aws-cloud-services' },
  { label: 'Salesforce CRM Consulting', href: '/services/crm-consulting' },
];

const companyLinks = [
  { href: '/about-us', label: 'About' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/sap-link-by-salesforce', label: 'Services' },
  { href: '/industries/education', label: 'Industries' },
  { href: '/career', label: 'Career' },
  // { href: '/team', label: 'Team' },
  { href: '/company', label: 'Company' },
]

/* helpers */
const isLinkActive = (label: string, href: string, path: string) => {
  if (label === 'Industries') return path.startsWith('/industries')
  if (label === 'Services') return path.startsWith('/services')
  if (label === 'Company')
    return (
      path.startsWith('/about') ||
      path.startsWith('/contact') ||
      path.startsWith('/team') ||
      path.startsWith('/blog') ||
      path.startsWith('/faq')
    )
  return path === href
}

const Navbar = () => {
  const pathName = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <Popover
        as="nav"
        className={`fixed top-0 z-50 w-full transition-all duration-300
        ${scrolled ? 'bg-white shadow' : 'bg-transparent mt-5 px-4 md:px-0'}`}
      >
        {!scrolled && (
          <div className="hidden lg:block container mx-auto mb-2 rounded-full border border-[#C1D5FF] bg-white">
            <div className="flex items-center justify-between px-4 py-2 text-sm">
              <div className="flex items-center gap-6">
                <a
                  href="tel:+447442586325"
                  onClick={() => trackEvent('phone_click', { number: '+447442586325', location: 'navbar' })}
                  className="flex items-center gap-2 text-gray-700 tracking-[-0.5px] transition-colors hover:text-[#F15A23]"
                >
                  <Phone size={14} className="text-[#F15A23]" />
                  +44 7442 586325
                </a>
                <a
                  href="tel:+919000014701"
                  onClick={() => trackEvent('phone_click', { number: '+919000014701', location: 'navbar' })}
                  className="flex items-center gap-2 text-gray-700 tracking-[-0.5px] transition-colors hover:text-[#F15A23]"
                >
                  <Phone size={14} className="text-[#F15A23]" />
                  +91 90000 14701
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a
                  aria-label="Facebook"
                  href="https://www.facebook.com/l2globaltechnologies"
                  target="_blank"
                  className="text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0,0,256,256">
                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(8.53333,8.53333)"><path d="M12,27v-12h-4v-4h4v-2.148c0,-4.067 1.981,-5.852 5.361,-5.852c1.619,0 2.475,0.12 2.88,0.175v3.825h-2.305c-1.435,0 -1.936,0.757 -1.936,2.291v1.709h4.205l-0.571,4h-3.634v12z"></path></g></g>
                  </svg>
                </a>
                <a
                  aria-label="Twitter"
                  href="https://twitter.com/l2globaltech"
                  target="_blank"
                  className="text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0,0,256,256">
                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.12,5.12)"><path d="M6.91992,6l14.2168,20.72656l-14.9082,17.27344h3.17773l13.13867,-15.22266l10.44141,15.22266h10.01367l-14.87695,-21.6875l14.08008,-16.3125h-3.17578l-12.31055,14.26172l-9.7832,-14.26172z"></path></g></g>
                  </svg>
                </a>
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/l2globaltechnologies"
                  target="_blank"
                  className="text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0,0,256,256">
                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(8.53333,8.53333)"><path d="M9.99805,3c-3.859,0 -6.99805,3.14195 -6.99805,7.00195v10c0,3.859 3.14195,6.99805 7.00195,6.99805h10c3.859,0 6.99805,-3.14195 6.99805,-7.00195v-10c0,-3.859 -3.14195,-6.99805 -7.00195,-6.99805zM22,7c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM15,9c3.309,0 6,2.691 6,6c0,3.309 -2.691,6 -6,6c-3.309,0 -6,-2.691 -6,-6c0,-3.309 2.691,-6 6,-6zM15,11c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z"></path></g></g>
                  </svg>
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/company/l2-global-technologies"
                  target="_blank"
                  className="text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0,0,256,256">
                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(8.53333,8.53333)"><path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path></g></g>
                  </svg>
                </a>
                <a
                  aria-label="YouTube"
                  href="https://www.youtube.com/@l2globaltechnologies"
                  target="_blank"
                  className="text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0,0,256,256">
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.33333,5.33333)"><path d="M43.2,33.9c-0.4,2.1 -2.1,3.7 -4.2,4c-3.3,0.5 -8.8,1.1 -15,1.1c-6.1,0 -11.6,-0.6 -15,-1.1c-2.1,-0.3 -3.8,-1.9 -4.2,-4c-0.4,-2.3 -0.8,-5.7 -0.8,-9.9c0,-4.2 0.4,-7.6 0.8,-9.9c0.4,-2.1 2.1,-3.7 4.2,-4c3.3,-0.5 8.8,-1.1 15,-1.1c6.2,0 11.6,0.6 15,1.1c2.1,0.3 3.8,1.9 4.2,4c0.4,2.3 0.9,5.7 0.9,9.9c-0.1,4.2 -0.5,7.6 -0.9,9.9z" fill="#f15a23"></path><path d="M20,31v-14l12,7z" fill="#ffffff"></path></g></g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
        <div
          className={`container mx-auto py-3
          ${scrolled ? '' : 'rounded-full border border-[#C1D5FF] bg-white'}`}
        >
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between px-4 md:px-1">
            <Link href="/" className="flex items-center">
              <Image src={webLogo} alt="L2 Global Technologies — Salesforce Agentforce AI & SAP Consultants" width={192} height={40} className="w-48 h-10 object-contain" priority />
            </Link>

            <div className="hidden md:flex items-center gap-3">
              {navLinks.map(({ href, label }) => {
                const isActive = isLinkActive(label, href, pathName)
                const linkClasses = isActive
                  ? 'text-black font-bold'
                  : 'text-gray-700 hover:text-[#F15A23] font-thin'

                if (label === 'Industries' || label === 'Services' || label === 'Company') {
                  let dropdownItems: any[] = []

                  if (label === 'Industries') dropdownItems = industries
                  if (label === 'Services') dropdownItems = services
                  if (label === 'Company') dropdownItems = companyLinks

                  return (
                    <HeadlessMenu as="div" className="relative" key={label}>
                      <HeadlessMenu.Button
                        className={`relative flex items-center transition duration-300 outline-none ${linkClasses}`}
                      >
                        <span className="relative pl-4 flex items-center gap-1 tracking-[-1px] cursor-pointer">
                          {isActive && (
                            <Dot
                              size={40}
                              className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-[#F15A23]"
                            />
                          )}
                          {label}
                          <ChevronDown size={14} />
                        </span>
                      </HeadlessMenu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                      >
                        <HeadlessMenu.Items
                          className="absolute left-0 mt-3 w-56 rounded-2xl bg-white
                          shadow-lg border border-gray-200 p-2 z-50"
                        >
                          {dropdownItems.map(item => (
                            <HeadlessMenu.Item key={item.href}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={`block px-4 py-2 rounded-lg text-sm tracking-[-1px]
                                  ${active ? 'bg-gray-100 text-black' : 'text-gray-700'}`}
                                >
                                  {item.label}
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                          ))}
                        </HeadlessMenu.Items>
                      </Transition>
                    </HeadlessMenu>
                  )
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center transition-all tracking-[-1px] ${linkClasses}`}
                  >
                    <span className="relative pl-4">
                      {isActive && (
                        <Dot
                          size={40}
                          className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-[#F15A23]"
                        />
                      )}
                      {label}
                    </span>
                  </Link>
                )
              })}
            </div>

            <PrimaryButton
              onClick={() => setIsContactOpen(true)}
              label="Let’s Talk"
              icon={
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path
                    d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                    fill="white"
                  />
                </svg>
              }
            />
          </div>

        </div>
      </Popover>


      <ContactPopup
        isOpen={isContactOpen}
        setIsOpen={setIsContactOpen}
      />
    </div>
  )
}

export default observer(Navbar)
