"use server"

import ProjectType from "@/types/interface/project/ProjectType";
import fetchAllProjects from "@/services/database/projects/fetchAllProjects";

interface GetAllProjectUseCaseProps {
  ownerId: string;
}

export default async function getAllProjectUseCase({ownerId}:GetAllProjectUseCaseProps) : Promise<ProjectType[] | []>{
  const returnData : ProjectType[] = []
  const res = await fetchAllProjects()
  if (res) {
    res.map((project) => {
      if(project.ownerId !== ownerId){
        return
      }
      project.canvasData = JSON.parse(project.canvasData as unknown as string);
      returnData.push(project)
    })
  }
  return returnData
}