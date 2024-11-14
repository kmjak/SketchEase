import CryptoJS from 'crypto-js';

interface EncryptUseCaseProps {
  plain_text: string;
  key: string;
}

export default async function encryptUseCase({plain_text,key}:EncryptUseCaseProps): Promise<string>{
  const cipher = CryptoJS.AES.encrypt(plain_text, key).toString();
  return cipher;
}