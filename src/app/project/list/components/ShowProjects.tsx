"use client"

import useCookie from "@/hooks/cookie/useCookie";
import ProjectType from "@/types/interface/project/ProjectType";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";
import encryptUseCase from "@/usecase/crypto/encryptUseCase";
import getAllProjectsUseCase from "@/usecase/project/getAllProjectsUseCase";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowProjects() {
  const [projects, setProjects] = useState<ProjectType[] | []>([]);
  const [ownerId, setOwnerId] = useState<string>("");
  const { getCookie, setCookie } = useCookie()
  useEffect(() => {
    const fetchOwnerId = async () => {
      const cipher_userId = await getCookie("id");
      const plain_userId = await decryptUseCase({cipher_text: cipher_userId!, mode: "cookie"});
      setOwnerId(plain_userId!);
    }
    fetchOwnerId();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getAllProjectsUseCase({ownerId});
      setProjects(res);
    }
    fetchProjects();
  }, [ownerId]);

  const openProject = async (projectId:string) => {
    const cipher_projectId = await encryptUseCase({plain_text: projectId, mode: "cookie"});
    await setCookie("projectId", cipher_projectId, 60*60*24);
    redirect("/project/edit");
  }

  return (
    <section className="p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          return (
            <li
              key={project.id}
              onClick={() => openProject(project.id)}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 hover:border-gray-400"
            >
              <h2 className="text-xl font-semibold text-gray-700">{project.projectName}</h2>
            </li>
          );
        })}
      </ul>
    </section>
  );
}