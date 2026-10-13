import NotFoundContent from '@/components/web/NotFoundContent'
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

      <NotFoundContent />

      <Footer />
    </main>
  )
}
