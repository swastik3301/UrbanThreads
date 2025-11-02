import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SeasonalOffers from "@/components/SeasonalOffers";
import FeaturedCollections from "@/components/FeaturedCollections";
import Bestsellers from "@/components/Bestsellers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SeasonalOffers />
        <FeaturedCollections />
        <Bestsellers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
