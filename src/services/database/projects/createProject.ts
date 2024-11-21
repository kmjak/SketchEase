"use server"

import ProjectType from "@/types/interface/project/ProjectType";
import project_url from "@/lib/url/projects/projects_url";

export default async function createProject({ id, ownerId, projectName, canvasSize, canvasData }: ProjectType): Promise<boolean> {
  const canvasDataString = JSON.stringify(canvasData)
  const res = await fetch(project_url!, {
    method: "POST",
    body: JSON.stringify({ id, ownerId, projectName, canvasSize, canvasData:canvasDataString }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}
