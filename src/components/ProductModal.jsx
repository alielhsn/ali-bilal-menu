//src/components/ProductModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import placeholder from "../images/placeholder.jpg";

function formatCurrency(value, currency) {
  if (!value) return "—";
  if (currency === "usd") return `$${value.usd}`;
  return `${value.ll.toLocaleString()} LL`;
}

export default function ProductModal({
  open,
  onClose,
  item,
  lang,
  currency,
  addToCart,
}) {
  const [index, setIndex] = useState(0);
  const isAR = lang === "ar";

  if (!item) return null;

  const images = item.images?.length ? item.images : [placeholder];
  const title = isAR ? item.nameAR : item.name;
  const ingredients = isAR ? item.ingredientsAR : item.ingredientsEN;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 300 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 150) onClose();
            }}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Square Image Section */}
            <div className="relative w-full aspect-square bg-black overflow-hidden">

              {/* Image */}
              <motion.img
                key={index}
                src={images[index]}
                alt={title}
                className="w-full h-full object-cover"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) next();
                  if (info.offset.x > 80) prev();
                }}
              />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === index
                          ? "bg-white scale-110"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-brand-brown">
                  {title}
                </h3>
                {ingredients && (
                  <p className="text-sm text-gray-500 mt-1">
                    {ingredients}
                  </p>
                )}
              </div>

              {/* Prices */}
              {item.prices?.map((p, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center"
                >
                  <div>
                    <div className="text-xs text-gray-500">
                      {p.label}
                    </div>
                    <div className="font-semibold text-brand-brown">
                      {formatCurrency(p.price, currency)}
                    </div>
                  </div>

                  <button
                    onClick={(e) =>
                      addToCart(item, p.price, e.currentTarget)
                    }
                    className="px-4 py-2 rounded-full bg-brand-brown text-white text-sm"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}