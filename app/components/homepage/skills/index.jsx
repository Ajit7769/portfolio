'use client';
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Skills() {
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
    <div id="skills" ref={ref} className="relative z-50 my-16 lg:my-24">
      {/* Section divider */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--cyan)]"></div>
          <span className="text-[var(--cyan)] text-sm font-bold uppercase tracking-[0.3em]">Skills</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--cyan)]"></div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 lg:gap-4 max-w-4xl mx-auto">
        {skillsData.map((skill, id) => (
          <div
            key={id}
            className={`group relative ${isVisible ? '' : 'opacity-0 translate-y-6'} transition-all duration-500`}
            style={{ transitionDelay: `${id * 50}ms` }}
          >
            <div className="relative p-4 lg:p-5 rounded-xl bg-[var(--card)] border border-white/5 flex flex-col items-center justify-center gap-3 hover:border-[var(--cyan)]/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,245,212,0.08)] hover:-translate-y-1 cursor-default">
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative w-8 h-8 lg:w-10 lg:h-10 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={skillsImage(skill)?.src}
                  alt={skill}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <p className="relative text-gray-400 text-[10px] lg:text-xs font-medium text-center group-hover:text-[var(--cyan)] transition-colors duration-300">
                {skill}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
