interface ActionButtonsProps {
  handleSave: () => void;
  handleExit: () => void;
}

export default function ActionButtons({handleSave, handleExit} : ActionButtonsProps) {
  return (
    <div className="flex gap-x-4">
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
  )
}