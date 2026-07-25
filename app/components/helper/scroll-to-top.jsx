"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] text-[var(--dark)] shadow-lg shadow-[var(--cyan)]/20 hover:shadow-[var(--cyan)]/40 hover:scale-110 transition-all duration-300"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp size={16} />
    </button>
  );
};

export default ScrollToTop;
