import Navbar from "@/components/Navbar";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import TrustIndicators from "@/components/TrustIndicators";
import Services from "@/components/Services";
import ComparisonTable from "@/components/ComparisonTable";
import ProcessTimeline from "@/components/ProcessTimeline";
import NewsSection from "@/components/NewsSection";
import WhyParsEnergy from "@/components/WhyParsEnergy";
import EvaluationForm from "@/components/EvaluationForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScrollVideo />
        <TrustIndicators />
        <Services />
        <ComparisonTable />
        <ProcessTimeline />
        <WhyParsEnergy />
        <NewsSection />
        <FinalCTA />
        <EvaluationForm />
      </main>
      <Footer />
    </>
  );
}
