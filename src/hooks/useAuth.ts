import loginUseCase from "@/usecase/auth/loginUseCase";
import registerUseCase from "@/usecase/auth/registerUseCase";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function useAuth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (mode === "login") {
      if(await loginUseCase(formData)){
        redirect("/home")
      }else{
        alert("login failed")
      }
    } else {
      if(await registerUseCase(formData)){
        alert("register success")
      }else{
        alert("register failed")
      }
    }
  }
  return {
    mode,
    setMode,
    handleSubmit
  }
}