"use server"

import { users_url } from "@/lib/url/users/users_url"
import loginService from "@/services/auth/loginService";
import { registerService } from "@/services/auth/registerService";

export default async function processRegister(formData: FormData):Promise<boolean> {
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  if(!name || !password || !users_url) {
    return false;
  }
  if(await loginService({name,password,users_url})){
    return false;
  }
  if(await registerService({name,password,users_url})){
    return true;
  }
  return false;
}