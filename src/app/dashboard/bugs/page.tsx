"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllBugs, Bug } from "@/lib/api";

export default function BugListPage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getAllBugs();
        setBugs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bugs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Bug List</h1>

        {loading && <p>Loading bugs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {bugs.length > 0 ? (
              bugs.map((bug) => (
                <Link
                  key={bug.id}
                  href={`/dashboard/bugs/${bug.id}`}
                  className="block border p-4 rounded hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium">{bug.title}</h2>
                    <Badge>{bug.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Priority: <span className="font-medium">{bug.priority}</span>
                    {" • "}Assigned to: <span className="font-medium">{bug.assigned_to}</span>
                    {" • "}Created: {new Date(bug.createdAt || bug.created_at).toLocaleString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No bugs found.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
