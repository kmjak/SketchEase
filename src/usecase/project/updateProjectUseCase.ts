"use server"

import updateProject from "@/services/database/projects/updateProject"
import ProjectType from "@/types/interface/project/ProjectType"

export default async function updateProjectUseCase({id, ownerId, projectName, canvasSize, canvasData}:ProjectType): Promise<boolean> {
  return await updateProject({id, ownerId, projectName, canvasSize, canvasData})
}