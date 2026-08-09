import { useMemo, useState, type ComponentType } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bot,
  Boxes,
  Brain,
  ChartColumnBig,
  CircleDashed,
  Cloud,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  HardDrive,
  Link2,
  Layers3,
  MonitorSmartphone,
  Palette,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Table2,
  Terminal,
  Wrench,
  Workflow,
  Wifi,
  ScanSearch,
  BrainCircuit,
  BookOpen,
} from "lucide-react";

const CATEGORY_ORDER = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Data Science",
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
  "RAG & Agents",
  "MLOps & DevOps",
  "Cloud",
  "Automation",
  "Tools",
  "Design & Analytics",
] as const;

type TechCategory = (typeof CATEGORY_ORDER)[number];

type TechIconName =
  | "python"
  | "cpp"
  | "sql"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "html"
  | "css"
  | "fastapi"
  | "flask"
  | "node"
  | "express"
  | "rest"
  | "websocket"
  | "jwt"
  | "postgresql"
  | "mysql"
  | "mongodb"
  | "redis"
  | "firebase"
  | "pinecone"
  | "faiss"
  | "chroma"
  | "numpy"
  | "pandas"
  | "matplotlib"
  | "seaborn"
  | "scipy"
  | "jupyter"
  | "sklearn"
  | "xgboost"
  | "lightgbm"
  | "catboost"
  | "ensemble"
  | "pytorch"
  | "tensorflow"
  | "keras"
  | "huggingface"
  | "opencv"
  | "openai"
  | "llm"
  | "embeddings"
  | "prompt"
  | "finetune"
  | "functioncalling"
  | "toolcalling"
  | "rag"
  | "langchain"
  | "langgraph"
  | "agents"
  | "multiagent"
  | "mcp"
  | "docker"
  | "kubernetes"
  | "mlflow"
  | "dvc"
  | "githubactions"
  | "cicd"
  | "linux"
  | "bash"
  | "gcp"
  | "aws"
  | "cloudrun"
  | "cloudstorage"
  | "cloudsql"
  | "bigquery"
  | "vertexai"
  | "pubsub"
  | "iam"
  | "n8n"
  | "webhooks"
  | "sheets"
  | "drive"
  | "gmail"
  | "git"
  | "github"
  | "vscode"
  | "postman"
  | "colab"
  | "kaggle"
  | "figma"
  | "canva"
  | "book"
  | "bar"
  | "table"
  | "scan"
  | "cloud"
  | "generic";

type TechItem = {
  name: string;
  icon: TechIconName;
  category: TechCategory;
  description: string;
  tags: string[];
};

type ProjectLike = {
  title: string;
  technologies: string[];
};

const CATEGORY_DESCRIPTIONS: Record<TechCategory, string> = {
  Languages: "Core programming and query languages for development.",
  Frontend: "User interface frameworks, styling, and component systems.",
  Backend: "API servers, runtimes, and authentication layers.",
  Databases: "Relational, document, cache, and vector data stores.",
  "Data Science": "Numerical computing, analysis, and visualization.",
  "Machine Learning": "Classical machine learning workflows and models.",
  "Deep Learning": "Neural networks and modern AI frameworks.",
  "Generative AI": "LLM apps, embeddings, prompts, and tool calling.",
  "RAG & Agents": "Retrieval, agent systems, and orchestration.",
  "MLOps & DevOps": "Containerization, deployment, versioning, and automation.",
  Cloud: "Cloud platforms and managed services.",
  Automation: "Workflow automation and service integrations.",
  Tools: "Development tools, notebooks, and productivity utilities.",
  "Design & Analytics": "Design tools and reporting/analytics workflows.",
};

const CATEGORY_FILTERS: Array<"All" | TechCategory> = ["All", ...CATEGORY_ORDER];

