"use client"

import useAuth from "@/hooks/useAuth";

export default function Authentication() {
  const { handleSubmit, mode, setMode } = useAuth();
  return (
    <div>
      <h1>{mode}</h1>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">{mode}</button>
      </form>
      {mode === "login" ? (
        <button onClick={() => setMode("register")}>register</button>
      ) : (
        <button onClick={() => setMode("login")}>login</button>
      )}
    </div>
  );
}