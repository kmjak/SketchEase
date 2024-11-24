import getCookieUseCase from "@/usecase/cookie/getCookieUseCase"
import setCookieUseCase from "@/usecase/cookie/setCookieUseCase"

export default function useCookie (){
  const getCookie = async (name:string) => {
    return await getCookieUseCase({name})
  }
  const setCookie = async (name:string, value:string, maxAge:number) => {
    return await setCookieUseCase({name, value, maxAge})
  }
  return {
    getCookie,
    setCookie,
  }
}