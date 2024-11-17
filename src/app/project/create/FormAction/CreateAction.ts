"use server"

export default async function CreateProject(formData:FormData) {
  const project_name = formData.get("projectName");
  const canvas_size = formData.get("canvasSize");
  console.log(project_name, canvas_size);
}