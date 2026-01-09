"use client";

import { Suspense } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Bug, ArrowLeft, Clock, FolderPlus, GitBranch } from "lucide-react";

// Main content component
function NewBugPageContent() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard/bugs" 
            className="github-btn-outline inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Issues
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bug className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Issue</h1>
              <p className="text-muted-foreground">Report and track bugs in your projects</p>
            </div>
          </div>
        </div>

        {/* Feature Coming Soon Card */}
        <div className="github-card border-border">
          <div className="text-center py-8">
            {/* Coming Soon Icon */}
            <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-3">Feature Coming Soon!</h2>
            
            <p className="text-foreground/80 mb-6 max-w-md mx-auto">
              We&apos;re working on making it easier to create issues directly from here. 
              For now, please create new issues through the project they belong to.
            </p>

            {/* Current Workflow Info */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Current Workflow
              </h3>
              <ol className="space-y-2 text-sm text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs mt-0.5">1</span>
                  Navigate to your project
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs mt-0.5">2</span>
                  Click &quot;New Issue&quot; within the project
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs mt-0.5">3</span>
                  Fill out the issue details and submit
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/dashboard"
                className="github-btn-primary flex items-center justify-center gap-2"
              >
                <FolderPlus className="h-4 w-4" />
                Go to Projects
              </Link>
              
              <Link 
                href="/dashboard/bugs"
                className="github-btn-outline flex items-center justify-center gap-2"
              >
                View All Issues
              </Link>
            </div>

            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Expected release: Next update</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Feature? */}
        <div className="github-card border-border mt-6">
          <h3 className="font-semibold text-foreground mb-4">What to expect in the upcoming feature:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Direct Issue Creation</div>
              <p className="text-sm text-foreground/70">Create issues without navigating through projects first</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Smart Project Selection</div>
              <p className="text-sm text-foreground/70">Intelligent project suggestions based on your activity</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Template Support</div>
              <p className="text-sm text-foreground/70">Pre-defined templates for common issue types</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">Bulk Operations</div>
              <p className="text-sm text-foreground/70">Create multiple issues at once with batch processing</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Have suggestions for this feature?{' '}
          <Link 
            href="/feedback" 
            className="text-primary hover:underline"
          >
            Share your feedback - avtconscience@gmail.com
          </Link>
        </div>
      </div>
    </Layout>
  );
}

// Main export with Suspense boundary
export default function NewBugPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <NewBugPageContent />
    </Suspense>
  );
}