import ProductCard from "./ProductCard";
import hoodiesImg from "@/assets/collection-hoodies.jpg";
import jacketsImg from "@/assets/collection-jackets.jpg";
import pantsImg from "@/assets/collection-pants.jpg";
import shoesImg from "@/assets/collection-shoes.jpg";

const FeaturedCollections = () => {
  const products = [
    { image: hoodiesImg, title: "Oversized Hoodie", price: "$89", category: "Essentials" },
    { image: jacketsImg, title: "Leather Jacket", price: "$249", category: "Outerwear" },
    { image: pantsImg, title: "Cargo Pants", price: "$119", category: "Bottoms" },
    { image: shoesImg, title: "Urban Sneakers", price: "$159", category: "Footwear" },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-12 uppercase tracking-tight">
          Featured Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
