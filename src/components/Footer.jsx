// src/components/Footer.jsx
import { shop } from "../data/menu";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function Footer({ lang }) {
  const isAR = lang === "ar";

  return (
    <footer className="mt-24 relative">
      
      {/* Glass elevated container */}
      <div className="bg-brand-cream/90 backdrop-blur-md border-t border-brand-border shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

          {/* Title */}
          <div className={`${isAR ? "text-right" : "text-left"}`}>
            <h2 className="text-lg font-semibold text-brand-brown">
              {isAR ? "تواصل معنا" : "Contact Us"}
            </h2>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${shop.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white transition-all duration-300"
            >
              <FaWhatsapp className="text-brand-brown text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
              WhatsApp
            </a>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${shop.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white transition-all duration-300"
            >
              <FaInstagram className="text-brand-brown text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
              Instagram
            </a>

            {/* Facebook */}
            <a
              href={`https://facebook.com/${shop.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white transition-all duration-300"
            >
              <FaFacebookF className="text-brand-brown text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
              Facebook
            </a>

            {/* Location */}
            <a
              href={shop.location}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white border border-brand-border text-brand-brown py-3 rounded-xl shadow-sm hover:bg-brand-brown hover:text-white transition-all duration-300"
            >
              <MdLocationOn className="text-brand-brown text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
              {isAR ? "الموقع" : "Location"}
            </a>

          </div>

          {/* Bottom */}
          <div className="border-t border-brand-border pt-6 text-center text-xs text-brand-lightBrown">
            © {new Date().getFullYear()} {shop.name}
          </div>

        </div>
      </div>
    </footer>
  );
}