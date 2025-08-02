// /dashboard/projects/[projectId]/page.tsx
import { getProjectDetails } from "@/lib/api"; // assumes you have this function
import IssueTabs from "@/components/IssueTabs";

export default async function ProjectDetailPage({ params }) {
  const projectId = params.projectId;
  const project = await getProjectDetails(projectId);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>

      <IssueTabs projectId={projectId} />
    </div>
  );
}
