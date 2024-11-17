"use server"

import CryptoJS from 'crypto-js';
import cryptoConfig from '@/lib/config/crypto/cryptoConfig';

interface DecryptUseCaseProps {
  cipher_text: string;
  mode: string;
}

export default async function decryptUseCase({cipher_text,mode}:DecryptUseCaseProps): Promise<string> {
  let key = "";
  if(mode === "auth"){
    key = cryptoConfig.auth_key;
  }else if(mode === "db"){
    key = cryptoConfig.db_key;
  }else if(mode === "cookie"){
    key = cryptoConfig.cookie_key;
  }
  const bytes = CryptoJS.AES.decrypt(cipher_text, key);
  const plain_text = bytes.toString(CryptoJS.enc.Utf8);
  return plain_text;
}