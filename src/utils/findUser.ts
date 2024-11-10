import { UserType } from "@/types/interface/user/UserType";

interface FindUserProps {
  name: string;
  password: string;
  users: UserType[];
}

export default async function findUser({name,password,users}:FindUserProps):Promise<UserType> {
  return users.find(user => user.name === name && user.password === password) as UserType
}