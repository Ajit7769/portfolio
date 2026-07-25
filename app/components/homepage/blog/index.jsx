'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';
import { useEffect, useRef, useState } from 'react';

function Blog({ blogs }) {
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
    <div id='blogs' ref={ref} className="relative z-50 my-16 lg:my-24">
      {/* Section divider */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--neon)]"></div>
          <span className="text-[var(--neon)] text-sm font-bold uppercase tracking-[0.3em]">Blogs</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--neon)]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {blogs.slice(0, 6).map((blog, i) =>
          blog?.cover_image && (
            <div
              key={i}
              className={`${isVisible ? '' : 'opacity-0 translate-y-8'} transition-all duration-700`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <BlogCard blog={blog} />
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          className="group flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[var(--neon)] text-[var(--neon)] font-bold text-sm uppercase tracking-wider no-underline transition-all duration-300 hover:bg-[var(--neon)] hover:text-[var(--dark)] hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] hover:scale-105"
          href="/blog"
        >
          <span>View More</span>
          <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default Blog;
