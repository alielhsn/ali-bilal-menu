// src/components/CartDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { shop } from "../data/menu";
import { useMemo, useState } from "react";

function formatCurrency(value, currency) {
  if (currency === "usd") return `$${value}`;
  return `${value.toLocaleString()} LL`;
}

export default function CartDrawer({
  open,
  setOpen,
  cart,
  setCart,
  removeFromCart,
  lang,
  currency,
}) {
  const isAR = lang === "ar";

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [error, setError] = useState("");

  const DELIVERY_FEE = currency === "usd" ? 1 : 100000;

  const itemsTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const value = currency === "usd" ? item?.price?.usd ?? 0 : item?.price?.ll ?? 0;
      const qty = item?.qty ?? 1;
      return sum + value * qty;
    }, 0);
  }, [cart, currency]);

  const total = itemsTotal + (cart.length ? DELIVERY_FEE : 0);

  const resetOrderForm = () => {
    setCustomerName("");
    setAddress("");
    setError("");
    setConfirmOpen(false);
  };

  const generateMessage = () => {
    let message = `🛍 Order from ${shop.name}%0A%0A`;
    message += `👤 Name: ${customerName}%0A`;
    message += `📍 Address: ${address}%0A%0A`;
    message += `Items:%0A`;

    cart.forEach((item, index) => {
      const value = currency === "usd" ? item.price.usd : item.price.ll;
      message += `${index + 1}. ${item.name} x${item.qty} - ${formatCurrency(
        value * item.qty,
        currency
      )}%0A`;
    });

    message += `%0ADelivery: ${formatCurrency(DELIVERY_FEE, currency)}%0A`;
    message += `Total: ${formatCurrency(total, currency)}`;

    return `https://wa.me/${shop.whatsapp}?text=${message}`;
  };

  const handleOrderClick = () => {
    setError("");

    if (!cart.length) {
      setError(isAR ? "السلة فارغة" : "Your cart is empty.");
      return;
    }

    if (!customerName.trim()) {
      setError(isAR ? "يرجى إدخال الاسم" : "Please enter your name.");
      return;
    }

    if (!address.trim()) {
      setError(isAR ? "يرجى إدخال العنوان" : "Please enter your address.");
      return;
    }

    setConfirmOpen(true);
  };

  const handleSend = () => {
    const url = generateMessage();
    window.open(url, "_blank");

    setCart([]);
    resetOrderForm();
    setOrderSuccess(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

          {/* Drawer */}
          <motion.div
              key="drawer"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl p-5 flex flex-col"
            >
            <h2 className="text-lg font-semibold mb-4">
              {isAR ? "السلة" : "Your Cart"}
            </h2>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {!cart.length ? (
                <div className="text-sm text-gray-500 text-center mt-10">
                  {isAR ? "السلة فارغة" : "Your cart is empty"}
                </div>
              ) : (
                cart.map((item, index) => {
                  const key = item?.id ? String(item.id) : `idx-${index}`;

                  return (
                    <div key={key} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{item.name}</div>

                        {/* TRASH */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm"
                          aria-label="Remove item"
                        >
                          🗑
                        </button>
                      </div>

                      <div className="text-xs text-gray-500">
                        {currency === "usd"
                          ? `$${item.price.usd}`
                          : `${item.price.ll.toLocaleString()} LL`}
                      </div>

                      {/* QTY */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            setCart((prev) =>
                              prev.map((i) =>
                                i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
                              )
                            )
                          }
                          className="px-2 border rounded"
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() =>
                            setCart((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
                            )
                          }
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* CLEAR CART */}
            {cart.length > 0 && (
              <button onClick={() => setCart([])} className="text-sm text-red-600 mb-3">
                {isAR ? "إفراغ السلة" : "Clear Cart"}
              </button>
            )}

            {/* CUSTOMER INFO */}
            <div className="space-y-3 mb-2">
              <input
                type="text"
                placeholder={isAR ? "الاسم الكامل" : "Full Name"}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm outline-none"
              />
              <input
                type="text"
                placeholder={isAR ? "العنوان الكامل" : "Full Address"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && <div className="text-xs text-red-600 mb-2">{error}</div>}

            {/* TOTAL SECTION */}
            <div className="border-t pt-4 mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{isAR ? "المجموع" : "Items Total"}</span>
                <span>{formatCurrency(itemsTotal, currency)}</span>
              </div>

              {cart.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{isAR ? "رسوم التوصيل" : "Delivery Fees"}</span>
                  <span>{formatCurrency(DELIVERY_FEE, currency)}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold">
                <span>{isAR ? "الإجمالي" : "Total"}</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>

              <button
                onClick={handleOrderClick}
                className="w-full py-3 rounded-xl border bg-brand-brown text-white"
              >
                {isAR ? "طلب" : "Order"}
              </button>
            </div>
          </motion.div>
        </>
      )}

      {/* SUMMARY CONFIRM MODAL */}
      {confirmOpen && (
        <motion.div
            key="confirm"
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              >
          <div className="bg-white rounded-2xl p-6 w-80 space-y-4 shadow-xl">
            <h3 className="font-semibold text-lg">
              {isAR ? "ملخص الطلب" : "Order Summary"}
            </h3>

            <div className="text-sm space-y-1">
              <div>
                <span className="font-medium">{isAR ? "الاسم:" : "Name:"}</span>{" "}
                {customerName}
              </div>
              <div>
                <span className="font-medium">{isAR ? "العنوان:" : "Address:"}</span>{" "}
                {address}
              </div>
            </div>

            <div className="text-sm space-y-1 max-h-40 overflow-y-auto border-t pt-3">
              {cart.map((item, index) => {
                const key = item?.id ? `sum-${String(item.id)}` : `sum-idx-${index}`;
                const lineTotal =
                  (currency === "usd" ? item.price.usd : item.price.ll) * item.qty;

                return (
                  <div key={key} className="flex justify-between">
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <span>{formatCurrency(lineTotal, currency)}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-sm border-t pt-3 space-y-1">
              <div className="flex justify-between">
                <span>{isAR ? "رسوم التوصيل" : "Delivery Fees"}</span>
                <span>{formatCurrency(DELIVERY_FEE, currency)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>{isAR ? "الإجمالي" : "Total"}</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 border border-brand-border py-2 rounded-lg"
              >
                {isAR ? "رجوع" : "Back"}
              </button>

              <button
                onClick={handleSend}
                className="flex-1 bg-brand-brown text-white py-2 rounded-lg"
              >
                {isAR ? "تأكيد" : "Confirm"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUCCESS MODAL */}
      {orderSuccess && (
        <motion.div
          key="success"
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
          <div className="bg-white rounded-2xl p-6 w-80 text-center space-y-4 shadow-xl">
            <div className="text-4xl">✅</div>
            <div className="font-semibold">
              {isAR ? "تم إرسال الطلب بنجاح!" : "Order Sent Successfully!"}
            </div>
            <button
              onClick={() => setOrderSuccess(false)}
              className="bg-brand-brown text-white py-2 px-4 rounded-lg"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}