//src/components/CartButton.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function CartButton({ cart, setOpen, badgeRef }) {
  const [bounce, setBounce] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const totalQty = useMemo(() => cart.reduce((sum, item) => sum + (item.qty ?? 1), 0), [cart]);

  useEffect(() => {
    if (!totalQty) return;

    // badge pop trigger
    setBounce(true);
    setBurstKey((k) => k + 1);

    const t = setTimeout(() => setBounce(false), 420);
    return () => clearTimeout(t);
  }, [totalQty]);

  if (!cart.length) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-40 left-6 z-50 bg-brand-brown text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        🛒
        <span className="relative">
          {/* Badge */}
          <motion.span
            ref={badgeRef}
            animate={{ scale: bounce ? 1.25 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="bg-white text-brand-brown text-xs font-bold px-2 py-1 rounded-full inline-block"
          >
            {totalQty}
          </motion.span>

          {/* Particle burst when badge pops */}
          <AnimatePresence>
            {bounce && (
              <motion.div
                key={`burst-${burstKey}`}
                className="absolute left-1/2 top-1/2 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {Array.from({ length: 10 }).map((_, i) => {
                  // deterministic-ish spread (no randomness needed)
                  const angle = (Math.PI * 2 * i) / 10;
                  const r = 18 + (i % 3) * 6;
                  const x = Math.cos(angle) * r;
                  const y = Math.sin(angle) * r;

                  return (
                    <motion.span
                      key={i}
                      className="absolute text-[10px]"
                      initial={{ x: 0, y: 0, scale: 0.6, opacity: 0 }}
                      animate={{ x, y, scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      ✨
                    </motion.span>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </AnimatePresence>
  );
}