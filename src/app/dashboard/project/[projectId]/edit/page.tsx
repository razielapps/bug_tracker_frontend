"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ProjectForm, ProjectFormValues } from "@/components/ProjectForm";
import { getProjectDetails, updateProject } from "@/lib/api";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  // Always normalize to number
  const rawId = params.projectId;
  const projectId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const [project, setProject] = useState<ProjectFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!projectId || Number.isNaN(projectId)) {
      router.push("/dashboard");
      return;
    }

    const fetchProject = async () => {
      try {
        const data = await getProjectDetails(projectId);
        setProject({
          name: data.name,
          description: data.description ?? "",
        });
      } catch (err: any) {
        alert(err.message || "Unable to load project");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, router]);

  const handleUpdate = async (data: ProjectFormValues) => {
    if (!projectId) return;

    try {
      setSubmitting(true);
      await updateProject(projectId, data);

      // future: toast.success("Project updated")
      router.push(`/dashboard/project/${projectId}`);
    } catch (err: any) {
      // future: toast.error(err.message)
      alert(err.message || "Failed to update project");
      router.push(`/dashboard/project/${projectId}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <p className="text-red-500">Project not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Edit Project</h1>
        <ProjectForm
          initialValues={project}
          onSubmit={handleUpdate}
          isSubmitting={submitting}
        />
      </div>
    </Layout>
  );
}
