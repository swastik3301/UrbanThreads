import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const navItems = ["Home", "Collections", "Men", "Women", "Offers", "About Us", "Contact"];

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="font-heading text-xl md:text-2xl font-bold tracking-tight">
            URBANTHREADS
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium uppercase tracking-wider hover:text-muted-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="hover:text-muted-foreground transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-muted-foreground transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hover:text-muted-foreground transition-colors" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button 
              className="hover:text-muted-foreground transition-colors" 
              aria-label="Account"
              onClick={() => navigate("/auth")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-medium uppercase tracking-wider whitespace-nowrap hover:text-muted-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
