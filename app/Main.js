"use client";
import { usePathname } from "next/navigation";
import Navbar from "./NavBar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/Whatssap";

const Main = ({ children }) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <main>
      {pathname.includes("/Admin") || pathname.includes("/infogolfview") ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton
            phoneNumber="+51 947 455 553"
            message="Hola, me gustaría obtener más información sobre sus servicios."
          />{" "}
        </>
      )}
    </main>
  );
};

export default Main;
