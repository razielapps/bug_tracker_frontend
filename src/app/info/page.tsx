"use client";

import Layout from "@/components/Layout";
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Server, 
  Globe, 
  Database, 
  Shield, 
  Users, 
  MessageSquare, 
  FileText, 
  GitBranch, 
  Zap, 
  Bell, 
  Search, 
  Palette, 
  Smartphone, 
  Rocket, 
  Cpu,
  Mail,
  BarChart,
  Globe as GlobeIcon,
  Moon,
  Settings,
  TrendingUp,
  Tag,
  AlertCircle,
  Cloud
} from "lucide-react";

export default function InfoPage() {
  const backendCompleted = [
    { icon: Users, title: "User Authentication", description: "Registration, login, logout, and role management with CustomUser model" },
    { icon: Database, title: "Issues CRUD", description: "Full create, read, update, delete operations for bugs/issues with filtering by project, status, priority, assignee" },
    { icon: MessageSquare, title: "Comments System", description: "Comment creation with permission validation (only issue creator, assignee, or admin can comment)" },
    { icon: FileText, title: "Projects Management", description: "Project creation, read, update with serializer returning members and proper permissions" },
    { icon: Shield, title: "Permissions System", description: "Role-based permissions enforced using DRF permission_classes across all endpoints" },
    { icon: GitBranch, title: "Audit Logs", description: "Audit logs for issue actions with read-only serializer access" },
  ];

  const backendUpcoming = [
    { icon: Users, title: "Project Membership System", description: "Support multiple members per project with add/remove endpoints" },
    { icon: Shield, title: "Role-based Access Control", description: "Creator and admin permissions for project editing, staff permission checks" },
    { icon: Database, title: "User Projects Endpoint", description: "List all projects a user is member of with issue counts (open/closed)" },
    { icon: GitBranch, title: "Enhanced Audit Logs", description: "Track project changes and member additions/removals" },
    { icon: Bell, title: "Notifications System", description: "Email alerts for new issue creation and comments" },
    { icon: Shield, title: "Security Enhancements", description: "Rate limiting on endpoints and input sanitization improvements" },
  ];

  const frontendCompleted = [
    { icon: Globe, title: "Dashboard Pages", description: "Project detail pages, bug detail pages with comments and status updates" },
    { icon: FileText, title: "Interactive Forms", description: "BugForm, ProjectForm, and AddCommentForm with validation" },
    { icon: Zap, title: "Real-time UI", description: "Loading states, disabled buttons during submission, conditional rendering" },
    { icon: Server, title: "API Integration", description: "Full integration with all backend endpoints for projects, issues, and comments" },
    { icon: Shield, title: "Conditional UI", description: "Show/hide buttons based on user role or project membership" },
    { icon: Palette, title: "UI Polishing", description: "Modern, responsive design with consistent theming and professional appearance" },
  ];

  const frontendUpcoming = [
    { icon: Users, title: "Member Management UI", description: "Add/remove members interface with role display and management" },
    { icon: Database, title: "User Projects Page", description: "Dashboard showing all projects a user belongs to" },
    { icon: Bell, title: "Enhanced Notifications", description: "Toast messages for API success/failure with optimistic UI updates" },
    { icon: Palette, title: "UI Improvements", description: "Better loading skeletons and mobile/responsive enhancements" },
    { icon: Search, title: "Search & Filter UI", description: "Advanced filtering by status, priority, assignee on frontend" },
    { icon: Cloud, title: "Deployment Optimizations", description: "Environment variables for API URLs and error boundary implementations" },
  ];

  const futureNiceToHave = [
    { icon: Zap, title: "Real-time Updates", description: "WebSocket or Pusher integration for live updates" },
    { icon: Tag, title: "Tagging System", description: "Issue tagging and categorization system" },
    { icon: BarChart, title: "Analytics Dashboard", description: "Open/closed issues per project analytics and reporting" },
    { icon: Moon, title: "Dark Mode", description: "Theme toggle for dark/light mode support" },
    { icon: Settings, title: "User Settings", description: "User profile and settings management page" },
    { icon: GlobeIcon, title: "Multi-language", description: "Internationalization and multi-language support" },
  ];

  const techStack = [
    { category: "Backend", items: "Django REST Framework, PostgreSQL, Django ORM, JWT Authentication" },
    { category: "Frontend", items: "Next.js 14, React, TypeScript, Tailwind CSS, React Hook Form" },
    { category: "API", items: "RESTful API design, JWT-based authentication, Role-based permissions" },
    { category: "UI/UX", items: "Responsive design, Component-based architecture, Modern styling" },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">OurBugTracker Technical Details</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive bug tracking solution with complete backend API and modern frontend interface
          </p>
        </div>

        {/* Tech Stack Overview */}
        <div className="github-card border-border mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-semibold text-foreground mb-2">{tech.category}</h3>
                <p className="text-sm text-muted-foreground">{tech.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Features */}
        <div className="github-card border-border mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Server className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Backend Features</h2>
              <p className="text-muted-foreground">Django REST Framework API with complete CRUD operations</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Completed Backend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {backendCompleted.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-green-500" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Upcoming Backend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {backendUpcoming.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-yellow-500/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-yellow-500" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frontend Features */}
        <div className="github-card border-border mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Frontend Features</h2>
              <p className="text-muted-foreground">Next.js application with modern React patterns and responsive design</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Completed Frontend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {frontendCompleted.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-green-500" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Upcoming Frontend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {frontendUpcoming.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-yellow-500/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-yellow-500" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Features */}
        <div className="github-card border-border mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Future & Nice-to-Have Features</h2>
              <p className="text-muted-foreground">Planned enhancements and optional features for future releases</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureNiceToHave.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-indigo-500/10 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-indigo-500" />
                  </div>
                  <h4 className="font-medium text-foreground">{feature.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <div className="flex items-center gap-1 mt-3">
                  <Circle className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Future consideration</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Status */}
          <div className="github-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Development Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Backend Completion</span>
                  <span className="text-sm font-bold text-green-500">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Frontend Completion</span>
                  <span className="text-sm font-bold text-blue-500">90%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[90%]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">UI/UX Polish</span>
                  <span className="text-sm font-bold text-purple-500">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-[95%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Current Phase:</span> Frontend polishing and production deployment preparation
              </p>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="github-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">API Endpoints</h3>
            <div className="space-y-3">
              <div className="p-3 rounded bg-muted/20">
                <div className="font-mono text-sm text-foreground">GET /projects/</div>
                <div className="text-xs text-muted-foreground mt-1">List all projects</div>
              </div>
              <div className="p-3 rounded bg-muted/20">
                <div className="font-mono text-sm text-foreground">POST /issues/</div>
                <div className="text-xs text-muted-foreground mt-1">Create new issue</div>
              </div>
              <div className="p-3 rounded bg-muted/20">
                <div className="font-mono text-sm text-foreground">PUT /issues/{'{id}'}/</div>
                <div className="text-xs text-muted-foreground mt-1">Update existing issue</div>
              </div>
              <div className="p-3 rounded bg-muted/20">
                <div className="font-mono text-sm text-foreground">POST /comments/</div>
                <div className="text-xs text-muted-foreground mt-1">Add comment to issue</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Complete RESTful API documentation available in the backend repository
              </p>
            </div>
          </div>
        </div>

        {/* Deployment Info */}
        <div className="github-card border-border mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Deployment & Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Backend Architecture</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Django REST Framework with PostgreSQL
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  JWT-based authentication system
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Role-based permission classes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Comprehensive audit logging
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Frontend Architecture</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Next.js 14 with App Router
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  TypeScript for type safety
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Tailwind CSS for styling
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  React Hook Form for form management
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
              <AlertCircle className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">OurBugTracker v1.0 Production Ready</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A production-ready bug tracking solution with complete backend API and modern frontend interface
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>
    </Layout>
  );
}