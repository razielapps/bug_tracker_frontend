"use client";

import { useState, useEffect } from "react";
import { getIssuesByStatus } from "@/lib/api";
import Link from "next/link";

export default function IssueTabs({ projectId }: { projectId: number | string }) {
  const [activeTab, setActiveTab] = useState("open");
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getIssuesByStatus(projectId, activeTab)
      .then(setIssues)
      .finally(() => setLoading(false));
  }, [projectId, activeTab]);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {["open", "closed", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded ${
              activeTab === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-3 rounded shadow">
              <Link href={`/dashboard/bugs/${issue.id}`}>
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">{issue.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
