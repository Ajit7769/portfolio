import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaComment } from 'react-icons/fa';

function BlogCard({ blog, priority = false }) {
  return (
    <div className="group relative h-full">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[var(--neon)]/20 to-[var(--cyan)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      <div className="relative h-full bg-[var(--card)] rounded-2xl border border-white/5 group-hover:border-transparent overflow-hidden transition-all duration-500 flex flex-col">
        {/* Image */}
        <div className="h-44 overflow-hidden relative">
          <Image
            src={blog?.cover_image}
            height={1080}
            width={1920}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt=""
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[var(--neon)]">{timeConverter(blog.published_at)}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-gray-500">
                <FaHeart size={10} className="text-[var(--hot)]" /> {blog.public_reactions_count}
              </span>
              {blog.comments_count > 0 && (
                <span className="flex items-center gap-1 text-gray-500">
                  <FaComment size={10} /> {blog.comments_count}
                </span>
              )}
            </div>
          </div>

          <Link target="_blank" href={blog.url} className="no-underline">
            <p className="text-white font-bold text-sm lg:text-base mb-3 group-hover:text-[var(--neon)] transition-colors duration-300 line-clamp-2">
              {blog.title}
            </p>
          </Link>

          <p className="text-gray-500 text-xs mb-3">{blog.reading_time_minutes} min read</p>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
