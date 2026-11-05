import Navbar from "./component/Navbar";
import Banner from "./component/Banner";
import CategoriesSection from "./component/CategoriesSection";
import TopBrandsSection from "./component/TopBrandsSection";
import AboutStorySection from "./component/AboutStorySection";
import FeaturedProducts from "./component/FeaturedProducts";
import IPhoneHeroBanner from "./component/IPhoneHeroBanner";
import TrustAndCreatorSection from "./component/TrustAndCreatorSection";
import TestimonialsAndFooter from "./component/TestimonialsAndFooter";

export default function Home() {
  return (
    <>
      <Navbar />

      <Banner />
      <CategoriesSection />
      <TopBrandsSection />
      <AboutStorySection />
      <FeaturedProducts />
      <IPhoneHeroBanner />
      <TrustAndCreatorSection />

      <TestimonialsAndFooter /></>


  );
}
