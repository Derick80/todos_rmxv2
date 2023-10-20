import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { cssBundleHref } from '@remix-run/css-bundle'
import type { DataFunctionArgs, LinksFunction } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useFetcher,
    useLoaderData,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix'
import Layout from './components/layout'
import { getThemeFromCookie } from './server/theme.server'
import { ThemeProvider } from './components/theme/theme-provider'

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]
export async function loader(args: DataFunctionArgs) {
    const theme = await getThemeFromCookie(args.request)

    return rootAuthLoader(args, async ({ request }) => {
        const { userId, sessionId, getToken } = request.auth

        return {
            userId,
            sessionId,
            getToken,
            theme,
        }
    })
}
export const ErrorBoundary = ClerkErrorBoundary()

function App() {
    const { theme = 'system' } = useLoaderData<typeof loader>()
    const fetcher = useFetcher()
    const onThemeChange = (theme: string) => {
        fetcher.submit(
            { theme },
            {
                method: 'post',
                encType: 'application/json',
                action: '/actions/set-theme',
            }
        )
    }
    return (
        <html
            lang="en"
            className={theme ?? 'theme'}
        >
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="bg-background text-foreground">
                <ThemeProvider
                    defaultTheme={theme}
                    onThemeChange={onThemeChange}
                >
                    <Layout>
                        <Outlet />
                        <ScrollRestoration />
                        <Scripts />
                        <LiveReload />
                    </Layout>
                </ThemeProvider>
            </body>
        </html>
    )
}
export default ClerkApp(App)
