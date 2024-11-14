import CryptoConfigType from "@/types/config/crypto/cryptoConfig";
import loginUseCase from "@/usecase/auth/loginUseCase";
import registerUseCase from "@/usecase/auth/registerUseCase";
import encryptUseCase from "@/usecase/crypto/encryptUseCase";
import { redirect } from "next/navigation";
import { useState } from "react";

interface UseAuthProps {
  cryptoConfig: CryptoConfigType;
}

export default function useAuth({cryptoConfig}:UseAuthProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    const cipher_name = await encryptUseCase({plain_text:name,key:cryptoConfig.auth_key})
    const cipher_password = await encryptUseCase({plain_text:password,key:cryptoConfig.auth_key})
    if (mode === "login") {
      if(await loginUseCase({name:cipher_name,password:cipher_password})){
        redirect("/home")
      }else{
        alert("login failed")
      }
    } else {
      if(await registerUseCase({name:cipher_name,password:cipher_password})){
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