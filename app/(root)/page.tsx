import AdminModal from '@/components/admin-modal'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import ProductsOverview from '@/components/products-overview'
import Image from 'next/image'

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === 'true'
  return (
    <main className="w-full min-h-screen bg-foreground">
      {isAdmin && <AdminModal />}
      <Hero />
      <ProductsOverview />
      <Footer />
    </main>
  )
}
