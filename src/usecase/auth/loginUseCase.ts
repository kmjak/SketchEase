"use server"

import loginService from "@/services/auth/loginService"
import decryptUseCase from "../crypto/decryptUseCase";
import cryptoConfig from "@/lib/config/crypto/cryptoConfig";
import setCookieUseCase from "../cookie/setCookieUseCase";
import encryptUseCase from "../crypto/encryptUseCase";

interface LoginUseCaseProps {
  name: string;
  password: string;
}

export default async function loginUseCase({name,password}:LoginUseCaseProps):Promise<boolean> {
  const plain_name = await decryptUseCase({cipher_text:name,key:cryptoConfig.auth_key})
  const plain_password = await decryptUseCase({cipher_text:password,key:cryptoConfig.auth_key})
  const res = await loginService({name:plain_name,password:plain_password});
  if(res){
    const cipher_id = await encryptUseCase({plain_text:res.id.toString(),key:cryptoConfig.cookie_key});
    await setCookieUseCase({name:"id", value:cipher_id.toString(),expires:new Date(Date.now() + 60*60)});
    return true;
  }
  return false;
}