"use client"

import useAuth from "@/hooks/useAuth";
import CryptoConfigType from "@/types/config/crypto/cryptoConfig";
import Input from "./Input";
import AuthModeSwitch from "./AuthModeSwitch";

interface AuthFormProps {
  cryptoConfig: CryptoConfigType;
}

export default function AuthForm({ cryptoConfig }: AuthFormProps) {
  const { handleSubmit, mode, setMode } = useAuth({ cryptoConfig });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Login" : "Register"}
        </h1>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} className="space-y-4">
          <div>
            <Input label="name" type="text" />
          </div>
          <div>
            <Input label="password" type="password" />
            <div className="text-xs text-gray-500 mt-1">
              パスワードは8〜20文字で、以下の条件を満たす必要があります:
              <ul className="list-inside list-disc text-gray-500">
                <li>大文字のアルファベット1文字以上</li>
                <li>小文字のアルファベット1文字以上</li>
                <li>数字1文字以上</li>
                <li>特殊文字 (!, $, %, &, +, *, @, ?) を1文字以上</li>
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {mode === "login" ? "ログイン" : "登録"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <AuthModeSwitch mode={mode} setMode={setMode} />
        </div>
      </div>
    </div>
  );
}