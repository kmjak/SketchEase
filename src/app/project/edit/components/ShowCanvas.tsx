import ProjectType from "@/types/interface/project/ProjectType";

interface ShowCanvasProps {
  project: ProjectType;
  handleMouseDown: (rowIndex: number, cellIndex: number) => void;
  handleMouseEnter: (rowIndex: number, cellIndex: number) => void;
}

export default function ShowCanvas({project, handleMouseDown, handleMouseEnter} : ShowCanvasProps) {
  return (
    <>
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
    </>
  )
}