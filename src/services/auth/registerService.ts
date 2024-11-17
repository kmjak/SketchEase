import createUser from "@/services/database/users/createUser";
import { v4 as uuidv4 } from 'uuid';
interface RegisterServiceProps {
  name: string;
  password: string;
}

export default async function registerService({ name, password }: RegisterServiceProps) {
  const id = uuidv4()
  if(await createUser({ id, name, password })){
    return true
  }
  return false
}