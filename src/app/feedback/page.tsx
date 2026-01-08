"use client";

import Layout from "@/components/Layout";
import { CheckCircle, Code, Server, Globe, Zap, Users, MessageSquare, Shield, FileText, GitBranch, Palette, Smartphone, Search, Bell, Rocket } from "lucide-react";

export default function FeedbackPage() {
  const backendFeatures = [
    { icon: Users, title: "User Authentication", description: "Registration, login, and role-based access control" },
    { icon: Code, title: "Issues CRUD", description: "Full create, read, update, delete operations for bugs/issues" },
    { icon: MessageSquare, title: "Comments System", description: "Add comments to issues with permission validation" },
    { icon: FileText, title: "Projects Management", description: "Create, read, update projects with member serialization" },
    { icon: Shield, title: "Permissions System", description: "Role-based permissions using Django REST Framework" },
    { icon: GitBranch, title: "Audit Logs", description: "Track issue actions with read-only serializer access" },
  ];

  const frontendFeatures = [
    { icon: Globe, title: "Dashboard Pages", description: "Project details, bug views, and issue management" },
    { icon: Code, title: "Interactive Forms", description: "Bug forms, project forms, and comment forms" },
    { icon: Zap, title: "Real-time UI", description: "Loading states, disabled buttons, and conditional rendering" },
    { icon: Server, title: "API Integration", description: "Full integration with all backend endpoints" },
    { icon: Palette, title: "Modern UI Design", description: "Clean, professional interface with consistent theming" },
    { icon: Smartphone, title: "Responsive Layout", description: "Works perfectly on mobile, tablet, and desktop" },
    { icon: Search, title: "Advanced Filtering", description: "Filter issues by status, priority, and search terms" },
    { icon: Bell, title: "Alert Systems", description: "Success and error notifications for user actions" },
    { icon: Rocket, title: "Performance Optimized", description: "Fast loading times and smooth interactions" },
  ];

  const uiPolishFeatures = [
    { title: "Theme System", description: "Consistent color palette and design language across all pages" },
    { title: "Component Library", description: "Reusable UI components with standardized styling" },
    { title: "Interactive Elements", description: "Hover effects, transitions, and smooth animations" },
    { title: "Visual Feedback", description: "Loading spinners, skeleton loaders, and progress indicators" },
    { title: "Navigation System", description: "Intuitive sidebar and header navigation with active states" },
    { title: "Form Validation", description: "Real-time validation and user-friendly error messages" },
    { title: "Status Visualizations", description: "Color-coded status badges and priority indicators" },
    { title: "Card-Based Layout", description: "Clean card components for content organization" },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">OurBugTracker Features & Feedback</h1>
          <p className="text-muted-foreground text-lg">
            Explore what's been built and share your thoughts for future improvements
          </p>
        </div>

        {/* Current Features Overview */}
        <div className="github-card border-border mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Currently Implemented Features</h2>
              <p className="text-muted-foreground">Everything that's ready to use right now</p>
            </div>
          </div>

          {/* Backend Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Backend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {backendFeatures.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">Implemented</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Frontend Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {frontendFeatures.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">Implemented</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UI Polish Features */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              UI & Design Polish
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uiPolishFeatures.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">Complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Feedback Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="github-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact & Connect</h3>
            <p className="text-muted-foreground mb-6">
              Have suggestions, found a bug, or want to contribute? Reach out through any of these channels:
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://github.com/razielapps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">GitHub</div>
                  <div className="text-sm text-muted-foreground">@razielapps</div>
                </div>
              </a>

              <a 
                href="https://x.com/cyborg0720" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary">X / Twitter</div>
                  <div className="text-sm text-muted-foreground">@cyborg0720</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-md bg-gradient-primary flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">avtconscience@gmail.com</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Feel free to reach out for collaboration, bug reports, feature requests, or just to say hello!
              </p>
            </div>
          </div>

          {/* Upcoming Features & Feedback */}
          <div className="github-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">What's Coming Next</h3>
            <p className="text-muted-foreground mb-6">
              Based on the current roadmap, here are some features being planned:
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium text-foreground">Project Member Management</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Add/remove project members with role-based permissions and team collaboration tools
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Planned</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-medium text-foreground">Real-time Notifications</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Get instant notifications for new issues, comments, and project updates
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-2/4"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">In Progress</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Search className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium text-foreground">Advanced Analytics</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Project analytics, issue trends, and performance metrics dashboards
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-1/4"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Research Phase</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">Have Feature Ideas?</h4>
              <p className="text-sm text-muted-foreground">
                Your feedback helps shape the future of OurBugTracker. Share your thoughts on what features would be most valuable to you!
              </p>
            </div>
          </div>
        </div>

        {/* Project Info Footer */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
              <Code className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">OurBugTracker v1.0</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A full-stack bug tracking application built with Django REST Framework and Next.js
          </p>
        </div>
      </div>
    </Layout>
  );
}