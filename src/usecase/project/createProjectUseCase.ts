"use server"

import createProject from "@/services/database/projects/createProject";
import ProjectType from "@/types/interface/project/ProjectType";

export default async function createProjectUseCase ({ id, ownerId, projectName, canvasSize, canvasData }: ProjectType){
  if(await createProject({ id, ownerId, projectName, canvasSize, canvasData })){
    return true
  }else{
    return false
  }
}