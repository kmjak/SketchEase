import getUsers from "@/services/database/users/getUsers";
import UserType from "@/types/interface/user/UserType";
import findUser from "@/utils/findUser";

interface loginServiceProps {
  name: string;
  password: string;
}

export default async function loginService({name,password}:loginServiceProps):Promise<UserType | false> {
  const users = await getUsers();
  const user = await findUser({ users, name, password });
  return user;
}