interface CreateUserProps {
  name: string;
  password: string;
  users_url: string;
}
export default async function createUser({ name, password, users_url }:CreateUserProps):Promise<boolean>{
  const res = await fetch(users_url, {
    method: "POST",
    body: JSON.stringify({ name, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(res.ok){
    return true
  }else{
    return false
  }
}