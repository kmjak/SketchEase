import ProjectType from "@/types/interface/project/ProjectType";
import getProjectUseCase from "@/usecase/project/getProjectUseCase";
import { useState } from "react";

export default function useProject (){
  const [projectId,setProjectId] = useState<string>('')
  const [project, setProject] = useState<ProjectType | null>(null);
  const getProject = async () => {
    const res = await getProjectUseCase({projectId})
    console.log(res)
    setProject(res)
  }
  return {
    getProject,
    project,
    setProject,
    projectId,
    setProjectId
  }
}