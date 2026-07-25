'use client';
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaCogs, FaRocket, FaBrain } from "react-icons/fa";

const highlights = [
  { icon: <FaCode />, label: "2+ Years", desc: "MERN Development" },
  { icon: <FaBrain />, label: "AI / n8n", desc: "Workflow Automation" },
  { icon: <FaCogs />, label: "REST APIs", desc: "JWT, RBAC, Real-Time" },
  { icon: <FaRocket />, label: "5+ Apps", desc: "Deployed to Production" },
];

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="about" ref={ref} className="my-20 lg:my-32 relative">
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/20 text-[var(--cyan)] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
          Introduction
        </span>
        <h2 className="text-3xl md:text-4xl font-black">
          <span className="text-white">Who I </span>
          <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] bg-clip-text text-transparent">Am</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
        {/* Left - Image */}
        <div className={`flex justify-center ${isVisible ? '' : 'opacity-0 translate-x-[-30px]'} transition-all duration-1000`}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-full opacity-60" style={{
              background: 'conic-gradient(from 0deg, var(--cyan), var(--electric), var(--hot), var(--neon), var(--cyan))',
              animation: 'rotate-gradient 6s linear infinite'
            }}></div>
            <div className="absolute -inset-3 rounded-full bg-[var(--dark)]" style={{ inset: '-10px' }}></div>
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[var(--card)]">
              <Image src={personalData.profile} alt={personalData.name} fill className="object-cover" sizes="(max-width: 768px) 256px, 320px" />
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] rounded-xl text-[var(--dark)] text-xs font-bold shadow-lg shadow-[var(--cyan)]/20">
              MERN + AI
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className={`${isVisible ? '' : 'opacity-0 translate-x-[30px]'} transition-all duration-1000 delay-300`}>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-8">
            {personalData.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item, i) => (
              <div key={i} className="group flex items-center gap-3 p-4 rounded-xl bg-[var(--card)] border border-white/5 hover:border-[var(--cyan)]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--electric)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-[11px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
