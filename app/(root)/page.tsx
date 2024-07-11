import Footer from "@/components/footer";
import Hero from "@/components/hero";
import ProductsOverview from "@/components/products-overview";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-foreground">
      <Hero />
      <ProductsOverview />
      <Footer />
    </main>
  );
}
