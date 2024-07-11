import { Metadata } from "next";
import AdminNavbar from '@/components/admin/navbar'

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
    <main className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <AdminNavbar />
      {children}
    </main >
  );
}
