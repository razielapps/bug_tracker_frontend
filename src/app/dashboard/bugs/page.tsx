// app/(dashboard)/bugs/page.tsx

'use client';
import { mockBugs } from '@/data/bugs';
import { Badge } from '@/components/ui/badge'; // make sure this is installed
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function BugListPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Bug List</h1>
        <div className="space-y-4">
          {mockBugs.map((bug) => (
            <Link
              key={bug.id}
              href={`/dashboard/bugs/1`}
              className="block border p-4 rounded hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">{bug.title}</h2>
                <Badge>{bug.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Priority: <span className="font-medium">{bug.priority}</span>
                {' • '}Assigned to: <span className="font-medium">{bug.assignee}</span>
                {' • '}Created: {bug.createdAt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
