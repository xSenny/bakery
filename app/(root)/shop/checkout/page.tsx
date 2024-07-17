import AdminModal from '@/components/admin-modal'
import Header from '@/components/header'
import CheckoutForm from '@/components/forms/checkout-form'
import CheckoutTable from '@/components/checkout-table'

export const metadata = {
  title: 'Bakery | Checkout',
  description: 'Check and shop our products!',
}

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const CheckoutPage = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true'

  return (
    <main className="bg-background-foreground flex gap-4 flex-col pb-10 px-10">
      {isAdmin && <AdminModal />}
      <div className="justify-center flex">
        <Header />
      </div>
      <h1 className="text-center text-[30px] md:text-[40px] font-semibold text-accent">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8 lg:p-8">
        <div className="w-full lg:w-[200%] ">
          <CheckoutForm />
        </div>
        <div className="w-full max-h-screen">
          <CheckoutTable />
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
