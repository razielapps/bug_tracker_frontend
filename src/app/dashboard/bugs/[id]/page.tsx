// src/app/dashboard/bugs/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import BugDetail from "@/components/BugDetail";
import Layout from "@/components/Layout";
import { getBugById } from "@/lib/api";

export default function BugPage({ params }: { params: { id: string } }) {
    const [bug, setBug] = useState<any>(null);

    useEffect(() => {
        getBugById(params.id).then(setBug);
    }, [params.id]);

    if (!bug) return <Layout><div className="p-4 text-red-500">Bug not found</div></Layout>;

    return (
        <Layout>
            <div className="p-6">
                <BugDetail bug={bug} />
            </div>
        </Layout>
    );
}
