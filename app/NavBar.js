"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronDownIcon, Menu, X } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase/firebaseClient";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar proyectos desde Firebase (una sola consulta)
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        // Una sola consulta para todos los proyectos
        const querySnapshot = await getDocs(collection(db, "proyectos"));

        if (querySnapshot.empty) {
          console.log("No hay proyectos en la base de datos");
          setProyectos([]);
          return;
        }

        const proyectosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            label: data.nombre || `Proyecto ${doc.id.substring(0, 5)}`,
            href: `/Proyecto/${doc.id}`,
            estado: data.estado || "sin_estado", // Valor por defecto si no tiene estado
            ...data,
          };
        });

        console.log("Proyectos cargados:", proyectosData);
        setProyectos(proyectosData);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        setError("Error al cargar proyectos");
      } finally {
        setLoading(false);
      }
    };

    cargarProyectos();
  }, []);

  // Filtrar proyectos por estado de forma segura
  const proyectosEnVenta = proyectos?.filter(
    (proyecto) => proyecto.estado == "en_venta"
  );
  console.log("Proyectos en venta:", proyectosEnVenta);

  const proyectosEntregados = proyectos?.filter(
    (proyecto) => proyecto.estado == "entregado"
  );
  console.log("Proyectos entregados:", proyectosEntregados);

  // Construir el menú dinámicamente con los proyectos filtrados
  const navItems = [
    { label: "INICIO", href: "/" },
    { label: "QUIENES SOMOS", href: "/QuienesSomos" },
    {
      label: "PROYECTOS EN VENTA",
      href: "/ProyectosEnVenta",
      children: loading
        ? [{ label: "Cargando...", href: "#" }]
        : error
        ? [{ label: "Error al cargar proyectos", href: "#" }]
        : proyectosEnVenta.length > 0
        ? proyectosEnVenta
        : [{ label: "No hay proyectos disponibles", href: "#" }],
    },
    {
      label: "PROYECTOS ENTREGADOS",
      href: "/ProyectosEntregados",
      children: loading
        ? [{ label: "Cargando...", href: "#" }]
        : error
        ? [{ label: "Error al cargar proyectos", href: "#" }]
        : proyectosEntregados.length > 0
        ? proyectosEntregados
        : [{ label: "No hay proyectos disponibles", href: "#" }],
    },
    { label: "NUESTRO ESTILO", href: "/NuestroEstilo" },
    { label: "CONTÁCTENOS", href: "/Contacto" },
  ];

  // Detectar scroll para cambiar apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      )}
      ref={navRef}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/logo.png"
              alt="JCM Constructora Inmobiliaria"
              width={180}
              height={80}
              className="h-12 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.children ? (
                <>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium flex items-center transition-colors rounded-md group-hover:text-[#193148]",
                      pathname.startsWith(item.href)
                        ? "text-[#193148]"
                        : "text-gray-700 hover:text-[#193148] hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Mega menú que se muestra al hacer hover */}
                  <div className="absolute top-full left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-md shadow-lg py-2 border border-gray-100"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.id || child.label}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
                            pathname === child.href
                              ? "text-[#193148] bg-blue-50"
                              : "text-gray-700 hover:bg-blue-50 hover:text-[#193148]"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md relative inline-block",
                    pathname === item.href
                      ? "text-[#193148]"
                      : "text-gray-700 hover:text-[#193148] hover:bg-gray-50"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#193148]"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-10 p-2"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-[#193148]" />
          ) : (
            <Menu className="h-6 w-6 text-[#193148]" />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-white z-40 lg:hidden pt-20"
            >
              <div className="container mx-auto px-4 py-4 h-full overflow-y-auto">
                <nav>
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <MobileNavItem
                        key={item.label}
                        item={item}
                        pathname={pathname}
                      />
                    ))}
                  </ul>
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/contactenos"
                    className="block w-full py-3 px-4 bg-[#193148] text-white text-center font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    COTIZA AQUÍ
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// Componente para los items del menú móvil
function MobileNavItem({ item, pathname }) {
  const [isOpen, setIsOpen] = useState(false);

  // Verificar si alguna ruta hija está activa
  const isActive =
    pathname === item.href ||
    (item.children && item.children.some((child) => pathname === child.href));

  return (
    <li>
      {item.children ? (
        <div>
          <div className="flex items-center justify-between">
            <Link
              href={item.href}
              className={cn(
                "py-2 text-lg font-medium flex-grow",
                isActive ? "text-[#193148]" : "text-gray-800"
              )}
            >
              {item.label}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#193148]"
              aria-label={isOpen ? "Cerrar submenú" : "Abrir submenú"}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 mt-2 space-y-2 overflow-hidden"
              >
                {item.children.map((child) => (
                  <motion.li
                    key={child.id || child.label}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={child.href}
                      className={cn(
                        "block py-2 pl-4 border-l-2",
                        pathname === child.href
                          ? "border-blue-600 text-[#193148]"
                          : "border-gray-200 text-gray-600 hover:text-[#193148] hover:border-blue-600"
                      )}
                    >
                      {child.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "block py-2 text-lg font-medium",
            pathname == item.href
              ? "text-[#193148]"
              : "text-gray-800 hover:text-[#193148]"
          )}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
}
