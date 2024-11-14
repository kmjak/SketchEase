import CryptoJS from 'crypto-js';

interface DecryptUseCaseProps {
  cipher_text: string;
  key: string;
}

export default async function decryptUseCase({cipher_text,key}:DecryptUseCaseProps): Promise<string> {
  const bytes = CryptoJS.AES.decrypt(cipher_text, key);
  const plain_text = bytes.toString(CryptoJS.enc.Utf8);
  return plain_text;
}