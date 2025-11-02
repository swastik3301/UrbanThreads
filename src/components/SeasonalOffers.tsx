import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import hoodiesImg from "@/assets/collection-hoodies.jpg";
import jacketsImg from "@/assets/collection-jackets.jpg";

const SeasonalOffers = () => {
  const navigate = useNavigate();
  
  const offers = [
    {
      title: "FALL DROP",
      subtitle: "New Essentials",
      image: hoodiesImg,
    },
    {
      title: "WINTER HEAT",
      subtitle: "Limited Edition",
      image: jacketsImg,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-12 uppercase tracking-tight">
          Seasonal Drops
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div key={offer.title} className="group relative h-[500px] overflow-hidden cursor-pointer">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                <p className="text-sm uppercase tracking-widest mb-2">{offer.subtitle}</p>
                <h3 className="font-heading text-4xl md:text-5xl font-bold mb-6">{offer.title}</h3>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-primary-foreground border-primary-foreground"
                  onClick={() => navigate("/auth")}
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalOffers;
