"use server"

import UserType from "@/types/interface/user/UserType";
import decryptUseCase from "@/usecase/crypto/decryptUseCase";

interface FindUserProps {
  name: string;
  password: string;
  users: UserType[];
}

export default async function findUser({name,password,users}:FindUserProps):Promise<UserType | false> {
  for (const user of users) {
    const plain_name = await decryptUseCase({cipher_text:user.name,mode:"db"});
    const plain_password = await decryptUseCase({cipher_text:user.password,mode:"db"});
    if (plain_name === name && plain_password === password) {
      return user as UserType;
    }
  }
  return false;
}