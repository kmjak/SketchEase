"use server"

import UserType from "@/types/interface/user/UserType";
import users_url from "@/lib/url/users/users_url";

export default async function getUsers():Promise<UserType[] | []>{
  const response = await fetch(users_url!)
  const users = await response.json()
  return users
}