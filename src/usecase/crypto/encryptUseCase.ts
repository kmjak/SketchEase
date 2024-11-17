"use server"
import CryptoJS from 'crypto-js';
import cryptoConfig from '@/lib/config/crypto/cryptoConfig';

interface EncryptUseCaseProps {
  plain_text: string;
  mode: string;
}

export default async function encryptUseCase({plain_text,mode}:EncryptUseCaseProps): Promise<string>{
  let key = "";
  if(mode === "auth"){
    key = cryptoConfig.auth_key;
  }else if(mode === "db"){
    key = cryptoConfig.db_key;
  }else if(mode === "cookie"){
    key = cryptoConfig.cookie_key;
  }
  const cipher = CryptoJS.AES.encrypt(plain_text, key).toString();
  return cipher;
}