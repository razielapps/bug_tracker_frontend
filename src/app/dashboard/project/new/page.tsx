"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { FolderPlus, ArrowLeft, Clock, Wrench, Users, GitBranch, Code } from "lucide-react";

export default function CreateProjectPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="github-btn-outline inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FolderPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Project</h1>
              <p className="text-muted-foreground">Organize and manage your bug tracking projects</p>
            </div>
          </div>
        </div>

        {/* Feature Coming Soon Card */}
        <div className="github-card border-border">
          <div className="text-center py-8">
            {/* Development Icon */}
            <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-3">Project Creation Under Development</h2>
            
            <p className="text-foreground/80 mb-6 max-w-md mx-auto">
              We're currently enhancing the project creation system to support advanced team collaboration features. 
              This functionality will be available in the next major update.
            </p>

            {/* Current Capabilities */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                What's Being Developed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2 p-2 rounded bg-card/50">
                  <Users className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Team Collaboration</div>
                    <div className="text-muted-foreground">Multi-member project support</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 rounded bg-card/50">
                  <GitBranch className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Advanced Permissions</div>
                    <div className="text-muted-foreground">Role-based access control</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">What You Can Do Now:</h4>
              <div className="space-y-2 text-sm text-foreground/70">
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">1</span>
                  Explore existing projects from your dashboard
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">2</span>
                  Report issues in available projects
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">3</span>
                  Track and manage existing issues
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/dashboard"
                className="github-btn-primary flex items-center justify-center gap-2"
              >
                View Dashboard
              </Link>
              
              <Link 
                href="/dashboard/bugs"
                className="github-btn-outline flex items-center justify-center gap-2"
              >
                Browse Issues
              </Link>
            </div>

            {/* Development Timeline */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Expected completion: Development phase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="github-card border-border mt-6">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Project Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Custom Project Templates</div>
              <p className="text-sm text-foreground/70">Pre-configured project setups for different workflows</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Member Invitations</div>
              <p className="text-sm text-foreground/70">Invite team members via email with role assignments</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Project Analytics</div>
              <p className="text-sm text-foreground/70">Track progress, velocity, and issue resolution times</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Custom Fields</div>
              <p className="text-sm text-foreground/70">Add custom fields to projects for specialized tracking</p>
            </div>
          </div>
        </div>

        {/* Feedback Link */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Want to suggest features for the project system?{' '}
          <Link 
            href="/feedback" 
            className="text-primary hover:underline"
          >
            Share your ideas
          </Link>
        </div>
      </div>
    </Layout>
  );
}