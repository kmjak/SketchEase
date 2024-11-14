import { cookies } from "next/headers";

interface SetCookieUseCaseProps {
  name: string;
  value: string;
  expires: Date;
}

export default async function setCookieUseCase({ name, value, expires }: SetCookieUseCaseProps) {
  const cookie_store = await cookies();
  cookie_store.set({
    name,
    value,
    expires,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
}