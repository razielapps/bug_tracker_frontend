"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type ProjectFormValues = {
  name: string;
  description?: string;
};

export function ProjectForm({
  initialValues,
  onSubmit,
  isSubmitting,
}: {
  initialValues?: ProjectFormValues | null;
  onSubmit: (data: ProjectFormValues) => void;
  isSubmitting?: boolean;
}) {
  const [form, setForm] = useState<ProjectFormValues>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name ?? "",
        description: initialValues.description ?? "",
      });
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <Label htmlFor="name">Project Name</Label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
}
