//src/components/Footer.jsx
import { shop } from "../data/menu";

export default function Footer({ lang }) {
  const isAR = lang === "ar";

  return (
    <footer className="mt-20 border-t border-brand-border bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Title */}
        <div className={`text-center ${isAR ? "text-right" : "text-left"}`}>
          <h2 className="text-lg font-semibold text-brand-brown">
            {isAR ? "تواصل معنا" : "Contact Us"}
          </h2>
          <div className="w-12 h-1 bg-brand-brown mt-2 rounded-full"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">

          <a
            href={`https://wa.me/${shop.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white hover:shadow-md transition"
          >
            WhatsApp
          </a>

          <a
            href={`https://instagram.com/${shop.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white hover:shadow-md transition"
          >
            Instagram
          </a>

          <a
            href={`https://facebook.com/${shop.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white hover:shadow-md transition"
          >
            Facebook
          </a>

          <a
            href={shop.location}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white hover:shadow-md transition"
          >
            {isAR ? "الموقع" : "Location"}
          </a>

        </div>

        {/* Divider */}
        <div className="border-t border-brand-border pt-6 text-center text-xs text-brand-lightBrown">
          © {new Date().getFullYear()} {shop.name}
        </div>

      </div>
    </footer>
  );
}
