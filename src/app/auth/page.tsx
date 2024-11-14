import cryptoConfig from "@/lib/config/crypto/cryptoConfig";
import AuthForm from "./components/AuthForm";

export default function Page() {
  return (
    <div>
      <AuthForm
        cryptoConfig={cryptoConfig}
      />
    </div>
  );
}