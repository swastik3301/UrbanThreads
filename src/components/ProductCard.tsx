interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
}

const ProductCard = ({ image, title, price, category }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-muted mb-4 aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{category}</p>
        <h3 className="font-heading font-semibold text-lg uppercase tracking-tight">{title}</h3>
        <p className="font-bold text-base">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
