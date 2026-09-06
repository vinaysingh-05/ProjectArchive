import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import TechStackPage from "./pages/TechStackPage.tsx";
import {
  Search, Github, ExternalLink, X, Star,
  ChevronUp, ChevronDown, Moon, Sun, Code2, Layers, Calendar,
  ArrowUpRight, Cpu, Globe, CheckCircle, Clock,
  Filter, BookOpen, LayoutGrid,
  Mail, Phone, MapPin, Download, UserRound,
  GoalIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "events-target"?: string;
          "loading-hint"?: string;
        },
        HTMLElement
      >;
    }
  }
}

// ─────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  subsubcategory?: string;
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
      title: "Human Atlas 🫀",
      description: "Explore the human body and its systems in an interactive and engaging way.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Next.js", "tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/human-atlas",
      demoUrl: "https://human-atlas-six.vercel.app/",
      thumbnail: "/human.png",
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
      id: 5,
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
      id: 6,
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
      id: 7,
      title: "AI Startup Studio",
      description: " AI Startup Studio generates your complete business blueprint — market research, pitch deck, MVP roadmap, tech stack — in under 60 seconds..",
      category: "Web Development",
      technologies: [ "GeminiAPI","React", "TypeScript", "Next.js", "tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/AI-Startup-Studio",
      demoUrl: "https://ai-startup-studio-five.vercel.app/",
      thumbnail: "/AI Startup Studio.png",
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
      subcategory: "Regression",
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
      category: "Experiment",
      subcategory: "DL Experiment",
      subsubcategory: "ANN",
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
      subcategory: "Regression",
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
      subcategory: "Classification",
      technologies: ["Logistic Regression","Streamlit", "Python" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/logistic-regression-visualizer",
      demoUrl: "https://logistic-regression-visualizer-nwynnwur9rgu2detcgjq3p.streamlit.app/",
      thumbnail: "/logistic regression.png",
      featured: true,
    },
      {
      id: 18,
      title: "My MVP Agent",
      description: "AI-powered chatbot with a modern ChatGPT/Gemini-inspired Streamlit UI..",
      category: "Agentic AI",
      subcategory: "AI Agents",
      technologies: ["GrokAPI","Streamlit", "Python" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/My-MVP-Agent",
      demoUrl: "https://my-mvp-agent-ev6kku4xmurqir7dpdde6a.streamlit.app/",
      thumbnail: "/mvp-agent.png",
      featured: true,
    },
      {
      id: 19,
      title: "House price prediction App",
      description: "End-to-end House Price Prediction using multiple ML regression models, CatBoost, hyperparameter tuning, ensemble learning, and an interactive Streamlit app.",
      category: "Machine Learning",
      subcategory: "Regression",
      technologies: ["catboost","Streamlit", "Python" ],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/House-price-prediction-App/tree/main",
      demoUrl: "https://house-price-prediction-app-hix54k2x6btekcoq7mdvep.streamlit.app/",
      thumbnail: "/house-price.png",
      featured: true,
    },

    {
      id: 20,
      title: "Digit Recognizer",
      description: "This project builds a digit recognition system 🔢 using machine learning 🤖 and compares performance with and without PCA 📊 to balance accuracy 🎯 and efficiency",
      category: "Experiment",
      subcategory: "DL Experiment",
      subsubcategory: "ANN",
      technologies: ["Python", "scikit-learn", "PCA"],
      status: "Archived",
      githubUrl: "https://github.com/vinaysingh-05/Digit-Recognizer-withPCA-withoutPCA",
      thumbnail: "/digits.png",
    },
    {
      id: 21,
      title: "AI Workplace Productivity Analysis",
      description: "AI-powered workplace behavior & productivity analysis using Machine Learning to predict employee stress, performance trends, and productivity insights.",
      category: "Machine Learning",
      subcategory: "Classification",
      technologies: ["Python", "scikit-learn", "Streamlit", "kaggle"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ai-workplace-productivity-analysis",
      demoUrl: "https://ai-workplace-appuctivity-analysis-93hbuvhxz5xdah2zhznzvi.streamlit.app/",
      thumbnail: "/wellness.png",
    },
    {
      id: 22,
      title: " AI Dental Appointment Automation",
      description: "A modern AI-powered dental appointment platform that automates patient enquiries, validates leads, manages appointments, sends confirmation emails, and provides an AI chatbot using React, TypeScript, n8n, OpenAI, Google Sheets, and Gmail..",
      category: "Automation",
      technologies: ["n8n", "OpenAI", "Google Sheets", "Gmail"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Dental-Appointment-Automation",
      demoUrl: "https://github.com/vinaysingh-05/Dental-Appointment-Automation",
      thumbnail: "/Dental-automation-UI.png",
    },
    {
      id: 23,
      title: "fantasy-character-generator",
      description: "A fantasy character generator that creates unique characters with distinct traits and backstories.",
      category: "Web Development",
      technologies: ["Google AI Studio", "GeminiAPI", "Next.js", "Tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/fantasy-character-generator",
      demoUrl: "https://fantasy-character-generator-omega.vercel.app/",
      thumbnail: "/sticker.png",
    },
    {
      id: 24,
      title: "AI Dental Chatbot Automation",
      description: "Intelligent Lead Generation & AI Workflow Automation",
      category: "Agentic AI",
      subcategory: "Agent Workflows",
      technologies: ["n8n", "GeminiAPI"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Chatbot-Automation-Dental-website",
      demoUrl: "https://github.com/vinaysingh-05/Chatbot-Automation-Dental-website",
      thumbnail: "/chatbot.png",
    },
      {
      id: 25,
      title: "ML Research Website",
      description: "Modern Machine Learning research paper built with HTML, CSS, JavaScript, Chart.js, and SVG illustrations. Deployable on GitHub Pages.",
      category: "Experiment",
      subcategory: "ML Experiment",
      subsubcategory: "Other",
      technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "SVG"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ML-research-website",
      demoUrl: "https://vinaysingh-05.github.io/ML-research-website/",
      thumbnail: "/ml-home.png",
    },

    {
      id: 26,
      title: "Smart Laptop Price Predictor",
      description: "AI-powered laptop price predictor built with a Weighted Voting Regressor ensemble and Streamlit.",
      category: "Machine Learning",
      subcategory: "Regression",
      technologies: ["Python", "Scikit-learn", "Streamlit", "CatBoost"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Laptop-Price-Predictor/tree/main",
      demoUrl: "https://laptop-price-predictor-dst6tjac22suzmvtyk94ka.streamlit.app/",
      thumbnail: "/laptop.png",
    },

    {
      id: 27,
      title: "Household Electricity Load Forecaster",
      description: "An end-to-end machine learning regression system to predict household energy consumption.",
      category: "Experiment",
      subcategory: "ML Experiment",
      subsubcategory: "Regression",
      technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Household-Electricity-Load-Forecaster",
      demoUrl: "https://github.com/vinaysingh-05/Household-Electricity-Load-Forecaster",
      thumbnail: "/household.png",
    }, 
     {
      id: 28,
      title: "FINTECH-AI",
      description: "An interactive web application built with Streamlit and an Artificial Neural Network (ANN) to predict credit card customer churn.",
      category: "Deep Learning",
      subcategory: "ANN",
      technologies: ["Python", "Keras", "TensorFlow", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/FINTECH-AI.git",
      demoUrl: "https://fintech-ai-4fwttw7tdvcdr2xecyj85h.streamlit.app/",
      thumbnail: "/Fintech-ai.png",
    }, 
     {
      id: 29,
      title: "DevStack Hub",
      description: "A modern, local-first code snippet manager for developers. Built with Tailwind CSS and Vanilla JavaScript, DevStack Hub allows you to store, filter, and copy code snippets instantly. No databases, no cloud logins—just pure, fast, and local productivity.",
      category: "Web Development",
      technologies: ["HTML", "Tailwind CSS", "Vanilla JavaScript"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/DevStack-Hub",
      demoUrl: "https://vinaysingh-05.github.io/DevStack-Hub/",
      thumbnail: "/devstack.png",
    }, 
      {
      id: 30,
      title: "gre-admission-prediction",
      description: "A machine learning model to predict graduate school admissions based on various factors.",
      category: "Experiment",
      subcategory: "DL Experiment",
      subsubcategory: "ANN",
      technologies: ["Python", "TensorFlow", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Deep-Learning/tree/main/Train%20DL%20Models/Regression%20DL%20model/gre-admission-prediction",
      demoUrl: "https://github.com/vinaysingh-05/Deep-Learning/tree/main/Train%20DL%20Models/Regression%20DL%20model/gre-admission-prediction",
      thumbnail: "/Grd.png",
    }, 
        {
      id: 31,
      title: "mnist classification DL model",
      description: "A deep learning model for classifying MNIST digits.",
      category: "Experiment",
      subcategory: "DL Experiment",
      subsubcategory: "ANN",
      technologies: ["Python", "TensorFlow", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/Deep-Learning/tree/main/Train%20DL%20Models/Mutli%20Classification%20DL%20model/mnist-classification-ann",
      demoUrl: "https://github.com/vinaysingh-05/Deep-Learning/tree/main/Train%20DL%20Models/Mutli%20Classification%20DL%20model/mnist-classification-ann",
      thumbnail: "/neuron.png",
    },
      {
      id: 32,
      title: "AI Startup Valuation Predictor",
      description: "A machine learning model to predict the valuation of AI startups based on various financial and operational factors.",
      category: "Machine Learning",
      subcategory: "Regression",
      technologies: ["Python", "scikit-learn", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/AI-Startup-Valuation-Prediction?tab=readme-ov-file",
      demoUrl: "https://ai-startup-valuation-prediction-nappzj9hdfumdfzn73ou8w.streamlit.app/",
      thumbnail: "/stratup-ml.png",
    },
     {
      id: 33,
      title: "EV Battery Remaining Useful Life (RUL) Prediction",
      description: "A machine learning model to predict the remaining useful life of electric vehicle batteries.",
      category: "Experiment",
      subcategory: "ML Experiment",
      subsubcategory: "Regression",
      technologies: ["Python", "scikit-learn", "CatBoost", "Streamlit"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/EV-Battery-Remaining-Useful-life-RUL-Prediction",
      demoUrl: "https://github.com/vinaysingh-05/EV-Battery-Remaining-Useful-life-RUL-Prediction",
      thumbnail: "/ev.png",
    },
     {
      id: 34,
      title: "flyrank internship website",
      description: "FlyRank.ai ML Internship — Applied Search Intelligence & Google Search Ranking/Discoverability.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "next.js", "tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/flyrank-internship-website",
      demoUrl: "https://flyrank-internship-website.vercel.app/",
      thumbnail: "/flyrank-ml.png",
    },
      {
      id: 35,
      title: "AI Fluency FlyRankAI internship",
      description: "Interactive Dark Cyber showcase for Flyrank ML Engineering Internship — featuring AI Fluency modules, dynamic GitHub API docs, and MCP workflows.",
      category: "Web Development",
      technologies: ["HTML", "CSS", "JavaScript"],
      status: "Completed",
      githubUrl: "https://vinaysingh-05.github.io/AI-Fluency-FlyRankAI-internship/",
      demoUrl: "https://vinaysingh-05.github.io/AI-Fluency-FlyRankAI-internship/",
      thumbnail: "/flyrank.png",
    },
        {
      id: 36,
      title: "OfferCraft AI",
      description: "OfferCraft AI is an intelligent salary negotiation and compensation benchmarking web application designed to help job seekers, engineers, data professionals, and corporate leaders negotiate their worth with confidence.",
      category: "Machine Learning",
      subcategory: "Regression",
      technologies: ["Random Forest", "Streamlit", "JavaScript"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/AI-Interview-Salary-Negotiation-Prediction",
      demoUrl: "https://ai-interview-salary-negotiation-prediction-bkl6fg2mjezzh2qvcfy.streamlit.app/",
      thumbnail: "/ai salary.png",
    },
    {
      id: 37,
      title: "ML Learning Topics",
      description: "A comprehensive guide to various machine learning topics, including supervised and unsupervised learning techniques.",
      category: "Experiment",
      subcategory: "ML Experiment",
      subsubcategory: "Other",
      technologies: ["Python", "scikit-learn", "Streamlit", "kaggle"],
      status: "Completed",
      githubUrl: "https://github.com/vinaysingh-05/ML-Topics",
      thumbnail: "/ml.png",
    }

// there we adds more projects in the same format as above, and they will automatically be displayed in the portfolio.


  ];

const PROJECT_COUNT = PROJECTS.length;

const SUBCATEGORIES_MAP: Record<string, string[]> = {
  "Machine Learning": ["Regression", "Classification", "Clustering", "ML Experiment", "Other"],
  "Deep Learning": ["ANN", "CNN", "RNN", "LSTM", "GRU", "Autoencoder", "DL Experiment"],
  "CV": ["Image Classification", "Object Detection", "Face Recognition", "Segmentation"],
  "NLP": ["Text Classification", "Sentiment Analysis", "NER", "Text Generation"],
  "Generative AI": ["LLM", "RAG", "Multimodal", "Fine-tuning", "AI Applications"],
  "Agentic AI": ["Tool Calling", "AI Agents", "Multi-Agent", "LangGraph", "Agent Workflows"],
  "Transformers": ["Hugging Face"],
  "Experiment": ["ML Experiment", "DL Experiment", "NLP Experiment", "CV Experiment", "GenAI Experiment", "Agentic AI Experiment", "Other"],
};

const SUBSUBCATEGORIES_MAP: Record<string, string[]> = {
  "ML Experiment": ["Regression", "Classification", "Clustering", "Other"],
  "DL Experiment": ["ANN", "CNN", "RNN", "LSTM", "GRU", "Autoencoder"],
};

const ALL_CATEGORIES = [
  "Web Development",
  "App Development",
  "Automation",
  "Machine Learning",
  "Deep Learning",
  "CV",
  "NLP",
  "Generative AI",
  "Agentic AI",
  "Transformers",
  "Experiment"
];

const CATEGORY_FILTERS = Array.from(new Set([
  ...ALL_CATEGORIES,
  ...PROJECTS.map((project) => project.category)
]));

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const FILTERS = ["All Projects", ...CATEGORY_FILTERS];

const CAT_COLORS: Record<string, string> = {
  "Web Development": "bg-orange-500/15 border-orange-500/30 text-orange-300",
  "App Development": "bg-pink-500/15 border-pink-500/30 text-pink-300",
  "Automation": "bg-green-500/15 border-green-500/30 text-green-300",
  "Machine Learning": "bg-blue-500/15 border-blue-500/30 text-blue-300",
  "Deep Learning": "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  "CV": "bg-sky-500/15 border-sky-500/30 text-sky-300",
  "NLP": "bg-teal-500/15 border-teal-500/30 text-teal-300",
  "Generative AI": "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300",
  "Agentic AI": "bg-rose-500/15 border-rose-500/30 text-rose-300",
  "Transformers": "bg-amber-500/15 border-amber-500/30 text-amber-300",
  "Experiment": "bg-slate-500/15 border-slate-500/30 text-slate-300",
};

const SUBCATEGORY_COLORS: Record<string, string> = {
  // ML Subcategories
  Regression: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
  Classification: "bg-violet-500/15 border-violet-500/30 text-violet-300",
  Clustering: "bg-amber-500/15 border-amber-500/30 text-amber-300",
  Other: "bg-white/10 border-white/15 text-white/65",

  // Deep Learning Subcategories
  ANN: "bg-blue-500/15 border-blue-500/30 text-blue-300",
  CNN: "bg-violet-500/15 border-violet-500/30 text-violet-300",
  RNN: "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300",
  LSTM: "bg-pink-500/15 border-pink-500/30 text-pink-300",
  GRU: "bg-rose-500/15 border-rose-500/30 text-rose-300",
  Autoencoder: "bg-purple-500/15 border-purple-500/30 text-purple-300",

  // CV Subcategories
  "Image Classification": "bg-teal-500/15 border-teal-500/30 text-teal-300",
  "Object Detection": "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
  "Face Recognition": "bg-green-500/15 border-green-500/30 text-green-300",
  Segmentation: "bg-lime-500/15 border-lime-500/30 text-lime-300",

  // NLP Subcategories
  "Text Classification": "bg-orange-500/15 border-orange-500/30 text-orange-300",
  "Sentiment Analysis": "bg-amber-500/15 border-amber-500/30 text-amber-300",
  NER: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
  "Text Generation": "bg-red-500/15 border-red-500/30 text-red-300",

  // GenAI Subcategories
  LLM: "bg-sky-500/15 border-sky-500/30 text-sky-300",
  RAG: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
  Multimodal: "bg-teal-500/15 border-teal-500/30 text-teal-300",
  "Fine-tuning": "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  "AI Applications": "bg-violet-500/15 border-violet-500/30 text-violet-300",

  // Agentic AI Subcategories
  "Tool Calling": "bg-pink-500/15 border-pink-500/30 text-pink-300",
  "AI Agents": "bg-rose-500/15 border-rose-500/30 text-rose-300",
  "Multi-Agent": "bg-red-500/15 border-red-500/30 text-red-300",
  LangGraph: "bg-orange-500/15 border-orange-500/30 text-orange-300",
  "Agent Workflows": "bg-amber-500/15 border-amber-500/30 text-amber-300",

  // Transformers Subcategories
  "Hugging Face": "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",

  // Experiment Subcategories
  "ML Experiment": "bg-blue-500/15 border-blue-500/30 text-blue-300",
  "DL Experiment": "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  "NLP Experiment": "bg-teal-500/15 border-teal-500/30 text-teal-300",
  "CV Experiment": "bg-sky-500/15 border-sky-500/30 text-sky-300",
  "GenAI Experiment": "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300",
  "Agentic AI Experiment": "bg-rose-500/15 border-rose-500/30 text-rose-300",
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

const CODE_SNIPPETS = [
  "import React, { useState } from 'react';",
  "const [isDark, setIsDark] = useState(true);",
  "function CodeRainBackground() {",
  "useEffect(() => {",
  "const ctx = canvas.getContext('2d');",
  "requestAnimationFrame(animate);",
  "const width = window.innerWidth;",
  "const height = window.innerHeight;",
  "console.log('Matrix Active');",
  "git commit -m 'new DL experiment';",
  "npm run dev",
  "await fetch('/api/projects');",
  "const filtered = projects.filter(p => p.featured);",
  "model.compile({ optimizer: 'adam' });",
  "new Agent({ role: 'coder', memory: true });",
  "import { motion } from 'framer-motion';",
  "const layers = [128, 64, 32];",
  "const cnn = new CNN(); cnn.add(conv2d);",
  "db.query('SELECT * FROM users');",
  "return <div className='grid' />;",
];

function CodeRainBackground({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const COLORS_DARK = [
      "rgba(167, 139, 250, ", // violet-400
      "rgba(96, 165, 250, ",  // blue-400
      "rgba(45, 212, 191, ",  // teal-400
      "rgba(34, 211, 238, ",  // cyan-400
    ];
    const COLORS_LIGHT = [
      "rgba(109, 40, 217, ",  // violet-700
      "rgba(29, 78, 216, ",   // blue-700
      "rgba(15, 118, 110, ",  // teal-700
      "rgba(3, 105, 120, ",   // cyan-705
    ];

    const getRandColor = () => isDark
      ? COLORS_DARK[Math.floor(Math.random() * COLORS_DARK.length)]
      : COLORS_LIGHT[Math.floor(Math.random() * COLORS_LIGHT.length)];

    const getRandOpacity = () => isDark
      ? 0.14 + Math.random() * 0.24  // brighter dark mode (0.14 to 0.38)
      : 0.08 + Math.random() * 0.16; // brighter light mode (0.08 to 0.24)

    const fontSize = 12;
    const columns = Math.floor(width / 140);
    const streams = Array.from({ length: columns }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      speed: 1.8 + Math.random() * 2.4,
      opacity: getRandOpacity(),
      colorPrefix: getRandColor(),
      snippet: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      delay: Math.random() * 80,
    }));

    const draw = () => {
      ctx.fillStyle = isDark ? "rgba(8, 8, 16, 0.18)" : "rgba(250, 250, 250, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "12px 'JetBrains Mono', Consolas, monospace";

      streams.forEach((stream) => {
        if (stream.delay > 0) {
          stream.delay -= 1;
          return;
        }

        ctx.fillStyle = stream.colorPrefix + stream.opacity + ")";
        ctx.fillText(stream.snippet, stream.x, stream.y);

        stream.y += stream.speed;

        if (stream.y > height) {
          stream.y = Math.random() * -150;
          stream.x = Math.random() * width;
          stream.snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          stream.speed = 1.8 + Math.random() * 2.4;
          stream.opacity = getRandOpacity();
          stream.colorPrefix = getRandColor();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function adaptColor(cls: string) {
  return cls
    .replace("text-orange-300", "text-orange-600")
    .replace("text-pink-300", "text-pink-600")
    .replace("text-green-300", "text-green-600")
    .replace("text-blue-300", "text-blue-600")
    .replace("text-indigo-300", "text-indigo-600")
    .replace("text-sky-300", "text-sky-600")
    .replace("text-teal-300", "text-teal-600")
    .replace("text-fuchsia-300", "text-fuchsia-600")
    .replace("text-rose-300", "text-rose-600")
    .replace("text-amber-300", "text-amber-600")
    .replace("text-slate-300", "text-slate-600")
    .replace("text-cyan-300", "text-cyan-600")
    .replace("text-violet-300", "text-violet-600")
    .replace("text-purple-300", "text-purple-600")
    .replace("text-yellow-300", "text-yellow-600")
    .replace("text-red-300", "text-red-600")
    .replace("text-white/60", "text-zinc-600")
    .replace("text-white/65", "text-zinc-600")
    .replace("text-white/70", "text-zinc-700")
    .replace("text-white/45", "text-zinc-500")
    .replace("bg-white/10", "bg-black/5")
    .replace("bg-white/8", "bg-black/4")
    .replace("bg-white/[0.05]", "bg-black/[0.03]")
    .replace("bg-white/[0.04]", "bg-black/[0.02]")
    .replace("border-white/15", "border-black/10")
    .replace("border-white/20", "border-black/10")
    .replace("border-white/[0.08]", "border-black/[0.06]")
    .replace("border-white/[0.06]", "border-black/[0.04]")
    .replace("/15", "/10")
    .replace("/30", "/20");
}

function getBadgeColor(category: string, isDark: boolean) {
  const cls = CAT_COLORS[category] ?? "bg-white/10 border-white/20 text-white/60";
  return isDark ? cls : adaptColor(cls);
}

function getSubcategoryColor(subcat: string, isDark: boolean) {
  const cls = SUBCATEGORY_COLORS[subcat] ?? "bg-white/10 border-white/20 text-white/60";
  return isDark ? cls : adaptColor(cls);
}

function getTechColor(tech: string, isDark: boolean) {
  const cls = TECH_COLORS[tech] ?? "bg-white/[0.05] text-white/45 border-white/[0.08]";
  return isDark ? cls : adaptColor(cls);
}

function AnimatedBackground({ isDark }: { isDark: boolean }) {
  return (
    <>
      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(70px,-90px) scale(1.12)} 70%{transform:translate(-50px,60px) scale(0.9)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-90px,50px) scale(0.88)} 70%{transform:translate(70px,-70px) scale(1.08)} }
        @keyframes orb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(50px,90px) scale(1.06)} }
        .bg-orb-1 { animation: orb1 20s ease-in-out infinite; }
        .bg-orb-2 { animation: orb2 25s ease-in-out infinite; }
        .bg-orb-3 { animation: orb3 18s ease-in-out infinite; }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute inset-0 transition-colors duration-300 ${isDark ? "bg-[#080810]" : "bg-[#fafafa]"}`} />
        <div className={`bg-orb-1 absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-[130px] transition-colors duration-300 ${isDark ? "bg-violet-600/[0.13]" : "bg-violet-400/[0.05]"}`} />
        <div className={`bg-orb-2 absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full blur-[110px] transition-colors duration-300 ${isDark ? "bg-indigo-600/[0.10]" : "bg-indigo-400/[0.04]"}`} />
        <div className={`bg-orb-3 absolute -bottom-48 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px] transition-colors duration-300 ${isDark ? "bg-cyan-600/[0.08]" : "bg-cyan-400/[0.03]"}`} />
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isDark ? "opacity-[0.025]" : "opacity-[0.05]"}`}
          style={{
            backgroundImage: isDark
              ? "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <CodeRainBackground isDark={isDark} />
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-2xl ${
        scrolled
          ? isDark
            ? "bg-[#080810]/75 border-b border-white/[0.06] shadow-2xl shadow-black/30"
            : "bg-white/75 border-b border-black/[0.06] shadow-2xl shadow-black/5"
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
            className={`font-mono font-semibold text-sm tracking-tight transition-colors duration-250 ${isDark ? "text-white/85" : "text-zinc-800"}`}
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
              className={`px-4 py-2 rounded-xl text-sm transition-all font-medium ${
                isDark
                  ? "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://vinaysingh-05.github.io/portfolio/?"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
              isDark
                ? "bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white border-white/[0.08]"
                : "bg-black/[0.04] hover:bg-black/[0.08] text-zinc-700 hover:text-zinc-950 border-black/[0.06]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-xl transition-all border flex items-center justify-center ${
              isDark
                ? "bg-white/[0.08] hover:bg-white/[0.12] text-white/80 hover:text-white border-white/[0.08]"
                : "bg-black/[0.04] hover:bg-black/[0.08] text-zinc-700 hover:text-zinc-950 border-black/[0.06]"
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-violet-400" /> : <Moon className="w-4 h-4 text-violet-600" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, suffix = "", delay, onClick, isDark,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  onClick?: () => void;
  isDark: boolean;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const count = useCounter(value, 1800, active);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.button
      type="button"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className={`group p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-center ${onClick ? "cursor-pointer" : ""} ${
        isDark
          ? "border-white/[0.07] bg-white/[0.03] hover:border-violet-500/25 hover:bg-white/[0.06]"
          : "border-black/[0.06] bg-black/[0.015] hover:border-violet-500/25 hover:bg-black/[0.035]"
      }`}>
        <div className="inline-flex p-2.5 rounded-xl bg-violet-500/10 mb-3 group-hover:bg-violet-500/15 transition-colors">
          <Icon className="w-4 h-4 text-violet-400 animate-pulse" />
        </div>
        <div
          className={`font-mono text-3xl font-bold tracking-tight transition-colors duration-250 ${isDark ? "text-white" : "text-zinc-800"}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {count}{suffix}
        </div>
        <div className={`text-xs mt-1 font-medium transition-colors duration-250 ${isDark ? "text-white/35" : "text-zinc-400"}`}>{label}</div>
      </div>
    </motion.button>
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

function CoderCanvasFallback({ isDark, mouse }: { isDark: boolean; mouse: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImg, setProcessedImg] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/hacker.jpg";
    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0);
      
      const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const brightness = (r + g + b) / 3;
        
        // Remove black background
        if (r < 24 && g < 24 && b < 24) {
          data[i+3] = 0; // alpha transparent
        } else {
          // Colorize based on theme
          if (!isDark) {
            // Light theme: colorize green code to high-contrast indigo/violet
            data[i] = Math.min(255, brightness * 0.7);      // Red
            data[i+1] = Math.min(255, brightness * 0.4);    // Green
            data[i+2] = Math.min(255, brightness * 1.6);    // Blue
          } else {
            // Dark theme: enhance neon green glow
            data[i] = Math.min(255, brightness * 0.1);
            data[i+1] = Math.min(255, brightness * 1.6);
            data[i+2] = Math.min(255, brightness * 0.1);
          }
        }
      }
      offCtx.putImageData(imgData, 0, 0);
      setProcessedImg(offCanvas);
    };
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = 400;
    let height = canvas.height = 400;

    let frame = 0;
    const chars = "01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ";
    const particles: Array<{
      x: number;
      y: number;
      char: string;
      speedY: number;
      speedX: number;
      opacity: number;
      scale: number;
      phase: number;
    }> = [];

    const draw = () => {
      frame++;
      
      // Clean background - transparent so it merges seamlessly with the website theme
      ctx.clearRect(0, 0, width, height);

      const themeColor = isDark ? "#39ff14" : "#6366f1"; // Neon green vs Indigo
      const glowColor = isDark ? "rgba(57, 255, 20, 0.4)" : "rgba(99, 102, 241, 0.3)";

      // Draw processed hacker image if loaded
      if (processedImg) {
        const aspect = processedImg.width / processedImg.height;
        const scale = 1.32; // Make size bigger (32% larger)
        const targetWidth = width * scale;
        const targetHeight = (width / aspect) * scale;
        const targetX = (width - targetWidth) / 2 + 20; // Shift right to center
        const targetY = (height - targetHeight) / 2;

        const floatY = Math.sin(frame * 0.05) * 2;
        
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = isDark ? 8 : 4;

        // Image segments for typing hand animation
        const imgW = processedImg.width;
        const imgH = processedImg.height;

        const shx = imgW * 0.32;
        const shy = imgH * 0.66;
        const shw = imgW * 0.23;
        const shh = imgH * 0.26;

        const dhx = targetX + targetWidth * 0.32;
        const dhy = targetY + targetHeight * 0.66 + floatY;
        const dhw = targetWidth * 0.23;
        const dhh = targetHeight * 0.26;

        const typingJitter = Math.sin(frame * 0.4) * 2.0;

        // Segment 1: Left body/laptop
        ctx.drawImage(processedImg, 0, 0, shx, imgH, targetX, targetY + floatY, dhx - targetX, targetHeight);

        // Segment 2: Right body/helmet
        ctx.drawImage(processedImg, shx + shw, 0, imgW - (shx + shw), imgH, dhx + dhw, targetY + floatY, targetWidth - (dhx + dhw - targetX), targetHeight);

        // Segment 3: Area above the hand
        ctx.drawImage(processedImg, shx, 0, shw, shy, dhx, targetY + floatY, dhw, dhy - (targetY + floatY));

        // Segment 4: Typing hand (with jitter animation)
        ctx.drawImage(processedImg, shx, shy, shw, shh, dhx, dhy + typingJitter, dhw, dhh);
        
        ctx.shadowBlur = 0;

        // Draw typing screen glow pulse (laptop is on left side)
        const pulse = 10 + Math.sin(frame * 0.15) * 5;
        const grad = ctx.createRadialGradient(85, 290, 2, 85, 290, pulse * 2);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(85, 290, pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw elegant loader text inside the canvas before image is ready
        ctx.fillStyle = themeColor;
        ctx.font = "12px 'JetBrains Mono', Consolas, monospace";
        ctx.textAlign = "center";
        ctx.fillText("DECRYPTING DATA...", width / 2, height / 2);
      }

      // Continuous stream detaching from the coder and floating upwards (zero-gravity particles)
      if (frame % 2 === 0) {
        // Spawn locations: Laptop screen/keyboard (left), hacker face/hoodie (right)
        const spawnPoints = [
          { x: 90 + Math.random() * 40, y: 280 + Math.random() * 20 }, // laptop/keyboard
          { x: 230 + Math.random() * 50, y: 150 + Math.random() * 40 }, // face/helmet
          { x: 200 + Math.random() * 80, y: 220 + Math.random() * 60 }, // arms/body
        ];
        const pt = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

        particles.push({
          x: pt.x,
          y: pt.y,
          char: chars[Math.floor(Math.random() * chars.length)],
          speedY: -1.2 - Math.random() * 2.5, // ascending
          speedX: -0.6 + Math.random() * 1.2, // sway
          opacity: 1.0,
          scale: 0.6 + Math.random() * 0.7,
          phase: Math.random() * 100,
        });
      }

      // Draw and update particle loop
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frame * 0.05 + p.phase) * 0.2;
        p.opacity -= 0.010; // fade out

        if (p.y < 10 || p.opacity <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.fillStyle = isDark
          ? `rgba(57, 255, 20, ${p.opacity * 0.95})`
          : `rgba(99, 102, 241, ${p.opacity * 0.9})`;
        ctx.font = `bold ${Math.round(10 * p.scale)}px 'JetBrains Mono', Consolas, monospace`;
        ctx.fillText(p.char, p.x, p.y);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [processedImg, isDark]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}



function HeroSection({ onOpenTechStack, isDark }: { onOpenTechStack: () => void; isDark: boolean }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section id="intro" className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Glow behind heading */}
      <div className={`absolute top-28 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[90px] rounded-full pointer-events-none transition-colors duration-300 ${isDark ? "bg-violet-600/[0.12]" : "bg-violet-500/[0.06]"}`} />

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
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs mb-8 transition-all duration-300 ${
              isDark
                ? "border-violet-500/20 bg-violet-500/[0.07] text-violet-300/80"
                : "border-violet-500/30 bg-violet-500/[0.04] text-violet-600 font-medium"
            }`}
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
            <span className={`block transition-colors duration-300 ${isDark ? "text-white" : "text-zinc-800"}`}>VINAY</span>
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KUMAR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 transition-colors duration-300 ${
              isDark ? "text-white/45" : "text-zinc-500"
            }`}
          >
            A practical developer portfolio focused on simple navigation, direct project access,
            and a cleaner personal introduction.
          </motion.p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
            <a
              href="#featured"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                isDark
                  ? "bg-violet-500/18 hover:bg-violet-500/28 border-violet-500/25 text-violet-200 hover:text-white"
                  : "bg-violet-600 hover:bg-violet-700 border-violet-600 text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/20"
              }`}
            >
              View Projects
            </a>
            <a
              href="/Resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                downloadResume();
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                isDark
                  ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-white/70 hover:text-white"
                  : "bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.06] text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
            <StatCard icon={Layers} label="Projects" value={PROJECT_COUNT} delay={0.1} isDark={isDark} />
            <StatCard icon={Cpu} label="Technologies" value={20} suffix="+" delay={0.2} onClick={onOpenTechStack} isDark={isDark} />
            <StatCard icon={Filter} label="Categories" value={CATEGORY_FILTERS.length} delay={0.3} isDark={isDark} />
            <StatCard icon={GoalIcon} label="Hackathons" value={20} suffix="+" delay={0.4} isDark={isDark} />
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="relative"
        >
          {/* Glow background */}
          <div className={`absolute -inset-4 rounded-[2rem] blur-2xl transition-colors duration-300 ${
            isDark ? "bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" : "bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"
          }`} />
          
          <div className={`relative rounded-[2rem] border p-5 sm:p-6 shadow-2xl transition-all duration-300 ${
            isDark 
              ? "border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-black/20" 
              : "border-zinc-200 bg-white/70 backdrop-blur-xl shadow-zinc-200/50"
          }`}>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors duration-300 ${
                isDark 
                  ? "bg-white/[0.05] border-white/[0.08] text-white/70" 
                  : "bg-zinc-100 border-zinc-200 text-zinc-700"
              }`}>
                <UserRound className="w-3.5 h-3.5" />
                Personal Details
              </div>
              <a 
                href="#connect" 
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDark ? "text-violet-300 hover:text-violet-200" : "text-violet-600 hover:text-violet-750"
                }`}
              >
                Open contacts
              </a>
            </div>

            <h2 className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>
              {PERSONAL_DETAILS.name}
            </h2>
            <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
              isDark ? "text-white/45" : "text-zinc-500"
            }`}>
              {PERSONAL_DETAILS.summary}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className={`rounded-2xl border p-4 transition-colors duration-300 ${
                isDark ? "border-white/[0.06] bg-black/20" : "border-zinc-200 bg-zinc-50"
              }`}>
                <div className={`text-[10px] uppercase tracking-[0.2em] mb-1 transition-colors duration-300 ${
                  isDark ? "text-white/28" : "text-zinc-400"
                }`}>
                  Location
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  isDark ? "text-white/70" : "text-zinc-700"
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isDark ? "text-violet-300" : "text-violet-650"}`} />
                  {PERSONAL_DETAILS.location}
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border p-4 mb-6 transition-colors duration-300 ${
              isDark ? "border-white/[0.06] bg-black/20" : "border-zinc-200 bg-zinc-50"
            }`}>
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${
                isDark ? "text-white/28" : "text-zinc-400"
              }`}>
                Email
              </div>
              <a 
                href={`mailto:${PERSONAL_DETAILS.email}`} 
                className={`text-sm font-medium transition-colors duration-300 break-all block ${
                  isDark ? "text-violet-300 hover:text-violet-200" : "text-violet-600 hover:text-violet-750"
                }`}
              >
                {PERSONAL_DETAILS.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {PERSONAL_DETAILS.links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all duration-300 ${
                    isDark 
                      ? "border-white/[0.08] bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.08]" 
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </a>
              ))}
            </div>

            <p className={`text-xs font-mono transition-colors duration-300 ${
              isDark ? "text-white/28" : "text-zinc-400"
            }`}>
              {PERSONAL_DETAILS.availability}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-SUBCATEGORY DROPDOWN
// ─────────────────────────────────────────────────────────────

function SubSubcategoryDropdown({
  options, value, onChange, isDark,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  isDark: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 focus:outline-none ${
          isDark
            ? "bg-white/[0.04] border-white/[0.07] hover:border-cyan-500/30 hover:bg-white/[0.07] text-white/80"
            : "bg-black/[0.03] border-black/[0.06] hover:border-cyan-500/30 hover:bg-black/[0.05] text-zinc-700 hover:text-zinc-900"
        }`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span className="truncate">{value === "All" ? "Select Sub-Subcategory" : value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className={`w-3.5 h-3.5 ${isDark ? "text-white/40" : "text-zinc-400"}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 w-full mt-1.5 rounded-xl border p-1.5 shadow-2xl max-h-56 overflow-y-auto ${
              isDark
                ? "border-white/[0.08] bg-[#0d0d1c]/95 backdrop-blur-xl shadow-black/55"
                : "border-black/[0.08] bg-white/95 backdrop-blur-xl shadow-black/10 text-zinc-800"
            }`}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                  value === opt
                    ? isDark
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      : "bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 font-semibold"
                    : isDark
                      ? "text-white/60 hover:text-white/90 hover:bg-white/[0.05] border border-transparent"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.03] border border-transparent"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH + FILTER
// ─────────────────────────────────────────────────────────────

function SearchAndFilter({
  query, setQuery, activeFilter, setActiveFilter, activeSubFilter, setActiveSubFilter, activeSubSubFilter, setActiveSubSubFilter, isDark,
}: {
  query: string;
  setQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  activeSubFilter: string;
  setActiveSubFilter: (f: string) => void;
  activeSubSubFilter: string;
  setActiveSubSubFilter: (f: string) => void;
  isDark: boolean;
}) {
  const showSubfilters = activeFilter in SUBCATEGORIES_MAP;
  const subfilters = SUBCATEGORIES_MAP[activeFilter] || [];

  const showSubSubfilters = activeSubFilter in SUBSUBCATEGORIES_MAP;
  const subsubfilters = SUBSUBCATEGORIES_MAP[activeSubFilter] || [];

  return (
    <section className="px-4 mb-14">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-white/25" : "text-black/35"}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies, categories..."
            className={`w-full pl-11 pr-10 py-3.5 rounded-2xl border text-sm transition-all backdrop-blur-sm focus:outline-none focus:border-violet-500/40 ${
              isDark
                ? "bg-white/[0.04] border-white/[0.07] text-white/80 placeholder-white/25 focus:bg-white/[0.07]"
                : "bg-black/[0.03] border-black/[0.06] text-zinc-800 placeholder-black/35 focus:bg-black/[0.05]"
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                isDark
                  ? "hover:bg-white/10 text-white/30 hover:text-white/60"
                  : "hover:bg-black/10 text-black/30 hover:text-black/60"
              }`}
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
              onClick={() => {
                setActiveFilter(filter);
                setActiveSubFilter("All");
                setActiveSubSubFilter("All");
              }}
              whileTap={{ scale: 0.94 }}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                activeFilter === filter
                  ? isDark
                    ? "border-violet-500/40 text-violet-300"
                    : "border-violet-500/60 bg-violet-500/10 text-violet-600 font-semibold"
                  : isDark
                    ? "bg-white/[0.03] border-white/[0.07] text-white/45 hover:text-white/75 hover:border-white/[0.13] hover:bg-white/[0.06]"
                    : "bg-black/[0.025] border-black/[0.06] text-zinc-500 hover:text-zinc-850 hover:border-black/[0.12] hover:bg-black/[0.04]"
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

        {showSubfilters && (
          <div className="flex gap-2 flex-wrap justify-center pt-1">
            <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] border ${
              isDark
                ? "text-white/30 border-white/[0.06] bg-white/[0.02]"
                : "text-zinc-400 border-black/[0.06] bg-black/[0.01]"
            }`}>
              Subcategory
            </span>
            {["All", ...subfilters].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => {
                  setActiveSubFilter(filter);
                  setActiveSubSubFilter("All");
                }}
                whileTap={{ scale: 0.94 }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                  activeSubFilter === filter
                    ? isDark
                      ? "border-cyan-500/40 text-cyan-300"
                      : "border-cyan-500/60 bg-cyan-500/10 text-cyan-600 font-semibold"
                    : isDark
                      ? "bg-white/[0.03] border-white/[0.07] text-white/45 hover:text-white/75 hover:border-white/[0.13] hover:bg-white/[0.06]"
                      : "bg-black/[0.025] border-black/[0.06] text-zinc-500 hover:text-zinc-850 hover:border-black/[0.12] hover:bg-black/[0.04]"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {activeSubFilter === filter && (
                  <motion.span
                    layoutId="mlFilterHighlight"
                    className="absolute inset-0 rounded-full bg-cyan-500/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span className="relative">{filter}</span>
              </motion.button>
            ))}
          </div>
        )}
        {showSubSubfilters && (
          <div className="relative max-w-[280px] mx-auto pt-2 text-center">
            <span className={`block text-[10px] uppercase tracking-[0.2em] mb-2 ${isDark ? "text-white/30" : "text-zinc-400"}`}>
              Sub-Subcategory
            </span>
            <SubSubcategoryDropdown
              options={["All", ...subsubfilters]}
              value={activeSubSubFilter}
              onChange={setActiveSubSubFilter}
              isDark={isDark}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status, isDark }: { status: Project["status"]; isDark: boolean }) {
  const map = {
    Completed: { icon: CheckCircle, cls: isDark ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-emerald-600 bg-emerald-500/8 border-emerald-500/15" },
    "In Progress": { icon: Clock, cls: isDark ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-amber-650 bg-amber-500/8 border-amber-500/15" },
    Archived: { icon: BookOpen, cls: isDark ? "text-white/35 bg-white/[0.04] border-white/10" : "text-zinc-500 bg-black/[0.02] border-black/10" },
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
  project, onClick, index, isDark,
}: {
  project: Project;
  onClick: () => void;
  index: number;
  isDark: boolean;
}) {
  const catCls = getBadgeColor(project.category, isDark);
  const subcategory = project.category in SUBCATEGORIES_MAP ? (project.subcategory ?? "Other") : null;

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
      <div className={`relative h-full rounded-2xl border backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        isDark
          ? "border-white/[0.07] bg-white/[0.025] hover:border-violet-500/25 hover:bg-white/[0.055] hover:shadow-violet-500/[0.07]"
          : "border-black/[0.07] bg-black/[0.015] hover:border-violet-500/25 hover:bg-black/[0.035] hover:shadow-violet-500/[0.04]"
      }`}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[#0d0d1c]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${isDark ? "from-[#080810]/90 via-[#080810]/20" : "from-[#fafafa]/90 via-[#fafafa]/20"} to-transparent`} />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Category pill */}
          <div className="absolute top-2.5 left-2.5">
            <div className="flex flex-col gap-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${catCls}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.category}
              </span>
              {subcategory && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getSubcategoryColor(subcategory, isDark)}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {subcategory}
                </span>
              )}
              {project.subsubcategory && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getSubcategoryColor(project.subsubcategory, isDark)}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {project.subsubcategory}
                </span>
              )}
            </div>
          </div>

          {/* ID */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono border transition-all duration-300 ${
                isDark
                  ? "bg-black/40 border-white/10 text-white/40"
                  : "bg-white/70 border-black/10 text-zinc-500"
              }`}
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
              className={`font-mono font-semibold text-sm transition-colors duration-250 leading-tight ${
                isDark ? "text-white/85 group-hover:text-white" : "text-zinc-800 group-hover:text-zinc-950"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.title}
            </h3>
            <StatusBadge status={project.status} isDark={isDark} />
          </div>

          <p className={`text-xs leading-relaxed mb-3 line-clamp-2 transition-colors duration-250 ${isDark ? "text-white/38" : "text-zinc-500"}`}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono border ${getTechColor(tech, isDark)}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono border transition-colors duration-250 ${
                  isDark
                    ? "bg-white/[0.04] text-white/30 border-white/[0.06]"
                    : "bg-black/[0.03] text-zinc-400 border-black/[0.06]"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <a
            href={resolveProjectUrl(project) ?? project.githubUrl}
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all border ${
              isDark
                ? "bg-violet-500/12 hover:bg-violet-500/20 border-violet-500/22 hover:border-violet-500/36 text-violet-300 hover:text-violet-200"
                : "bg-violet-500/8 hover:bg-violet-500/15 border-violet-500/15 hover:border-violet-500/25 text-violet-600 hover:text-violet-700"
            }`}
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
  const subcategory = project.category in SUBCATEGORIES_MAP ? (project.subcategory ?? "Other") : null;

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
            <div className="flex flex-col gap-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${CAT_COLORS[project.category] ?? ""}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.category}
              </span>
              {subcategory && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${SUBCATEGORY_COLORS[subcategory] ?? "bg-white/10 border-white/20 text-white/60"}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {subcategory}
                </span>
              )}
              {project.subsubcategory && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${SUBCATEGORY_COLORS[project.subsubcategory] ?? "bg-white/10 border-white/20 text-white/60"}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {project.subsubcategory}
                </span>
              )}
            </div>
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

function EmptyState({ onReset, isDark }: { onReset: () => void; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-28 text-center"
    >
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 border ${
        isDark
          ? "bg-white/[0.03] border-white/[0.07]"
          : "bg-black/[0.02] border-black/[0.06]"
      }`}>
        <Search className={`w-8 h-8 ${isDark ? "text-white/18" : "text-black/25"}`} />
      </div>
      <h3
        className={`font-mono font-semibold text-lg mb-2 transition-colors duration-250 ${isDark ? "text-white/50" : "text-zinc-500"}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        No projects found
      </h3>
      <p className={`text-sm mb-8 transition-colors duration-250 ${isDark ? "text-white/28" : "text-zinc-400"}`}>Try adjusting your search or filter criteria.</p>
      <button
        onClick={onReset}
        className={`px-5 py-2.5 rounded-xl border text-sm font-mono transition-all ${
          isDark
            ? "bg-violet-500/12 border-violet-500/28 text-violet-300 hover:bg-violet-500/22"
            : "bg-violet-500/8 border-violet-500/20 text-violet-650 hover:bg-violet-500/15"
        }`}
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

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer id="connect" className={`border-t px-4 py-14 text-center transition-colors duration-300 ${isDark ? "border-white/[0.05]" : "border-black/[0.06]"}`}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className={`font-mono font-semibold text-sm transition-colors duration-250 ${isDark ? "text-white/60" : "text-zinc-600"}`}
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                isDark
                  ? "border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.06] text-white/45 hover:text-white/80"
                  : "border-black/[0.07] bg-black/[0.015] hover:bg-black/[0.04] text-zinc-500 hover:text-zinc-800"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </a>
          ))}
        </div>

        <p
          className={`text-xs font-mono transition-colors duration-250 ${isDark ? "text-white/22" : "text-zinc-400"}`}
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
  icon: Icon, label, count, isDark,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <Icon className={`w-4 h-4 transition-colors duration-250 ${isDark ? "text-white/35" : "text-zinc-400"}`} />
      <h2
        className={`font-mono font-bold text-xl transition-colors duration-250 ${isDark ? "text-white" : "text-zinc-800"}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </h2>
      <div className={`h-px flex-1 transition-colors duration-250 ${isDark ? "bg-white/[0.05]" : "bg-black/[0.08]"}`} />
      {count !== undefined && (
        <span
          className={`text-xs font-mono transition-colors duration-250 ${isDark ? "text-white/28" : "text-zinc-400"}`}
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
  const [activeSubFilter, setActiveSubFilter] = useState<string>("All");
  const [activeSubSubFilter, setActiveSubSubFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [pathname, setPathname] = useState(() => window.location.pathname);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    setActiveSubFilter("All");
    setActiveSubSubFilter("All");
  }, [activeFilter]);

  useEffect(() => {
    setActiveSubSubFilter("All");
  }, [activeSubFilter]);

  const isFiltered = query.trim() !== "" || activeFilter !== "All Projects" || activeSubFilter !== "All" || activeSubSubFilter !== "All";

  const filteredProjects = useMemo(() => {
    const q = query.toLowerCase();
    return PROJECTS.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);

      let matchF =
        activeFilter === "All Projects" ||
        p.category === activeFilter ||
        p.technologies.includes(activeFilter);

      if (activeFilter === "Machine Learning" && p.subcategory === "ML Experiment") {
        matchF = true;
      }
      if (activeFilter === "Deep Learning" && p.subcategory === "DL Experiment") {
        matchF = true;
      }

      let matchSubF = true;
      if (activeFilter in SUBCATEGORIES_MAP && activeSubFilter !== "All") {
        const projectSubcategory = p.subcategory ?? "Other";
        matchSubF = projectSubcategory === activeSubFilter;
      }

      let matchSubSubF = true;
      if (activeSubFilter in SUBSUBCATEGORIES_MAP && activeSubSubFilter !== "All") {
        const projectSubSubcategory = p.subsubcategory ?? "Other";
        matchSubSubF = projectSubSubcategory === activeSubSubFilter;
      }

      return matchQ && matchF && matchSubF && matchSubSubF;
    });
  }, [query, activeFilter, activeSubFilter, activeSubSubFilter]);

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  const handleReset = useCallback(() => {
    setQuery("");
    setActiveFilter("All Projects");
    setActiveSubFilter("All");
    setActiveSubSubFilter("All");
  }, []);

  const navigateTo = useCallback((nextPath: string, scrollTargetId?: string) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setPathname(nextPath);
    window.setTimeout(() => {
      if (scrollTargetId) {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  }, []);

  const openTechStack = useCallback(() => {
    navigateTo("/tech-stack");
  }, [navigateTo]);

  const backToProjects = useCallback(() => {
    navigateTo("/", "projects");
  }, [navigateTo]);

  if (pathname === "/tech-stack") {
    return <TechStackPage projects={PROJECTS} onBack={backToProjects} isDark={isDark} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-violet-500/30 selection:text-violet-200 ${
        isDark ? "bg-[#080810] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <AnimatedBackground isDark={isDark} />

      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <HeroSection onOpenTechStack={openTechStack} isDark={isDark} />
        <SearchAndFilter
          query={query}
          setQuery={setQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSubFilter={activeSubFilter}
          setActiveSubFilter={setActiveSubFilter}
          activeSubSubFilter={activeSubSubFilter}
          setActiveSubSubFilter={setActiveSubSubFilter}
          isDark={isDark}
        />

        <div className="max-w-7xl mx-auto px-4">

          {/* All / filtered projects */}
          <section id="projects" className="mb-20">
            <SectionHeading
              icon={LayoutGrid}
              label={isFiltered ? `Results` : "All Projects"}
              count={filteredProjects.length}
              isDark={isDark}
            />

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <EmptyState onReset={handleReset} isDark={isDark} />
            ) : (
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {filteredProjects.map((p, i) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      index={i}
                      isDark={isDark}
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

        <Footer isDark={isDark} />
      </div>

      <BackToTop />
    </div>
  );
}
