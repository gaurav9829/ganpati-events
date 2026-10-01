import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Packages from "@/components/sections/Packages";
import CompareTable from "@/components/sections/CompareTable";
import BookingSteps from "@/components/sections/BookingSteps";
import AddOns from "@/components/sections/AddOns";
import HelpCta from "@/components/sections/HelpCta";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg relative">
      <Header />
      <Hero />
      <About />
      <Packages />
      <CompareTable />
      <BookingSteps />
      <AddOns />
      <HelpCta />
      <Faq />
      <Testimonials />
      <FinalCta />
      <Footer />
      <FloatingContact />
    </main>
  );
}
