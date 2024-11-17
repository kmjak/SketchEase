export default function Page() {
  return (
    <main className="flex flex-col items-center p-6 space-y-4 h-screen justify-center">
      <div className="px-12 py-14 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-12">Create a new project</h1>
        <form className="flex flex-col gap-4 items-start space-y-4">
          <div className="">
            <label htmlFor="project-name" className="text-lg font-medium">project name</label>
            <input
              type="text"
              id="project-name"
              name="projectName"
              placeholder="Enter name"
              className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="">
            <label htmlFor="canvas-size" className="text-lg font-medium">
              Size (1-1000):
            </label>
            <input
              type="number"
              id="canvas-size"
              name="canvas-size"
              min="1"
              max="1000"
              placeholder="Enter size"
              className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}