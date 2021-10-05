import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
