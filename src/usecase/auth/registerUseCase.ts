"use server"

import loginService from "@/services/auth/loginService";
import registerService from "@/services/auth/registerService";
import decryptUseCase from "../crypto/decryptUseCase";

interface RegisterUseCaseProps {
  name: string;
  password: string;
}

export default async function registerUseCase({name,password}:RegisterUseCaseProps):Promise<boolean> {
  const plain_name = await decryptUseCase({cipher_text:name,mode:"auth"})
  const plain_password = await decryptUseCase({cipher_text:password,mode:"auth"})
  if(await loginService({name:plain_name,password:plain_password})){
    return false;
  }
  if(await registerService({name:plain_name,password:plain_password})){
    return true;
  }
  return false;
}