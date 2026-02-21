//src/components/CategoryTabs.jsx
import { categories } from "../data/menu";
import { motion } from "framer-motion";

export default function CategoryTabs({ active, setActive, lang }) {
  const isAR = lang === "ar";

  return (
    <div className="sticky top-[88px] z-40 bg-brand-cream/95 backdrop-blur border-b border-brand-border">
      <div className="max-w-3xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const label = isAR ? cat.nameAR : cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                  ${
                    isActive
                      ? "text-white"
                      : "bg-white text-brand-brown border border-brand-border hover:bg-brand-lightBrown hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-brand-brown"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}




