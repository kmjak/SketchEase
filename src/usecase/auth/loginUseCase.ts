"use server"

import loginService from "@/services/auth/loginService"
import decryptUseCase from "../crypto/decryptUseCase";
import setCookieUseCase from "../cookie/setCookieUseCase";
import encryptUseCase from "../crypto/encryptUseCase";

interface LoginUseCaseProps {
  name: string;
  password: string;
}

export default async function loginUseCase({name,password}:LoginUseCaseProps):Promise<boolean> {
  const plain_name = await decryptUseCase({cipher_text:name,mode:"auth"})
  const plain_password = await decryptUseCase({cipher_text:password,mode:"auth"})
  const res = await loginService({name:plain_name,password:plain_password});
  if(res){
    const plain_id = await decryptUseCase({cipher_text:res.id,mode:"db"});
    const cipher_id = await encryptUseCase({plain_text:plain_id,mode:"cookie"});
    await setCookieUseCase({name:"id", value:cipher_id, maxAge:60*60});
    return true;
  }
  return false;
}