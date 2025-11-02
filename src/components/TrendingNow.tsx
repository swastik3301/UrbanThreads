import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TrendingNow = () => {
  const navigate = useNavigate();

  const trends = [
    {
      category: "OVERSIZED",
      title: "Baggy Fits",
      percentage: "+234%",
      description: "Most searched this week",
    },
    {
      category: "COLORS",
      title: "All Black Everything",
      percentage: "+189%",
      description: "Top trending style",
    },
    {
      category: "MATERIALS",
      title: "Tech Fleece",
      percentage: "+156%",
      description: "Performance meets style",
    },
    {
      category: "ACCESSORIES",
      title: "Cargo Utility",
      percentage: "+142%",
      description: "Function first",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="animate-fade-in">
            <p className="text-sm uppercase tracking-widest text-primary mb-2">What's Hot</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Trending Now
            </h2>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/auth")}
            className="hidden md:flex items-center gap-2 group hover-scale"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend, index) => (
            <div
              key={trend.title}
              className="group border-2 border-primary/20 p-6 hover:border-primary hover:bg-primary/5 transition-all duration-500 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate("/auth")}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {trend.category}
                </span>
                <span className="text-primary font-bold text-sm animate-pulse">
                  {trend.percentage}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {trend.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {trend.description}
              </p>

              <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                <span className="text-sm font-medium uppercase tracking-wider">Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate("/auth")}
          className="md:hidden w-full mt-8 flex items-center justify-center gap-2"
        >
          View All Trends
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default TrendingNow;
