import loginUseCase from "@/usecase/auth/loginUseCase";
import registerUseCase from "@/usecase/auth/registerUseCase";
import getCookieUseCase from "@/usecase/cookie/getCookieUseCase";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";
import encryptUseCase from "@/usecase/crypto/encryptUseCase";
import { validateName, validatePassword } from "@/utils/validate";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function useAuth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [id, setId] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    if(validateName(name) === false || validatePassword(password) === false){
      alert("invalid name or password")
      return
    }
    const cipher_name = await encryptUseCase({plain_text:name,mode:"auth"})
    const cipher_password = await encryptUseCase({plain_text:password,mode:"auth"})
    if (mode === "login") {
      if(await loginUseCase({name:cipher_name,password:cipher_password})){
        redirect("/home")
      }
      alert("login failed")
    } else {
      if(await registerUseCase({name:cipher_name,password:cipher_password})){
        alert("register success")
        return
      }
      alert("register failed")
    }
  }
  const getUserId = async () => {
    const cipher_id = await getCookieUseCase({name:"id"});
    if(cipher_id){
      const plain_id = await decryptUseCase({cipher_text:cipher_id,mode:"cookie"})
      setId(plain_id)
    }
  }
  return {
    mode,
    setMode,
    id,
    setId,
    handleSubmit,
    getUserId,
  }
}