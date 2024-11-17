"use server"

import users_url from "@/lib/url/users/users_url"
import cryptoConfig from "@/lib/config/crypto/cryptoConfig";
import encryptUseCase from "@/usecase/crypto/encryptUseCase";
import UserType from "@/types/interface/user/UserType";



export default async function createUser({ id, name, password }:UserType):Promise<boolean>{
  const cipher_name = await encryptUseCase({plain_text:name,key:cryptoConfig.db_key})
  const cipher_password = await encryptUseCase({plain_text:password,key:cryptoConfig.db_key})
  const res = await fetch(users_url!, {
    method: "POST",
    body: JSON.stringify({ id, name:cipher_name, password:cipher_password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(res.ok){
    return true
  }else{
    return false
  }
}