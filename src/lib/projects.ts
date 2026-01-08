import api from "./axios";

export async function createProject(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post("/projects/", data);
  return res.data;
}

export async function updateProject(
  id: number,
  data: {
    name: string;
    description?: string;
  }
) {
  const res = await api.patch(`/projects/${id}/`, data);
  return res.data;
}

export async function getProject(id: number) {
  const res = await api.get(`/projects/${id}/`);
  return res.data;
}
