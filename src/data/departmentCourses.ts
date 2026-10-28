export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  instructor: string;
  summary: string;
  timestamps: { time: string; label: string }[];
}

export interface StudyNoteSection {
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
  keyPoints?: string[];
  interviewQA?: { question: string; answer: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
  project?: string;
  videoLesson?: VideoLesson;
  studyNotes?: StudyNoteSection[];
}

export interface Course {
  id: string;
  title: string;
  department: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "Specialization Track" | "Interactive Lab" | "Video Course" | "Project Guide";
  duration: string;
  lessonsCount: number;
  rating: number;
  enrolled: number;
  description: string;
  tags: string[];
  targetRoles: string[];
  prerequisites: string[];
  keyOutcomes: string[];
  modules: CourseModule[];
}

export interface DepartmentInfo {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  accentBg: string;
  borderColor: string;
  description: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: "Engineering",
    name: "Engineering & Tech",
    icon: "Code2",
    tagline: "Software, Backend, Cloud & System Architecture",
    color: "from-blue-600 to-indigo-600",
    accentBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "Master modern full-stack development, distributed backend architectures, scalable cloud infrastructure, and low-latency system design.",
  },
  {
    id: "Data",
    name: "Data & AI",
    icon: "BrainCircuit",
    tagline: "Machine Learning, LLMs, Analytics & Data Pipelines",
    color: "from-purple-600 to-pink-600",
    accentBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-800",
    description: "Learn cutting-edge machine learning, large language model orchestration, big data engineering, and predictive business analytics.",
  },
  {
    id: "Product",
    name: "Product Management",
    icon: "Compass",
    tagline: "Product Strategy, AI Products, Metrics & Agile Discovery",
    color: "from-amber-500 to-orange-600",
    accentBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    description: "Drive product lifecycle from ideation to launch, craft PRDs, master OKRs and unit economics, and manage AI-driven feature roadmaps.",
  },
  {
    id: "Design",
    name: "Design & UX/UI",
    icon: "Palette",
    tagline: "Design Systems, UX Research, Figma & Interaction Design",
    color: "from-rose-500 to-pink-600",
    accentBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-200 dark:border-rose-800",
    description: "Create intuitive, high-conversion interfaces, build enterprise design systems, conduct deep user research, and prototype dynamic interactions.",
  },
  {
    id: "Marketing",
    name: "Growth & Marketing",
    icon: "Megaphone",
    tagline: "Performance Marketing, SEO/SEM, Content & Product Growth",
    color: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    description: "Scale user acquisition with funnel optimization, data-driven performance ads, technical SEO, and viral product loops.",
  },
  {
    id: "Sales",
    name: "Sales & Enterprise BD",
    icon: "Briefcase",
    tagline: "Enterprise SaaS Sales, Deal Closing & Pipeline Growth",
    color: "from-cyan-500 to-blue-600",
    accentBg: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    description: "Master multi-stakeholder enterprise sales cycles, objection handling, MEDDPICC qualification, and outbound prospect conversion.",
  },
  {
    id: "HR",
    name: "People & HR Operations",
    icon: "Users",
    tagline: "Talent Acquisition, People Analytics & Culture Strategy",
    color: "from-violet-500 to-purple-600",
    accentBg: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-800",
    description: "Architect high-performance organizational cultures, lead technical talent acquisition, and implement HR analytics for employee retention.",
  },
  {
    id: "Operations",
    name: "Operations & Supply Chain",
    icon: "Cpu",
    tagline: "Process Automation, Lean Six Sigma & Business Ops",
    color: "from-amber-600 to-yellow-600",
    accentBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    description: "Streamline cross-functional workflows, eliminate operational bottlenecks, and implement metrics-driven supply chain and business ops systems.",
  },
  {
    id: "Customer Success",
    name: "Customer Success & Retention",
    icon: "HeartHandshake",
    tagline: "SaaS Onboarding, Churn Prevention & Account Growth",
    color: "from-teal-500 to-emerald-600",
    accentBg: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
    borderColor: "border-teal-200 dark:border-teal-800",
    description: "Drive net revenue retention (NRR), orchestrate high-touch client onboarding, and proactively manage customer lifecycle health.",
  },
  {
    id: "Finance",
    name: "Finance & FinTech",
    icon: "TrendingUp",
    tagline: "Financial Modeling, Corporate FP&A & Valuation",
    color: "from-green-600 to-emerald-700",
    accentBg: "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
    description: "Build institutional-grade DCF & LBO financial models, understand fintech ledger architecture, and master strategic venture capital metrics.",
  },
  {
    id: "Legal",
    name: "Legal & Compliance",
    icon: "ShieldAlert",
    tagline: "Tech Law, AI Regulations, GDPR & IP Protection",
    color: "from-indigo-700 to-slate-800",
    accentBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    borderColor: "border-slate-300 dark:border-slate-700",
    description: "Navigate global tech compliance, GDPR/CCPA data governance, AI safety compliance frameworks, and enterprise SaaS commercial agreements.",
  },
  {
    id: "Support",
    name: "Technical Support & CX",
    icon: "Headphones",
    tagline: "Tier 1-3 Support, Incident Escalations & IT Helpdesk",
    color: "from-sky-500 to-indigo-500",
    accentBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400",
    borderColor: "border-sky-200 dark:border-sky-800",
    description: "Resolve complex technical software tickets, master SLA management, write top-tier documentation, and manage incident triage.",
  },
];

