"use client";

import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { BugForm } from "@/components/BugForm";
import { createBug } from "@/lib/api";
import { useState } from "react";

export default function NewIssuePage() {
  const params = useParams();
  const projectId = params.projectId;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    if (!projectId) return;

    setSubmitting(true);
    try {
      await createBug(projectId, formData);
      router.push(`/dashboard/project/${projectId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Report a New Issue</h1>
          <BugForm onSubmit={handleSubmit} />
          {submitting && <p>Submitting...</p>}
        </div>
      </DashboardLayout>
    </Layout>
  );
}
