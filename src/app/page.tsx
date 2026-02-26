import { Header, Footer } from "@/components/layouts";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  UniversitiesSection,
  PopularSubjectsSection,
  TestimonialsSection,
  CTASection,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UniversitiesSection />
        <PopularSubjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
