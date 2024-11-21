import getCookieUseCase from "@/usecase/cookie/getCookieUseCase"

export default function useCookie (){
  const getCookie = async (name:string) => {
    return await getCookieUseCase({name})
  }
  return {
    getCookie,
  }
}