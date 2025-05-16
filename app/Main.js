"use client";
import { usePathname } from "next/navigation";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Main = ({ children }) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <main>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </main>
  );
};

export default Main;
