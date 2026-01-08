"use client";

import { useEffect, useState } from "react";

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
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Title *
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="github-form-input"
          placeholder="Enter a descriptive title for the issue"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={6}
          className="github-form-input resize-y"
          placeholder="Describe the issue in detail..."
        />
      </div>

      {/* Priority and Status Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="github-form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="mt-2 flex gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${
              form.priority === 'low' ? 'bg-green-500' : 'bg-muted'
            }`} />
            <span className={`inline-block w-3 h-3 rounded-full ${
              form.priority === 'medium' ? 'bg-yellow-500' : 'bg-muted'
            }`} />
            <span className={`inline-block w-3 h-3 rounded-full ${
              form.priority === 'high' ? 'bg-red-500' : 'bg-muted'
            }`} />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="github-form-input"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              form.status === 'open' ? 'github-status-open' :
              form.status === 'in_progress' ? 'github-status-merged' :
              form.status === 'resolved' || form.status === 'closed' ? 'github-status-closed' :
              'bg-muted text-muted-foreground'
            }`}>
              {form.status?.replace('_', ' ') || 'open'}
            </span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="github-btn-outline px-6"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !form.title || !form.description}
          className={`github-btn-primary px-6 ${
            submitting || !form.title || !form.description
              ? 'opacity-70 cursor-not-allowed'
              : ''
          }`}
          style={{ cursor: submitting || !form.title || !form.description ? 'not-allowed' : 'pointer' }}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}