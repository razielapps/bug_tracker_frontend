"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddCommentForm({
  bugId,
  onNewComment,
}: {
  bugId: number;
  onNewComment: (comment: { text: string; issue: number }) => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    try {
      // pass text + issue ID
      await onNewComment({ text: content, issue: bugId });
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <Textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" disabled={loading || !content}>
        {loading ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
