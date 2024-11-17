"use server"

import users_url from "@/lib/url/users/users_url"
import encryptUseCase from "@/usecase/crypto/encryptUseCase";
import UserType from "@/types/interface/user/UserType";



export default async function createUser({ id, name, password }:UserType):Promise<boolean>{
  const cipher_id = await encryptUseCase({plain_text:id,mode:"db"})
  const cipher_name = await encryptUseCase({plain_text:name,mode:"db"})
  const cipher_password = await encryptUseCase({plain_text:password,mode:"db"})
  const res = await fetch(users_url!, {
    method: "POST",
    body: JSON.stringify({ id:cipher_id, name:cipher_name, password:cipher_password }),
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