export const ALL_COURSES: Course[] = [
  // ===================== ENGINEERING =====================
  {
    id: "eng-101",
    title: "Full Stack Next.js & TypeScript Mastery",
    department: "Engineering",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "8 Weeks • 32 Lessons",
    lessonsCount: 32,
    rating: 4.9,
    enrolled: 1840,
    description: "Build robust, scalable full-stack applications with Next.js App Router, Server Actions, TypeScript, Tailwind CSS, and Prisma ORM.",
    tags: ["Next.js", "TypeScript", "React 19", "Prisma", "Tailwind CSS"],
    targetRoles: ["Full Stack Engineer", "Frontend Specialist", "Web Application Developer"],
    prerequisites: ["Solid JavaScript (ES6+)", "Basic HTML/CSS", "Fundamental React concepts"],
    keyOutcomes: [
      "Architect full-stack apps with server components & client boundaries",
      "Implement secure authentication with NextAuth & RBAC",
      "Model relational databases and handle migrations with Prisma",
      "Deploy with CI/CD and production monitoring",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Next.js Architecture & Server Components",
        duration: "2 Weeks",
        topics: [
          "App Router mental model & streaming SSR",
          "Server vs Client component composition rules",
          "Layouts, Templates, and Route Handlers",
          "Turbopack optimization & caching strategies",
        ],
        project: "Interactive SaaS Dashboard with Server Streaming",
        videoLesson: {
          id: "v-eng101-1",
          title: "Next.js App Router & React Server Components Deep Dive",
          duration: "42 mins",
          youtubeId: "843nec-IvW0",
          instructor: "FreeCodeCamp / TechLead",
          summary: "Learn the core mechanics of React Server Components (RSC), hydration boundaries, nested layouts, and streaming UI with Suspense in Next.js.",
          timestamps: [
            { time: "00:00", label: "Architecture Overview & Mental Model" },
            { time: "08:15", label: "Server vs Client Component Boundaries" },
            { time: "18:30", label: "Nested Layouts & Parallel Routes" },
            { time: "30:45", label: "Streaming SSR with React Suspense" },
          ],
        },
        studyNotes: [
          {
            title: "1. Core Mental Model: Server Components vs Client Components",
            content: "In Next.js App Router, all components inside the app directory are React Server Components (RSC) by default. They execute exclusively on the server, resulting in zero client-side bundle weight for backend logic, direct DB access, and improved SEO performance. Client components are explicitly designated with 'use client' at the top of the file.",
            codeSnippet: `// Server Component (Default) - Direct Data Fetching
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Roster</h1>
      <UserList users={users} />
    </div>
  );
}`,
            language: "typescript",
            keyPoints: [
              "RSC reduces client bundle size by keeping heavy dependencies server-side",
              "Use 'use client' only when needing browser APIs, state hooks (useState, useEffect), or event listeners (onClick)",
              "Pass server-fetched data down as props or compose Server Components as children inside Client Components",
            ],
            interviewQA: [
              {
                question: "What is the key difference between SSR in Pages Router and React Server Components in App Router?",
                answer: "Pages Router SSR runs getServerSideProps on every request and sends HTML plus full JavaScript for hydration. App Router RSC executes components purely on the server, streaming HTML and an RSC Payload without bundling server component JavaScript to the client.",
              },
            ],
          },
          {
            title: "2. Streaming SSR & Loading UI with Suspense",
            content: "Streaming allows incremental rendering of the page as data becomes ready. Instead of blocking the whole UI waiting for slow queries, instant loading skeletons render first, while individual components stream in asynchronously.",
            codeSnippet: `import { Suspense } from "react";
import SlowMetricsWidget from "./SlowMetricsWidget";
import WidgetSkeleton from "./WidgetSkeleton";

export default function AnalyticsView() {
  return (
    <section className="grid grid-cols-2 gap-6">
      <Suspense fallback={<WidgetSkeleton />}>
        <SlowMetricsWidget />
      </Suspense>
    </section>
  );
}`,
            language: "tsx",
            keyPoints: [
              "Suspense boundaries isolate slow backend queries from blocking initial page paints",
              "File-based loading.tsx automatically wraps page.tsx in a Suspense boundary",
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Database Modeling & Type-Safe APIs",
        duration: "3 Weeks",
        topics: [
          "Prisma schema design, relations, and indexes",
          "Server Actions with Zod validation",
          "Optimistic UI updates with React useOptimistic",
          "Transaction safety & pagination patterns",
        ],
        project: "Collaborative Project Management API",
        videoLesson: {
          id: "v-eng101-2",
          title: "Type-Safe Backend Engineering: Next.js Server Actions & Prisma ORM",
          duration: "55 mins",
          youtubeId: "bMknfKXIFA8",
          instructor: "Academind & Web Dev Simplified",
          summary: "Master database schemas, relations, migrations, mutations via Server Actions, and form state management with Zod validation.",
          timestamps: [
            { time: "00:00", label: "Relational Schema Design & Prisma Setup" },
            { time: "14:20", label: "Server Actions vs API Routes" },
            { time: "28:50", label: "Zod Schema Validation & Error Handling" },
            { time: "42:10", label: "Optimistic UI with useActionState & useOptimistic" },
          ],
        },
        studyNotes: [
          {
            title: "1. Type-Safe Server Actions with Zod Validation",
            content: "Server Actions allow client forms to trigger backend mutations directly without manual REST API endpoints. Pairing Server Actions with Zod ensures runtime validation on both client and server boundaries.",
            codeSnippet: `"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const JobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2),
  salary: z.number().positive(),
});

export async function createJobAction(formData: FormData) {
  const parsed = JobSchema.safeParse({
    title: formData.get("title"),
    company: formData.get("company"),
    salary: Number(formData.get("salary")),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const job = await prisma.job.create({ data: parsed.data });
  revalidatePath("/jobs");
  return { success: true, job };
}`,
            language: "typescript",
            keyPoints: [
              "Server Actions run securely on the server and are callable directly from forms or hooks",
              "Always validate input with Zod or a validator to prevent SQL/NoSQL injection and type coercion bugs",
              "Call revalidatePath or revalidateTag to bust Next.js cache and refresh updated data on screen",
            ],
            interviewQA: [
              {
                question: "How do Server Actions handle CSRF protection in Next.js?",
                answer: "Next.js Server Actions automatically verify the Origin and Host headers on incoming POST requests to ensure actions cannot be triggered from malicious third-party origins.",
              },
            ],
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Production Deployment & Observability",
        duration: "3 Weeks",
        topics: [
          "NextAuth.js authentication with session validation",
          "Edge runtime, rate limiting, and middleware",
          "Docker containerization & Vercel deployment",
          "Lighthouse 100 performance tuning",
        ],
        project: "Enterprise-Ready AI Workspace App",
        videoLesson: {
          id: "v-eng101-3",
          title: "Production Next.js: Auth, Docker, Edge Middleware & Deployment",
          duration: "48 mins",
          youtubeId: "1X8N6J6a5V8",
          instructor: "Vercel Engineering",
          summary: "Learn production-grade security, NextAuth session verification, Docker multi-stage builds, and edge caching for sub-100ms response times.",
          timestamps: [
            { time: "00:00", label: "NextAuth Setup & JWT Strategy" },
            { time: "16:40", label: "Edge Middleware & Route Protection" },
            { time: "31:10", label: "Multi-Stage Dockerfile Blueprint" },
            { time: "41:00", label: "Production Monitoring & Logging" },
          ],
        },
        studyNotes: [
          {
            title: "1. Edge Middleware Route Protection",
            content: "Next.js Edge Middleware runs before any request is completed. It allows rapid authentication checks, geographic routing, and rate limiting at the network edge with minimal latency.",
            codeSnippet: `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (!token && !isAuthPage && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/study/:path*", "/admin/:path*"],
};`,
            language: "typescript",
            keyPoints: [
              "Middleware executes in the V8 Edge Runtime for ultra-low latency",
              "Avoid importing large Node.js modules (like standard filesystem or heavy ORMs) inside middleware",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eng-102",
    title: "Distributed Backend & Microservices Architecture",
    department: "Engineering",
    level: "Advanced",
    type: "Specialization Track",
    duration: "10 Weeks • 40 Lessons",
    lessonsCount: 40,
    rating: 4.95,
    enrolled: 1420,
    description: "Design high-throughput, fault-tolerant backend microservices using Node.js/Go, gRPC, Kafka event streams, Redis caching, and Docker/Kubernetes.",
    tags: ["Microservices", "Kafka", "Docker", "Kubernetes", "Redis", "System Design"],
    targetRoles: ["Backend Engineer", "Distributed Systems Architect", "Senior Software Engineer"],
    prerequisites: ["Backend programming experience", "Basic networking & SQL knowledge"],
    keyOutcomes: [
      "Design event-driven architectures with Apache Kafka",
      "Implement distributed caching, idempotency, and saga patterns",
      "Deploy scalable containerized microservices to Kubernetes",
      "Conquer high-scale System Design interviews",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Microservice Foundations & API Gateways",
        duration: "3 Weeks",
        topics: [
          "Monolith to microservices decomposition strategies",
          "gRPC vs REST vs GraphQL performance trade-offs",
          "API Gateway routing, circuit breakers, and rate limiters",
        ],
        project: "High-Throughput Authentication & Gateway Service",
        videoLesson: {
          id: "v-eng102-1",
          title: "Microservices Architecture & System Design Fundamentals",
          duration: "60 mins",
          youtubeId: "Y6Ev8GKD3Hc",
          instructor: "Hussein Nasser / Tech Dummies",
          summary: "Deep dive into microservice communication patterns, RPC protocol buffers, reverse proxy routing, and fault tolerance mechanisms.",
          timestamps: [
            { time: "00:00", label: "Decomposing Monoliths by Domain Context" },
            { time: "15:30", label: "gRPC Binary Serialization vs REST JSON" },
            { time: "32:45", label: "Circuit Breaker Pattern (Resilience4j / Opossum)" },
            { time: "48:20", label: "API Gateway Token Verification & Rate Limiting" },
          ],
        },
        studyNotes: [
          {
            title: "1. Microservice Communication: gRPC vs REST",
            content: "gRPC leverages HTTP/2 with Protocol Buffers (Protobuf) for compact binary serialization, multiplexed bidirectional streaming, and strictly typed contracts, resulting in up to 7-10x throughput compared to traditional JSON over HTTP/1.1.",
            codeSnippet: `// Protocol Buffer Definition (order_service.proto)
syntax = "proto3";

package orders;

service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (OrderResponse);
  rpc StreamOrderUpdates (OrderStreamRequest) returns (stream OrderStatusUpdate);
}

message CreateOrderRequest {
  string user_id = 1;
  repeated string item_ids = 2;
  double total_amount = 3;
}

message OrderResponse {
  string order_id = 1;
  string status = 2;
  int64 timestamp = 3;
}`,
            language: "protobuf",
            keyPoints: [
              "Use gRPC for inter-service backend-to-backend communication",
              "Use REST or GraphQL for external client-to-API Gateway communication",
              "Implement circuit breakers to fail fast when downstream services become unresponsive",
            ],
            interviewQA: [
              {
                question: "What is the CAP Theorem and how does it apply to distributed microservices?",
                answer: "The CAP theorem states a distributed system can guarantee at most two of Consistency, Availability, and Partition Tolerance. In modern distributed cloud networks, network partitions (P) are inevitable, so systems must choose between Consistency (CP, e.g. strict banking ledgers) and Availability (AP, e.g. social feeds with eventual consistency).",
              },
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Event-Driven Systems with Kafka & Redis",
        duration: "4 Weeks",
        topics: [
          "Apache Kafka partitioning, consumer groups, and ordering",
          "Distributed transactions: Saga Orchestration vs Choreography",
          "Redis caching strategies: Write-through, Cache-aside, Evictions",
        ],
        project: "Real-Time Payment Processing & Notification Engine",
        videoLesson: {
          id: "v-eng102-2",
          title: "Event-Driven Architecture with Apache Kafka & Redis Caching",
          duration: "52 mins",
          youtubeId: "R873BlNVUB4",
          instructor: "Confluent / ByteByteGo",
          summary: "Learn distributed event streaming with Kafka partitions, consumer rebalancing, exactly-once semantics, and multi-tier Redis caching.",
          timestamps: [
            { time: "00:00", label: "Kafka Log Architecture & Partitions" },
            { time: "18:10", label: "Consumer Groups & Offset Commit Strategies" },
            { time: "34:00", label: "Saga Pattern for Distributed Transactions" },
            { time: "44:30", label: "Redis Cache-Aside & Cache Invalidation" },
          ],
        },
        studyNotes: [
          {
            title: "1. The Saga Pattern for Distributed Transactions",
            content: "Because microservices own their own private databases, two-phase commit (2PC) does not scale across network partitions. The Saga pattern executes a sequence of local transactions where each step publishes an event. If a step fails, compensating transactions run in reverse to restore eventual consistency.",
            codeSnippet: `// Saga Orchestrator Pseudo-Code
async function processOrderSaga(orderId: string, paymentDetails: PaymentInfo) {
  try {
    await inventoryService.reserveStock(orderId);
    await paymentService.chargeCard(paymentDetails);
    await shippingService.createShipment(orderId);
  } catch (error) {
    // Compensating Transactions
    await inventoryService.releaseStock(orderId);
    await notificationService.sendPaymentFailedAlert(orderId);
    throw new Error("Saga failed, state compensated.");
  }
}`,
            language: "typescript",
            keyPoints: [
              "Orchestration uses a centralized orchestrator telling participants what local transactions to run",
              "Choreography relies on services listening to domain events and executing transactions autonomously",
            ],
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Scalability, Reliability & Kubernetes",
        duration: "3 Weeks",
        topics: [
          "Kubernetes Deployments, Pod autoscaling (HPA), and Ingress",
          "Distributed tracing with OpenTelemetry & Prometheus metrics",
          "Chaos engineering and fault recovery simulation",
        ],
        project: "Self-Healing Multi-Region Order Fulfillment System",
        videoLesson: {
          id: "v-eng102-3",
          title: "Kubernetes & Production Reliability Engineering",
          duration: "45 mins",
          youtubeId: "X48VuDVv0do",
          instructor: "TechWorld with Nana",
          summary: "Container orchestration with Kubernetes, setting up horizontal pod autoscalers, rolling updates, and monitoring with Prometheus & Grafana.",
          timestamps: [
            { time: "00:00", label: "K8s Architecture: Control Plane & Nodes" },
            { time: "14:20", label: "Deployments, Services & Ingress Controllers" },
            { time: "27:50", label: "Horizontal Pod Autoscaler (HPA) Metrics" },
            { time: "38:15", label: "Distributed Tracing with OpenTelemetry" },
          ],
        },
        studyNotes: [
          {
            title: "1. Kubernetes Deployment & HPA Specification",
            content: "Kubernetes Deployments manage replica sets, enabling zero-downtime rolling updates and automatic pod self-healing when containers crash.",
            codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-service
  template:
    metadata:
      labels:
        app: api-service
    spec:
      containers:
      - name: api
        image: myregistry.azurecr.io/api:v1.2.0
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        ports:
        - containerPort: 8080`,
            language: "yaml",
            keyPoints: [
              "Always specify resource requests and limits to prevent noisy neighbor outages",
              "Use readiness and liveness probes to ensure traffic only routes to healthy containers",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eng-103",
    title: "Cloud & DevOps Engineering with Docker, CI/CD & Terraform",
    department: "Engineering",
    level: "Beginner",
    type: "Interactive Lab",
    duration: "6 Weeks • 24 Lessons",
    lessonsCount: 24,
    rating: 4.8,
    enrolled: 2150,
    description: "From zero to building automated cloud infrastructure pipelines. Learn Infrastructure as Code (Terraform), GitHub Actions, AWS services, and Docker.",
    tags: ["DevOps", "AWS", "Terraform", "GitHub Actions", "Docker"],
    targetRoles: ["DevOps Engineer", "Cloud Infrastructure Engineer", "SRE"],
    prerequisites: ["Basic Linux command line usage", "Basic Git knowledge"],
    keyOutcomes: [
      "Provision AWS infrastructure declaratively using Terraform",
      "Write multi-stage Dockerfiles with minimal image footprints",
      "Automate testing and deployment pipelines via GitHub Actions",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Containerization Fundamentals",
        duration: "2 Weeks",
        topics: ["Linux namespaces & cgroups", "Dockerfile best practices", "Docker Compose multi-container setups"],
        project: "Containerized Micro-App with Postgres & Redis",
        videoLesson: {
          id: "v-eng103-1",
          title: "Docker & Containerization Hands-On Tutorial",
          duration: "50 mins",
          youtubeId: "fqMOX6JJhGo",
          instructor: "FreeCodeCamp / Nana",
          summary: "Learn Docker fundamentals, image layers, container isolation, multi-stage builds, and Docker Compose orchestration.",
          timestamps: [
            { time: "00:00", label: "Containers vs Virtual Machines" },
            { time: "12:30", label: "Writing Efficient Multi-Stage Dockerfiles" },
            { time: "28:10", label: "Docker Networking & Volumes" },
            { time: "41:00", label: "Multi-Service Orchestration with Compose" },
          ],
        },
        studyNotes: [
          {
            title: "1. Multi-Stage Dockerfile for Production Next.js / Node.js",
            content: "Multi-stage builds separate the build environment from the minimal runtime image, reducing Docker image size from 1GB+ down to under 100MB while stripping out development dependencies and source build tools.",
            codeSnippet: `# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Minimal Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`,
            language: "dockerfile",
            keyPoints: [
              "Layer caching: copy dependency manifests before source files",
              "Run containers as non-root users for security compliance",
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Infrastructure as Code with Terraform",
        duration: "2 Weeks",
        topics: ["Terraform providers, state management, and modules", "AWS VPC, EC2, ECS, and S3 provisioning"],
        project: "Automated AWS Production Cluster Blueprint",
        videoLesson: {
          id: "v-eng103-2",
          title: "Terraform for AWS Infrastructure as Code",
          duration: "46 mins",
          youtubeId: "SLB_c_ayRMo",
          instructor: "Anton Putra / DevOps Directive",
          summary: "Learn declarative cloud provisioning with Terraform, state locking with DynamoDB, and building reusable VPC & ECS modules.",
          timestamps: [
            { time: "00:00", label: "Terraform Core Workflow: Init, Plan, Apply" },
            { time: "14:15", label: "Remote State in S3 with DynamoDB Locking" },
            { time: "27:30", label: "Writing Reusable AWS VPC Modules" },
            { time: "38:40", label: "Provisioning ECS Fargate Clusters" },
          ],
        },
        studyNotes: [
          {
            title: "1. Terraform AWS VPC & Security Group Declaration",
            content: "Terraform enables declarative infrastructure as code with state drift detection and repeatable multi-environment deployments.",
            codeSnippet: `resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "production-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}`,
            language: "hcl",
            keyPoints: [
              "Never commit terraform.tfstate containing sensitive credentials to Git",
              "Always run terraform plan and inspect changes before terraform apply",
            ],
          },
        ],
      },
    ],
  },

  // ===================== DATA & AI =====================
  {
    id: "data-101",
    title: "Applied Machine Learning & Deep Learning with PyTorch",
    department: "Data",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "10 Weeks • 36 Lessons",
    lessonsCount: 36,
    rating: 4.92,
    enrolled: 1650,
    description: "Master the mathematics and code behind ML algorithms, Convolutional Neural Networks, Transformers, and PyTorch model fine-tuning.",
    tags: ["Machine Learning", "PyTorch", "Deep Learning", "Python", "Data Science"],
    targetRoles: ["Machine Learning Engineer", "Data Scientist", "AI Researcher"],
    prerequisites: ["Python programming", "Linear Algebra & Calculus basics", "Pandas/NumPy"],
    keyOutcomes: [
      "Train, evaluate, and tune supervised & unsupervised ML models",
      "Build deep neural network architectures from scratch in PyTorch",
      "Fine-tune pre-trained Transformer models for NLP classification",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Classical Machine Learning & Feature Engineering",
        duration: "3 Weeks",
        topics: ["Feature scaling, PCA, & encoding", "Ensemble methods: XGBoost & Random Forests", "Hyperparameter optimization with Optuna"],
        project: "Customer Churn & Lifetime Value Predictive Engine",
        videoLesson: {
          id: "v-data101-1",
          title: "Machine Learning Foundations & Scikit-Learn Pipeline Design",
          duration: "45 mins",
          youtubeId: "Gv9_4yMHFhI",
          instructor: "StatQuest / Josh Starmer",
          summary: "Understand feature engineering, bias-variance tradeoff, cross-validation, and gradient boosting algorithms.",
          timestamps: [
            { time: "00:00", label: "Data Preprocessing & Imputation" },
            { time: "12:15", label: "Decision Trees & Random Forest Ensembles" },
            { time: "25:40", label: "XGBoost Mathematics & Gradient Boosting" },
            { time: "38:00", label: "Evaluation Metrics: Precision, Recall, ROC-AUC" },
          ],
        },
        studyNotes: [
          {
            title: "1. XGBoost & Scikit-Learn Pipeline Architecture",
            content: "Machine learning pipelines prevent data leakage during feature scaling and one-hot encoding by fitting transformers exclusively on the training split.",
            codeSnippet: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['age', 'income', 'credit_score']),
        ('cat', OneHotEncoder(drop='first'), ['country', 'gender'])
    ]
)

model_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', XGBClassifier(n_estimators=100, learning_rate=0.05, max_depth=5))
])

# Training without data leakage
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)
model_pipeline.fit(X_train, y_train)`,
            language: "python",
            keyPoints: [
              "Always use StratifiedKFold or stratified splits for imbalanced classification tasks",
              "Use ROC-AUC and PR-AUC instead of raw accuracy on skewed datasets",
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: PyTorch Deep Learning & Neural Networks",
        duration: "4 Weeks",
        topics: ["Autograd, tensors, and custom loss functions", "Convolutional networks & Computer Vision", "Recurrent networks & Attention mechanisms"],
        project: "Medical Imaging Diagnostic Classifier",
        videoLesson: {
          id: "v-data101-2",
          title: "PyTorch for Deep Learning: Zero to Mastery",
          duration: "58 mins",
          youtubeId: "V_xro1bcAuA",
          instructor: "Daniel Bourke / FreeCodeCamp",
          summary: "Learn tensor operations, backpropagation autograd, building custom nn.Module architectures, and training loops with PyTorch.",
          timestamps: [
            { time: "00:00", label: "Tensors & GPU Acceleration with CUDA" },
            { time: "16:20", label: "Building Custom PyTorch nn.Module Models" },
            { time: "32:10", label: "Forward Pass, Loss Functions & Backprop" },
            { time: "46:40", label: "Validation Loops & Learning Rate Schedulers" },
          ],
        },
        studyNotes: [
          {
            title: "1. PyTorch Standard Training Loop Pattern",
            content: "Every PyTorch neural network training iteration follows a deterministic 5-step cycle: forward pass, compute loss, zero gradients, backpropagation, and optimizer step.",
            codeSnippet: `import torch
import torch.nn as nn
import torch.optim as optim

class DeepClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, num_classes)
        )

    def forward(self, x):
        return self.net(x)

model = DeepClassifier(input_dim=128, hidden_dim=64, num_classes=2).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)

for epoch in range(num_epochs):
    model.train()
    for batch_x, batch_y in train_loader:
        batch_x, batch_y = batch_x.to(device), batch_y.to(device)
        
        optimizer.zero_grad()               # 1. Zero out accumulated gradients
        outputs = model(batch_x)            # 2. Forward pass
        loss = criterion(outputs, batch_y)   # 3. Loss calculation
        loss.backward()                     # 4. Compute gradients (Backprop)
        optimizer.step()                    # 5. Update weights`,
            language: "python",
            keyPoints: [
              "Always call optimizer.zero_grad() before loss.backward() to prevent gradient accumulation",
              "Set model.eval() and use with torch.no_grad(): during inference to save VRAM and disable dropout",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-102",
    title: "Generative AI, LangChain & Autonomous Agent Architecture",
    department: "Data",
    level: "Advanced",
    type: "Project Guide",
    duration: "6 Weeks • 24 Lessons",
    lessonsCount: 24,
    rating: 4.96,
    enrolled: 2310,
    description: "Construct production LLM applications, Retrieval-Augmented Generation (RAG) with vector databases, function calling, and autonomous multi-agent swarms.",
    tags: ["Generative AI", "LangChain", "RAG", "Vector DB", "LLM", "Prompt Engineering"],
    targetRoles: ["AI Application Developer", "GenAI Engineer", "AI Solutions Architect"],
    prerequisites: ["Python or TypeScript proficiency", "Familiarity with REST APIs"],
    keyOutcomes: [
      "Implement multi-stage RAG pipelines with Pinecone/Chroma",
      "Build tool-calling autonomous agents with LangGraph",
      "Implement guardrails, evaluations, and hallucination reduction",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Embeddings & Vector Search RAG",
        duration: "2 Weeks",
        topics: ["Vector embeddings mathematics", "Chunking strategies & metadata filtering", "Hybrid keyword + semantic search reranking"],
        project: "Enterprise PDF & Knowledge Base Query Engine",
        videoLesson: {
          id: "v-data102-1",
          title: "Production RAG: Chunking, Vector Embeddings & Hybrid Search",
          duration: "54 mins",
          youtubeId: "aywZrzNaKjs",
          instructor: "Harrison Chase (LangChain)",
          summary: "Learn production-grade RAG, token-aware chunking, dense vector similarity (Cosine/Dot Product), and hybrid BM25 + semantic search.",
          timestamps: [
            { time: "00:00", label: "Why Naive RAG Fails in Production" },
            { time: "15:20", label: "Semantic Chunking vs Recursive Character Splitting" },
            { time: "29:40", label: "Vector Indexing with Pinecone & ChromaDB" },
            { time: "44:00", label: "Cross-Encoder Re-ranking for Precision" },
          ],
        },
        studyNotes: [
          {
            title: "1. Advanced RAG Architecture & Vector Indexing",
            content: "Production RAG overcomes context limits and hallucination by converting enterprise knowledge into semantic vectors, querying via nearest-neighbor distance metrics, and re-ranking the top candidate passages before injecting them into the LLM context window.",
            codeSnippet: `import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index("enterprise-kb");

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
  { pineconeIndex }
);

// Hybrid Search with Metadata Filter
const results = await vectorStore.similaritySearch("Q3 Revenue Guidelines", 4, {
  department: "Finance",
  year: 2026,
});`,
            language: "typescript",
            keyPoints: [
              "Chunk sizes between 256 and 512 tokens with 10-15% overlap typically provide the best semantic resolution",
              "Always include metadata (source file, department, date) to enable pre-retrieval filtering",
            ],
            interviewQA: [
              {
                question: "What is the difference between Dense Retrieval and Sparse Retrieval in RAG?",
                answer: "Dense retrieval uses neural embeddings to capture semantic intent and synonyms (e.g. 'automobile' matches 'car'). Sparse retrieval (BM25) matches exact keyword frequencies (critical for product codes, names, error logs). Hybrid search combines both for highest accuracy.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ===================== PRODUCT =====================
  {
    id: "prod-101",
    title: "AI Product Management & Modern Strategy",
    department: "Product",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "6 Weeks • 20 Lessons",
    lessonsCount: 20,
    rating: 4.88,
    enrolled: 1120,
    description: "Learn how to write world-class PRDs, establish metrics frameworks (AARRR, North Star), validate problem-solution fit, and manage AI features.",
    tags: ["Product Strategy", "PRD", "AI Products", "Agile", "User Metrics"],
    targetRoles: ["Associate Product Manager", "Product Manager", "Technical PM"],
    prerequisites: ["Basic understanding of software lifecycle", "Problem-solving mindset"],
    keyOutcomes: [
      "Write clear, actionable Product Requirement Documents (PRDs)",
      "Design telemetry frameworks and unit economic metrics",
      "Lead cross-functional engineering, design, and business sprints",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Product Discovery & User Needs Validation",
        duration: "2 Weeks",
        topics: ["Continuous customer discovery interviews", "Jobs-to-be-Done (JTBD) framework", "Opportunity Solution Trees"],
        project: "Comprehensive Product Discovery Synthesis & PRD",
        videoLesson: {
          id: "v-prod101-1",
          title: "Product Discovery & Writing Winning PRDs",
          duration: "40 mins",
          youtubeId: "yZ9y_tXQ02s",
          instructor: "Lenny's Podcast & Product School",
          summary: "Master Teresa Torres' Opportunity Solution Trees, customer interview scripts, and structuring clear engineering PRDs.",
          timestamps: [
            { time: "00:00", label: "Customer Discovery vs Solution Pitching" },
            { time: "11:30", label: "Jobs-to-be-Done (JTBD) Framework" },
            { time: "22:45", label: "The Anatomy of a Modern PRD" },
            { time: "33:00", label: "Defining Non-Functional & Acceptance Criteria" },
          ],
        },
        studyNotes: [
          {
            title: "1. The PRD (Product Requirement Document) Standard",
            content: "A great PRD aligns engineering, design, data, and executive stakeholders by defining the problem, why now, target persona, success metrics, functional requirements, and out-of-scope boundaries.",
            codeSnippet: `## PRD Structure Template
1. Executive Summary & Problem Statement
2. Target Persona & Jobs-to-be-Done (JTBD)
3. Goals & Non-Goals (Strict Out-of-Scope boundaries)
4. Success Metrics:
   - North Star Metric: Weekly Active Workspaces (WAW)
   - Secondary Metric: Time-to-First-Export (< 3 mins)
   - Guardrail Metric: API Error Rate (< 0.1%)
5. User Experience & Wireframe Flow
6. Detailed Functional Specifications & Edge Cases
7. Release Plan & Rollout Milestones (Alpha -> Beta -> GA)`,
            language: "markdown",
            keyPoints: [
              "Always define guardrail metrics to ensure optimizing one metric does not degrade user trust or performance",
              "Make acceptance criteria binary (testable pass/fail conditions)",
            ],
          },
        ],
      },
    ],
  },

  // ===================== DESIGN =====================
  {
    id: "des-101",
    title: "Enterprise UI/UX Design Systems & Figma Mastery",
    department: "Design",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "7 Weeks • 28 Lessons",
    lessonsCount: 28,
    rating: 4.91,
    enrolled: 1390,
    description: "Master modern Figma workflows, create multi-brand design tokens, conduct usability testing, and deliver accessible, dev-ready components.",
    tags: ["Figma", "Design Systems", "UI Design", "UX Research", "Accessibility"],
    targetRoles: ["UI/UX Designer", "Product Designer", "Design Systems Lead"],
    prerequisites: ["Basic visual design appreciation", "Curiosity about human computer interaction"],
    keyOutcomes: [
      "Build auto-layout, component-variant design systems in Figma",
      "Apply WCAG 2.1 AAA accessibility standards",
      "Conduct moderated and unmoderated usability testing sessions",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Figma Advanced Auto-Layout & Variables",
        duration: "2 Weeks",
        topics: ["Tokens, Modes (Light/Dark), and Typography Scales", "Dynamic responsive components & slot architectures", "Micro-interaction prototyping with smart animate"],
        project: "Multi-Theme Component Library with 50+ Components",
        videoLesson: {
          id: "v-des101-1",
          title: "Figma UI/UX Design Systems, Auto-Layout & Variables Masterclass",
          duration: "52 mins",
          youtubeId: "c9Wg6Cb_YlU",
          instructor: "Figma Official & Mizko",
          summary: "Learn Figma design tokens, semantic color variables, auto-layout wrapping, responsive constraints, and interactive prototype animations.",
          timestamps: [
            { time: "00:00", label: "Design Token Architecture (Global -> Semantic -> Component)" },
            { time: "14:10", label: "Auto-Layout v5: Min/Max Widths & Wrap" },
            { time: "28:30", label: "Figma Variables & Dark/Light Mode Switching" },
            { time: "42:00", label: "Component Variants, Boolean Props & Slots" },
          ],
        },
        studyNotes: [
          {
            title: "1. 3-Tier Design Token Hierarchy",
            content: "Enterprise design systems structure tokens into 3 layers: Global Primitive Tokens, Semantic Alias Tokens, and Component Tokens. This enables 1-click multi-brand and dark-mode theming.",
            codeSnippet: `/* CSS Variable Token Implementation */
:root {
  /* 1. Primitives */
  --blue-600: #2563eb;
  --slate-900: #0f172a;
  --slate-50: #f8fafc;

  /* 2. Semantic Aliases */
  --bg-surface: var(--slate-50);
  --text-primary: var(--slate-900);
  --interactive-brand: var(--blue-600);
}

.dark {
  --bg-surface: var(--slate-900);
  --text-primary: var(--slate-50);
  --interactive-brand: #3b82f6;
}`,
            language: "css",
            keyPoints: [
              "Never bind raw hex colors directly to component instances",
              "Maintain WCAG 2.1 AA minimum 4.5:1 contrast ratio for normal text",
            ],
          },
        ],
      },
    ],
  },

  // ===================== MARKETING =====================
  {
    id: "mkt-101",
    title: "Growth Marketing & Data-Driven Acquisition",
    department: "Marketing",
    level: "Beginner",
    type: "Video Course",
    duration: "5 Weeks • 18 Lessons",
    lessonsCount: 18,
    rating: 4.79,
    enrolled: 980,
    description: "Learn how to build customer acquisition loops, run high-ROI paid ad campaigns, optimize conversion funnels, and rank with modern SEO.",
    tags: ["Growth", "SEO", "Google Ads", "Conversion Rate Optimization", "Analytics"],
    targetRoles: ["Growth Marketer", "Performance Marketer", "Digital Marketing Specialist"],
    prerequisites: ["General interest in marketing and business growth"],
    keyOutcomes: [
      "Audit and optimize end-to-end user acquisition funnels",
      "Execute high-converting Meta and Google search campaigns",
      "Build programmatic SEO and content distribution playbooks",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Funnel Architecture & Conversion Rate Optimization",
        duration: "2 Weeks",
        topics: ["AARRR pirate metrics framework", "Landing page teardowns and copywriting hooks", "Heatmap analysis & checkout friction reduction"],
        project: "High-Converting SaaS Landing Page Teardown & Redesign",
        videoLesson: {
          id: "v-mkt101-1",
          title: "Growth Marketing Masterclass: AARRR Funnels & Landing Page CRO",
          duration: "45 mins",
          youtubeId: "nU-IIXBWlS4",
          instructor: "Reforge / Demand Curve",
          summary: "Explore acquisition funnels, conversion rate optimization (CRO), landing page headline formulas, and user activation benchmarks.",
          timestamps: [
            { time: "00:00", label: "AARRR Metrics (Acquisition, Activation, Retention, Referral, Revenue)" },
            { time: "12:40", label: "High-Converting Hero Section Wireframes" },
            { time: "24:15", label: "Copywriting Angles: Pain-Agitate-Solve (PAS)" },
            { time: "35:50", label: "A/B Testing Statistical Significance & Minimum Detectable Effect" },
          ],
        },
        studyNotes: [
          {
            title: "1. The AARRR Growth Framework & Activation Loops",
            content: "Growth is not just acquisition; it is a compounding loop. Improving the 'Activation' milestone (the user reaching the Aha! moment in < 5 minutes) typically produces a 3x higher impact on LTV than spending more budget on top-of-funnel ads.",
            codeSnippet: `// Growth Metric Equation Reference
CAC (Customer Acquisition Cost) = Total Marketing & Sales Spend / New Customers Acquired
LTV (Lifetime Value) = (Average Order Value * Purchase Frequency) * Customer Lifespan
Target Ratio: LTV / CAC >= 3.0
CAC Payback Period: CAC / (Monthly ARPU * Gross Margin %) <= 12 Months`,
            language: "markdown",
            keyPoints: [
              "A high-performing landing page needs a clear value proposition above the fold",
              "Measure Micro-conversions (e.g. CTA click, email input) as leading indicators for Macro-conversions (paid upgrade)",
            ],
          },
        ],
      },
    ],
  },

  // ===================== SALES =====================
  {
    id: "sales-101",
    title: "Enterprise SaaS Sales & B2B Deal Closing",
    department: "Sales",
    level: "Intermediate",
    type: "Project Guide",
    duration: "6 Weeks • 22 Lessons",
    lessonsCount: 22,
    rating: 4.85,
    enrolled: 820,
    description: "Master the art and science of B2B software sales. Learn discovery call methodologies, MEDDPICC qualification, proposal crafting, and executive negotiation.",
    tags: ["B2B Sales", "MEDDPICC", "Cold Outreach", "Negotiation", "CRM"],
    targetRoles: ["Account Executive (AE)", "Sales Development Representative (SDR)", "Business Development Lead"],
    prerequisites: ["Strong interpersonal and communication skills"],
    keyOutcomes: [
      "Run compelling discovery calls that uncover high-priority pain points",
      "Qualify 6-figure enterprise deals using the MEDDPICC framework",
      "Overcome tough pricing objections and structure win-win contracts",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Outbound Prospecting & Cold Outreach Mastery",
        duration: "2 Weeks",
        topics: ["Ideal Customer Profile (ICP) definition", "Personalized cold email & LinkedIn multi-touch sequences", "Handling the first 30 seconds of cold calls"],
        project: "High-Response Cold Outbound Playbook & Template Pack",
        videoLesson: {
          id: "v-sales101-1",
          title: "B2B SaaS Sales Discovery & Outbound Prospecting",
          duration: "44 mins",
          youtubeId: "d86Z3zYq0eE",
          instructor: "Winning By Design",
          summary: "Learn modern B2B outbound workflows, triggering buyer interest, cold call pattern interrupts, and leading diagnostic discovery conversations.",
          timestamps: [
            { time: "00:00", label: "Building High-Intent ICP Account Lists" },
            { time: "11:20", label: "Pattern Interrupt Cold Calling Scripts" },
            { time: "23:40", label: "Multi-Touch Cadences (Email, Phone, Social)" },
            { time: "34:10", label: "Converting Cold Replies into Qualified Discovery Calls" },
          ],
        },
        studyNotes: [
          {
            title: "1. The MEDDPICC Enterprise Deal Qualification Framework",
            content: "MEDDPICC is the gold standard for qualifying enterprise deals to prevent lost quarters and forecasting surprises.",
            codeSnippet: `## MEDDPICC Breakdown
- M (Metrics): Quantifiable economic impact (e.g. Save $250k/yr in infrastructure spend)
- E (Economic Buyer): Person with discretionary budget authority to sign the check
- D (Decision Criteria): Technical, commercial, and legal requirements
- D (Decision Process): Exact steps, reviews, and committee votes to approve
- P (Paper Process): Legal redlines, procurement timelines, and security reviews
- I (Identify Pain): Urgent core operational bottleneck causing financial bleeding
- C (Champion): Internal advocate who sells on your behalf when you are not in the room
- C (Competition): Alternative vendors or internal DIY software alternatives`,
            language: "markdown",
            keyPoints: [
              "Never provide price discounts without receiving an equivalent trade-off in contract terms (e.g. upfront annual billing, case study rights)",
              "Mutual Action Plans (MAP) keep both vendor and client teams accountable to target go-live dates",
            ],
          },
        ],
      },
    ],
  },

  // ===================== HR =====================
  {
    id: "hr-101",
    title: "Strategic Talent Acquisition & People Operations",
    department: "HR",
    level: "Beginner",
    type: "Specialization Track",
    duration: "5 Weeks • 16 Lessons",
    lessonsCount: 16,
    rating: 4.81,
    enrolled: 740,
    description: "Learn how to source top engineering and business talent, structure unbiased interview loops, implement People Analytics, and manage remote team culture.",
    tags: ["Talent Acquisition", "People Ops", "HR Analytics", "Sourcing", "Culture"],
    targetRoles: ["Technical Recruiter", "HR Business Partner", "People Operations Manager"],
    prerequisites: ["Interest in organizational behavior and human talent"],
    keyOutcomes: [
      "Design structured, competency-based interview rubrics",
      "Master Boolean search, LinkedIn Recruiter, and passive candidate outreach",
      "Track HR metrics: eNPS, Time-to-Hire, Cost-per-Hire, and Retention",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Tech Sourcing & Candidate Engagement",
        duration: "2 Weeks",
        topics: ["Boolean operators and GitHub/LinkedIn sourcing hacks", "Cold candidate pitch emails with 40%+ reply rates", "Employer branding on social channels"],
        project: "Full-Cycle Sourcing Pipeline for Hard-to-Fill Engineering Roles",
        videoLesson: {
          id: "v-hr101-1",
          title: "Technical Sourcing & Modern People Operations",
          duration: "38 mins",
          youtubeId: "8jPOv7T_M3o",
          instructor: "SHRM & TechRecruit",
          summary: "Master advanced Boolean search strings, candidate engagement sequences, competency rubrics, and structured hiring committees.",
          timestamps: [
            { time: "00:00", label: "Advanced Boolean Sourcing on LinkedIn & GitHub" },
            { time: "10:15", label: "Crafting High-Converting Candidate Reachout Messages" },
            { time: "20:30", label: "Designing Structured Interview Rubrics" },
            { time: "29:45", label: "Offer Delivery & Closing Passive Candidates" },
          ],
        },
        studyNotes: [
          {
            title: "1. Advanced Boolean Search Strings for Tech Roles",
            content: "Recruiters use targeted Boolean operators to locate top passive engineering candidates directly on GitHub, Google, and LinkedIn without paying premium search fees.",
            codeSnippet: `// Example Google X-Ray Search String for Senior Next.js / React Engineers
site:linkedin.com/in ("Senior Full Stack Engineer" OR "Staff Software Engineer")
AND ("Next.js" OR "React") AND ("TypeScript")
AND ("San Francisco" OR "Remote" OR "New York")
-intitle:"profiles" -inurl:"dir"`,
            language: "text",
            keyPoints: [
              "Standardized scorecards eliminate halo effects and interview bias",
              "Track Time-to-Fill and Offer Acceptance Rate (OAR) to benchmark recruiting health",
            ],
          },
        ],
      },
    ],
  },

  // ===================== OPERATIONS =====================
  {
    id: "ops-101",
    title: "Business Operations & Lean Process Optimization",
    department: "Operations",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "6 Weeks • 20 Lessons",
    lessonsCount: 20,
    rating: 4.83,
    enrolled: 690,
    description: "Map complex business processes, eliminate waste using Lean Six Sigma principles, automate workflows with Zapier/Make/Python, and track operational KPIs.",
    tags: ["Operations", "Lean Six Sigma", "Workflow Automation", "KPIs", "Process Mapping"],
    targetRoles: ["Operations Manager", "Business Analyst", "Chief of Staff"],
    prerequisites: ["Analytical thinking", "Comfort with spreadsheet modeling"],
    keyOutcomes: [
      "Create detailed Value Stream Maps (VSM) to identify bottlenecks",
      "Automate repetitive cross-team data flows with no-code and Python scripts",
      "Formulate operational dashboards tracking efficiency and SLAs",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Process Mapping & Bottleneck Identification",
        duration: "2 Weeks",
        topics: ["Value Stream Mapping and SIPOC diagrams", "Root cause analysis with 5 Whys and Fishbone diagrams", "Quantifying operational waste and cycle times"],
        project: "Enterprise Order-to-Cash Workflow Optimization Blueprint",
        videoLesson: {
          id: "v-ops101-1",
          title: "Lean Operations & Process Flow Optimization",
          duration: "42 mins",
          youtubeId: "o8tD1b7X8gA",
          instructor: "Lean Enterprise Institute",
          summary: "Learn Value Stream Mapping (VSM), calculating Takt Time, identifying the 8 wastes of Lean, and eliminating operational handoff delays.",
          timestamps: [
            { time: "00:00", label: "The 8 Wastes in Knowledge Work & Operations" },
            { time: "11:50", label: "Building SIPOC & Value Stream Maps (VSM)" },
            { time: "23:10", label: "Takt Time, Cycle Time & Lead Time Equations" },
            { time: "33:40", label: "Root Cause Analysis (5 Whys & Ishikawa Diagrams)" },
          ],
        },
        studyNotes: [
          {
            title: "1. Value Stream Mapping & Cycle Time Calculation",
            content: "Process optimization focuses on maximizing Process Cycle Efficiency (PCE), calculated as the ratio of value-add time to total lead time across handoffs.",
            codeSnippet: `## Operational Equations
- Takt Time = Available Production Time / Customer Demand Rate
- Lead Time = Total time from request submission to fulfillment
- Process Cycle Efficiency (PCE) = (Value-Add Processing Time / Total Lead Time) * 100%
- Little's Law: Work In Progress (WIP) = Throughput Rate * Lead Time`,
            language: "markdown",
            keyPoints: [
              "Reducing WIP is the fastest way to accelerate delivery cycle times without hiring more staff",
              "Handoff points between departments are where 80% of queue wait time occurs",
            ],
          },
        ],
      },
    ],
  },

  // ===================== CUSTOMER SUCCESS =====================
  {
    id: "cs-101",
    title: "Customer Success Architecture & Churn Prevention",
    department: "Customer Success",
    level: "Beginner",
    type: "Video Course",
    duration: "5 Weeks • 15 Lessons",
    lessonsCount: 15,
    rating: 4.87,
    enrolled: 610,
    description: "Turn customers into raving advocates. Master customer health scoring, Net Revenue Retention (NRR) expansion, executive business reviews (QBRs), and churn mitigation.",
    tags: ["Customer Success", "Retention", "QBR", "Health Scoring", "SaaS Metrics"],
    targetRoles: ["Customer Success Manager (CSM)", "Client Partner", "Account Manager"],
    prerequisites: ["Empathy, strong presentation and relationship-building skills"],
    keyOutcomes: [
      "Construct predictive Customer Health Scores based on product telemetry",
      "Lead impactful Quarterly Business Reviews (QBRs) that spark upsells",
      "Establish red-flag early warning systems to save at-risk accounts",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Onboarding Excellence & Time-to-Value (TTV)",
        duration: "2 Weeks",
        topics: ["Designing 30-day customer kickoffs and milestone check-ins", "Customer journey mapping and friction point reduction", "Creating high-adoption training resources"],
        project: "Standardized Enterprise Customer Onboarding Playbook",
        videoLesson: {
          id: "v-cs101-1",
          title: "SaaS Customer Success, Health Scoring & Churn Prevention",
          duration: "40 mins",
          youtubeId: "fMvGqR-jW8k",
          instructor: "Gainsight / SuccessHACKER",
          summary: "Learn customer lifecycle milestones, Time-to-Value (TTV) acceleration, composite health scoring matrices, and QBR presentations.",
          timestamps: [
            { time: "00:00", label: "The 3 Phases of Customer Lifecycle (Onboard, Adopt, Expand)" },
            { time: "11:15", label: "Designing a 30-60-90 Day Customer Journey" },
            { time: "21:40", label: "Weighted Customer Health Score Formula" },
            { time: "31:20", label: "Executing Value-Driven QBRs" },
          ],
        },
        studyNotes: [
          {
            title: "1. Weighted Customer Health Score Formula",
            content: "A healthy account combines product telemetry (login cadence, license utilization), support ticket sentiment, executive engagement, and payment timeliness into a dynamic 0-100 composite score.",
            codeSnippet: `Health Score = (Product Usage * 0.40) + (Executive Sponsor Relationship * 0.25) + (Support Ticket Volume & Sentiment * 0.20) + (Billing Health * 0.15)

Score Bands:
- 80 - 100: Green (Advocate / Prime for Expansion)
- 60 - 79:  Yellow (Neutral / Needs Proactive Outreach)
- 0 - 59:   Red (At-Risk / Immediate Churn Escalation Protocol)`,
            language: "text",
            keyPoints: [
              "Net Revenue Retention (NRR) > 110% is the primary indicator of elite SaaS businesses",
              "Executive departures are the #1 unmonitored cause of enterprise churn",
            ],
          },
        ],
      },
    ],
  },

  // ===================== FINANCE =====================
  {
    id: "fin-101",
    title: "Financial Modeling, Valuation & FP&A Foundations",
    department: "Finance",
    level: "Intermediate",
    type: "Specialization Track",
    duration: "8 Weeks • 26 Lessons",
    lessonsCount: 26,
    rating: 4.93,
    enrolled: 1210,
    description: "Build 3-statement financial models, dynamic DCF valuations, SaaS revenue forecasting models, and learn capital budgeting.",
    tags: ["Financial Modeling", "Excel", "Valuation", "FP&A", "DCF", "SaaS Finance"],
    targetRoles: ["Financial Analyst", "FP&A Specialist", "Investment Banking Analyst"],
    prerequisites: ["Accounting fundamentals (Balance Sheet, Income Statement, Cash Flow)"],
    keyOutcomes: [
      "Build dynamic integrated 3-statement financial models in Excel",
      "Perform Discounted Cash Flow (DCF) and comparable company valuations",
      "Forecast SaaS ARR, cohort retention, and burn multiple metrics",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: 3-Statement Modeling & Dynamic Links",
        duration: "3 Weeks",
        topics: ["Revenue build, COGS, and OpEx schedules", "Working capital, depreciation schedules, and debt revolvers", "Circular references and error checking best practices"],
        project: "Integrated 5-Year Dynamic Corporate Financial Model",
        videoLesson: {
          id: "v-fin101-1",
          title: "3-Statement Financial Modeling & Corporate Valuation Masterclass",
          duration: "55 mins",
          youtubeId: "Xn7K5tzFz-8",
          instructor: "Wall Street Prep / Corporate Finance Institute",
          summary: "Learn dynamic balance sheet, income statement, and cash flow statement linking, working capital schedules, and DCF terminal value.",
          timestamps: [
            { time: "00:00", label: "Income Statement Revenue Build & Operating Expenses" },
            { time: "15:20", label: "Balance Sheet Assets, Liabilities & Equity Linkages" },
            { time: "31:40", label: "Statement of Cash Flows (Operating, Investing, Financing)" },
            { time: "44:10", label: "Discounted Cash Flow (DCF) & WACC Calculation" },
          ],
        },
        studyNotes: [
          {
            title: "1. Discounted Cash Flow (DCF) Valuation Principles",
            content: "DCF values a business based on the present value of its future Unlevered Free Cash Flows (UFCF), discounted at the Weighted Average Cost of Capital (WACC).",
            codeSnippet: `## DCF Core Formulas
1. Unlevered Free Cash Flow (UFCF):
   UFCF = EBIT * (1 - Tax Rate) + D&A - Capital Expenditures (CapEx) - Change in Net Working Capital (NWC)

2. Weighted Average Cost of Capital (WACC):
   WACC = (E/V * Cost of Equity) + (D/V * Cost of Debt * (1 - Tax Rate))

3. Terminal Value (Gordon Growth Method):
   TV = (Final Year UFCF * (1 + Perpetual Growth Rate)) / (WACC - Perpetual Growth Rate)`,
            language: "markdown",
            keyPoints: [
              "Perpetual long-term growth rate should rarely exceed GDP growth (typically 2-3%)",
              "Always run 2-variable sensitivity tables testing WACC vs Terminal Growth Rate",
            ],
          },
        ],
      },
    ],
  },

  // ===================== LEGAL =====================
  {
    id: "leg-101",
    title: "Tech Law, Data Privacy (GDPR/CCPA) & AI Compliance",
    department: "Legal",
    level: "Advanced",
    type: "Project Guide",
    duration: "6 Weeks • 18 Lessons",
    lessonsCount: 18,
    rating: 4.86,
    enrolled: 540,
    description: "Understand legal frameworks for software companies. Master SaaS master services agreements (MSAs), GDPR/CCPA data governance, and AI regulatory frameworks (EU AI Act).",
    tags: ["Tech Law", "GDPR", "Compliance", "Contracts", "AI Ethics", "IP Law"],
    targetRoles: ["Legal Counsel", "Compliance Analyst", "Data Protection Officer"],
    prerequisites: ["Basic familiarity with business contracts and tech concepts"],
    keyOutcomes: [
      "Review and negotiate commercial SaaS MSAs, DPAs, and SLAs",
      "Structure data privacy compliance policies under GDPR and CCPA",
      "Evaluate generative AI applications for copyright and regulatory risks",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: SaaS Commercial Contracts & MSAs",
        duration: "2 Weeks",
        topics: ["Indemnification, limitation of liability, and warranties", "Data Processing Agreements (DPAs) and cross-border data transfers", "Service Level Agreements (SLAs) and remedy clauses"],
        project: "Redline & Negotiation Checklist for Enterprise SaaS MSA",
        videoLesson: {
          id: "v-leg101-1",
          title: "SaaS Contracts, MSAs, DPAs & Tech Compliance",
          duration: "42 mins",
          youtubeId: "b8vY7yZ5Xg8",
          instructor: "TechGC / Harvard Law",
          summary: "Learn essential clauses in enterprise tech contracts: limitation of liability caps, IP indemnification, data processing agreements (DPA), and GDPR compliance.",
          timestamps: [
            { time: "00:00", label: "Structure of a SaaS Master Services Agreement (MSA)" },
            { time: "12:10", label: "Limitation of Liability (Super-caps vs Standard caps)" },
            { time: "23:45", label: "Data Processing Agreements & GDPR Standard Contractual Clauses" },
            { time: "34:00", label: "EU AI Act Compliance & Training Data Governance" },
          ],
        },
        studyNotes: [
          {
            title: "1. Critical SaaS Contract Clauses & Redlines",
            content: "Negotiating enterprise software agreements requires balancing deal velocity with liability risk. Key friction points include Limitation of Liability (LoL), IP Infringement Indemnification, and Data Breach Notification timelines.",
            codeSnippet: `## High-Risk Contract Terms
- Limitation of Liability: Vendor typically pushes for 12 months fees paid; Enterprise buyer requests 2-3x multiplier or uncapped for IP/data breaches
- Data Breach Notification: GDPR standard mandates notification within 72 hours of discovery without undue delay
- IP Indemnification: Vendor defends customer against third-party patent/copyright claims resulting from software use`,
            language: "markdown",
            keyPoints: [
              "Always secure a Data Processing Agreement (DPA) incorporating Standard Contractual Clauses (SCCs) for transatlantic data flows",
              "Exclude confidentiality breaches and gross negligence from standard liability caps",
            ],
          },
        ],
      },
    ],
  },

  // ===================== SUPPORT =====================
  {
    id: "sup-101",
    title: "Technical Customer Support & Incident Management",
    department: "Support",
    level: "Beginner",
    type: "Interactive Lab",
    duration: "4 Weeks • 14 Lessons",
    lessonsCount: 14,
    rating: 4.82,
    enrolled: 590,
    description: "Learn how top tech companies run high-efficiency customer support. Master ticketing systems (Zendesk, Jira), root-cause analysis, and incident escalations.",
    tags: ["Customer Support", "Zendesk", "Troubleshooting", "SLA", "Documentation"],
    targetRoles: ["Technical Support Engineer", "Customer Support Specialist", "Helpdesk Lead"],
    prerequisites: ["Customer service orientation", "Curiosity about tech debugging"],
    keyOutcomes: [
      "Triage and resolve tier 1-3 technical support tickets efficiently",
      "Draft crystal-clear public knowledge base articles and internal runbooks",
      "Manage critical severity-1 incident communications and post-mortems",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Technical Debugging & Ticket Triage",
        duration: "2 Weeks",
        topics: ["Inspecting browser DevTools (Network, Console) for user errors", "Reproducing bug reports and isolating frontend vs backend issues", "Zendesk macros, tags, and ticket prioritization workflows"],
        project: "Live Simulated Ticket Queue Triage & Response Lab",
        videoLesson: {
          id: "v-sup101-1",
          title: "Technical Support Engineering & Incident Response",
          duration: "36 mins",
          youtubeId: "1X8N6J6a5V8",
          instructor: "Atlassian / Zendesk Academy",
          summary: "Learn browser DevTools network triage, replicating user bugs, drafting reproducible engineering bug tickets, and blameless post-mortems.",
          timestamps: [
            { time: "00:00", label: "DevTools Debugging: Network Har Files & Console Logs" },
            { time: "10:30", label: "Isolating Browser/Cache Issues vs Backend API Errors" },
            { time: "19:40", label: "Drafting Flawless Jira Bug Reports for Engineering" },
            { time: "28:15", label: "Sev-1 Incident Escalations & SLA Management" },
          ],
        },
        studyNotes: [
          {
            title: "1. Technical Triage & Bug Reproduction Framework",
            content: "When triaging support escalations, support engineers follow the 4-step triage cycle: Replicate, Isolate, Document, and Escalate.",
            codeSnippet: `## Engineering Bug Report Format
1. Environment: OS version, Browser & build, User Account ID
2. Observed Behavior vs Expected Behavior
3. Exact Steps to Reproduce (1 -> 2 -> 3)
4. Network HAR / Console Logs:
   - Status Code: 500 Internal Server Error
   - Endpoint: POST /api/v1/workspaces/export
   - Payload & Response Trace ID: req_98f12a
5. Severity & User Workaround (if available)`,
            language: "markdown",
            keyPoints: [
              "Always check HAR files for 4xx client errors vs 5xx server exceptions before escalating",
              "Maintain SLA compliance: Sev-1 (< 15 mins response), Sev-2 (< 2 hours), Sev-3 (< 24 hours)",
            ],
          },
        ],
      },
    ],
  },
];
