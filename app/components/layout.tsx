import TopNavigation from './top-navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container border min-h-screen h-screen flex flex-col gap-3 md:gap-5">
            <TopNavigation />
            <main className="relative flex-grow">{children}</main>
            <div className="border  absolute bottom-0">footer</div>
        </div>
    )
}

export default Layout
