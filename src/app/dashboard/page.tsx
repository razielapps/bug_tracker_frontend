'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import DashboardLayout from '@/components/DashboardLayout';
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";


export default function DashboardPage() {
  const [projects, setProjects] = useState([
    {
      "id": 1,
      "name": "BugTracker Pro",
      "description": "An issue tracking system for internal team use.",
      "created_by": {
        "id": 2,
        "username": "avt_admin",
        "email": "admin@autoverse.com"
      },
      "issues_count": 10,
      "open_issues": 4,
      "closed_issues": 6,
      "created_at": "2025-07-01T09:00:00Z"
    },
    {
      "id": 2,
      "name": "Frontend Redesign",
      "description": "Overhaul of the dashboard and UI components.",
      "created_by": {
        "id": 3,
        "username": "julius_dev",
        "email": "julius@autoverse.com"
      },
      "issues_count": 7,
      "open_issues": 2,
      "closed_issues": 5,
      "created_at": "2025-06-20T15:30:00Z"
    },
    {
      "id": 3,
      "name": "API Performance Audit",
      "description": "Testing and optimizing DRF endpoints for performance.",
      "created_by": {
        "id": 2,
        "username": "avt_admin",
        "email": "admin@autoverse.com"
      },
      "issues_count": 5,
      "open_issues": 1,
      "closed_issues": 4,
      "created_at": "2025-07-15T12:45:00Z"
    },
    {
      "id": 4,
      "name": "Security Patch Sprint",
      "description": "Focused patching for recent CVEs and threats.",
      "created_by": {
        "id": 4,
        "username": "cyber_ace",
        "email": "security@autoverse.com"
      },
      "issues_count": 12,
      "open_issues": 8,
      "closed_issues": 4,
      "created_at": "2025-07-22T10:15:00Z"
    },
    {
      "id": 5,
      "name": "Docs & Onboarding",
      "description": "Improving documentation and onboarding workflow.",
      "created_by": {
        "id": 3,
        "username": "julius_dev",
        "email": "julius@autoverse.com"
      },
      "issues_count": 3,
      "open_issues": 0,
      "closed_issues": 3,
      "created_at": "2025-07-10T08:30:00Z"
    }

  ]);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return (
    <Layout>
      <DashboardLayout >

        <div id="home_div">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        </div>

      </DashboardLayout>
    </Layout>
  );
}
