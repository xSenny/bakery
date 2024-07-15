import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bakery | Home",
  description: "Check and shop our products!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
