"use client"

import useCookie from "@/hooks/cookie/useCookie";
import ProjectType from "@/types/interface/project/ProjectType";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";
import getAllProjectsUseCase from "@/usecase/project/getAllProjectsUseCase";
import { useEffect, useState } from "react";

export default function ShowProjects() {
  const [projects, setProjects] = useState<ProjectType[] | []>([]);
  const [ownerId, setOwnerId] = useState<string>("");
  const { getCookie } = useCookie();
  
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

  return (
    <section>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <h2>{project.projectName}</h2>
            </li>
          );
        })}
      </ul>
    </section>
  );
}