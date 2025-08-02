// src/app/api/projects/[id]/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Temporary mock data for project details
  const mockProject = {
    id,
    name: "Bug Tracker Core",
    description: "A central bug tracking project for team Alpha.",
    created_by: "admin_user",
    members: [
      { id: 1, username: "admin_user", role: "Owner" },
      { id: 2, username: "dev_jane", role: "Developer" },
    ],
    issues: [
      {
        id: 101,
        title: "Login Page Error",
        description: "Error when submitting the login form.",
        status: "Open",
        priority: "High",
        assigned_to: "dev_jane",
      },
      {
        id: 102,
        title: "Dashboard crash on mobile",
        description: "Dashboard UI crashes on small screen devices.",
        status: "In Progress",
        priority: "Medium",
        assigned_to: "dev_jane",
      }
    ]
  };

  return NextResponse.json(mockProject);
}