const TECH_STACK_ITEMS: TechItem[] = [
  { name: "Python", icon: "python", category: "Languages", description: "Primary language for AI, ML, automation and backend development.", tags: ["ai", "ml", "backend"] },
  { name: "C++", icon: "cpp", category: "Languages", description: "DSA, algorithms and performance-focused programming.", tags: ["algorithms", "performance"] },
  { name: "SQL", icon: "sql", category: "Languages", description: "Database querying, analytics and data-driven applications.", tags: ["databases", "analytics"] },
  { name: "JavaScript", icon: "javascript", category: "Languages", description: "Web application development.", tags: ["web", "frontend"] },
  { name: "TypeScript", icon: "typescript", category: "Languages", description: "Type-safe scalable web development.", tags: ["typed", "web"] },
  { name: "React.js", icon: "react", category: "Frontend", description: "Component-based UI development.", tags: ["ui", "components"] },
  { name: "Next.js", icon: "nextjs", category: "Frontend", description: "Production React framework for web applications.", tags: ["react", "ssr"] },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend", description: "Utility-first responsive styling.", tags: ["css", "ui"] },
  { name: "HTML5", icon: "html", category: "Frontend", description: "Semantic web structure.", tags: ["markup"] },
  { name: "CSS3", icon: "css", category: "Frontend", description: "Styling, layouts and responsive design.", tags: ["styles", "layout"] },
  { name: "shadcn/ui", icon: "generic", category: "Frontend", description: "Reusable accessible UI components.", tags: ["components", "accessibility"] },
  { name: "FastAPI", icon: "fastapi", category: "Backend", description: "Python APIs and AI/ML services.", tags: ["python", "apis"] },
  { name: "Flask", icon: "flask", category: "Backend", description: "Lightweight Python APIs and applications.", tags: ["python", "web"] },
  { name: "Node.js", icon: "node", category: "Backend", description: "JavaScript backend runtime.", tags: ["runtime", "javascript"] },
  { name: "Express.js", icon: "express", category: "Backend", description: "Node.js web framework.", tags: ["server", "apis"] },
  { name: "REST APIs", icon: "rest", category: "Backend", description: "Application and service communication.", tags: ["http", "integration"] },
  { name: "WebSockets", icon: "websocket", category: "Backend", description: "Real-time bidirectional communication.", tags: ["realtime", "streaming"] },
  { name: "JWT", icon: "jwt", category: "Backend", description: "Token-based authentication.", tags: ["auth", "security"] },
  { name: "PostgreSQL", icon: "postgresql", category: "Databases", description: "Relational database for production applications.", tags: ["sql", "relational"] },
  { name: "MySQL", icon: "mysql", category: "Databases", description: "Relational database and SQL workflows.", tags: ["sql", "relational"] },
  { name: "MongoDB", icon: "mongodb", category: "Databases", description: "Flexible document database.", tags: ["nosql", "documents"] },
  { name: "Redis", icon: "redis", category: "Databases", description: "Fast caching and in-memory data.", tags: ["cache", "memory"] },
  { name: "Firebase", icon: "firebase", category: "Databases", description: "Backend services and application data.", tags: ["backend", "realtime"] },
  { name: "Pinecone", icon: "pinecone", category: "Databases", description: "Vector database for AI and RAG.", tags: ["vectors", "rag"] },
  { name: "FAISS", icon: "faiss", category: "Databases", description: "Similarity search and vector indexing.", tags: ["vectors", "search"] },
  { name: "Chroma", icon: "chroma", category: "Databases", description: "Vector database for AI applications.", tags: ["vectors", "rag"] },
  { name: "NumPy", icon: "numpy", category: "Data Science", description: "Numerical computing and array operations.", tags: ["math", "arrays"] },
  { name: "Pandas", icon: "pandas", category: "Data Science", description: "Data cleaning and analysis.", tags: ["analysis", "tables"] },
  { name: "Matplotlib", icon: "matplotlib", category: "Data Science", description: "Data visualization.", tags: ["charts", "plots"] },
  { name: "Seaborn", icon: "seaborn", category: "Data Science", description: "Statistical visualization.", tags: ["visualization"] },
  { name: "SciPy", icon: "scipy", category: "Data Science", description: "Scientific computing and optimization.", tags: ["science", "optimization"] },
  { name: "Jupyter Notebook", icon: "jupyter", category: "Data Science", description: "Interactive data and ML experimentation.", tags: ["notebooks", "experiments"] },
  { name: "Scikit-learn", icon: "sklearn", category: "Machine Learning", description: "Classical machine learning workflows.", tags: ["ml", "models"] },
  { name: "XGBoost", icon: "xgboost", category: "Machine Learning", description: "Gradient boosting for structured data.", tags: ["boosting", "tabular"] },
  { name: "LightGBM", icon: "lightgbm", category: "Machine Learning", description: "Efficient gradient boosting.", tags: ["boosting", "fast"] },
  { name: "CatBoost", icon: "catboost", category: "Machine Learning", description: "Gradient boosting with categorical features.", tags: ["boosting", "categorical"] },
  { name: "Ensemble Learning", icon: "ensemble", category: "Machine Learning", description: "Combining models for better predictions.", tags: ["ensembles", "ml"] },
  { name: "PyTorch", icon: "pytorch", category: "Deep Learning", description: "Deep learning and neural networks.", tags: ["nn", "research"] },
  { name: "TensorFlow", icon: "tensorflow", category: "Deep Learning", description: "Machine learning and neural network development.", tags: ["nn", "deployment"] },
  { name: "Keras", icon: "keras", category: "Deep Learning", description: "High-level deep learning API.", tags: ["nn", "api"] },
  { name: "Hugging Face", icon: "huggingface", category: "Deep Learning", description: "Open AI models, datasets and tools.", tags: ["models", "nlp"] },
  { name: "Transformers", icon: "huggingface", category: "Deep Learning", description: "Transformer architectures for modern AI.", tags: ["nlp", "llm"] },
  { name: "OpenCV", icon: "opencv", category: "Deep Learning", description: "Computer vision and image processing.", tags: ["vision", "images"] },
  { name: "OpenAI API", icon: "openai", category: "Generative AI", description: "Integrate LLM capabilities into applications.", tags: ["llm", "api"] },
  { name: "LLMs", icon: "llm", category: "Generative AI", description: "Large language models for intelligent applications.", tags: ["ai", "language"] },
  { name: "Embeddings", icon: "embeddings", category: "Generative AI", description: "Vector representations for semantic search.", tags: ["vectors", "search"] },
  { name: "Prompt Engineering", icon: "prompt", category: "Generative AI", description: "Designing effective AI instructions.", tags: ["prompt", "llm"] },
  { name: "Fine-tuning", icon: "finetune", category: "Generative AI", description: "Adapting pretrained models to specialized tasks.", tags: ["training", "llm"] },
  { name: "Function Calling", icon: "functioncalling", category: "Generative AI", description: "Connect models with application functions.", tags: ["tools", "automation"] },
  { name: "Tool Calling", icon: "toolcalling", category: "Generative AI", description: "Allow AI systems to use external tools.", tags: ["tools", "agents"] },
  { name: "RAG", icon: "rag", category: "RAG & Agents", description: "Ground LLM responses with external knowledge.", tags: ["retrieval", "llm"] },
  { name: "LangChain", icon: "langchain", category: "RAG & Agents", description: "Build LLM applications and workflows.", tags: ["llm", "framework"] },
  { name: "LangGraph", icon: "langgraph", category: "RAG & Agents", description: "Build stateful AI agent workflows.", tags: ["agents", "workflow"] },
  { name: "AI Agents", icon: "agents", category: "RAG & Agents", description: "AI systems that reason and execute tasks.", tags: ["agents", "automation"] },
  { name: "Multi-Agent Systems", icon: "multiagent", category: "RAG & Agents", description: "Multiple agents collaborating on tasks.", tags: ["agents", "collaboration"] },
  { name: "MCP", icon: "mcp", category: "RAG & Agents", description: "Connect AI systems with external tools and data.", tags: ["protocol", "tools"] },
  { name: "Docker", icon: "docker", category: "MLOps & DevOps", description: "Containerized development and deployment.", tags: ["containers", "delivery"] },
  { name: "Kubernetes", icon: "kubernetes", category: "MLOps & DevOps", description: "Container orchestration.", tags: ["containers", "orchestration"] },
  { name: "MLflow", icon: "mlflow", category: "MLOps & DevOps", description: "ML experiment and model lifecycle management.", tags: ["mlops", "tracking"] },
  { name: "DVC", icon: "dvc", category: "MLOps & DevOps", description: "Versioning datasets and ML workflows.", tags: ["data", "versioning"] },
  { name: "GitHub Actions", icon: "githubactions", category: "MLOps & DevOps", description: "Automated testing and deployment.", tags: ["ci", "automation"] },
  { name: "CI/CD", icon: "cicd", category: "MLOps & DevOps", description: "Automated build, test and deployment workflows.", tags: ["delivery", "automation"] },
  { name: "Linux", icon: "linux", category: "MLOps & DevOps", description: "Development and server environment.", tags: ["server", "shell"] },
  { name: "Bash", icon: "bash", category: "MLOps & DevOps", description: "Command-line automation.", tags: ["shell", "scripts"] },
  { name: "Google Cloud Platform", icon: "gcp", category: "Cloud", description: "Primary cloud platform.", tags: ["cloud", "gcp"] },
  { name: "Cloud Run", icon: "cloudrun", category: "Cloud", description: "Serverless container deployment.", tags: ["serverless", "containers"] },
  { name: "Cloud Storage", icon: "cloudstorage", category: "Cloud", description: "Scalable object storage.", tags: ["storage", "cloud"] },
  { name: "Cloud SQL", icon: "cloudsql", category: "Cloud", description: "Managed relational databases.", tags: ["sql", "managed"] },
  { name: "BigQuery", icon: "bigquery", category: "Cloud", description: "Cloud data warehouse and analytics.", tags: ["analytics", "warehouse"] },
  { name: "Vertex AI", icon: "vertexai", category: "Cloud", description: "AI development and deployment platform.", tags: ["ai", "deployment"] },
  { name: "Pub/Sub", icon: "pubsub", category: "Cloud", description: "Event-driven messaging.", tags: ["events", "messaging"] },
  { name: "IAM", icon: "iam", category: "Cloud", description: "Cloud identity and access management.", tags: ["security", "access"] },
  { name: "AWS", icon: "aws", category: "Cloud", description: "Cloud infrastructure knowledge.", tags: ["cloud", "aws"] },
  { name: "n8n", icon: "n8n", category: "Automation", description: "Workflow automation connecting AI, APIs and services.", tags: ["workflows", "integration"] },
  { name: "Webhooks", icon: "webhooks", category: "Automation", description: "Event-driven application communication.", tags: ["events", "integration"] },
  { name: "Google Sheets API", icon: "sheets", category: "Automation", description: "Automated spreadsheet workflows.", tags: ["google", "data"] },
  { name: "Google Drive API", icon: "drive", category: "Automation", description: "Automated file and document workflows.", tags: ["files", "google"] },
  { name: "Gmail API", icon: "gmail", category: "Automation", description: "Automated email workflows.", tags: ["email", "google"] },
  { name: "Git", icon: "git", category: "Tools", description: "Version control.", tags: ["versioning", "workflow"] },
  { name: "GitHub", icon: "github", category: "Tools", description: "Code hosting and collaboration.", tags: ["repo", "collaboration"] },
  { name: "VS Code", icon: "vscode", category: "Tools", description: "Primary development environment.", tags: ["editor", "development"] },
  { name: "Postman", icon: "postman", category: "Tools", description: "API testing and debugging.", tags: ["api", "testing"] },
  { name: "Google Colab", icon: "colab", category: "Tools", description: "Cloud ML experimentation.", tags: ["notebooks", "ml"] },
  { name: "Kaggle", icon: "kaggle", category: "Tools", description: "Datasets and ML experimentation.", tags: ["data", "competitions"] },
  { name: "Figma", icon: "figma", category: "Design & Analytics", description: "UI design and prototyping.", tags: ["design", "ui"] },
  { name: "Canva", icon: "canva", category: "Design & Analytics", description: "Visual design and presentations.", tags: ["design", "content"] },
  { name: "Power BI", icon: "bar", category: "Design & Analytics", description: "Data dashboards and visualization.", tags: ["analytics", "dashboards"] },
  { name: "Excel", icon: "table", category: "Design & Analytics", description: "Spreadsheet analysis.", tags: ["analysis", "spreadsheets"] },
];

