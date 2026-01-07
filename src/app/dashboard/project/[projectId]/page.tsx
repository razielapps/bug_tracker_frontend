"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectMembers from "@/components/ProjectMembers";
import {
  getProjectDetails,
  getIssuesByProject,
} from "@/lib/api";

export default function ProjectPage() {
  const params = useParams();
  const rawId = params.projectId;
  const projectId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [project, setProject] = useState<any>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        const proj = await getProjectDetails(projectId);
        setProject(proj);
        console.log(proj)

        const projectIssues = await getIssuesByProject(projectId);
        setIssues(projectIssues);
      } catch (err) {
        console.error(err);
        setError("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="text-red-500">
          {error || "Project not found"}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-gray-600">{project.description}</p>

        <h2 className="mt-4 text-lg font-semibold">Issues</h2>

        {issues.length > 0 ? (
          <ul className="space-y-2">
            {issues.map((issue) => (
              <li key={issue.id}>
                <Link href={`/dashboard/bugs/${issue.id}`}>
                  <strong>{issue.title}</strong> — {issue.status} ({issue.priority})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No issues yet.</p>
        )}

        <Button
          className="mt-4"
          onClick={() =>
            router.push(`/dashboard/project/${projectId}/issues/new`)
          }
        >
          + Add New Issue
        </Button>

        <ProjectMembers members={project.members || []} />
      </div>
    </Layout>
  );
}
