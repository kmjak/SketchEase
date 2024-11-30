"use client"
import { useEffect } from "react";
import CreateProject from "../FormAction/CreateAction";
import useAuth from "@/hooks/auth/useAuth";
import Link from "next/link";

export default function ProjectForm() {
  const { id, getUserId } = useAuth();
  useEffect(() => {
    const fetchUserId = async () => {
      await getUserId()
    }
    fetchUserId()
  }, [])
  return (
    <form className="flex flex-col gap-4 items-start space-y-4" action={CreateProject}>
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
        name="canvasSize"
        min="1"
        max="1000"
        placeholder="Enter size"
        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <input type="hidden" name="ownerId" value={id} />
    <div className="flex gap-8 w-full">
      <Link
        href="/home"
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Cancel
      </Link>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Create
      </button>
    </div>
  </form>
  )
}