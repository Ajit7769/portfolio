'use client';
import { educations } from "@/utils/data/educations";
import { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

function Education() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="education" ref={ref} className="relative z-50 my-16 lg:my-24">
      {/* Section divider */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--neon)]"></div>
          <span className="text-[var(--neon)] text-sm font-bold uppercase tracking-[0.3em]">Education</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--neon)]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {educations.map((edu, index) => (
          <div
            key={edu.id}
            className={`group relative p-6 rounded-2xl bg-[var(--card)] border border-white/5 hover:border-[var(--neon)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)] ${isVisible ? '' : 'opacity-0 translate-y-8'} transition-all duration-700`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="absolute top-4 right-4 text-[var(--neon)] opacity-20 group-hover:opacity-50 transition-opacity duration-300">
              <FaGraduationCap size={40} />
            </div>

            <p className="text-[var(--neon)] text-xs font-semibold uppercase tracking-wider mb-3">{edu.duration}</p>
            <h3 className="text-white font-bold text-lg mb-2">{edu.title}</h3>
            <p className="text-gray-400 text-sm">{edu.institution}</p>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--neon)] to-[var(--cyan)] rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
