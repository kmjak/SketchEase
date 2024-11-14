import getUsers from "@/services/database/users/getUsers";
import findUser from "@/utils/findUser";

interface loginServiceProps {
  name: string;
  password: string;
}

export default async function loginService({name,password}:loginServiceProps):Promise<boolean> {
  const users = await getUsers();
  const user = await findUser({ users, name, password });
  return user ? true : false;
}