"use client";

import useCookie from "@/hooks/cookie/useCookie";
import useProject from "@/hooks/project/useProject";
import updateProject from "@/services/database/projects/updateProject";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";
import { useEffect, useState } from "react";
import ExitModal from "./components/ExitModal";

export default function Page() {
  const [mode, setMode] = useState<"pen" | "eraser" | "bucket" | "spuit">("pen");
  const [color, setColor] = useState('#000000');
  const [ModalState, setModalState] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const { getCookie } = useCookie();
  const { setProjectId, getProject, project, projectId } = useProject();

  useEffect(() => {
    const fetchData = async () => {
      const cipher_userId = await getCookie("id");
      const cipher_projectId = await getCookie("projectId");
      if (cipher_projectId === null || cipher_userId === null) return;
      const plain_projectId = await decryptUseCase({
        cipher_text: cipher_projectId!,
        mode: "cookie",
      });
      setProjectId(plain_projectId);
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

  const isRange = (row: number, col: number) => {
    return (
      row >= 0 &&
      row < project!.canvasData.length &&
      col >= 0 &&
      col < project!.canvasData[0].length
    );
  }

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    if (mode === "pen") {
      project!.canvasData[row][col] = color;
    }
    if (mode === "eraser") {
      project!.canvasData[row][col] = '';
    }
    if (mode === "bucket") {
      const start_color = project!.canvasData[row][col];
      const queue: [number, number][] = [[row, col]];
      const visited: boolean[][] = project!.canvasData.map(row => row.map(() => false));
      while (queue.length > 0) {
        const [x, y] = queue.shift()!;
        if (!isRange(x, y) || visited[x][y]) continue;
        if (project!.canvasData[x][y] !== start_color) continue;
        project!.canvasData[x][y] = color;
        visited[x][y] = true;
        queue.push(
          [x+1, y],
          [x-1, y],
          [x, y+1],
          [x, y-1]
        );
      }
    }
    if(mode === "spuit") {
      const set_color = project!.canvasData[row][col];
      setColor(set_color);
    }
  };
  const handleMouseUp = () => setIsDrawing(false);

  const handleMouseEnter = async (row: number, col: number) => {
    if (isDrawing && mode === "pen") {
      project!.canvasData[row][col] = color;
    }
    if (isDrawing && mode === "eraser") {
      project!.canvasData[row][col] = '';
    }
  };

  const handleSave = async () => {
    const res = await updateProject({
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

  const handleExit = async () => {
    setModalState(true);
  }

  return (
    <main>
      <section
        className="flex flex-col items-start space-y-4 justify-end"
        onMouseUp={handleMouseUp}
      >
        {project?.canvasData && (
          <div className="p-4 bg-blue-500">
            <div className="w-full h-full">
              {project.canvasData.map((row: string[], rowIndex: number) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell: string, cellIndex: number) => (
                    <div
                      key={`${rowIndex}-${cellIndex}`}
                      className="w-10 h-10 border border-neutral-300 bg-gray-100 text-sm"
                      style={{ backgroundColor: cell }}
                      onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                      onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-80 bg-white shadow-xl p-6 flex flex-col justify-between fixed right-0 top-0 mx-5">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Canvas Tools</h2>
            <div className="flex space-x-4 mb-6">
              <button
                className={`h-12 w-12 rounded-full transition-all ${mode === "pen" ? "bg-blue-500 text-white" : "bg-neutral-200 text-gray-700"}`}
                onClick={() => setMode("pen")}
              >
                🖋️
              </button>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 p-1 rounded-full border-2 border-neutral-300"
              />
              <button
                className={`h-12 w-12 rounded-full transition-all ${mode === "eraser" ? "bg-blue-500 text-white" : "bg-neutral-200 text-gray-700"}`}
                onClick={() => setMode("eraser")}
              >
                🧽
              </button>
              <button
                className={`h-12 w-12 rounded-full transition-all ${mode === "bucket" ? "bg-blue-500 text-white" : "bg-neutral-200 text-gray-700"}`}
                onClick={() => setMode("bucket")}
              >
                🪣
              </button>
              <button
                className={`h-12 w-12 rounded-full transition-all ${mode === "spuit" ? "bg-blue-500 text-white" : "bg-neutral-200 text-gray-700"}`}
                onClick={() => setMode("spuit")}
              >
                💉
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className="flex-grow bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleSave}
            >
              保存
            </button>
            <button
              className="flex-grow bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              onClick={handleExit}
            >
              終了
            </button>
          </div>
        </div>
      </section>
      {ModalState && (
        <ExitModal
          save={handleSave}
          setModalState={setModalState}
        />
      )}
    </main>
  );
}