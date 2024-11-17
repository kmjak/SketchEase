"use server"

import setCookieUseCase from "@/usecase/cookie/setCookieUseCase"
import encryptUseCase from "@/usecase/crypto/encryptUseCase"
import createProjectUseCase from "@/usecase/project/createProjectUseCase"
import { redirect } from "next/navigation"
import { v4 as uuid4 } from "uuid"

export default async function CreateProject(formData: FormData) {
  const projectName = formData.get("projectName") as string
  const canvasSize = parseInt(formData.get("canvasSize") as string)
  const ownerId = formData.get("ownerId") as string
  const canvasData = Array.from({ length: canvasSize }, () =>
    Array.from({ length: canvasSize }, () => "")
  )
  const projectId = uuid4()
  await createProjectUseCase({ id:projectId, ownerId, projectName, canvasSize, canvasData })
  const cipher_project_id = await encryptUseCase({plain_text:projectId,mode:"cookie"})
  await setCookieUseCase({name:"projectId",value:cipher_project_id,maxAge:60*60*3})
  redirect("/project/edit")
}