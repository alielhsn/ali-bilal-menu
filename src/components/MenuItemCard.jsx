// src/components/MenuItemCard.jsx
import { motion } from "framer-motion";
import placeholder from "../images/placeholder.jpg";

function formatCurrency(value, currency) {
  if (!value) return "—";
  if (currency === "usd") return `$${value.usd}`;
  return `${value.ll.toLocaleString()} LL`;
}

export default function MenuItemCard({ item, lang, currency, addToCart, onOpen }) {
  const isAR = lang === "ar";

  const title = isAR ? item.nameAR : item.name;
  const ingredients = isAR ? item.ingredientsAR : item.ingredientsEN;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300
        ${item.featured ? "border-brand-brown/70 shadow-md" : "border-brand-border"}
        hover:shadow-lg`}
    >

      {/* FEATURED BADGE - CARD LEVEL */}
        {item.featured && (
          <div className="absolute top-3 right-3 z-10 bg-brand-brown text-white text-[10px] px-3 py-1 rounded-full shadow-md">
            {isAR ? "الأكثر مبيعاً" : "Best Seller"}
          </div>
        )}
        
      <div className="flex">
        
        {/* IMAGE SECTION (Perfect Square) */}
        <div
            className="relative w-32 h-32 flex-shrink-0 overflow-hidden cursor-pointer"
            onClick={() => onOpen(item)}
          >
          <img
            src={placeholder}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          {/* SEASONAL BADGE */}
          {item.seasonal && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full shadow-sm">
              {isAR ? "موسمي" : "Seasonal"}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 p-4 space-y-3">
          <div
            className={isAR ? "text-right" : "text-left"}
            dir={isAR ? "rtl" : "ltr"}
          >
            <h3 className="font-semibold text-[15px] text-brand-brown">
                {title}
              </h3>

              {ingredients && (
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {ingredients}
                </p>
              )}
          </div>

        {/* PRICES */}
        {item.prices?.length && (
          <div className="pt-0 space-y-3 border-t border-brand-border/50">
            {item.prices.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between"
              >
                {/* Left Side: Label + Price */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    {p.label}
                  </span>
                  <span className="text-sm font-semibold text-brand-brown">
                    {formatCurrency(p.price, currency)}
                  </span>
                </div>

                {/* Add Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) =>
                    addToCart(item, p.price, e.currentTarget)
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-brown text-white text-lg shadow-sm hover:scale-105 active:scale-95 transition"
                >
                  +
                </motion.button>
              </div>
            ))}
          </div>
        )}  
        </div>
      </div>
    </motion.div>
  );
}