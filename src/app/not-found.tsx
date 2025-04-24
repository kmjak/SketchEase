import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-3xl">404 - Not Found!</h1>
      <Link href="auth" className="text-lg underline text-blue-600">
        認証をしてください
      </Link>
    </div>
  );
}
