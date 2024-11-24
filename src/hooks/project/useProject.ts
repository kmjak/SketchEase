import ProjectType from "@/types/interface/project/ProjectType";
import getProjectUseCase from "@/usecase/project/getProjectUseCase";
import { useState } from "react";

export default function useProject (){
  const [projectId,setProjectId] = useState<string>('')
  const [ownerId,setOwnerId] = useState<string>('')
  const [project, setProject] = useState<ProjectType | null | undefined>(undefined);
  const getProject = async () => {
    const res = await getProjectUseCase({projectId, ownerId})
    setProject(res)
  }
  return {
    getProject,
    project,
    setProject,
    projectId,
    setProjectId,
    setOwnerId,
  }
}