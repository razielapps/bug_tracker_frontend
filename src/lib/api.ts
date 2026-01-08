
// lib/api.ts
import { ProjectFormValues } from '@/components/ProjectForm';
import api from './axios';

/* ------------------ Types ------------------ */
export type Bug = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to?: string;
  project?: { id: string; name: string };
  comments?: Comment[];
  [key: string]: any;
};

export type Comment = {
  id: number;
  text: string;
  user: string;
  timestamp: string;
};

export type Project = {
  id: number | string;
  name: string;
  description: string;
  created_by: { id: number; username: string; email: string };
  issues_count?: number;
  open_issues?: number;
  closed_issues?: number;
  [key: string]: any;
};

/* ------------------ Projects ------------------ */
export async function getProjects(): Promise<Project[]> {
  const res = await api.get('/projects/');
  return res.data;
}

export async function getProjectDetails(
  projectId: string | number
): Promise<Project> {
  const res = await api.get(`/projects/${projectId}/`);
  return res.data;
}



/* ------------------ Bugs / Issues ------------------ */
export async function getAllBugs(): Promise<Bug[]> {
  const res = await api.get('/issues/');
  return res.data;
}

export async function getBugById(
  bugId: string | number
): Promise<Bug> {
  const res = await api.get(`/issues/${bugId}/`);
  return res.data;
}

export async function createBug(
  projectId: string | number,
  bugData: Partial<Bug>
): Promise<Bug> {
  const res = await api.post('/issues/', {
    ...bugData,
    project: projectId,
  });
  return res.data;
}


// export async function updateProject(
//   id: number,
//   data: {
//     name: string;
//     description?: string;
//   }
// ) {
//   const res = await api.patch(`/projects/${id}/`, data);
//   return res.data;
// }


export async function updateBug(
  bugId: string | number,
  updatedData: Partial<Bug>
): Promise<Bug> {
  const res = await api.patch(`/issues/${bugId}/`, updatedData);
  return res.data;
}

export async function updateProject(
  projectId: string | number,
  updatedData: Partial<ProjectFormValues>
): Promise<Project> {
  try {
    const res = await api.patch(`/projects/${projectId}/`, updatedData);
    return res.data;
  } catch (err: any) {
    // Normalize backend errors
    const message =
      err.response?.data?.detail ||
      err.response?.data?.message ||
      "You do not have permission to update this project.";

    // Throw, don't alert
    throw new Error(message);
  }
}


export async function updateBugStatus(
  bugId: string | number,
  newStatus: string
): Promise<Bug> {
  const res = await api.patch(`/issues/${bugId}/`, { status: newStatus });
  return res.data;
}

/* ------------------ Comments ------------------ */
export async function getComments(
  bugId: string | number
): Promise<Comment[]> {
  const res = await api.get('/comments/', {
    params: { issue: bugId },
  });
  return res.data;
}

export async function createComment(issueId: number, text: string) {
  try {
    const response = await api.post("/comments/", {
      text,
      issue: issueId, // send the issue ID
    });

    return response.data; // return the created comment
  } catch (err: any) {
    console.error("Error creating comment:", err);
    throw new Error(err.response?.data?.detail || "Failed to create comment");
  }
}

/* ------------------ Filters ------------------ */
export async function getIssuesByProject(
  projectId: string | number
) {
  const res = await api.get('/issues/', {
    params: { project: projectId },
  });
  return res.data;
}

export async function getIssuesByStatus(
  projectId: string | number,
  status: string
) {
  const res = await api.get('/issues/', {
    params: { project: projectId, status },
  });
  return res.data;
}