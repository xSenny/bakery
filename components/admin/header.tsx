import MobileSidebar from './mobile-sidebar'
const AdminHeader = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
      <MobileSidebar />
    </header>
  )
}

export default AdminHeader
