import processLogin from "@/usecase/auth/processLogin";
import processRegister from "@/usecase/auth/processRegister";
import { useState } from "react";

export default function useAuth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (mode === "login") {
      if(await processLogin(formData)){
        alert("login success")
      }else{
        alert("login failed")
      }
    } else {
      if(await processRegister(formData)){
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