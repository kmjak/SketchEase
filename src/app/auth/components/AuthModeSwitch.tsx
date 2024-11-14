interface AuthModeSwitchProps {
  mode:string
  setMode: (mode:"login" | "register") => void
}

export default function AuthModeSwitch({mode,setMode} : AuthModeSwitchProps) {
  if(mode === "login"){
    return(
      <button onClick={() => setMode("register")} className="text-indigo-600 hover:underline">
        アカウントをお持ちでないですか？ 登録
      </button>
    )
  }else{
    return (
      <button onClick={() => setMode("login")} className="text-indigo-600 hover:underline">
        既にアカウントをお持ちですか？ ログイン
      </button>
    )
  }
}