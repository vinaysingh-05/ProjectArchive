import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Github, ExternalLink, X, Star,
  ChevronUp, Moon, Sun, Code2, Layers, Calendar,
  ArrowUpRight, Cpu, Globe, CheckCircle, Clock,
  Filter, BookOpen, LayoutGrid,
  Mail, Phone, MapPin, Download, UserRound,
  GoalIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: "Completed" | "In Progress" | "Archived";
  githubUrl: string;
  demoUrl?: string;
  thumbnail: string;
  featured?: boolean;
  featuredType?: string;
}

// ─────────────────────────────────────────────────────────────
// PROJECT DATA — add new objects here to auto-create new cards
// ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
    {
      id: 1,
      title: "Climate Guardian AI",
      description: "Real-time climate intelligence powered by AI. Assess flood, heat, and air quality risks for any location on Earth — instantly..",
      category: "Web Development",
      technologies: [ "TypeScript", "GeminiAPI", "GoogleMap API ", "WeatherAPI","SDG 13 Climate Action"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Climate-Guardian-AI",
      demoUrl: "https://climate-guardian-ai.vercel.app/",
      thumbnail: "/Weater.png",
      featured: true,
      featuredType: "Best Project",
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal portfolio website showcasing projects and skills.",
      category: "Web Development",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/portfolio",
      demoUrl: "https://vinaysingh-05.github.io/portfolio/",
      thumbnail: "/Portfolio.png",
    },
    
   {
      id: 3,
      title: "InterviewAI",
      description: "Generate hyper-relevant interview questions tailored to your role, experience, and target company. Practice smarter with AI-generated answers and structured guidance.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Next.js", "tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/InterviewAI",
      demoUrl: "https://ai-interview-question-generator-chi.vercel.app/",
      thumbnail: "/interviewAI.png",
    },  
    {
      id: 4,
      title: "Project Archive",
      description: "A practical developer portfolio focused on simple navigation, direct project access, and a cleaner personal introduction.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Next.js", "tailwind CSS"],
      status: "In Progress",
      githubUrl: "https://github.com/vinaysingh-05/Showcase-Website",
      demoUrl: "https://projectarchive-website-kappa.vercel.app/",
      thumbnail: "/project.png",
    },    
    {
      id: 6,
      title: "Postify App",
      description: "✨ Postify — A peaceful social media app focused on positivity, emotional comfort, and expression without toxicity, comments, or follow pressure.",
      category: "App Development",
      technologies: ["React Native", "Android", "Firebase", "expo"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Postify_App",
      demoUrl: "https://vinaysingh-05.github.io/Postify-App-Website/",
      thumbnail: "/Postify.png",
    },
    {
      id: 7,
      title: "Postify Website",
      description: "✨ Postify — A peaceful social platform to share thoughts, photos, and emotions freely without toxicity, comments, or follow pressure. 💙 Just post, express yourself, and receive positive vibes through likes in a calm & safe digital space 🚀.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Next.js", "tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Postify-App-Website",
      demoUrl: "https://vinaysingh-05.github.io/Postify-App-Website/",
      thumbnail: "/postify website.png",
    },
       {
      id: 8,
      title: "Friendly",
      description: "Privacy-first AI mental wellness companion for students that detects stress early, offers supportive chat, tracks mood, and provides calming tools — all with zero data sharing.",
      category: "Web Development",
      technologies: ["Next.js", "TypeScript", "python", "NLTK", "spaCy"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Friendly-mental-health",
      demoUrl: "https://friendly-app-seven.vercel.app/",
      thumbnail: "/friendly.png",
      featured: true,
      featuredType: "Best Project",
    },
    {
      id: 9,
      title: "AirBnB Price Prediction",
      description: "Predicts Airbnb prices instantly from location, room type, and amenities using Python, scikit-learn, and Streamlit.",
      category: "Machine Learning",
      technologies: ["Python", "scikit-learn", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ai_powered_airbnb_price_prediction",
      demoUrl: "https://air-bnb-price-prediction099223.streamlit.app/#contact",
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&auto=format",
    },
    {
      id: 10,
      title: "Hitlist",
      description: "A full-stack habit tracker built with modern web tech, featuring monthly resets, animated analytics, secure authentication, and row-level security",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Flask"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/dolist",
      demoUrl: "https://dolist.lovable.app/",
      thumbnail: "/Hitlist.png",
    },
    {
      id: 11,
      title: "Roboto",
      description: "ROBOTO is a futuristic robotics showcase website.",
      category: "Web Development",
      technologies: ["HTML", "CSS", " Spline 3D"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/roboto",
      demoUrl: "https://vinaysingh-05.github.io/roboto/",
      thumbnail: "/Roboto.png",
    },
    {
      id: 12,
      title: "Diabetes-Risk-Predictor-Neural-Lite",
      description: "Hybrid collaborative filtering engine delivering personalized film suggestions with 87% satisfaction A high-performance Diabetes Risk Predictor using a Quantized Neural Network (TFLite) .",
      category: "ML Experiments",
      technologies: ["Python", "Streamlit", "TFLite", "TensorFlow"],
      status: "Archived",
      githubUrl: "https://github.com/vinaysingh-05/Diabetes-Risk-Predictor-Neural-Lite",
      thumbnail: "/dibetes.png",
      featured: true,
    },
    {
      id: 13,
      title: "Car Price Prediction",
      description: "Smart Car Price Prediction App built with Machine Learning — delivering fast, accurate, and real-time price estimates with an interactive UI.",
      category: "Machine Learning",
      technologies: ["Python", "scikit-learn", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/car_price_prediction",
      demoUrl: "https://carpriceprediction-k59ot8irhdohvjoe5vcqdk.streamlit.app/",
      thumbnail: "/Car.png",
    },
    {
      id: 14,
      title: "NoteBook",
      description: "A full-stack notes app featuring real-time syncing ⚡, secure authentication 🔒, and a responsive U",
      category: "Web Development",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/notebook",
      demoUrl: "https://notebook-khaki-sigma.vercel.app/",
      thumbnail: "/notwbook.png",
      featured: true,
    },
{
      id: 15,
      title: "AI-Resume-Screening-Automation",
      description: "AI-powered resume screening automation built with Relay.app, OpenAI, Google Forms, Google Sheets, Google Drive, and Gmail. Automatically analyzes resumes, generates ATS scores, identifies skill gaps, and emails personalized feedback.",
      category: "Automation",
      technologies: ["OpenAI","Relay.app", "Google Forms", "Google Sheets", "Google Drive", "Gmail" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/AI-Resume-Screening-Automation",
      demoUrl: "https://forms.gle/1u6kzRDWs2HBy2EM9",
      thumbnail: "/automation.png",
      featured: true,
    },

    {
      id: 16,
      title: "SmileDental",
      description: "AI-powered dental appointment booking website integrated with n8n automation, OpenAI, Google Sheets, and email notifications for seamless lead management",
      category: "Web Development",
      technologies: ["OpenAI","n8n", "Google Sheets", "Gmail" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Dental-Clinic-Appointment-Generation",
      demoUrl: "https://dental-clinic-appointment-generatio.vercel.app/#home",
      thumbnail: "/dental.png",
      featured: true,
    },
      {
      id: 17,
      title: "Logistic Regression Visualizer",
      description: "Live hyperparameter tuning (solvers, regularization, C values) with instant visual updates via Streamlit.",
      category: "Machine Learning",
      technologies: ["Logistic Regression","Streamlit", "Python" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/logistic-regression-visualizer",
      demoUrl: "https://logistic-regression-visualizer-nwynnwur9rgu2detcgjq3p.streamlit.app/",
      thumbnail: "/logistic regression.png",
      featured: true,
    },

    {
      id: 18,
      title: "Digit Recognizer",
      description: "This project builds a digit recognition system 🔢 using machine learning 🤖 and compares performance with and without PCA 📊 to balance accuracy 🎯 and efficiency",
      category: "ML Experiments",
      technologies: ["Python", "scikit-learn", "PCA"],
      status: "Archived",
      githubUrl: "https://github.com/vinaysingh-05/Digit-Recognizer-withPCA-withoutPCA",
      thumbnail: "/digits.png",
    },
    {
      id: 19,
      title: "AI Workplace Productivity Analysis",
      description: "AI-powered workplace behavior & productivity analysis using Machine Learning to predict employee stress, performance trends, and productivity insights.",
      category: "Machine Learning",
      technologies: ["Python", "scikit-learn", "Streamlit", "kaggle"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ai-workplace-productivity-analysis",
      demoUrl: "https://ai-workplace-appuctivity-analysis-93hbuvhxz5xdah2zhznzvi.streamlit.app/",
      thumbnail: "/wellness.png",
    },
    {
      id: 20,
      title: " AI Dental Appointment Automation",
      description: "A modern AI-powered dental appointment platform that automates patient enquiries, validates leads, manages appointments, sends confirmation emails, and provides an AI chatbot using React, TypeScript, n8n, OpenAI, Google Sheets, and Gmail..",
      category: "Automation",
      technologies: ["n8n", "OpenAI", "Google Sheets", "Gmail"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Dental-Appointment-Automation",
      demoUrl: "https://github.com/vinaysingh-05/Dental-Appointment-Automation",
      thumbnail: "/Dental-automation-UI.png",
    },{
      id: 21,
      title: "AI Dental Chatbot Automation",
      description: "Intelligent Lead Generation & AI Workflow Automation",
      category: "Automation",
      technologies: ["n8n", "GeminiAPI"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Chatbot-Automation-Dental-website",
      demoUrl: "https://github.com/vinaysingh-05/Chatbot-Automation-Dental-website",
      thumbnail: "/chatbot.png",
    },
      {
      id: 22,
      title: "ML Research Website",
      description: "Modern Machine Learning research paper built with HTML, CSS, JavaScript, Chart.js, and SVG illustrations. Deployable on GitHub Pages.",
      category: "ML Experiments",
      technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "SVG"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ML-research-website",
      demoUrl: "https://vinaysingh-05.github.io/ML-research-website/",
      thumbnail: "/ml-home.png",
    },
    {
      id: 23,
      title: "ML Learning Topics",
      description: "A comprehensive guide to various machine learning topics, including supervised and unsupervised learning techniques.",
      category: "ML Experiments",
      technologies: ["Python", "scikit-learn", "Streamlit", "kaggle"],
      status: "In Progress",
      githubUrl: "https://github.com/vinaysingh-05/ML-Topics",
      thumbnail: "/ml.png",
    }

// there we adds more projects in the same format as above, and they will automatically be displayed in the portfolio.


  ];

const PROJECT_COUNT = PROJECTS.length;

const CATEGORY_FILTERS = Array.from(new Set(PROJECTS.map((project) => project.category)));

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const FILTERS = ["All Projects", ...CATEGORY_FILTERS];

const CAT_COLORS: Record<string, string> = {
  "AI/ML": "bg-violet-500/15 border-violet-500/30 text-violet-300",
  "Machine Learning": "bg-blue-500/15 border-blue-500/30 text-blue-300",
  "Data Science": "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
  "Web Development": "bg-orange-500/15 border-orange-500/30 text-orange-300",
  "Automation": "bg-green-500/15 border-green-500/30 text-green-300"
};

const TECH_COLORS: Record<string, string> = {
  "Python": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "React": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "TypeScript": "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "Streamlit": "bg-red-500/10 text-red-300 border-red-500/20",
  "Next.js": "bg-white/8 text-white/70 border-white/15",
  "Node.js": "bg-green-500/10 text-green-300 border-green-500/20",
  "Tailwind CSS": "bg-teal-500/10 text-teal-300 border-teal-500/20",
  "Flask": "bg-gray-500/10 text-gray-300 border-gray-500/20",
  "Automation": "bg-green-500/10 text-green-300 border-green-500/20"
};

const PERSONAL_DETAILS = {
  name: "AI & Machine Learning Enthusiast ",
  summary: " I build intelligent and practical solutions using AI, machine learning, and modern technologies to solve real-world problems.",
  location: "India",
  email: "vk8964210@gmail.com",
  availability: "Open for internships, freelance , and product builds.",
  links: [
    { label: "GitHub", href: "https://github.com/vinaysingh-05", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vinay-kumar0805/", icon: ExternalLink },
    { label: "Email", href: "mailto:vk8964210@gmail.com", icon: Mail },
  ],
};


function resolveProjectUrl(project: Project) {
  if (project.demoUrl && project.demoUrl !== "#") return project.demoUrl;
  if (project.githubUrl && project.githubUrl !== "#") return project.githubUrl;
  return `https://www.google.com/search?q=${encodeURIComponent(project.title)}`;
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "/Resume.pdf";
  link.download = "Vinay-Kumar-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// ─────────────────────────────────────────────────────────────
// HOOK — animated counter
// ─────────────────────────────────────────────────────────────

function useCounter(end: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTs: number;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, active]);
  return count;
}

// ─────────────────────────────────────────────────────────────
// ANIMATED BACKGROUND
// ─────────────────────────────────────────────────────────────

function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(70px,-90px) scale(1.12)} 70%{transform:translate(-50px,60px) scale(0.9)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-90px,50px) scale(0.88)} 70%{transform:translate(70px,-70px) scale(1.08)} }
        @keyframes orb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,90px) scale(1.06)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        .bg-orb-1 { animation: orb1 20s ease-in-out infinite; }
        .bg-orb-2 { animation: orb2 25s ease-in-out infinite; }
        .bg-orb-3 { animation: orb3 18s ease-in-out infinite; }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#080810]" />
        <div className="bg-orb-1 absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-violet-600/[0.13] blur-[130px]" />
        <div className="bg-orb-2 absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.10] blur-[110px]" />
        <div className="bg-orb-3 absolute -bottom-48 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-600/[0.08] blur-[130px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Noise vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080810]/60" />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080810]/75 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-mono font-semibold text-sm tracking-tight text-white/85"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Project<span className="text-violet-400">Archive</span>
          </span>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { label: "All Projects", target: "projects" },
          ].map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/90 hover:bg-white/[0.05] transition-all font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://vinaysingh-05.github.io/portfolio/?"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/[0.08] transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, suffix = "", delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 1800, active);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <div className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-violet-500/25 hover:bg-white/[0.06] transition-all duration-300 text-center">
        <div className="inline-flex p-2.5 rounded-xl bg-violet-500/10 mb-3 group-hover:bg-violet-500/15 transition-colors">
          <Icon className="w-4 h-4 text-violet-400" />
        </div>
        <div
          className="font-mono text-3xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {count}{suffix}
        </div>
        <div className="text-xs text-white/35 mt-1 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

function FloatingParticle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-violet-400/20 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 10 + Math.random() * 80,
  delay: i * 0.4,
  size: 2 + Math.random() * 4,
}));

function HeroSection() {
  return (
    <section id="intro" className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Glow behind heading */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/[0.12] blur-[90px] rounded-full pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.4fr_0.9fr] gap-8 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] text-violet-300/80 text-xs mb-8"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to work 
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono font-bold leading-[0.9] tracking-tighter mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(3rem, 12vw, 7.5rem)" }}
          >
            <span className="block text-white">VINAY</span>
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KUMAR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            A practical developer portfolio focused on simple navigation, direct project access,
            and a cleaner personal introduction.
          </motion.p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/18 hover:bg-violet-500/28 border border-violet-500/25 text-violet-200 hover:text-white text-sm font-medium transition-all"
            >
              View Projects
            </a>
            <a
              href="/Resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                downloadResume();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/70 hover:text-white text-sm font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
            <StatCard icon={Layers} label="Projects" value={PROJECT_COUNT} delay={0.1} />
            <StatCard icon={Cpu} label="Technologies" value={20} suffix="+" delay={0.2} />
            <StatCard icon={Filter} label="Categories" value={CATEGORY_FILTERS.length} delay={0.3} />
            <StatCard icon={GoalIcon} label="Hackathons" value={20} suffix="+" delay={0.4} />
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 text-xs font-medium">
                <UserRound className="w-3.5 h-3.5" />
                Personal Details
              </div>
              <a href="#connect" className="text-xs text-violet-300 hover:text-violet-200 transition-colors">
                Open contacts
              </a>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-2">{PERSONAL_DETAILS.name}</h2>
            <p className="text-sm text-white/42 leading-relaxed mb-6">{PERSONAL_DETAILS.summary}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/28 mb-1">Location</div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-violet-300" />
                  {PERSONAL_DETAILS.location}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4 mb-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/28 mb-2">Email</div>
              <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-sm text-violet-300 hover:text-violet-200 transition-colors">
                {PERSONAL_DETAILS.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {PERSONAL_DETAILS.links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.08] transition-all text-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs text-white/30 leading-relaxed">
              {PERSONAL_DETAILS.availability}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH + FILTER
// ─────────────────────────────────────────────────────────────

function SearchAndFilter({
  query, setQuery, activeFilter, setActiveFilter,
}: {
  query: string;
  setQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}) {
  return (
    <section className="px-4 mb-14">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies, categories..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] text-sm text-white/80 placeholder-white/25 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.07] transition-all backdrop-blur-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white/60 transition-all"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap justify-center">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileTap={{ scale: 0.94 }}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                activeFilter === filter
                  ? "border-violet-500/40 text-violet-300"
                  : "bg-white/[0.03] border-white/[0.07] text-white/45 hover:text-white/75 hover:border-white/[0.13] hover:bg-white/[0.06]"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="filterHighlight"
                  className="absolute inset-0 rounded-full bg-violet-500/10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative">{filter}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    Completed: { icon: CheckCircle, cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    "In Progress": { icon: Clock, cls: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    Archived: { icon: BookOpen, cls: "text-white/35 bg-white/[0.04] border-white/10" },
  }[status];
  const Icon = map.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${map.cls} flex-shrink-0`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <Icon className="w-2.5 h-2.5" />
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, onClick, index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  const catCls = CAT_COLORS[project.category] ?? "bg-white/10 border-white/20 text-white/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
      layout
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden hover:border-violet-500/25 hover:bg-white/[0.055] hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/[0.07] transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[#0d0d1c]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/90 via-[#080810]/20 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Category pill */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${catCls}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.category}
            </span>
          </div>

          {/* ID */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/40 backdrop-blur-sm border border-white/10 text-white/40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              #{project.id}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start gap-2 justify-between mb-2">
            <h3
              className="font-mono font-semibold text-sm text-white/85 group-hover:text-white transition-colors leading-tight"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>

          <p className="text-xs text-white/38 leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono border ${TECH_COLORS[tech] ?? "bg-white/[0.05] text-white/45 border-white/[0.08]"}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-white/30 border border-white/[0.06]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <a
            href={resolveProjectUrl(project) ?? project.githubUrl}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/12 hover:bg-violet-500/20 border border-violet-500/22 hover:border-violet-500/36 text-violet-300 hover:text-violet-200 text-[11px] font-mono transition-all"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <ArrowUpRight className="w-3 h-3" />
            Open Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURED CARD
// ─────────────────────────────────────────────────────────────

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm overflow-hidden hover:border-violet-500/28 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-500/[0.09] transition-all duration-500">
        {/* Featured badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/12 border border-amber-500/28 text-amber-300 text-[10px] font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Star className="w-3 h-3 fill-current" />
            {project.featuredType}
          </span>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden bg-[#0d0d1c]" style={{ aspectRatio: "16/7" }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${CAT_COLORS[project.category] ?? ""}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3
            className="font-mono font-bold text-lg text-white mb-1.5 group-hover:text-violet-200 transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md text-xs font-mono border ${TECH_COLORS[tech] ?? "bg-white/[0.05] text-white/45 border-white/[0.08]"}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={resolveProjectUrl(project) ?? project.githubUrl}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/12 hover:bg-violet-500/22 border border-violet-500/25 text-violet-300 text-xs font-mono transition-all"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Open Project
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-28 text-center"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.07] mb-6">
        <Search className="w-8 h-8 text-white/18" />
      </div>
      <h3
        className="font-mono font-semibold text-white/50 text-lg mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        No projects found
      </h3>
      <p className="text-white/28 text-sm mb-8">Try adjusting your search or filter criteria.</p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl bg-violet-500/12 border border-violet-500/28 text-violet-300 text-sm font-mono hover:bg-violet-500/22 transition-all"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Reset Filters
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/[0.04]" />
      <div className="p-4 space-y-3">
        <div className="h-3.5 w-3/4 bg-white/[0.05] rounded-lg" />
        <div className="h-2.5 w-full bg-white/[0.03] rounded-lg" />
        <div className="h-2.5 w-2/3 bg-white/[0.03] rounded-lg" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-4 w-12 bg-white/[0.04] rounded" />
          <div className="h-4 w-14 bg-white/[0.04] rounded" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-7 w-16 bg-white/[0.04] rounded-lg" />
          <div className="h-7 w-16 bg-white/[0.04] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// FOOTER
// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="connect" className="border-t border-white/[0.05] px-4 py-14 text-center">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-mono font-semibold text-white/60 text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ProjectArchive
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-7">
          {[
            { label: "Email Me", icon: Mail, href: "mailto:vk8964210@gmail.com" },
            { label: "GitHub Profile", icon: Github, href: "https://github.com/vinaysingh-05" },
            { label: "LinkedIn", icon: ExternalLink, href: "https://www.linkedin.com/in/vinay-kumar0805/" },
          ].map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.06] text-white/45 hover:text-white/80 text-xs font-mono transition-all"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </a>
          ))}
        </div>

        <p
          className="text-xs text-white/22 font-mono"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Built with Me.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 450);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl bg-violet-500/18 hover:bg-violet-500/28 border border-violet-500/28 hover:border-violet-500/45 flex items-center justify-center text-violet-400 hover:text-violet-300 transition-all shadow-lg shadow-violet-500/10 backdrop-blur-sm"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION HEADING helper
// ─────────────────────────────────────────────────────────────

function SectionHeading({
  icon: Icon, label, count,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <Icon className="w-4 h-4 text-white/35" />
      <h2
        className="font-mono font-bold text-xl text-white"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </h2>
      <div className="h-px flex-1 bg-white/[0.05]" />
      {count !== undefined && (
        <span
          className="text-xs text-white/28 font-mono"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {count} project{count !== 1 ? "s" : ""}
        </span>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [isLoading, setIsLoading] = useState(true);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const isFiltered = query.trim() !== "" || activeFilter !== "All Projects";

  const filteredProjects = useMemo(() => {
    const q = query.toLowerCase();
    return PROJECTS.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);

      const matchF =
        activeFilter === "All Projects" ||
        p.category === activeFilter ||
        p.technologies.includes(activeFilter);

      return matchQ && matchF;
    });
  }, [query, activeFilter]);

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  const handleReset = useCallback(() => {
    setQuery("");
    setActiveFilter("All Projects");
  }, []);

  return (
    <div
      className="min-h-screen bg-[#080810] text-white selection:bg-violet-500/30 selection:text-violet-200"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <HeroSection />
        <SearchAndFilter
          query={query}
          setQuery={setQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="max-w-7xl mx-auto px-4">

          {/* All / filtered projects */}
          <section id="projects" className="mb-20">
            <SectionHeading
              icon={LayoutGrid}
              label={isFiltered ? `Results` : "All Projects"}
              count={filteredProjects.length}
            />

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {filteredProjects.map((p, i) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      index={i}
                      onClick={() => {
                        const url = resolveProjectUrl(p);
                        if (url) window.location.href = url;
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </section>
        </div>

        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
