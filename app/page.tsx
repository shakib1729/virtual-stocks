import { SignUp } from "@/components/authentication/SignUp";
import { SignIn } from "@/components/authentication/SignIn";
import { Dummy } from "@/components/authentication/Dummy";

export default function Home() {
  return (
    <div className="flex gap-3">
      <SignUp />
      <SignIn />
      <Dummy />
    </div>
  );
}
