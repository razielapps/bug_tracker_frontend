"use client";

import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle, CircleDot } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <Card className="p-4 shadow-sm rounded-2xl space-y-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          {project.name}
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-blue-600">{project.issues_count}</span> issues
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <CircleDot className="w-4 h-4 text-yellow-500" />
              {project.open_issues}
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {project.closed_issues}
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Created by {project.created_by.username} on{" "}
          {new Date(project.created_at).toLocaleDateString()}
        </div>
      </Card>
    </Link>
  );
}
