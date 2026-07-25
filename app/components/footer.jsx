'use client';
import Link from 'next/link';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiOpenai, SiTailwindcss } from 'react-icons/si';

const techStack = [
  { icon: <FaReact size={16} />, label: "React" },
  { icon: <FaNodeJs size={16} />, label: "Node.js" },
  { icon: <SiMongodb size={16} />, label: "MongoDB" },
  { icon: <SiExpress size={16} />, label: "Express" },
  { icon: <SiOpenai size={16} />, label: "OpenAI" },
  { icon: <SiTailwindcss size={16} />, label: "Tailwind" },
];

function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--cyan)]/30 to-transparent"></div>

      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center gap-1 no-underline mb-4">
              <span className="text-2xl font-black tracking-tight text-white">
                A<span className="text-[var(--cyan)]">J</span>IT
              </span>
              <span className="text-[var(--hot)] text-3xl font-black leading-none">.</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Full Stack MERN Developer & AI Agent Specialist building scalable web applications and intelligent automation.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaGithub size={16} />, href: "https://github.com/Ajit7769" },
                { icon: <FaLinkedin size={16} />, href: "https://linkedin.com/in/ajitsarwade" },
                { icon: <FaEnvelope size={16} />, href: "mailto:ajitsarwade77@gmail.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 text-gray-500 hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/5 transition-all duration-300 no-underline"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "About", href: "/#about" },
                { label: "Experience", href: "/#experience" },
                { label: "Skills", href: "/#skills" },
                { label: "Projects", href: "/#projects" },
                { label: "Education", href: "/#education" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-[var(--cyan)] transition-colors duration-300 py-1 no-underline flex items-center gap-1.5 group"
                >
                  <span className="w-0 h-[1px] bg-[var(--cyan)] group-hover:w-3 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Tech Stack</h4>
            <div className="grid grid-cols-3 gap-2">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-500 hover:text-[var(--cyan)] hover:border-[var(--cyan)]/20 transition-all duration-300"
                >
                  {tech.icon}
                  <span className="text-[11px] font-medium">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Ajit Sarwade. Crafted with
            <FaHeart size={10} className="text-[var(--hot)] inline" />
            using Next.js
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-[10px] font-mono uppercase tracking-wider">MERN + AI</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-gray-500 hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/5 transition-all duration-300"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
