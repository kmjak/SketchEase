"use server"

import project_url from "@/lib/url/projects/projects_url";
import ProjectType from "@/types/interface/project/ProjectType";

export default async function fetchProject() : Promise<ProjectType[] | null>{
  const res = await fetch(`${project_url!}`, {
    method: "GET"
  });
  const project = await res.json()
  return project
}
