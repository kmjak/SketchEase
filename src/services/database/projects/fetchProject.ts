"use server"

import project_url from "@/lib/url/projects/projects_url";
import ProjectType from "@/types/interface/project/ProjectType";

interface fetchProjectProps {
  projectId: string;
}

export default async function fetchProject({projectId}:fetchProjectProps) : Promise<ProjectType | null>{
  const res = await fetch(`${project_url!}/${projectId}`, {
    method: "GET"
  });
  const project = await res.json()
  return project
}
