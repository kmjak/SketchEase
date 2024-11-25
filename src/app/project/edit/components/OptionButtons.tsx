import ActionButtons from "./ActionButtons";

interface OptionButtonsProps {
  mode: string;
  setMode: (mode: "pen" | "eraser" | "bucket" | "spuit") => void;
  color: string;
  setColor: (color: string) => void;
  handleSave: () => void;
  handleExit: () => void;
}

export default function OptionButtons({mode, setMode, color, setColor, handleSave, handleExit} : OptionButtonsProps) {
  return (
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
      <ActionButtons
        handleSave={handleSave}
        handleExit={handleExit}
      />
    </div>
  )
}