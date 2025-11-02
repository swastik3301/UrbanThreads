import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Snowflake, Sun, CloudRain, Wind } from "lucide-react";

const SeasonalBanner = () => {
  const navigate = useNavigate();

  const seasons = [
    {
      icon: Snowflake,
      name: "Winter '25",
      tagline: "Stay Warm, Look Cool",
      color: "text-blue-400",
    },
    {
      icon: Sun,
      name: "Summer Ready",
      tagline: "Heat-Resistant Style",
      color: "text-yellow-400",
    },
    {
      icon: CloudRain,
      name: "Rainy Days",
      tagline: "Weather The Storm",
      color: "text-cyan-400",
    },
    {
      icon: Wind,
      name: "Windbreakers",
      tagline: "Move With The Breeze",
      color: "text-gray-400",
    },
  ];

  return (
    <section className="py-8 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {seasons.map((season, index) => (
            <button
              key={season.name}
              onClick={() => navigate("/auth")}
              className="group flex items-center gap-3 hover:scale-110 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <season.icon className={`w-6 h-6 ${season.color} group-hover:animate-pulse`} />
              <div className="text-left">
                <p className="font-heading font-bold uppercase text-sm tracking-wider">
                  {season.name}
                </p>
                <p className="text-xs text-primary-foreground/70 group-hover:text-primary-foreground transition-colors">
                  {season.tagline}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalBanner;
