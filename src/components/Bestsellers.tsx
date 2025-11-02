import ProductCard from "./ProductCard";
import hoodiesImg from "@/assets/collection-hoodies.jpg";
import jacketsImg from "@/assets/collection-jackets.jpg";
import pantsImg from "@/assets/collection-pants.jpg";

const Bestsellers = () => {
  const products = [
    { image: hoodiesImg, title: "Classic Black Hoodie", price: "$79", category: "Bestseller" },
    { image: jacketsImg, title: "Biker Jacket", price: "$299", category: "Bestseller" },
    { image: pantsImg, title: "Tech Cargo", price: "$139", category: "Bestseller" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-12 uppercase tracking-tight">
          Bestsellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
