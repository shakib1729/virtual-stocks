import { Register } from "@/components/authentication/Register";
import { LogIn } from "@/components/authentication/LogIn";

export default function Home() {
  return (
    <div className="flex gap-3">
      <Register />
      <LogIn />
    </div>
  );
}
