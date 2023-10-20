import { useUser } from '@clerk/remix'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'Remix To Dos' },
        {
            name: 'description',
            content: 'A simple to do app built with Remix-run',
        },
    ]
}

export default function Index() {
    const { user } = useUser()

    return <div></div>
}
