'use client';
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import ContactForm from './contact-form';

function ContactSection() {
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
    <div id="contact" ref={ref} className="my-16 lg:my-24 relative">
      {/* Section divider */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--electric)]"></div>
          <span className="text-[var(--electric)] text-sm font-bold uppercase tracking-[0.3em]">Get In Touch</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--electric)]"></div>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${isVisible ? '' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-2">
              <span className="text-white">Let&apos;s Work </span>
              <span className="bg-gradient-to-r from-[var(--electric)] to-[var(--hot)] bg-clip-text text-transparent">Together</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              I&apos;m available for freelance projects and full-time opportunities. Whether you need a MERN stack application or AI agent automation, let&apos;s build something great.
            </p>
          </div>

          <div className="space-y-4">
            <a href={`mailto:${personalData.email}`} className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-white/5 hover:border-[var(--electric)]/30 transition-all duration-300 no-underline">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--electric)]/20 to-[var(--hot)]/20 flex items-center justify-center text-[var(--electric)] group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Email</p>
                <p className="text-white text-sm">{personalData.email}</p>
              </div>
            </a>

            <a href={`tel:${personalData.phone}`} className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-white/5 hover:border-[var(--cyan)]/30 transition-all duration-300 no-underline">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--neon)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:scale-110 transition-transform duration-300">
                <FaPhone size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Phone</p>
                <p className="text-white text-sm">{personalData.phone}</p>
              </div>
            </a>

            <div className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/20 to-[var(--cyan)]/20 flex items-center justify-center text-[var(--neon)]">
                <CiLocationOn size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Location</p>
                <p className="text-white text-sm">{personalData.address}</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <Link target="_blank" href={personalData.github}
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 text-gray-400 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300 hover:scale-110 no-underline">
              <FaGithub size={20} />
            </Link>
            <Link target="_blank" href={personalData.linkedIn}
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 text-gray-400 hover:border-[var(--electric)] hover:text-[var(--electric)] hover:bg-[var(--electric)]/10 transition-all duration-300 hover:scale-110 no-underline">
              <BiLogoLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
