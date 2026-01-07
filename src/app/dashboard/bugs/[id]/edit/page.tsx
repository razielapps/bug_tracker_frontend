"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { BugForm } from "@/components/BugForm";
import { getBugById, updateBug, Bug } from "@/lib/api";

export default function EditBugPage() {
  const params = useParams();
  const rawId = params.id;

  // Convert string | string[] to number
  const bugId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const router = useRouter();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bugId) return;

    getBugById(bugId)
      .then((data) => setBug(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [bugId]);

  const handleSubmit = async (data: any) => {
    if (!bugId) return;

    try {
      await updateBug(bugId, data);
      router.push(`/dashboard/bugs/${bugId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update bug.");
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="p-4">Loading...</div>
      </Layout>
    );

  if (!bug)
    return (
      <Layout>
        <div className="p-4 text-red-500">Bug not found</div>
      </Layout>
    );

  return (
    <Layout>
      <BugForm initialValues={bug} onSubmit={handleSubmit} />
    </Layout>
  );
}
