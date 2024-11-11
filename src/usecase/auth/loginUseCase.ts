"use server"

import { users_url } from "@/lib/url/users/users_url"
import loginService from "@/services/auth/loginService"

export default async function loginUseCase(formData: FormData) {
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  if(!name || !password || !users_url) {
    return false;
  }
  if(await loginService({name,password,users_url})){
    return true;
  }
  return false;
}