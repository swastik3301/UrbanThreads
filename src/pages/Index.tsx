import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SeasonalBanner from "@/components/SeasonalBanner";
import SeasonalOffers from "@/components/SeasonalOffers";
import LimitedEdition from "@/components/LimitedEdition";
import TrendingNow from "@/components/TrendingNow";
import FeaturedCollections from "@/components/FeaturedCollections";
import Bestsellers from "@/components/Bestsellers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SeasonalBanner />
        <SeasonalOffers />
        <LimitedEdition />
        <TrendingNow />
        <FeaturedCollections />
        <Bestsellers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
