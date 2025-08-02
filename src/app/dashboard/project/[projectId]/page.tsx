// src/app/dashboard/projects/[id]/page.tsx

"use client";

import { use, useEffect, useState } from 'react';
import { getProjectDetails } from '@/lib/api';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // unwrap the params Promise
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    getProjectDetails(id).then(setProject);
  }, [id]);

  if (!project) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-gray-600">{project.description}</p>

        <h2 className="mt-4 text-lg font-semibold">Issues</h2>
        <ul>
          {project.issues.map((issue: any) => (
            <li key={issue.id}>
              <Link href={`/dashboard/bugs/1`}>
                <strong>{issue.title}</strong> - {issue.status} ({issue.priority})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
