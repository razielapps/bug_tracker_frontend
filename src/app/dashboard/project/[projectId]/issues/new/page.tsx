"use client";

import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { BugForm } from "@/components/BugForm";
import { createBug } from "@/lib/api";
import { useState } from "react";
import { ArrowLeft, User2 } from "lucide-react";
import Link from "next/link";

// Define the form data type with optional fields
interface BugFormData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigned_to?: string;
}

export default function NewIssuePage() {
  const params = useParams();
  const rawProjectId = params.projectId;
  // Ensure projectId is a string, not an array
  const projectId = Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId;

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: BugFormData) => {
    if (!projectId) {
      setError("Project ID is missing");
      return;
    }

    // Validate required fields
    if (!formData.title?.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description?.trim()) {
      setError("Description is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Prepare data with defaults for required fields
      const submissionData = {
        title: formData.title || '',
        description: formData.description || '',
        status: formData.status || 'open',
        priority: formData.priority || 'medium',
        assigned_to: formData.assigned_to,
      };

      await createBug(projectId, submissionData);
      router.push(`/dashboard/project/${projectId}`);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Failed to create issue.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <Layout>

        <div className="github-card border-border flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium text-foreground">Creating issue...</h3>
            <p className="text-muted-foreground mt-1">Please wait while we save your issue</p>
          </div>
        </div>

      </Layout>
    );
  }

  return (
    <Layout>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/dashboard/project/${projectId}`}
              className="github-btn-outline flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Project
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Creating New Issue
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="github-alert-error">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">{error}</p>
                <p className="text-sm text-destructive/70 mt-1">
                  Please fix the errors above to continue
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Create Form */}
        <div className="github-card border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Report New Issue</h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details below to create a new issue for this project
            </p>
          </div>

          <BugForm onSubmit={handleSubmit} />
        </div>

        {/* Submitting Indicator */}
        {submitting && (
          <div className="github-card border-border flex items-center justify-center py-8">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
              <h3 className="text-lg font-medium text-foreground">Creating issue...</h3>
              <p className="text-muted-foreground mt-1 text-sm">This will only take a moment</p>
            </div>
          </div>
        )}
      </div>

    </Layout>
  );
}