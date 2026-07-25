'use client';
import { experiences } from "@/utils/data/experience";
import { useEffect, useRef, useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";

function Experience() {
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
    <div id="experience" ref={ref} className="relative z-50 my-16 lg:my-24">
      {/* Section divider */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--electric)]"></div>
          <span className="text-[var(--electric)] text-sm font-bold uppercase tracking-[0.3em]">Experience</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--electric)]"></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--cyan)] via-[var(--electric)] to-[var(--hot)] opacity-30"></div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${isVisible ? '' : 'opacity-0 translate-y-10'} transition-all duration-700`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--dark)] border-2 border-[var(--cyan)] z-10">
                <div className="absolute inset-0 rounded-full bg-[var(--cyan)] animate-ping opacity-30"></div>
              </div>

              {/* Card */}
              <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                <div className="group relative p-6 rounded-2xl bg-[var(--card)] border border-white/5 hover:border-[var(--cyan)]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,245,212,0.05)]">
                  {/* Glow effect */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[var(--cyan)]/10 via-transparent to-[var(--electric)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--electric)]/20 flex items-center justify-center text-[var(--cyan)] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <BsPersonWorkspace size={24} />
                    </div>
                    <div>
                      <p className="text-[var(--neon)] text-xs font-semibold uppercase tracking-wider mb-1">{exp.duration}</p>
                      <h3 className="text-white font-bold text-lg mb-1">{exp.title}</h3>
                      <p className="text-gray-400 text-sm">{exp.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
