'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { getProjects, getIssuesByProject } from '@/lib/api';
import { Folder, CheckCircle, AlertCircle, Users, Bug } from 'lucide-react';

interface ProjectWithIssues extends any {
  issue_count?: number;
  open_issues?: number;
  closed_issues?: number;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectWithIssues[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectsWithIssues = async () => {
      try {
        // First, fetch all projects
        const projectsData = await getProjects();
        
        // Then, fetch issues for each project to get accurate counts
        const projectsWithIssueCounts = await Promise.all(
          projectsData.map(async (project: any) => {
            try {
              // Fetch issues for this specific project
              const issues = await getIssuesByProject(project.id);
              
              // Calculate issue counts
              const issueCount = issues.length;
              const openIssues = issues.filter(issue => issue.status === 'open').length;
              const closedIssues = issues.filter(issue => issue.status === 'closed').length;
              
              // Return project with updated issue counts
              return {
                ...project,
                issue_count: issueCount,
                open_issues: openIssues,
                closed_issues: closedIssues,
                // Preserve existing bug_count if it exists
                bug_count: project.bug_count || issueCount
              };
            } catch (err) {
              console.error(`Error fetching issues for project ${project.id}:`, err);
              // If error, use existing counts or defaults
              return {
                ...project,
                issue_count: project.bug_count || 0,
                open_issues: project.open_issues || 0,
                closed_issues: project.closed_issues || 0
              };
            }
          })
        );
        
        setProjects(projectsWithIssueCounts);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsWithIssues();
  }, []);

  // Calculate dashboard statistics using accurate issue counts
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.is_active).length;
  const totalIssues = projects.reduce((sum, p) => sum + (p.issue_count || 0), 0);
  const totalMembers = projects.reduce((sum, p) => sum + (p.members_count || p.members_detail?.length || 0), 0);
  const openIssues = projects.reduce((sum, p) => sum + (p.open_issues || 0), 0);
  const closedIssues = projects.reduce((sum, p) => sum + (p.closed_issues || 0), 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
            <p className="text-muted-foreground mt-1">Track and manage all your bug tracking projects</p>
          </div>
          
          <button
            className="github-btn-primary px-6 py-2"
            onClick={() => router.push('/dashboard/project/new')}
          >
            Create New Project
          </button>
        </div>

        {/* Dashboard Stats */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="github-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{totalProjects}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="github-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{totalIssues}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-open" />
                      {openIssues} open
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-closed" />
                      {closedIssues} closed
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-open/10 rounded-lg flex items-center justify-center">
                  <Bug className="h-5 w-5 text-open" />
                </div>
              </div>
            </div>
            
            <div className="github-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{totalMembers}</p>
                  <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
                </div>
                <div className="w-10 h-10 bg-merged/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-merged" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="github-card border-border flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-3 text-muted-foreground">Loading projects and issues...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="github-alert-error">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">{error}</p>
                <p className="text-sm text-destructive/70 mt-1">Please try refreshing the page</p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Your Projects</h3>
            <span className="text-sm text-muted-foreground">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="github-card border-border text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Folder className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Create your first project to start tracking bugs</p>
              <button
                className="github-btn-primary"
                onClick={() => router.push('/dashboard/project/new')}
              >
                Create First Project
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

        {/* Statistics Summary
        {!loading && !error && projects.length > 0 && (
          <div className="github-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Project Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Issues Distribution</span>
                  <span className="text-sm font-bold text-foreground">{totalIssues}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-open via-primary to-closed h-2 rounded-full" 
                    style={{ 
                      width: '100%',
                      background: `linear-gradient(90deg, var(--open) ${(openIssues / totalIssues) * 100}%, var(--primary) ${(openIssues / totalIssues) * 100}% ${((openIssues + (totalIssues - openIssues - closedIssues)) / totalIssues) * 100}%, var(--closed) ${((openIssues + (totalIssues - openIssues - closedIssues)) / totalIssues) * 100}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{openIssues} open</span>
                  <span>{totalIssues - openIssues - closedIssues} other</span>
                  <span>{closedIssues} closed</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Active Projects</span>
                  <span className="text-sm font-bold text-green-500">{activeProjects}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(activeProjects / totalProjects) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {activeProjects} of {totalProjects} projects active
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Average Issues</span>
                  <span className="text-sm font-bold text-foreground">
                    {totalProjects > 0 ? Math.round(totalIssues / totalProjects) : 0}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-merged h-2 rounded-full" 
                    style={{ width: `${Math.min((totalIssues / (totalProjects * 20)) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {totalIssues} issues across {totalProjects} projects
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </Layout>
  );
}