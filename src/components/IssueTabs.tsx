// /components/IssueTabs.tsx
"use client";

import { useState, useEffect } from "react";
import { getIssuesByStatus } from "@/lib/api";

export default function IssueTabs({ projectId }) {
  const [activeTab, setActiveTab] = useState("open");
  const [issues, setIssues] = useState([]);

//   useEffect(() => {
//     getIssuesByStatus(projectId, activeTab).then(setIssues);
//   }, [projectId, activeTab]);

  return (
    <div>
      {/* <div className="flex space-x-4 mb-4">
        {["open", "closed", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded ${activeTab === status ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {issues.map((issue) => (
          <li key={issue.id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{issue.title}</h3>
            <p className="text-sm text-gray-600">{issue.description}</p>
          </li>
        ))}
      </ul> */}
      <p>Issues Tab</p>
    </div>
  );
}
