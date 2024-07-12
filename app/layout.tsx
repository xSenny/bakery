import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const montSerrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bakery",
  description: "Check and shop our products!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montSerrat.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
