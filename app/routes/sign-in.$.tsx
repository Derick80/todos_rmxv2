import { SignIn } from "@clerk/remix";
import { H1 } from "~/components/ui/typography/typography";

export default function SignInPage() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <H1>Sign in</H1> <SignIn />
    </div>
  );
}
