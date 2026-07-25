'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999999] transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-500 ${scrolled ? '' : ''}`}>
        <div className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--dark)]/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-1 no-underline group">
            <span className="text-xl font-black tracking-tight text-white">
              A
              <span className="text-[var(--cyan)]">J</span>
              IT
            </span>
            <span className="text-[var(--hot)] text-2xl font-black leading-none group-hover:rotate-12 transition-transform duration-300">.</span>
            {/* Logo glow on scroll */}
            {scrolled && (
              <div className="absolute -inset-4 bg-[var(--cyan)]/5 rounded-xl blur-xl -z-10"></div>
            )}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-[13px] font-semibold tracking-wide text-gray-400 hover:text-white transition-all duration-300 relative group rounded-lg hover:bg-white/[0.03] no-underline"
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] text-[var(--dark)] text-xs font-bold uppercase tracking-wider no-underline transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,245,212,0.3)] hover:scale-105"
            >
              <RiContactsFill size={14} />
              <span>Hire Me</span>
            </Link>

            <button
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-[var(--dark)]/95 backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/40">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-gray-400 hover:text-[var(--cyan)] hover:bg-white/[0.03] rounded-xl transition-all duration-300 no-underline"
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]/30"></span>
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5">
              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] text-[var(--dark)] text-sm font-bold uppercase tracking-wider no-underline"
                onClick={() => setIsOpen(false)}
              >
                <RiContactsFill size={14} />
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
