'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export default function NewBugForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value: string) => {
    setFormData({ ...formData, priority: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit logic here (mocked)
    console.log('New bug submitted:', { ...formData, projectId });

    router.push(`/projects/${projectId}`);
  };
// const handleSubmit = async (formData: BugFormType) => {
//   try {
//     const newBug = await createBug(projectId, formData);
//     console.log("Created Bug:", newBug);
//     router.push(`/projects/${projectId}`);
//   } catch (error) {
//     console.error("Error creating bug:", error);
//   }
// };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <Input
        name="title"
        placeholder="Issue Title"
        onChange={handleChange}
        required
      />

      <Textarea
        name="description"
        placeholder="Describe the issue..."
        onChange={handleChange}
        required
      />

      <div>
        <label className="block mb-1 font-medium">Priority</label>
        <Select onValueChange={handlePriorityChange} defaultValue="Medium">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        name="assignedTo"
        placeholder="Assignee (Optional)"
        onChange={handleChange}
      />

      <Button type="submit" className="w-full">Create Issue</Button>
    </form>
  );
}
