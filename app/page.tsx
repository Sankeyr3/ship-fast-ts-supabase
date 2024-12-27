import { Metadata } from "next";
import { getSEOTags } from "@/libs/seo";
import {
  HeroSection,
  MonthlyRankingSection,
  FeaturedProductsSection,
  HowItWorksSection,
  CategoriesSection,
  TestimonialsSection,
  SubmitProductSection,
  NewsletterSection,
} from "@/components/home";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = getSEOTags({
  title: "Top ShipFast | Best SaaS Tools for Developers",
  description: "Discover and compare the best SaaS tools created by indie developers. Find the perfect software to boost your productivity and grow your business.",
});

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <MonthlyRankingSection />
        <FeaturedProductsSection />
        <HowItWorksSection />
        <CategoriesSection />
        <TestimonialsSection />
        <SubmitProductSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
