'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt, FaCode, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const accents = [
  { main: '#00f5d4', glow: 'rgba(0,245,212,0.15)', tag: 'rgba(0,245,212,0.08)' },
  { main: '#7b2ff7', glow: 'rgba(123,47,247,0.15)', tag: 'rgba(123,47,247,0.08)' },
  { main: '#ff2d6b', glow: 'rgba(255,45,107,0.15)', tag: 'rgba(255,45,107,0.08)' },
  { main: '#00ff88', glow: 'rgba(0,255,136,0.15)', tag: 'rgba(0,255,136,0.08)' },
];

function ProjectCard({ project, index }) {
  const accent = accents[index % accents.length];
  const isReversed = index % 2 !== 0;
  const hasImages = project.images && project.images.length > 0;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoRef = useRef(null);
  const totalImages = hasImages ? project.images.length : 0;

  const goNext = useCallback(() => {
    if (!hasImages) return;
    setActiveIdx(prev => (prev + 1) % totalImages);
  }, [hasImages, totalImages]);

  const goPrev = useCallback(() => {
    if (!hasImages) return;
    setActiveIdx(prev => (prev - 1 + totalImages) % totalImages);
  }, [hasImages, totalImages]);

  const goTo = useCallback((idx) => {
    if (!hasImages) return;
    setActiveIdx(idx);
    setIsAutoPlaying(false);
  }, [hasImages]);

  useEffect(() => {
    if (!hasImages || !isAutoPlaying || isPaused || totalImages <= 1) return;
    autoRef.current = setInterval(goNext, 3500);
    return () => clearInterval(autoRef.current);
  }, [hasImages, isAutoPlaying, isPaused, goNext, totalImages]);

  return (
    <div
      className={`group relative flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 rounded-2xl overflow-hidden border border-white/[0.06] bg-[var(--card)] hover:border-white/[0.12] transition-all duration-500 hover:shadow-2xl`}
      style={{ '--accent': accent.main }}
    >
      {/* Left / Visual Panel */}
      <div
        className="relative w-full md:w-[45%] min-h-[320px] md:min-h-[400px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent.glow}, var(--dark))` }}></div>

        {hasImages ? (
          <>
            {/* Main image - crossfade only, no scroll/translate */}
            <div className="absolute inset-0">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === activeIdx ? 1 : 0, zIndex: i === activeIdx ? 1 : 0 }}
                >
                  <Image src={img} alt={project.imagesAlt?.[i] || project.name} fill unoptimized className="object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 z-[2]"></div>
            </div>

            {/* Browser chrome */}
            <div className="absolute top-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/[0.1] z-[3]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 mx-2 h-5 rounded-md bg-white/[0.08] flex items-center px-2">
                <span className="text-[9px] text-gray-400 font-mono truncate">{project.name.toLowerCase().replace(/[\s-]+/g, '')}.com</span>
              </div>
              <span className="text-[9px] text-gray-400 font-mono px-2 py-0.5 rounded bg-white/[0.06]">{activeIdx + 1}/{totalImages}</span>
            </div>

            {/* Arrows */}
            <button onClick={(e) => { e.stopPropagation(); goPrev(); setIsAutoPlaying(false); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 z-[3] opacity-0 group-hover:opacity-100">
              <FaChevronLeft size={13} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); setIsAutoPlaying(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 z-[3] opacity-0 group-hover:opacity-100">
              <FaChevronRight size={13} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-[3]">
              {project.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === activeIdx ? '20px' : '6px', height: '6px', background: i === activeIdx ? accent.main : 'rgba(255,255,255,0.25)' }} />
              ))}
            </div>

            {/* Number badge */}
            <div className="absolute top-14 left-3 z-[3]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border border-white/10 backdrop-blur-md bg-black/40" style={{ color: accent.main }}>
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Auto-play toggle */}
            <button onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(p => !p); }}
              className="absolute top-14 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-[9px] text-gray-400 hover:text-white transition-all duration-300 z-[3]">
              {isAutoPlaying ? '⏸' : '▶'}
            </button>

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                  style={{ width: `${3 + i * 1.5}px`, height: `${3 + i * 1.5}px`, background: accent.main, left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 30}%`, animation: `float-particle ${3 + i * 0.4}s ease-in-out infinite ${i * 0.25}s` }} />
              ))}
            </div>
          </>
        ) : (
          /* Fallback */
          <>
            <div className="absolute top-4 left-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/[0.08]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 mx-2 h-5 rounded-md bg-white/[0.06] flex items-center px-2">
                <span className="text-[9px] text-gray-500 font-mono truncate">{project.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
            <div className="absolute top-16 left-4 right-4 bottom-4 rounded-lg bg-white/[0.03] border border-white/[0.05] p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <div className="w-16 h-2 rounded-full" style={{ background: accent.main, opacity: 0.4 }}></div>
                <div className="flex gap-2"><div className="w-6 h-1.5 rounded-full bg-white/10"></div><div className="w-6 h-1.5 rounded-full bg-white/10"></div></div>
              </div>
              <div className="space-y-2.5">
                <div className="w-3/4 h-3 rounded-full bg-white/[0.06]"></div>
                <div className="w-1/2 h-2 rounded-full bg-white/[0.04]"></div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="h-16 rounded-md bg-white/[0.04] border border-white/[0.05]"></div>
                  <div className="h-16 rounded-md bg-white/[0.04] border border-white/[0.05]"></div>
                  <div className="h-16 rounded-md bg-white/[0.04] border border-white/[0.05]"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border border-white/10" style={{ color: accent.main, background: accent.glow }}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Right / Info Panel */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border" style={{ color: accent.main, background: accent.tag, borderColor: `${accent.main}22` }}>
            {project.role || 'Full Stack'}
          </span>
          {hasImages && (
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-mono text-gray-500 bg-white/[0.03] border border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon)] animate-pulse"></span>
              {totalImages} Screenshots
            </span>
          )}
        </div>
        <h3 className="text-white text-xl lg:text-2xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(135deg, ${accent.main}, white)` }}>
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">{project.description || 'Project details coming soon.'}</p>
        {project.tools?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tools.map((tool, i) => (
              <span key={i} className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 cursor-default">{tool}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="group/btn flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all duration-300 hover:scale-105"
              style={{ background: accent.main, color: '#050a18' }}>
              <FaExternalLinkAlt size={12} /><span>Live Demo</span><FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 border border-white/10 hover:border-white/25 hover:text-white no-underline transition-all duration-300 hover:scale-105">
              <FaCode size={12} /><span>Source Code</span>
            </a>
          )}
          {project.description && (
            <Link href={`/project/${project.id}`}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold border border-white/10 hover:border-white/25 text-gray-300 hover:text-white no-underline transition-all duration-300 hover:scale-105">
              View Details <FaArrowRight size={10} />
            </Link>
          )}
          {!project.demo && !project.code && !project.description && <span className="text-gray-600 text-xs italic">Details coming soon</span>}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ background: `linear-gradient(to bottom, ${accent.main}, transparent)` }}></div>
    </div>
  );
}

export default ProjectCard;
