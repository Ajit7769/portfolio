'use client';
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaEnvelope, FaMicrophone, FaPause, FaPlay, FaRedo, FaTerminal, FaCode, FaLayerGroup, FaChartBar } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill, RiReactjsLine, RiNodejsLine, RiDatabase2Line } from "react-icons/ri";
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiTypescript, SiOpenai, SiSocketdotio, SiN8N } from "react-icons/si";

const speechLines = [
  `Hello! I am Ajit Sarwade, a Full Stack MERN Developer based in Pune, India.`,
  `I have over 2 years of experience designing, developing, and deploying scalable web applications using MongoDB, Express.js, React.js, and Node.js.`,
  `My expertise includes REST API development, JWT authentication, role-based access control, and real-time features with Socket.IO.`,
  `I have built AI-powered applications using OpenAI APIs and automated business workflows with n8n.`,
  `Currently, I am working at Appristine Technology, where I have developed 5 plus scalable MERN applications for clients across multiple domains.`,
  `I am passionate about building production-ready applications and I am available for freelance work. Let us build something great together!`,
];
const totalChars = speechLines.reduce((acc, line) => acc + line.length, 0);

const stats = [
  { value: 2, suffix: '+', label: 'Years Experience', color: 'var(--cyan)' },
  { value: 5, suffix: '+', label: 'Projects Delivered', color: 'var(--neon)' },
  { value: 15, suffix: '+', label: 'Technologies', color: 'var(--electric)' },
  { value: 3, suffix: '+', label: 'Happy Clients', color: 'var(--hot)' },
];

const techStack = [
  { icon: <RiReactjsLine size={22} />, name: 'React', color: '#61dafb' },
  { icon: <RiNodejsLine size={22} />, name: 'Node.js', color: '#68a063' },
  { icon: <SiMongodb size={20} />, name: 'MongoDB', color: '#47a248' },
  { icon: <SiExpress size={20} />, name: 'Express', color: '#ffffff' },
  { icon: <SiJavascript size={20} />, name: 'JavaScript', color: '#f7df1e' },
  { icon: <SiTypescript size={20} />, name: 'TypeScript', color: '#3178c6' },
  { icon: <SiTailwindcss size={20} />, name: 'Tailwind', color: '#38bdf8' },
  { icon: <SiOpenai size={20} />, name: 'OpenAI', color: '#10a37f' },
  { icon: <SiSocketdotio size={20} />, name: 'Socket.IO', color: '#ffffff' },
  { icon: <SiN8N size={20} />, name: 'n8n', color: '#ea4b71' },
  { icon: <RiDatabase2Line size={20} />, name: 'REST APIs', color: 'var(--cyan)' },
  { icon: <FaLayerGroup size={18} />, name: 'JWT Auth', color: 'var(--hot)' },
];

const skills = [
  { name: 'React.js', pct: 90, color: '#61dafb' },
  { name: 'Node.js', pct: 88, color: '#68a063' },
  { name: 'MongoDB', pct: 85, color: '#47a248' },
  { name: 'Express.js', pct: 87, color: '#ffffff' },
  { name: 'JavaScript', pct: 92, color: '#f7df1e' },
  { name: 'Tailwind CSS', pct: 80, color: '#38bdf8' },
];

const codeSnippet = `// PropNest AI - Property Search API
const searchProperties = async (filters) => {
  const query = {};

  if (filters.city) query.city = filters.city;
  if (filters.budget) {
    query.price = {
      $gte: filters.budget.min,
      $lte: filters.budget.max
    };
  }
  if (filters.bhk) query.bhk = filters.bhk;

  const properties = await Property.find(query)
    .populate('agent', 'name phone')
    .sort({ createdAt: -1 })
    .limit(20);

  return properties;
};`;

