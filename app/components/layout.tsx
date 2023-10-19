import TopNavigation from "./top-navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container border min-h-screen h-screen'>
      <TopNavigation />
      <main className='relative border'>{children}</main>
      <div className='border absolute '>footer</div>
    </div>
  );
};

export default Layout;
