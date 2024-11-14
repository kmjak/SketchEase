"use server"

import loginService from "@/services/auth/loginService"
import decryptUseCase from "../crypto/decryptUseCase";
import cryptoConfig from "@/lib/config/crypto/cryptoConfig";

interface LoginUseCaseProps {
  name: string;
  password: string;
}

export default async function loginUseCase({name,password}:LoginUseCaseProps):Promise<boolean> {
  const plain_name = await decryptUseCase({cipher_text:name,key:cryptoConfig.auth_key})
  const plain_password = await decryptUseCase({cipher_text:password,key:cryptoConfig.auth_key})
  if(!plain_name || !plain_password) {
    return false;
  }
  if(await loginService({name:plain_name,password:plain_password})){
    return true;
  }
  return false;
}