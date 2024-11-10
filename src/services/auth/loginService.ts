import getUsers from "@/services/database/users/getUsers";
import findUser from "@/utils/findUser";

interface loginServiceProps {
  name: string;
  password: string;
  users_url: string;
}

export default async function loginService({name,password,users_url}:loginServiceProps):Promise<boolean> {
  const users = await getUsers({ users_url });
  const user = await findUser({ users, name, password });
  return user ? true : false;
}