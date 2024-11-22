"use server"

import fetchProject from "@/services/database/projects/fetchProject";
import ProjectType from "@/types/interface/project/ProjectType";

interface getProjectUseCaseProps {
  projectId: string;
}

export default async function getProjectUseCase({projectId}:getProjectUseCaseProps) : Promise<ProjectType | null>{
  const res = await fetchProject({projectId})
  if (res) {
    res.canvasData = JSON.parse(res.canvasData as unknown as string);
  }
  return res
}