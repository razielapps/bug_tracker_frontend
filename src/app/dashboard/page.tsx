'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/DashboardLayout';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/api';

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <DashboardLayout>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        {loading && <p>Loading projects...</p>}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="text-gray-500 italic">empty</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
}
