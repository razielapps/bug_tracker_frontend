// /lib/api.ts
import axios from 'axios';

export async function getProjectDetails(id: string) {
  const res = await axios.get(`/api/projects/${id}`);
  return res.data;
}

export async function getIssuesByStatus(projectId: string, status: string) {
  let url = `/api/projects/${projectId}/issues`;
  if (status !== "all") url += `?status=${status}`;
  const res = await fetch(url);
  return res.json();
}


// lib/api.ts

export async function getBugById(id: string) {
  // Simulate a database delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const mockBugs = [
    {
      id: "1",
      title: "Login form validation fails on empty password",
      description: "When the password field is left blank and submitted, the form crashes instead of showing an error.",
      status: "Open",
      priority: "High",
      assigned_to: "Alice Johnson",
      project: {
        name: "Authentication Module",
        id: "proj-001",
      },
      comments: [
        {
          user: "Bob",
          text: "I think the backend isn't handling empty strings properly.",
          timestamp: "2025-07-27T14:20:00Z",
        },
        {
          user: "Alice",
          text: "I'll debug the handler function and report back.",
          timestamp: "2025-07-28T09:15:00Z",
        },
      ],
    },
    {
      id: "2",
      title: "Dark mode styles not applying on refresh",
      description: "Users have to toggle dark mode twice for it to take effect after a hard refresh.",
      status: "In Progress",
      priority: "Medium",
      assigned_to: "Daniel Kim",
      project: {
        name: "UI Overhaul Project",
        id: "proj-002",
      },
      comments: [
        {
          user: "Chloe",
          text: "Might be a hydration mismatch. Check `_document.tsx`.",
          timestamp: "2025-07-26T11:00:00Z",
        },
      ],
    },
    {
      id: "3",
      title: "Dashboard chart misaligned on mobile",
      description: "Charts in the dashboard don't scale properly below 768px width.",
      status: "Closed",
      priority: "Low",
      assigned_to: "Michael O'Neil",
      project: {
        name: "Analytics Dashboard",
        id: "proj-003",
      },
      comments: [],
    },
  ];

  return mockBugs.find((bug) => bug.id === id) || null;
}
