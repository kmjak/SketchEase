import ProjectType from "@/types/interface/project/ProjectType";
import getProjectUseCase from "@/usecase/project/getProjectUseCase";
import { useEffect, useState } from "react";
import updateProjectUseCase from "@/usecase/project/updateProjectUseCase";
import getCookieUseCase from "@/usecase/cookie/getCookieUseCase";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";
import setCookieUseCase from "@/usecase/cookie/setCookieUseCase";
import { redirect } from "next/navigation";

export default function useProject (){
  const [projectId,setProjectId] = useState<string>('')
  const [ownerId,setOwnerId] = useState<string>('')
  const [project, setProject] = useState<ProjectType | null | undefined>(undefined);
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<"pen" | "eraser" | "bucket" | "spuit">("pen");

  useEffect(() => {
    const fetchData = async () => {
      const cipher_userId = await getCookieUseCase({name:"id"});
      const cipher_projectId = await getCookieUseCase({name:"projectId"});
      const plain_projectId = await decryptUseCase({cipher_text: cipher_projectId!, mode: "cookie"});
      const plain_userId = await decryptUseCase({cipher_text: cipher_userId!, mode: "cookie"});
      setProjectId(plain_projectId);
      setOwnerId(plain_userId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (projectId === "") return;
      getProject();
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (project === null) {
      alert("プロジェクトが存在しないか、権限がありません");
      setCookieUseCase({name:"projectId", value:"", maxAge:0});
      redirect("/home");
    }
  }, [project]);

  const getProject = async () => {
    const res = await getProjectUseCase({projectId, ownerId})
    setProject(res)
  }

  const handleMouseUp = () => setIsDrawing(false);

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    const DX = [0, 1, 0, -1];
    const DY = [1, 0, -1, 0];
    if (mode === "pen") {
      project!.canvasData[row][col] = color;
    }
    if (mode === "eraser") {
      project!.canvasData[row][col] = '';
    }
    if (mode === "bucket") {
      const start_color = project!.canvasData[row][col];
      project!.canvasData[row][col] = color;
      const queue: [number, number][] = [[row, col]];
      while (queue.length > 0) {
        const [y,x] = queue.shift()!;
        for(let i = 0; i < 4; i++){
          const nx = x + DX[i];
          const ny = y + DY[i];
          if(isRange(nx,ny) && project!.canvasData[ny][nx] === start_color){
            project!.canvasData[ny][nx] = color;
            queue.push([ny,nx]);
          }
        }
      }
    }
    if(mode === "spuit") {
      const set_color = project!.canvasData[row][col];
      setColor(set_color);
    }
  };

  const isRange = (row: number, col: number) => {
    return (
      row >= 0 &&
      row < project!.canvasSize &&
      col >= 0 &&
      col < project!.canvasSize
    );
  }


  const handleMouseEnter = async (row: number, col: number) => {

    if (isDrawing && mode === "pen") {
      project!.canvasData[row][col] = color;
    }
    if (isDrawing && mode === "eraser") {
      project!.canvasData[row][col] = '';
    }
  };

  const handleSave = async () => {
    const res = await updateProjectUseCase({
      id: project!.id,
      ownerId: project!.ownerId,
      projectName: project!.projectName,
      canvasSize: project!.canvasSize,
      canvasData: project!.canvasData,
    });
    if (res) {
      alert("保存しました");
    } else {
      alert("保存に失敗しました");
    }
  }

  return {
    project,
    setProject,
    projectId,
    setProjectId,
    setOwnerId,
    color,
    setColor,
    isDrawing,
    mode,
    setMode,
    getProject,
    handleSave,
    handleMouseUp,
    handleMouseDown,
    handleMouseEnter,
  }
}