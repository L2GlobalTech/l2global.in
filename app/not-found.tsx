import Link from 'next/link'
import Navbar from '@/components/web/Navbar'
import MobileHeader from '@/components/web/MobileHeader'
import Footer from '@/components/web/Footer'

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="relative">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <div className="container mx-auto px-5 md:px-0 pt-40 pb-24 md:pt-52 md:pb-32 text-center">
        <p className="text-sm font-medium text-[#F15A23] uppercase tracking-wider mb-3">
          Error 404
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0D1526] tracking-[-1px] mb-6">
          Page Not Found
        </h1>
        <p className="text-[#494852] text-lg max-w-xl mx-auto mb-10">
          Sorry, the page you're looking for doesn't exist or may have moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="rounded-full px-6 py-3 text-white font-semibold shadow-md transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(to bottom, #4684FF, #074FDA)' }}
          >
            Back to Homepage
          </Link>
          <Link
            href="/contact-us"
            className="rounded-full px-6 py-3 font-semibold border border-[#C1D5FF] text-[#0D1526] transition-colors hover:border-[#F15A23] hover:text-[#F15A23]"
          >
            Contact Us
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[#0D1526] mb-4">
            Popular pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/services" className="text-[#494852] hover:text-[#F15A23] underline">View All Services</Link>
            <Link href="/about-us" className="text-[#494852] hover:text-[#F15A23] underline">About Us</Link>
            <Link href="/blog" className="text-[#494852] hover:text-[#F15A23] underline">Blog</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
