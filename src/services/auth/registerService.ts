import createUser from "@/services/database/users/createUser";

interface RegisterServiceProps {
  name: string;
  password: string;
}

export default async function registerService({ name, password }: RegisterServiceProps) {
  if(await createUser({ name, password })){
    return true
  }
  return false
}