"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type BugFormValues = {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
};

export function BugForm({
  onSubmit,
  initialValues,
}: {
  onSubmit: (data: BugFormValues) => void;
  initialValues?: BugFormValues | null;
}) {
  const [form, setForm] = useState<BugFormValues>({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        priority: initialValues.priority ?? "medium",
        status: initialValues.status ?? "open",
      });
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input name="title" value={form.title} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