const PROJECT_TECH_MAP: Record<string, Partial<TechItem> & { category: TechCategory; icon: TechIconName }> = {
  "geminiapi": { category: "Generative AI", icon: "openai", description: "Gemini-powered generative AI integration.", tags: ["llm", "api"] },
  "googlemap api": { category: "Cloud", icon: "gcp", description: "Google Maps integration for location-aware apps.", tags: ["maps", "google"] },
  "weatherapi": { category: "Cloud", icon: "cloud", description: "External weather data integration.", tags: ["api", "data"] },
  "sdg 13 climate action": { category: "Design & Analytics", icon: "generic", description: "Domain-specific sustainability context used in the project.", tags: ["domain", "impact"] },
  "react native": { category: "Frontend", icon: "react", description: "Cross-platform mobile UI development.", tags: ["mobile", "ui"] },
  android: { category: "Tools", icon: "generic", description: "Android platform and app delivery.", tags: ["mobile", "platform"] },
  expo: { category: "Frontend", icon: "react", description: "React Native app framework.", tags: ["mobile", "react native"] },
  nltk: { category: "Data Science", icon: "book", description: "Natural language processing tooling.", tags: ["nlp"] },
  spacy: { category: "Data Science", icon: "book", description: "Natural language processing library.", tags: ["nlp"] },
  flask: { category: "Backend", icon: "flask", description: "Lightweight Python API and application framework.", tags: ["python", "apis"] },
  "framer motion": { category: "Frontend", icon: "generic", description: "Motion and animation for interfaces.", tags: ["animation", "ui"] },
  streamlit: { category: "Tools", icon: "generic", description: "Rapid app framework used for project demos.", tags: ["demos", "ml"] },
  openai: { category: "Generative AI", icon: "openai", description: "OpenAI-powered AI integration.", tags: ["llm", "api"] },
  relay: { category: "Automation", icon: "workflow", description: "Automation workflow orchestration.", tags: ["automation"] },
  "relay.app": { category: "Automation", icon: "workflow", description: "Automation workflow orchestration.", tags: ["automation"] },
  "google forms": { category: "Automation", icon: "workflow", description: "Form automation and lead capture.", tags: ["forms", "google"] },
  "google sheets": { category: "Automation", icon: "sheets", description: "Spreadsheet workflow automation.", tags: ["google", "data"] },
  "google drive": { category: "Automation", icon: "drive", description: "File automation and storage workflows.", tags: ["files", "google"] },
  gmail: { category: "Automation", icon: "gmail", description: "Email automation workflows.", tags: ["email", "google"] },
  grokapi: { category: "Generative AI", icon: "openai", description: "Grok-powered conversational AI integration.", tags: ["llm", "api"] },
  catboost: { category: "Machine Learning", icon: "catboost", description: "Gradient boosting model used in ML projects.", tags: ["boosting", "tabular"] },
  tflite: { category: "Deep Learning", icon: "tensorflow", description: "TensorFlow Lite deployment for edge inference.", tags: ["edge", "deployment"] },
  tensorflow: { category: "Deep Learning", icon: "tensorflow", description: "Deep learning framework used in projects.", tags: ["neural nets"] },
  "scikit-learn": { category: "Machine Learning", icon: "sklearn", description: "Classical ML library used in projects.", tags: ["ml", "models"] },
  kaggle: { category: "Tools", icon: "kaggle", description: "Datasets and ML experimentation platform.", tags: ["data", "ml"] },
  pca: { category: "Data Science", icon: "scan", description: "Dimensionality reduction used in experiments.", tags: ["analysis", "ml"] },
  "chart.js": { category: "Design & Analytics", icon: "bar", description: "Data visualization used in research pages.", tags: ["charts", "visualization"] },
  svg: { category: "Design & Analytics", icon: "generic", description: "Vector illustration and visual assets.", tags: ["design", "graphics"] },
  "google ai studio": { category: "Generative AI", icon: "openai", description: "AI prototyping and prompt testing platform.", tags: ["ai", "studio"] },
  "spline 3d": { category: "Design & Analytics", icon: "generic", description: "3D design assets for web experiences.", tags: ["3d", "design"] },
};

