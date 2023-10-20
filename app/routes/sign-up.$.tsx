import { SignUp } from '@clerk/remix'
import { H1 } from '~/components/ui/typography/typography'

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <H1>Sign up</H1>
            <SignUp />
        </div>
    )
}
