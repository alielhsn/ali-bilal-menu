// src/App.js
import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import SearchBar from "./components/SearchBar";
import MenuItemCard from "./components/MenuItemCard";
import { items } from "./data/menu";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";

const LS_LANG = "ab_lang";
const LS_CURRENCY = "ab_currency";
const LS_CATEGORY = "ab_category";
const LS_THEME = "ab_theme";
const LS_CART = "ab_cart";

// Popular tracker with daily reset
const LS_POPULAR_DATE = "ab_popular_date";
const LS_POPULAR_COUNTS = "ab_popular_counts";

function todayKey() {
  const d = new Date();
  // local day key
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(LS_LANG) || "en");
  const [currency, setCurrency] = useState(() => localStorage.getItem(LS_CURRENCY) || "usd");
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME) || "cream");
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem(LS_CATEGORY) || "cheesecake");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(LS_CART);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Badge ref for precise landing
  const cartBadgeRef = useRef(null);

  // Flying 🍦 state
  const [flies, setFlies] = useState([]);

  // ---- Persist settings ----
  useEffect(() => localStorage.setItem(LS_LANG, lang), [lang]);
  useEffect(() => localStorage.setItem(LS_CART, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(LS_CURRENCY, currency), [currency]);
  useEffect(() => localStorage.setItem(LS_CATEGORY, activeCategory), [activeCategory]);
  useEffect(() => localStorage.setItem(LS_THEME, theme), [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
      window.scrollTo({ top: 0 });
    }, [activeCategory]);

  // ---- Daily reset for popular tracker ----
  useEffect(() => {
    const t = todayKey();
    const savedDate = localStorage.getItem(LS_POPULAR_DATE);
    if (savedDate !== t) {
      localStorage.setItem(LS_POPULAR_DATE, t);
      localStorage.setItem(LS_POPULAR_COUNTS, JSON.stringify({}));
    }
  }, []);

  const openProduct = (item) => {
      setSelectedItem(item);
      setModalOpen(true);
    };

  const bumpPopular = (itemId, qty = 1) => {
    const t = todayKey();
    const savedDate = localStorage.getItem(LS_POPULAR_DATE);
    if (savedDate !== t) {
      localStorage.setItem(LS_POPULAR_DATE, t);
      localStorage.setItem(LS_POPULAR_COUNTS, JSON.stringify({}));
    }

    const raw = localStorage.getItem(LS_POPULAR_COUNTS);
    const counts = raw ? JSON.parse(raw) : {};
    counts[itemId] = (counts[itemId] || 0) + qty;
    localStorage.setItem(LS_POPULAR_COUNTS, JSON.stringify(counts));
  };

  const startFly = (fromEl) => {
    if (!fromEl) return;

    const from = fromEl.getBoundingClientRect();
    const toEl = cartBadgeRef.current;
    const to = toEl?.getBoundingClientRect();

    const startX = from.left + from.width / 2;
    const startY = from.top + from.height / 2;

    // fallback if badge not mounted (should be mounted when cart has items)
    const endX = to ? to.left + to.width / 2 : window.innerWidth - 60;
    const endY = to ? to.top + to.height / 2 : window.innerHeight - 140;

    const id = crypto.randomUUID();
    setFlies((prev) => [
      ...prev,
      {
        id,
        startX,
        startY,
        dx: endX - startX,
        dy: endY - startY,
      },
    ]);

    // auto cleanup
    setTimeout(() => {
      setFlies((prev) => prev.filter((f) => f.id !== id));
    }, 900);
  };

  const addToCart = (item, selectedPrice, fromEl) => {
    // vibration feedback (mobile)
    try {
      if (navigator.vibrate) navigator.vibrate(20);
    } catch {}

    // start fly animation to badge
    startFly(fromEl);

    // update popular tracker (per day)
    bumpPopular(item.id, 1);

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.itemId === item.id && i.price.usd === selectedPrice.usd && i.price.ll === selectedPrice.ll
      );

      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: (i.qty ?? 1) + 1 } : i));
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          itemId: item.id,
          name: lang === "ar" ? item.nameAR : item.name,
          price: selectedPrice,
          currency,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // ---- Popular per category (Most Ordered Today per current category) ----
  const mostOrderedForActiveCategory = useMemo(() => {
    const raw = localStorage.getItem(LS_POPULAR_COUNTS);
    const counts = raw ? JSON.parse(raw) : {};

    const inCategory =
      activeCategory === "seasonal"
        ? items.filter((i) => i.seasonal)
        : items.filter((i) => i.category === activeCategory);

    let best = null;
    let bestCount = 0;

    for (const it of inCategory) {
      const c = counts[it.id] || 0;
      if (c > bestCount) {
        bestCount = c;
        best = it;
      }
    }

    return bestCount > 0 ? best : null;
  }, [activeCategory]); // cart triggers recompute after updates

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      if (activeCategory === "seasonal") return items.filter((item) => item.seasonal);
      return items.filter((item) => item.category === activeCategory);
    }

    const results = items.filter((item) => {
      const hay = [
        item.name,
        item.nameAR,
        item.description,
        ...(item.prices?.map((p) => p.label) ?? []),
        ...(item.extras?.map((e) => e.label) ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });

    if (activeCategory === "seasonal") return results.filter((item) => item.seasonal);
    return results;
  }, [activeCategory, query]);

  useEffect(() => {
    if (!query.trim()) return;

    const q = query.trim().toLowerCase();

    const firstMatch = items.find((item) => {
      const hay = [
        item.name,
        item.nameAR,
        item.description,
        ...(item.prices?.map((p) => p.label) ?? []),
        ...(item.extras?.map((e) => e.label) ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });

    if (firstMatch && firstMatch.category !== activeCategory) {
      setActiveCategory(firstMatch.category);
    }
  }, [query, activeCategory]);

  const isAR = lang === "ar";

  return (
    <motion.div
      className="min-h-screen bg-brand-cream text-brand-brown"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Header lang={lang} setLang={setLang} currency={currency} setCurrency={setCurrency} theme={theme} setTheme={setTheme} />

      <CategoryTabs active={activeCategory} setActive={setActiveCategory} lang={lang} />

      <SearchBar lang={lang} query={query} setQuery={setQuery} />

      {/* Flying 🍦 layer */}
      <AnimatePresence>
        {flies.map((f) => (
          <motion.div
            key={f.id}
            className="fixed z-[9999] pointer-events-none"
            style={{ left: f.startX, top: f.startY }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              // curve arc (3 keyframes)
              x: [0, f.dx * 0.55, f.dx],
              y: [0, -90, f.dy],
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [1, 1, 0.98],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >
            {/* bigger 🍦 */}
            <span className="text-4xl relative inline-block">
              🍦

              {/* sparkle trail (multiple particles) */}
              <span className="absolute left-1/2 top-1/2 pointer-events-none" style={{ transform: "translate(-50%, -50%)" }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-[12px]"
                    initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.6, 1, 0.6],
                      x: [-6 - i * 2, -18 - i * 4],
                      y: [2 + i, 10 + i * 2],
                    }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                  >
                    ✨
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      <main className="max-w-3xl mx-auto p-4">
        {/* Small title line */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-brand-lightBrown">{isAR ? "المنتجات" : "Items"}</div>
          <div className="text-xs text-brand-lightBrown">
            {filteredItems.length} {isAR ? "عنصر" : "results"}
          </div>
        </div>

        {/* Most ordered (per category) */}
        {mostOrderedForActiveCategory && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-brand-brown mb-3">
              {isAR ? "الأكثر طلباً اليوم" : "Most Ordered Today"}
            </h2>

            <MenuItemCard
              item={mostOrderedForActiveCategory}
              lang={lang}
              currency={currency}
              addToCart={addToCart}
              onOpen={openProduct}
            />
          </div>
        )}

        {/* Animated list */}
        <motion.div layout="position" className="space-y-4">
          <AnimatePresence initial={false}>
            {filteredItems
              // prevent duplication if most ordered is already shown above
              .filter((it) => it.id !== mostOrderedForActiveCategory?.id)
              .map((item) => (
               <MenuItemCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  currency={currency}
                  addToCart={addToCart}
                  onOpen={openProduct}
                />
              ))}
          </AnimatePresence>

          {!filteredItems.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-brand-border rounded-2xl p-6 text-center text-brand-lightBrown"
            >
              {isAR ? "لا توجد نتائج" : "No results found"}
            </motion.div>
          )}
        </motion.div>
      </main>
      <ProductModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          item={selectedItem}
          lang={lang}
          currency={currency}
          addToCart={addToCart}
        />

      <Footer lang={lang} />
      <BackToTop />

      <CartButton cart={cart} setOpen={setCartOpen} badgeRef={cartBadgeRef} />

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        lang={lang}
        currency={currency}
      />
    </motion.div>
  );
}