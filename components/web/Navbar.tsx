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
  { label: 'Salesforce Services', href: '/services/salesforce-services' },
  { label: 'SAP Link by Salesforce', href: '/services/sap-link-by-salesforce' },
  { label: 'MuleSoft', href: '/services/mulesoft' },
  { label: 'Oracle Managed Services', href: '/services/oracle-managed-services' },
  { label: 'API Integration', href: '/services/api-integration' },
  { label: 'AWS Cloud Services', href: '/services/aws-cloud-services' },
  { label: 'CRM Consulting', href: '/services/crm-consulting' },
];

const companyLinks = [
  { href: '/about-us', label: 'About' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/team', label: 'Team' },
  // { href: '/career', label: 'Career' },
  // { href: '/team', label: 'Team' },
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
      path.startsWith('/team')
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
        <div
          className={`container mx-auto py-3
          ${scrolled ? '' : 'rounded-full border border-[#C1D5FF] bg-white'}`}
        >
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between px-4 md:px-1">
            <Link href="/" className="flex items-center">
              <Image src={webLogo} alt="webLogo" className="w-48 h-10 object-contain" />
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
