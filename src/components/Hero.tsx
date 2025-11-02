import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-main.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
          STREET CULTURE
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Minimalist. Bold. Unapologetic.
        </p>
        <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default Hero;