function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [speechDone, setSpeechDone] = useState(false);
  const [waveTick, setWaveTick] = useState(0);
  const [activeTab, setActiveTab] = useState('terminal');
  const [counters, setCounters] = useState(stats.map(() => 0));
  const timerRef = useRef(null);
  const scrollRef = useRef(null);
  const waveRef = useRef(null);

  // Counter animation
  useEffect(() => {
    const intervals = stats.map((s, i) => {
      let current = 0;
      const step = Math.ceil(s.value / 30);
      return setInterval(() => {
        current = Math.min(current + step, s.value);
        setCounters(prev => { const n = [...prev]; n[i] = current; return n; });
      }, 50);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  const startSpeech = useCallback(() => {
    setIsPlaying(true); setSpeechDone(false); setCurrentLine(0); setCurrentChar(0); setDisplayedText("");
  }, []);
  const pauseSpeech = useCallback(() => { setIsPlaying(false); clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    if (!isPlaying) return;
    waveRef.current = setInterval(() => setWaveTick(t => t + 1), 120);
    return () => clearInterval(waveRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || speechDone) return;
    if (currentLine >= speechLines.length) {
      timerRef.current = setTimeout(() => { setSpeechDone(true); setIsPlaying(false); }, 0);
      return;
    }
    const line = speechLines[currentLine];
    if (currentChar < line.length) {
      timerRef.current = setTimeout(() => { setDisplayedText(prev => prev + line[currentChar]); setCurrentChar(prev => prev + 1); }, 35);
    } else {
      timerRef.current = setTimeout(() => { setDisplayedText(prev => prev + " "); setCurrentLine(prev => prev + 1); setCurrentChar(0); }, 500);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentLine, currentChar, speechDone]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [displayedText]);
  useEffect(() => { const t = setTimeout(() => startSpeech(), 1200); return () => clearTimeout(t); }, [startSpeech]);

  const progress = Math.min((displayedText.length / totalChars) * 100, 100);

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: <FaTerminal size={10} /> },
    { id: 'tech', label: 'Tech Stack', icon: <FaLayerGroup size={10} /> },
    { id: 'code', label: 'Code', icon: <FaCode size={10} /> },
    { id: 'skills', label: 'Skills', icon: <FaChartBar size={10} /> },
  ];

  return (
    <section className="relative flex items-center py-12 lg:py-16 min-h-[92vh] overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--electric)] rounded-full opacity-[0.025] blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* ======= LEFT - TEXT ======= */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--cyan)]/20 bg-[var(--dark)]/80 backdrop-blur-sm mb-6" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]"></span>
            </span>
            <span className="text-[var(--cyan)] text-xs font-semibold tracking-wider uppercase">Available for Freelance</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5" style={{ animation: 'fadeInUp 0.7s ease-out 0.1s forwards', opacity: 0 }}>
            <span className="text-white/50 block text-sm md:text-base font-medium mb-3 tracking-wide">Full Stack MERN Developer &amp; AI Specialist</span>
            <span className="text-white">Hi, I&apos;m </span>
            <span className="bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--electric)] bg-clip-text text-transparent animate-gradient">{personalData.name}</span>
          </h1>

          <div className="h-10 flex items-center justify-center lg:justify-start mb-5" style={{ animation: 'fadeInUp 0.7s ease-out 0.2s forwards', opacity: 0 }}>
            <TypingRole />
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mb-8" style={{ animation: 'fadeInUp 0.7s ease-out 0.3s forwards', opacity: 0 }}>
            {personalData.description.substring(0, 180)}...
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8" style={{ animation: 'fadeInUp 0.7s ease-out 0.4s forwards', opacity: 0 }}>
            <Link href="#contact"
              className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] text-[var(--dark)] font-bold text-sm uppercase tracking-wider no-underline transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,245,212,0.3)] hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
              <RiContactsFill size={16} className="relative z-10" /><span className="relative z-10">Let&apos;s Talk</span>
            </Link>
            <Link href={personalData.resume} target="_blank"
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-[var(--electric)]/40 text-white font-bold text-sm uppercase tracking-wider no-underline transition-all duration-300 hover:border-[var(--electric)] hover:bg-[var(--electric)]/10 hover:scale-105">
              <MdDownload size={16} className="group-hover:translate-y-0.5 transition-transform" /><span>Resume</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 justify-center lg:justify-start" style={{ animation: 'fadeInUp 0.7s ease-out 0.5s forwards', opacity: 0 }}>
            {[
              { icon: <BsGithub size={18} />, href: personalData.github, label: "GitHub" },
              { icon: <BsLinkedin size={18} />, href: personalData.linkedIn, label: "LinkedIn" },
              { icon: <FaEnvelope size={18} />, href: `mailto:${personalData.email}`, label: "Email" },
            ].map((s, i) => (
              <Link key={i} href={s.href} target="_blank" title={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-gray-400 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 no-underline">
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* ======= RIGHT - STATS + TABBED PANEL ======= */}
        <div className="order-1 lg:order-2 space-y-5" style={{ animation: 'fadeInRight 0.8s ease-out 0.2s forwards', opacity: 0 }}>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="relative group p-4 rounded-xl border border-white/[0.06] bg-[var(--card)] hover:border-white/[0.12] transition-all duration-300 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${s.color}08, transparent 70%)` }}></div>
                <p className="text-2xl md:text-3xl font-black relative z-10" style={{ color: s.color }}>{counters[i]}{s.suffix}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1 relative z-10">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Main tabbed panel */}
          <div className="rounded-2xl border border-white/[0.08] bg-[var(--card)] overflow-hidden shadow-2xl shadow-black/40">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5 mr-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
              </div>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === t.id ? 'bg-white/[0.08] text-[var(--cyan)]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'}`}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-5 min-h-[280px]">
              {/* Terminal tab */}
              {activeTab === 'terminal' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaTerminal size={12} className="text-[var(--neon)]" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Agent Console</span>
                  </div>
                  <div className="rounded-lg bg-black/40 border border-white/[0.06] p-4 font-mono text-[12px] leading-relaxed">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
                      <span className="text-[var(--neon)]">$</span>
                      <span className="text-gray-400">ajit@sarwade ~ %</span>
                    </div>
                    {isPlaying ? (
                      <div className="space-y-2">
                        <p className="text-gray-400"><span className="text-[var(--neon)]">→</span> Initializing AI Agent...</p>
                        <p className="text-gray-400"><span className="text-[var(--cyan)]">→</span> Loading resume data<span className="animate-pulse">_</span></p>
                        <p className="text-gray-400"><span className="text-[var(--electric)]">→</span> Status: <span className="text-[var(--neon)]">Speaking</span></p>
                        <p className="text-gray-500 text-[10px] mt-2">Words spoken: {Math.floor(displayedText.length / 5)}</p>
                        <p className="text-gray-500 text-[10px]">Lines completed: {currentLine}/{speechLines.length}</p>
                      </div>
                    ) : speechDone ? (
                      <div className="space-y-2">
                        <p className="text-gray-400"><span className="text-[var(--neon)]">✓</span> Introduction complete</p>
                        <p className="text-gray-400"><span className="text-[var(--cyan)]">✓</span> All {speechLines.length} sections delivered</p>
                        <p className="text-gray-400"><span className="text-[var(--hot)]">✓</span> Total words: {Math.floor(totalChars / 5)}</p>
                        <p className="text-[var(--neon)] mt-2">Agent ready for next task_</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-gray-400"><span className="text-[var(--neon)]">$</span> node agent.js --resume</p>
                        <p className="text-gray-500">Waiting for activation...</p>
                        <p className="text-gray-600 text-[10px]">Click play on the left to start</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack tab */}
              {activeTab === 'tech' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaLayerGroup size={12} className="text-[var(--electric)]" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Tech Arsenal</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {techStack.map((t, i) => (
                      <div key={i} className="group/tip relative flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                        style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.05}s forwards`, opacity: 0 }}>
                        <div className="transition-transform duration-300 group-hover/tip:scale-110 group-hover/tip:-translate-y-0.5" style={{ color: t.color }}>
                          {t.icon}
                        </div>
                        <span className="text-[9px] text-gray-500 font-medium">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code tab */}
              {activeTab === 'code' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCode size={12} className="text-[var(--hot)]" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">PropNest AI - Search API</span>
                  </div>
                  <div className="rounded-lg bg-black/40 border border-white/[0.06] overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
                      </div>
                      <span className="text-[9px] text-gray-600 font-mono">searchController.js</span>
                    </div>
                    <pre className="p-4 text-[11px] leading-[1.7] overflow-x-auto scrollbar-thin">
                      <code>{codeSnippet.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-gray-700 w-6 text-right mr-4 select-none text-[10px]">{i + 1}</span>
                          <span className={line.includes('//') ? 'text-gray-600 italic' : line.includes('const') || line.includes('await') || line.includes('return') ? 'text-[var(--electric)]' : line.includes('.') ? 'text-[var(--cyan)]' : 'text-gray-400'}>
                            {line || ' '}
                          </span>
                        </div>
                      ))}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Skills tab */}
              {activeTab === 'skills' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaChartBar size={12} className="text-[var(--cyan)]" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Core Proficiency</span>
                  </div>
                  <div className="space-y-3">
                    {skills.map((s, i) => (
                      <div key={i} className="space-y-1.5" style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s forwards`, opacity: 0 }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-400 font-medium">{s.name}</span>
                          <span className="text-[10px] font-mono" style={{ color: s.color }}>{s.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                          <div className="h-full rounded-full skill-bar-fill" style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}88, ${s.color})`, animationDelay: `${i * 0.1}s` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom gradient line */}
            <div className="h-[2px] bg-gradient-to-r from-[var(--cyan)] via-[var(--electric)] to-[var(--hot)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const roles = ["MERN Stack Developer", "AI Agent Developer", "API Integration Expert", "n8n Automation"];
    const current = roles[roleIdx];
    let t;
    if (!del && text === current) {
      t = setTimeout(() => setDel(true), 2000);
    } else if (del && text === "") {
      t = setTimeout(() => { setRoleIdx(p => (p + 1) % roles.length); setDel(false); }, 0);
    } else {
      t = setTimeout(() => {
        setText(del ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
      }, del ? 40 : 80);
    }
    return () => clearTimeout(t);
  }, [text, del, roleIdx]);

  return (
    <span className="text-base md:text-lg text-gray-400">
      <span className="text-[var(--cyan)] font-mono font-bold">{text}</span>
      <span className="inline-block w-[2px] h-4 bg-[var(--cyan)] ml-0.5 align-middle animate-pulse"></span>
    </span>
  );
}

export default HeroSection;
