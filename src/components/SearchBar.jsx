//src/components/SearchBar.jsx
export default function SearchBar({ lang, query, setQuery }) {
  const isAR = lang === "ar";

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4">
      <div className="bg-white border border-brand-border rounded-2xl shadow-sm px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-brand-lightBrown">🔎</div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAR ? "ابحث عن منتج..." : "Search for an item..."}
            className={`w-full outline-none bg-transparent text-sm text-brand-brown placeholder:text-brand-lightBrown ${
              isAR ? "text-right" : "text-left"
            }`}
            dir={isAR ? "rtl" : "ltr"}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-3 py-1 rounded-full border border-brand-border text-brand-brown hover:bg-brand-brown hover:text-white transition"
            >
              {isAR ? "مسح" : "Clear"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
