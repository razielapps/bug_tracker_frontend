"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Link from "next/link";
import ProjectMembers from "@/components/ProjectMembers";
import { Bug, Plus, User2, FileText, Activity } from "lucide-react";
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

  // Get unique members count - handles duplicates within this project
  const getUniqueMembersCount = (members: any[] | null | undefined) => {
    if (!members || !Array.isArray(members)) return 0;
    
    // Use a Set to track unique user IDs
    const uniqueUserIds = new Set();
    
    members.forEach(member => {
      if (member?.user_id) {
        uniqueUserIds.add(member.user_id);
      }
    });
    
    return uniqueUserIds.size;
  };

  // Loading State
  if (loading) {
    return (
      <Layout>
        <div className="github-card border-border flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium text-foreground">Loading project...</h3>
            <p className="text-muted-foreground mt-1">Fetching project details</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error State
  if (error || !project) {
    return (
      <Layout>
        <div className="github-alert-error">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">{error || "Project not found"}</p>
              <p className="text-sm text-destructive/70 mt-1">
                <Link href="/dashboard" className="hover:underline">
                  ← Back to dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const openIssues = issues.filter(issue => issue.status === 'open').length;
  const closedIssues = issues.filter(issue => issue.status === 'closed').length;
  const uniqueMembersCount = getUniqueMembersCount(project.members_detail);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Project Header */}
        <div className="github-card border-border">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      project.is_active 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {project.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-foreground/80 mt-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Bug className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {uniqueMembersCount} {uniqueMembersCount === 1 ? 'member' : 'members'}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="github-btn-primary flex items-center gap-2"
              onClick={() => router.push(`/dashboard/project/${projectId}/issues/new`)}
            >
              <Plus className="h-4 w-4" />
              New Issue
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Issues</p>
                <p className="text-2xl font-bold text-open mt-1">{openIssues}</p>
              </div>
              <Bug className="h-8 w-8 text-open/30" />
            </div>
          </div>
          
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed Issues</p>
                <p className="text-2xl font-bold text-closed mt-1">{closedIssues}</p>
              </div>
              <Activity className="h-8 w-8 text-closed/30" />
            </div>
          </div>
          
          <div className="github-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Members</p>
                <p className="text-2xl font-bold text-foreground mt-1">{uniqueMembersCount}</p>
              </div>
              <User2 className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issues List */}
          <div className="lg:col-span-2">
            <div className="github-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Issues</h2>
                <span className="text-sm text-muted-foreground">
                  {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
                </span>
              </div>

              {issues.length > 0 ? (
                <div className="space-y-3">
                  {issues.map((issue) => (
                    <Link
                      key={issue.id}
                      href={`/dashboard/bugs/${issue.id}`}
                      className="flex items-center justify-between p-3 border border-border rounded hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`github-status-badge ${
                            issue.status === 'open' ? 'github-status-open' : 
                            issue.status === 'closed' ? 'github-status-closed' : 
                            'github-status-merged'
                          }`}>
                            {issue.status}
                          </span>
                          <span className="text-xs text-muted-foreground">#{issue.id}</span>
                        </div>
                        <h3 className="font-medium text-foreground truncate mt-1 group-hover:text-primary">
                          {issue.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          Priority: {issue.priority}
                        </p>
                      </div>
                      <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bug className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No issues yet</h3>
                  <p className="text-muted-foreground mb-4">Start by creating the first issue for this project</p>
                  <button
                    className="github-btn-primary"
                    onClick={() => router.push(`/dashboard/project/${projectId}/issues/new`)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Issue
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Project Members Sidebar */}
          <div>
            <ProjectMembers 
              members={project.members_detail || []} 
              uniqueCount={uniqueMembersCount}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}