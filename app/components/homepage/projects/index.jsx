'use client';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const INITIAL_COUNT = 4;

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);

  const displayedProjects = projectsData.filter(p => p.description);
  const visibleProjects = showAll ? displayedProjects : displayedProjects.slice(0, INITIAL_COUNT);
  const hasMore = displayedProjects.length > INITIAL_COUNT;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id='projects' ref={ref} className="relative my-20 lg:my-32">
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--hot)]/10 border border-[var(--hot)]/20 text-[var(--hot)] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-4xl font-black">
          <span className="text-white">Featured </span>
          <span className="bg-gradient-to-r from-[var(--hot)] to-[var(--electric)] bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          {displayedProjects.length} projects showcasing full-stack development, e-commerce solutions, and AI integration
        </p>
      </div>

      {/* Projects list */}
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {visibleProjects.map((project, index) => (
          <div
            key={project.id}
            className={`${isVisible ? '' : 'opacity-0 translate-y-12'} transition-all duration-700`}
            style={{ transitionDelay: `${Math.min(index, 3) * 150}ms` }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>

      {/* View More / Show Less button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              setShowAll(prev => !prev);
              if (showAll) {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border border-white/10 bg-[var(--card)] hover:border-[var(--cyan)]/30 hover:bg-[var(--cyan)]/5 text-white font-semibold text-sm transition-all duration-300 hover:scale-105"
          >
            {showAll ? (
              <>
                <span>Show Less</span>
                <FaChevronUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                <span>View All Projects ({displayedProjects.length})</span>
                <FaChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
