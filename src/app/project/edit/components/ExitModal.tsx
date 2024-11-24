import { redirect } from "next/navigation";

interface ExitModalProps {
  save: () => void;
  setModalState: (state: false) => void;
}

export default function ExitModal({save, setModalState}:ExitModalProps) {
  const handleExitWithSave = async () => {
    await save()
    redirect("/home");
  }
  return (
    <>
      <div className="h-screen w-screen bg-black opacity-35 fixed inset-0" />
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">保存して終了しますか？</h2>
        <div className="flex space-x-4">
          <button
            className="flex-grow bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleExitWithSave}
          >
            保存して終了
          </button>
          <button
            className="flex-grow bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => redirect("/home")}
          >
            保存せずに終了
          </button>
          <button
            className="flex-grow bg-neutral-200 text-gray-700 py-3 rounded-lg hover:bg-neutral-300 transition-colors"
            onClick={() => setModalState(false)}
          >
            キャンセル
          </button>
        </div>
      </div>
    </>
  );
}