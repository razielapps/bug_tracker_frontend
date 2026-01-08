"use client";

import { useState } from "react";
import { MessageSquare, User, Calendar, Flag, Folder } from "lucide-react";
import StatusDropdown from "@/components/StatusDropdown";
import { updateBugStatus, createComment as apiCreateComment } from "@/lib/api";
import AddCommentForm from "./AddCommentForm";

type BugDetailProps = {
  bug: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority?: string;
    assigned_to?: string;
    project?: { name: string };
    comments?: Array<any>;
    created_at?: string;
    created_by?: { username: string };
    [key: string]: any;
  };
};

export default function BugDetail({ bug }: BugDetailProps) {
  const [status, setStatus] = useState(bug.status ?? "open");
  const [comments, setComments] = useState(bug.comments ?? []);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await updateBugStatus(bug.id, newStatus);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleNewComment = async (comment: { text: string; issue: number }) => {
    try {
      const createdComment = await apiCreateComment(comment.issue, comment.text);
      setComments((prev) => [...prev, createdComment]);
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'github-status-open';
      case 'closed':
        return 'github-status-closed';
      case 'in_progress':
      case 'in progress':
        return 'github-status-merged';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bug Header */}
      <div className="github-card border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Issue #{bug.id}</span>
              <span className={`github-status-badge ${getStatusColor(status)}`}>
                {status.replace("_", " ")}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{bug.title}</h1>
          </div>
        </div>

        {/* Bug Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg mb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Priority</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(bug.priority || 'medium')}`}>
                    {bug.priority || "Medium"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Assigned to</span>
                <p className="font-medium text-foreground mt-1">
                  {bug.assigned_to || "Unassigned"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Project</span>
                <p className="font-medium text-foreground mt-1">
                  {bug.project_name || "Unknown"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Created</span>
                <p className="font-medium text-foreground mt-1">
                  {bug.created_at ? new Date(bug.created_at).toLocaleDateString() : "Unknown date"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="text-foreground whitespace-pre-wrap">{bug.description}</p>
          </div>
        </div>

        {/* Status Update */}
        <div className="flex items-center gap-4 p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">Update status:</div>
          <div className="flex items-center gap-2">
            <span className={`github-status-badge ${getStatusColor(status)}`}>
              {status.replace("_", " ")}
            </span>
            <StatusDropdown
              currentStatus={status.replace("_", " ")}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="github-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Comments</h3>
          <span className="text-sm text-muted-foreground ml-auto">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <div 
                key={i} 
                className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {comment.user_name || comment.user || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.created_at || comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <h4 className="text-foreground font-medium mb-2">No comments yet</h4>
              <p className="text-muted-foreground">Be the first to comment on this issue</p>
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="mt-6 pt-6 border-t border-border">
          <AddCommentForm bugId={bug.id} onNewComment={handleNewComment} />
        </div>
      </div>
    </div>
  );
}