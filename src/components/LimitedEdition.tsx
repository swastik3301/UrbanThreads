import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Flame, TrendingUp } from "lucide-react";

const LimitedEdition = () => {
  const navigate = useNavigate();

  const drops = [
    {
      icon: Flame,
      tag: "HOT DROP",
      title: "STREET ESSENTIALS",
      description: "Limited capsule collection",
      price: "From $89",
      stock: "Only 50 pieces left",
    },
    {
      icon: Clock,
      tag: "24H ONLY",
      title: "MIDNIGHT BLACKS",
      description: "Flash sale exclusive",
      price: "30% Off",
      stock: "Ends tonight",
    },
    {
      icon: TrendingUp,
      tag: "TRENDING",
      title: "URBAN CLASSICS",
      description: "Most wanted pieces",
      price: "From $129",
      stock: "Selling fast",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Limited Time</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Exclusive Drops
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {drops.map((drop, index) => (
            <div
              key={drop.title}
              className="group bg-card border-2 border-primary/20 p-8 hover:border-primary transition-all duration-500 hover:scale-105 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate("/auth")}
            >
              <div className="flex items-center gap-2 mb-4">
                <drop.icon className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {drop.tag}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {drop.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {drop.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-lg">{drop.price}</p>
                <p className="text-xs uppercase text-muted-foreground">{drop.stock}</p>
              </div>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                Shop Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LimitedEdition;
