'use client';
import { projectsData } from '@/utils/data/projects-data';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaCode, FaCalendar, FaUsers, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const accents = [
  { main: '#00f5d4', glow: 'rgba(0,245,212,0.15)', tag: 'rgba(0,245,212,0.08)' },
  { main: '#7b2ff7', glow: 'rgba(123,47,247,0.15)', tag: 'rgba(123,47,247,0.08)' },
  { main: '#ff2d6b', glow: 'rgba(255,45,107,0.15)', tag: 'rgba(255,45,107,0.08)' },
  { main: '#00ff88', glow: 'rgba(0,255,136,0.15)', tag: 'rgba(0,255,136,0.08)' },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const id = parseInt(params.id);
  const project = projectsData.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!project || !project.description) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--dark)]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-[var(--cyan)] hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const accent = accents[(id - 1) % accents.length];
  const hasImages = project.images && project.images.length > 0;
  const projectIndex = projectsData.filter(p => p.description).indexOf(project);

  return (
    <main className="min-h-screen bg-[var(--dark)] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--cyan)] transition-colors mb-8 no-underline text-sm">
          <FaArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image gallery */}
          {hasImages && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[var(--card)] aspect-video">
                <Image src={project.images[activeImg]} alt={project.imagesAlt?.[activeImg] || project.name} fill unoptimized className="object-cover" priority />
                {/* Navigation arrows */}
                <button onClick={() => setActiveImg(p => (p - 1 + project.images.length) % project.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70 transition-all">
                  <FaChevronLeft size={14} />
                </button>
                <button onClick={() => setActiveImg(p => (p + 1) % project.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70 transition-all">
                  <FaChevronRight size={14} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-gray-300 font-mono">
                  {activeImg + 1} / {project.images.length}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className="relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all"
                    style={{ borderColor: i === activeImg ? accent.main : 'rgba(255,255,255,0.08)' }}>
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border" style={{ color: accent.main, background: accent.tag, borderColor: `${accent.main}22` }}>
                  {project.role || 'Full Stack'}
                </span>
                {project.status && (
                  <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[var(--neon)]/10 text-[var(--neon)] border border-[var(--neon)]/20">
                    {project.status}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{project.name}</h1>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-3">
              {project.duration && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <FaCalendar size={14} style={{ color: accent.main }} />
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">Duration</p>
                    <p className="text-white text-sm font-semibold">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <FaUsers size={14} style={{ color: accent.main }} />
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">Team</p>
                    <p className="text-white text-sm font-semibold">{project.teamSize}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tools */}
            {project.tools?.length > 0 && (
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-white/[0.04] text-gray-400 border border-white/[0.06]">{tool}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all duration-300 hover:scale-105"
                  style={{ background: accent.main, color: '#050a18' }}>
                  <FaExternalLinkAlt size={12} /> Live Demo
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 border border-white/10 hover:border-white/25 hover:text-white no-underline transition-all duration-300 hover:scale-105">
                  <FaCode size={12} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Overview */}
        {project.overview && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full" style={{ background: accent.main }}></div>
              Project Overview
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">{project.overview}</p>
          </div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full" style={{ background: accent.main }}></div>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all">
                  <FaCheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: accent.main }} />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {hasImages && project.images.length > 1 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full" style={{ background: accent.main }}></div>
              Project Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all group">
                  <Image src={img} alt={project.imagesAlt?.[i] || ''} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/[0.06]">
          {projectIndex > 0 ? (
            <Link href={`/project/${projectsData.filter(p => p.description)[projectIndex - 1].id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-[var(--cyan)] transition-colors no-underline text-sm">
              <FaArrowLeft size={14} /> Previous Project
            </Link>
          ) : <div></div>}
          <Link href="/#projects" className="text-gray-400 hover:text-white transition-colors no-underline text-sm">
            All Projects
          </Link>
          {projectIndex < projectsData.filter(p => p.description).length - 1 ? (
            <Link href={`/project/${projectsData.filter(p => p.description)[projectIndex + 1].id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-[var(--cyan)] transition-colors no-underline text-sm">
              Next Project <FaArrowLeft size={14} className="rotate-180" />
            </Link>
          ) : <div></div>}
        </div>
      </div>
    </main>
  );
}
