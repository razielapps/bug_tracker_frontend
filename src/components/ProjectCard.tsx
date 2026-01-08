"use client";

import { Briefcase, CheckCircle, CircleDot, Users, Calendar, User } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  // Use the accurate issue counts from the dashboard fetch
  const totalIssues = project.issue_count || project.bug_count || 0;
  const openIssues = project.open_issues || 0;
  const closedIssues = project.closed_issues || 0;
  const memberCount = project.members_count || project.members_detail?.length || 0;
  
  const completionPercentage = totalIssues > 0 
    ? Math.round((closedIssues / totalIssues) * 100) 
    : 0;

  // Format date
  const formattedDate = project.created_at 
    ? new Date(project.created_at).toLocaleDateString()
    : 'Unknown date';

  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <div className="github-card border-border hover:border-primary/50 hover:shadow-card-hover transition-all duration-200 group cursor-pointer h-full flex flex-col">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  project.is_active 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}>
                  {project.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <p className="text-sm text-foreground/70 line-clamp-2 mb-4 flex-1">
          {project.description || "No description provided"}
        </p>

        {/* Progress Bar - Only show if there are issues */}
        {totalIssues > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats Section - Shows accurate issue counts */}
        <div className="space-y-3">
          {/* Issue Stats */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-1">
                <CircleDot className="h-4 w-4 text-open" />
                <span className="font-medium text-foreground">{openIssues}</span>
                <span className="text-muted-foreground">open</span>
              </div>
              
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-closed" />
                <span className="font-medium text-foreground">{closedIssues}</span>
                <span className="text-muted-foreground">closed</span>
              </div>
              
              <div className="text-foreground font-medium">
                {totalIssues} total
              </div>
            </div>
          </div>

          {/* Members and Date */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Created by */}
        {project.created_by && (
          <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50 flex items-center gap-1">
            <User className="h-3 w-3" />
            Created by <span className="text-foreground ml-1">{project.created_by.username}</span>
          </div>
        )}
      </div>
    </Link>
  );
}