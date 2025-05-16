"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth } from "@/config/firebase/firebaseClient";

const Login = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputValue?.Usuario,
        inputValue?.Password
      );
      // Signed in successfully
      toast.success("Inicio de sesión exitoso", {
        description: "Bienvenido al sistema",
      });
      // You can add redirect logic here
    } catch (error) {
      const errorCode = error.code;

      if (
        errorCode === "auth/invalid-email" ||
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/invalid-credential"
      ) {
        toast.error("Inicio de sesión fallido", {
          description: "Usuario o contraseña incorrectos",
        });
      } else if (errorCode === "auth/user-disabled") {
        toast.error("Cuenta deshabilitada", {
          description: "La cuenta de usuario ha sido deshabilitada",
        });
      } else {
        toast.error("Error", {
          description: "Error al intentar ingresar al sistema",
        });
      }
      console.error("Error de autenticación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-black min-h-screen">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: "url(/Admin/Login.jpg)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-black/10">
            {/* <div>
              <h2 className="text-4xl font-bold text-white uppercase">
                La Granja Linda
              </h2>
              <p className="max-w-xl mt-3 text-white font-bold">
                Bienvenidos a La Granja Linda, donde cada comida es una
                celebración en familia. Disfruta de nuestros platillos caseros
                preparados con amor y dedicación, en un ambiente acogedor y
                familiar.
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1 text-white">
            <div className="text-center">
              <figure className="my-2 md:w-full md:h-full md:flex md:justify-center md:mx-auto mr-2 rounded-md overflow-hidden">
                <Image
                  src={`/LogoNego.svg`}
                  width={250}
                  height={250}
                  alt="Inicio"
                  title="Logo principal"
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                />
              </figure>
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                ¡Bienvenido(a)!
              </h2>
              <p className="mt-3">Inicia sesión para acceder a tu cuenta</p>
            </div>
            <div className="mt-4">
              <form onSubmit={onSubmit} className="text-black">
                <div>
                  <label
                    htmlFor="Correo"
                    className="block mb-2 text-sm text-white"
                  >
                    Correo
                  </label>
                  <input
                    autoComplete="off"
                    onChange={handlerChange}
                    type="email"
                    name="Usuario"
                    id="Correo"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoFocus
                    required
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="Password" className="text-sm text-white">
                      Contraseña
                    </label>
                    {/* <a
                      href="#"
                      className="text-sm text-gray-600 focus:text-[#7d2d04] hover:text-[#7d2d04] hover:underline"
                    >
                      Olvido su contraseña?
                    </a> */}
                  </div>
                  <input
                    autoComplete="off"
                    onChange={handlerChange}
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="Tu Contraseña"
                    className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    pattern=".{6,}"
                    title="6 caracteres mínimo"
                    required
                  />
                </div>
                <div className="mt-8">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Ingresando..." : "Ingresar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
