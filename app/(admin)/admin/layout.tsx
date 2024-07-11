import { Metadata } from "next";
import AdminNavbar from '@/components/admin/navbar'
import AdminHeader from '@/components/admin/header'

export const metadata: Metadata = {
  title: "Bakery | Admin",
  description: "Check and shop our products!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <div className="flex flex-col">
        <AdminHeader />
        {children}
      </div>
    </main >
  );
}
