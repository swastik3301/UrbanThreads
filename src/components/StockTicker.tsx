const StockTicker = () => {
  const stocks = [
    { symbol: "URBN", price: "$145.80", change: "+2.4%" },
    { symbol: "FASHION", price: "$89.20", change: "+1.8%" },
    { symbol: "STREET", price: "$234.50", change: "-0.5%" },
    { symbol: "STYLE", price: "$178.90", change: "+3.2%" },
    { symbol: "TREND", price: "$56.30", change: "+0.9%" },
    { symbol: "URBAN", price: "$123.40", change: "+1.5%" },
  ];

  return (
    <div className="bg-primary/10 border-y border-primary/20 py-3 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 mx-8"
          >
            <span className="font-heading font-bold text-sm">{stock.symbol}</span>
            <span className="text-sm">{stock.price}</span>
            <span
              className={`text-sm font-medium ${
                stock.change.startsWith("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
