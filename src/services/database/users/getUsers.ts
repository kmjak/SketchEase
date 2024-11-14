import UserType from "@/types/interface/user/UserType";

interface GetUsersProps {
  users_url: string;
}

export default async function getUsers({users_url}:GetUsersProps):Promise<UserType[] | []>{
  const response = await fetch(users_url)
  const users = await response.json()
  return users
}