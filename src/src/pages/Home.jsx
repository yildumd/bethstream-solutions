import Hero from "../components/home/Hero";
import Brands from "../components/home/Brands";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CTABanner from "../components/home/CTABanner";
import ServicesPreview from "../components/home/ServicesPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <ServicesPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
