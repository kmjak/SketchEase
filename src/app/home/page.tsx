import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-10 drop-shadow-md">
        Welcome to SketchEase
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-md">
        Start a new project, explore past work, or see what others have created!
      </p>
      <div className="flex space-x-4">
        <Link href="project/create">
          <button className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
            New Project
          </button>
        </Link>
        <Link href="project/list">
          <button className="flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
            Projects
          </button>
        </Link>
      </div>
    </div>
  );
}