const ICONS: Record<TechIconName, ComponentType<{ className?: string }>> = {
  python: Code2,
  cpp: Boxes,
  sql: Table2,
  javascript: Code2,
  typescript: Code2,
  react: MonitorSmartphone,
  nextjs: Globe,
  tailwind: Palette,
  html: FileCode2,
  css: FileCode2,
  fastapi: Server,
  flask: Server,
  node: Server,
  express: Server,
  rest: Link2,
  websocket: Wifi,
  jwt: ShieldCheck,
  postgresql: Database,
  mysql: Database,
  mongodb: Database,
  redis: Database,
  firebase: Cloud,
  pinecone: Search,
  faiss: Search,
  chroma: Search,
  numpy: ChartColumnBig,
  pandas: ChartColumnBig,
  matplotlib: BarChart3,
  seaborn: BarChart3,
  scipy: ScanSearch,
  jupyter: BookOpen,
  sklearn: Brain,
  xgboost: Brain,
  lightgbm: Brain,
  catboost: Brain,
  ensemble: Brain,
  pytorch: BrainCircuit,
  tensorflow: BrainCircuit,
  keras: BrainCircuit,
  huggingface: Sparkles,
  opencv: ScanSearch,
  openai: Sparkles,
  llm: Sparkles,
  embeddings: Sparkles,
  prompt: Sparkles,
  finetune: Sparkles,
  functioncalling: Workflow,
  toolcalling: Workflow,
  rag: Search,
  langchain: Search,
  langgraph: Search,
  agents: Bot,
  multiagent: Bot,
  mcp: Bot,
  docker: Boxes,
  kubernetes: Boxes,
  mlflow: Workflow,
  dvc: HardDrive,
  githubactions: GitBranch,
  cicd: Workflow,
  linux: Terminal,
  bash: Terminal,
  gcp: Cloud,
  aws: Cloud,
  cloudrun: Cloud,
  cloudstorage: Cloud,
  cloudsql: Database,
  bigquery: Database,
  vertexai: Sparkles,
  pubsub: Workflow,
  iam: ShieldCheck,
  n8n: Workflow,
  webhooks: Workflow,
  sheets: Table2,
  drive: HardDrive,
  gmail: Sparkles,
  git: GitBranch,
  github: GitBranch,
  vscode: Terminal,
  postman: Wrench,
  colab: BookOpen,
  kaggle: Layers3,
  figma: Palette,
  canva: Palette,
  book: BookOpen,
  bar: BarChart3,
  table: Table2,
  scan: ScanSearch,
  cloud: Cloud,
  generic: CircleDashed,
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function TechIcon({ name, className }: { name: TechIconName; className?: string }) {
  const Icon = ICONS[name] ?? CircleDashed;
  return <Icon className={className} />;
}

function prettyName(name: string) {
  const normalized = normalize(name);
  if (normalized === "c++") return "C++";
  if (normalized === "sql") return "SQL";
  if (normalized === "rest apis") return "REST APIs";
  if (normalized === "websockets") return "WebSockets";
  if (normalized === "next.js") return "Next.js";
  if (normalized === "react.js") return "React.js";
  if (normalized === "tailwind css") return "Tailwind CSS";
  if (normalized === "node.js") return "Node.js";
  if (normalized === "express.js") return "Express.js";
  if (normalized === "google cloud platform") return "Google Cloud Platform";
  if (normalized === "google cloud platform (gcp)") return "Google Cloud Platform";
  if (normalized === "jupyter notebook") return "Jupyter Notebook";
  if (normalized === "scikit-learn") return "Scikit-learn";
  if (normalized === "llms") return "LLMs";
  if (normalized === "hugging face") return "Hugging Face";
  if (normalized === "mlflow") return "MLflow";
  if (normalized === "github actions") return "GitHub Actions";
  if (normalized === "ci/cd") return "CI/CD";
  if (normalized === "vs code") return "VS Code";
  if (normalized === "power bi") return "Power BI";
  if (normalized === "shadcn/ui") return "shadcn/ui";
  if (normalized === "openai api") return "OpenAI API";
  if (normalized === "google sheets api") return "Google Sheets API";
  if (normalized === "google drive api") return "Google Drive API";
  if (normalized === "gmail api") return "Gmail API";
  return name.trim();
}

function inferProjectTech(name: string): TechItem {
  const normalized = normalize(name);
  const meta = PROJECT_TECH_MAP[normalized];
  if (meta) {
    return {
      name: prettyName(name),
      icon: meta.icon,
      category: meta.category,
      description: meta.description ?? `${prettyName(name)} used in your current projects.`,
      tags: meta.tags ?? ["project"],
    };
  }
  return {
    name: prettyName(name),
    icon: "generic",
    category: "Tools",
    description: `${prettyName(name)} used in your current projects.`,
    tags: ["project", "auto-detected"],
  };
}

function buildInventory(projects: ProjectLike[]) {
  const items = new Map<string, TechItem & { count: number }>();

  for (const tech of TECH_STACK_ITEMS) {
    items.set(normalize(tech.name), { ...tech, count: 0 });
  }

  for (const project of projects) {
    for (const tech of project.technologies) {
      const key = normalize(tech);
      const existing = items.get(key);
      if (existing) {
        existing.count += 1;
        continue;
      }
      const inferred = inferProjectTech(tech);
      const created = items.get(normalize(inferred.name));
      if (created) {
        created.count += 1;
      } else {
        items.set(normalize(inferred.name), { ...inferred, count: 1 });
      }
    }
  }

  return Array.from(items.values()).sort((a, b) => {
    const categoryIndex = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    return categoryIndex !== 0 ? categoryIndex : a.name.localeCompare(b.name);
  });
}

function matchesSearch(item: TechItem, query: string) {
  if (!query) return true;
  const text = [item.name, item.category, item.description, ...item.tags].join(" ").toLowerCase();
  return text.includes(query.toLowerCase());
}

function TechCard({ item }: { item: TechItem & { count: number } }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/25 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-500/10"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/20 text-violet-300 transition-transform duration-200 group-hover:scale-[1.03]">
          <TechIcon name={item.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">{item.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/42">{item.description}</p>
            </div>
            {item.count > 0 && (
              <span className="shrink-0 rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-300">
                {item.count}
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
              {item.category}
            </span>
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/35">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: TechCategory;
  items: Array<TechItem & { count: number }>;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-violet-300/70">{category}</p>
          <h2 className="mt-2 text-lg font-semibold text-white">{CATEGORY_DESCRIPTIONS[category]}</h2>
        </div>
        <p className="text-xs text-white/32">{items.length} technologies</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <TechCard key={`${category}-${item.name}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function TechStackPage({
  projects,
  onBack,
}: {
  projects: ProjectLike[];
  onBack: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const inventory = useMemo(() => buildInventory(projects), [projects]);

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesCategory && matchesSearch(item, search);
    });
  }, [inventory, activeCategory, search]);

  const grouped = useMemo(() => {
    const map = new Map<TechCategory, Array<TechItem & { count: number }>>();
    for (const category of CATEGORY_ORDER) {
      map.set(category, []);
    }
    for (const item of filteredItems) {
      map.get(item.category as TechCategory)?.push(item);
    }
    return map;
  }, [filteredItems]);

  const visibleCategories = activeCategory === "All" ? CATEGORY_ORDER : ([activeCategory] as TechCategory[]);

  return (
    <div className="min-h-screen bg-[#080810] text-white selection:bg-violet-500/30 selection:text-violet-100">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#080810]" />
        <div className="absolute -top-48 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to projects
            </button>

            <div className="mt-5 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-violet-300">
                <Layers3 className="h-3.5 w-3.5" />
                TECH STACK
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Technologies I Build With</h1>
              <p className="max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                A curated collection of the technologies I use to build AI, ML, GenAI and production-ready applications.
              </p>
            </div>

            <div className="mt-6 max-w-2xl">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search technologies..."
                  className="w-full rounded-2xl border border-white/[0.07] bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white/80 placeholder:text-white/25 outline-none transition-colors focus:border-violet-500/35 focus:bg-black/30"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "border-violet-500/35 bg-violet-500/10 text-violet-200"
                        : "border-white/[0.07] bg-white/[0.03] text-white/45 hover:border-white/[0.13] hover:bg-white/[0.06] hover:text-white/75"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-10 sm:px-6 lg:px-8">
          {visibleCategories.map((category) => {
            const items = grouped.get(category) ?? [];
            if (items.length === 0) return null;
            return <CategorySection key={category} category={category} items={items} />;
          })}

          <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-violet-300/70">Let's build something intelligent.</p>
                <p className="mt-2 text-sm text-white/42">
                  Explore the projects that use these technologies in real applications.
                </p>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/12 px-4 py-2 text-sm font-medium text-violet-200 transition-all hover:bg-violet-500/20 hover:text-white"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
