"use client";

import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { BugForm } from "@/components/BugForm";
import { createBug } from "@/lib/api";
import { useState } from "react";

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

  return (
    <Layout>
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Report a New Issue</h1>
          
          {error && (
            <div className="github-alert-error mb-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <BugForm onSubmit={handleSubmit} />
          
          {submitting && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
              <span>Creating issue...</span>
            </div>
          )}
        </div>
      </DashboardLayout>
    </Layout>
  );
}