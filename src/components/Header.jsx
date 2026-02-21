//src/components/Header.jsx
import logo from "../assets/logo.jpg";
import { shop } from "../data/menu";

export default function Header({ lang, setLang, currency, setCurrency, theme, setTheme }) {
  const isAR = lang === "ar";

  return (
    <header className="bg-white/90 backdrop-blur border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 flex-1">
          <img
            src={logo}
            alt="Ali Bilal Ice Cream"
            className="h-14 w-14 rounded-full object-cover border border-brand-border shadow-sm"
          />

          <div>
            <h1 className="text-lg font-semibold text-brand-brown">
              {shop.name}
            </h1>
            <div className="text-sm text-brand-lightBrown">
              Tel: {shop.phones.join(" - ")}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              const next = theme === "cream" ? "dark" : theme === "dark" ? "mint" : "cream";
              setTheme(next);
            }}
            className="px-3 py-2 rounded-xl border border-brand-border bg-white shadow-sm text-sm font-medium text-brand-brown hover:bg-brand-brown hover:text-white transition"
          >
            {theme === "cream" ? "☀️" : theme === "dark" ? "🌙" : "🍃"}
          </button>
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === "usd" ? "ll" : "usd")}
            className="px-3 py-2 rounded-xl border border-brand-border bg-white shadow-sm text-sm font-medium text-brand-brown hover:bg-brand-brown hover:text-white transition"
          >
            {currency === "usd" ? "USD" : "LL"}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAR ? "en" : "ar")}
            className="px-3 py-2 rounded-xl border border-brand-border bg-white shadow-sm text-sm font-medium text-brand-brown hover:bg-brand-brown hover:text-white transition"
          >
            {isAR ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </header>
  );
}





