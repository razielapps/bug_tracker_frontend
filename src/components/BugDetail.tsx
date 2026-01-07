"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    [key: string]: any;
  };
};

export default function BugDetail({ bug }: BugDetailProps) {
  const [status, setStatus] = useState(bug.status ?? "open");
  const [comments, setComments] = useState(bug.comments ?? []);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await updateBugStatus(bug.id, newStatus); // API call
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
  console.log(bug)
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{bug.title}</h2>
          <Badge variant="outline">{status.replace("_", " ")}</Badge>
        </div>

        <p className="text-gray-700">{bug.description}</p>

        <div className="text-sm space-y-1">
          <p>
            <strong>Priority:</strong> {bug.priority ?? "Medium"}
          </p>
          <p>
            <strong>Assigned to:</strong> {bug.assigned_to ?? "Unassigned"}
          </p>
          <p>
            <strong>Project:</strong> {bug.project ?? "Unknown"}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Comments</h3>
          <div className="space-y-2">

            {comments.length > 0 ? (
              comments.map((comment, i) => (
                <div key={i} className="border p-2 rounded-md text-sm">
                  <p>{comment.text}</p>
                  <span className="text-xs text-gray-500">
                    – {comment.user_name || comment.user} on{" "}
                    {new Date(comment.created_at || comment.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
          <AddCommentForm bugId={bug.id} onNewComment={handleNewComment} />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary">{status.replace("_", " ")}</Badge>
          <StatusDropdown
            currentStatus={status.replace("_", " ")}
            onStatusChange={handleStatusChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
