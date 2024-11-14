import { cookies } from "next/headers";

interface GetCookieUseCaseProps {
  name: string;
}

export default async function getCookieUseCase({name}:GetCookieUseCaseProps):Promise<string | null> {
  const cookie_store = await cookies();
  const cookie = cookie_store.get(name);
  return cookie ? cookie.value : null;

}