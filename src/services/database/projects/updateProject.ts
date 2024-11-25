"use server"

import project_url from "@/lib/url/projects/projects_url";
import ProjectType from "@/types/interface/project/ProjectType";

export default async function updateProject({id, ownerId, projectName, canvasSize, canvasData}:ProjectType) : Promise<boolean>{
  const canvasDataString = JSON.stringify(canvasData)
  const res = await fetch(`${project_url!}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ownerId, projectName, canvasSize, canvasData:canvasDataString }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(res.status === 200){
    return true
  }
  return false
}
