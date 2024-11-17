import ProjectForm from "./components/ProjectForm";

export default function Page() {
  return (
    <main className="flex flex-col items-center p-6 space-y-4 h-screen justify-center">
      <div className="px-12 py-14 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-12">Create a new project</h1>
        <ProjectForm />
      </div>
    </main>
  );
}