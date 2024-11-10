import createUser from "@/services/database/users/createUser";

interface RegisterServiceProps {
  name: string;
  password: string;
  users_url: string;
}

export const registerService = async ({ name, password, users_url }: RegisterServiceProps) => {
  if(await createUser({ name, password, users_url })){
    return true
  }
  return false
}