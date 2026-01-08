"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { BugForm } from "@/components/BugForm";
import { getBugById, updateBug, Bug } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditBugPage() {
  const params = useParams();
  const rawId = params.id;

  const bugId = Number(Array.isArray(rawId) ? rawId[0] : rawId);
  const router = useRouter();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bugId) return;

    getBugById(bugId)
      .then((data) => setBug(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load bug details");
      })
      .finally(() => setLoading(false));
  }, [bugId]);

  const handleSubmit = async (data: any) => {
    if (!bugId) return;

    try {
      await updateBug(bugId, data);
      router.push(`/dashboard/bugs/${bugId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update bug. Please try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="github-card border-border flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium text-foreground">Loading issue...</h3>
            <p className="text-muted-foreground mt-1">Preparing edit form</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !bug) {
    return (
      <Layout>
        <div className="github-alert-error">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">{error || "Issue not found"}</p>
              <p className="text-sm text-destructive/70 mt-1">
                <Link href="/dashboard/bugs" className="hover:underline flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />
                  Back to issues
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link 
              href={`/dashboard/bugs/${bugId}`}
              className="github-btn-outline flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Issue
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Editing Issue #{bugId}
          </div>
        </div>

        {/* Edit Form */}
        <div className="github-card border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Edit Issue</h1>
            <p className="text-muted-foreground mt-1">
              Update the details for issue #{bugId}: {bug.title}
            </p>
          </div>

          <BugForm initialValues={bug} onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
}