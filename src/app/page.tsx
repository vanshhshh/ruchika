import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Services />
      <Testimonials />
      <BlogPreview />
      <FeaturedProducts />
      <CTA />
    </div>
  );
}
