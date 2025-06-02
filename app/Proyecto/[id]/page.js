"use client";

import { DialogTrigger } from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  Building,
  Dumbbell,
  Coffee,
  Utensils,
  ChevronRight,
  ArrowDown,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { getProyectoPorId } from "@/lib/firebase/proyectos";
// Add this import at the top with the other imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Variantes de animación para framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function ProyectoPublicoPage() {
  const params = useParams();
  const id = params.id;

  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verBrochureModalOpen, setVerBrochureModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          proyecto: proyecto.nombre,
          proyectoId: proyecto.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ nombre: "", telefono: "", email: "", mensaje: "" });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus({ loading: false, success: false, error: error.message });
    }
  };

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const data = await getProyectoPorId(id);
        setProyecto(data);
        // Añadir este log para depuración
        console.log("Proyecto cargado:", data);
        console.log("Galería:", data?.galeria);
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyecto();
  }, [id]);

  console.log("proyecto", proyecto);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-blue-200 rounded mb-3"></div>
          <div className="h-3 w-24 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
        <p className="text-gray-600 mb-6">
          El proyecto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <a href="/proyectos">Ver todos los proyectos</a>
        </Button>
      </div>
    );
  }

  // Obtener los tipos de departamentos del proyecto
  const tiposDepartamentos = proyecto.tiposDepartamentos || [];

  // Obtener las áreas comunes activas
  const areasComunes = proyecto.areasComunes
    ? Object.entries(proyecto.areasComunes)
        .filter(([_, area]) => area.activo)
        .map(([key, area]) => ({
          id: key,
          nombre: getNombreArea(key),
          descripcion: area.descripcion,
          imagenURL: area.imagenURL,
        }))
    : [];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <Image
          src={proyecto.imagen || "/modern-apartment-building.png"}
          alt={`${proyecto.nombre} - Edificio de Apartamentos`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex flex-col items-start justify-center text-white p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              {proyecto.estado && (
                <motion.div variants={fadeIn}>
                  <Badge className="bg-[#1E88E5] text-white mb-4 px-4 py-1 text-sm rounded-full">
                    {proyecto.estado === "en_venta" ? "EN VENTA" : "ENTREGADO"}
                  </Badge>
                </motion.div>
              )}

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                {proyecto.nombre}
              </motion.h1>

              {proyecto.descripcion && (
                <motion.p
                  variants={fadeIn}
                  className="text-xl md:text-2xl mb-8"
                >
                  {proyecto.descripcion}
                </motion.p>
              )}

              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-4"
              >
                {tiposDepartamentos.length > 0 && (
                  <motion.div variants={itemFadeIn}>
                    <Button
                      size="lg"
                      className="bg-[#1E88E5] hover:bg-[#1976D2] text-white border-none"
                    >
                      <a href="#departamentos" className="flex items-center">
                        Ver Departamentos{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                )}

                {proyecto.videoUrl && (
                  <motion.div variants={itemFadeIn}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-[#1E88E5] hover:bg-white/90 border-none"
                    >
                      <a
                        href={proyecto.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visualizar en 3D
                      </a>
                    </Button>
                  </motion.div>
                )}

                {proyecto.brochureUrl && (
                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={proyecto.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center hover:cursor-pointer"
                    >
                      <Button
                        size="lg"
                        className="bg-white text-[#1E88E5] hover:bg-white/90 border-none flex flex-row"
                      >
                        <FileText className="mr-2 h-4 w-4" /> Ver Brochure
                      </Button>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <p className="mb-2 text-sm font-medium">Descubre más</p>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* Resumen del Proyecto - Solo se muestra si hay datos relevantes */}
      {(proyecto.areaMin ||
        proyecto.areaMax ||
        proyecto.ubicacion ||
        tiposDepartamentos.length > 0 ||
        proyecto.fechaEntrega) && (
        <motion.section
          className="py-8 bg-white border-b"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {(proyecto.areaMin || proyecto.areaMax) && (
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                    FLATS DE
                  </h3>
                  <p className="text-2xl font-semibold">
                    {proyecto.areaMin} m² HASTA {proyecto.areaMax} m²
                  </p>
                </motion.div>
              )}

              {proyecto.ubicacion && (
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                    UBICACIÓN
                  </h3>
                  <p className="text-2xl font-semibold">{proyecto.ubicacion}</p>
                </motion.div>
              )}

              {tiposDepartamentos.length > 0 && (
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                    DEPARTAMENTOS
                  </h3>
                  <p className="text-2xl font-semibold">
                    {`${Math.min(
                      ...tiposDepartamentos.map((t) => t.dormitorios)
                    )} y ${Math.max(
                      ...tiposDepartamentos.map((t) => t.dormitorios)
                    )} Dormitorios`}
                  </p>
                </motion.div>
              )}

              {proyecto.fechaEntrega && (
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                    ENTREGA
                  </h3>
                  <p className="text-2xl font-semibold">
                    {proyecto.fechaEntrega}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Galería de Imágenes - Siempre se muestra */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-center mb-3">
              GALERÍA DEL PROYECTO
            </h2>
            <div className="w-20 h-1 bg-[#1E88E5]"></div>
            <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
              Conoce todos los detalles de {proyecto.nombre}
            </p>
          </motion.div>

          {Array.isArray(proyecto.galeria) && proyecto.galeria.length > 0 ? (
            <>
              <Carousel className="w-full">
                <CarouselContent>
                  {proyecto.galeria.map((imagen) => (
                    <CarouselItem
                      key={imagen.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <motion.div
                              whileHover={{ y: -10 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="cursor-pointer"
                            >
                              <Card className="border-none shadow-lg overflow-hidden group">
                                <div className="relative">
                                  <Image
                                    src={
                                      imagen.url ||
                                      "/placeholder.svg?height=400&width=600&query=apartment"
                                    }
                                    alt={
                                      imagen.titulo ||
                                      `Imagen de ${proyecto.nombre}`
                                    }
                                    width={600}
                                    height={400}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-4 text-white">
                                      <p className="font-medium">
                                        {imagen.descripcion}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <CardContent className="p-6 bg-white">
                                  <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                                    {imagen.titulo || "Vista del proyecto"}
                                  </h3>
                                  {imagen.fecha && (
                                    <p className="text-sm text-slate-500">
                                      {new Date(
                                        imagen.fecha
                                      ).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl w-full">
                            <DialogHeader>
                              <DialogTitle>
                                {imagen.titulo || "Vista del proyecto"}
                              </DialogTitle>
                              {imagen.descripcion && (
                                <DialogDescription>
                                  {imagen.descripcion}
                                </DialogDescription>
                              )}
                            </DialogHeader>
                            <div className="mt-4 flex justify-center">
                              <Image
                                src={
                                  imagen.url ||
                                  "/placeholder.svg?height=800&width=1200&query=apartment"
                                }
                                alt={
                                  imagen.titulo ||
                                  `Imagen de ${proyecto.nombre}`
                                }
                                width={1200}
                                height={800}
                                className="max-h-[70vh] w-auto object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-8">
                  <motion.div
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CarouselPrevious className="static mx-2 bg-[#1E88E5] text-white hover:bg-[#1976D2] hover:text-white" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CarouselNext className="static mx-2 bg-[#1E88E5] text-white hover:bg-[#1976D2] hover:text-white" />
                  </motion.div>
                </div>
              </Carousel>

              {proyecto.galeria.length > 6 && (
                <motion.div
                  className="flex justify-center mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#1E88E5] hover:bg-[#1976D2]">
                    Ver todas las imágenes ({proyecto.galeria.length})
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Building className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No hay imágenes disponibles para este proyecto.
              </p>
              <p className="text-gray-400 mt-2">
                Consulta más información en el brochure o contáctanos.
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Banner de Brochure - Solo si existe brochureUrl */}
      {proyecto.brochureUrl && (
        <motion.section
          className="py-6 bg-[#1E88E5]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  ¿Quieres conocer todos los detalles?
                </h3>
                <p>
                  Descarga nuestro brochure completo con toda la información del
                  proyecto
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={proyecto.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#1E88E5] hover:bg-white/90 border-none"
                  >
                    <FileText className="mr-2 h-4 w-4" /> Ver Brochure
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Características Principales - Solo si hay características */}
      {proyecto.caracteristicas && proyecto.caracteristicas.length > 0 && (
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col items-center mb-12"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-3">
                LO QUE TE OFRECEMOS
              </h2>
              <div className="w-20 h-1 bg-[#1E88E5]"></div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {proyecto.caracteristicas
                .slice(0, 8)
                .map((caracteristica, index) => (
                  <motion.div key={index} variants={itemFadeIn}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden group">
                      <motion.div
                        className="h-2 bg-[#1E88E5] group-hover:h-3 transition-all"
                        whileHover={{ height: 12 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      ></motion.div>
                      <CardContent className="flex flex-col items-center justify-center p-6 pt-8">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {/* {getIconForCaracteristica(caracteristica, index)} */}
                        </motion.div>
                        <h3 className="text-lg font-semibold text-center">
                          {caracteristica.toUpperCase()}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Departamentos - Solo si hay tipos de departamentos */}
      {tiposDepartamentos.length > 0 && (
        <section id="departamentos" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col items-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-3">
                NUESTROS DEPARTAMENTOS
              </h2>
              <div className="w-20 h-1 bg-[#1E88E5]"></div>
              <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
                Diseñados para brindar confort y exclusividad, con acabados de
                primera calidad
              </p>
            </motion.div>

            <Tabs
              defaultValue={tiposDepartamentos[0]?.id?.toString() || "tipo1"}
              className="w-full"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleUp}
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto bg-gray-100 p-1 rounded-lg">
                  {tiposDepartamentos.map((tipo) => (
                    <TabsTrigger
                      key={tipo.id}
                      value={tipo.id.toString()}
                      className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                    >
                      {tipo.nombre}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              {tiposDepartamentos.map((tipo) => (
                <TabsContent
                  key={tipo.id}
                  value={tipo.id.toString()}
                  className="mt-8"
                >
                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                      className="relative"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={slideFromLeft}
                    >
                      <motion.div
                        className="absolute -top-4 -left-4 w-20 h-20 bg-[#1E88E5] flex items-center justify-center text-white font-bold rounded-br-lg z-10"
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 10px 25px -5px rgba(30, 136, 229, 0.5)",
                        }}
                      >
                        {tipo.area} m²
                      </motion.div>
                      <motion.div
                        className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                        whileHover={{
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        <Image
                          src={
                            tipo.planoURL || "/modern-apartment-floor-plan.png"
                          }
                          alt={`Plano ${tipo.nombre}`}
                          width={800}
                          height={600}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="flex flex-col justify-center"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={slideFromRight}
                    >
                      <Badge className="bg-[#1E88E5] text-white mb-2 w-fit">
                        {tipo.dormitorios} DORMITORIOS
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">{tipo.nombre}</h3>
                      <p className="text-lg mb-2 text-gray-700">
                        Área total: {tipo.area} m²
                      </p>
                      <p className="text-lg mb-6 text-gray-700">
                        Precio: ${tipo.precio.toLocaleString()}
                      </p>

                      {tipo.caracteristicas && (
                        <motion.div
                          className="bg-gray-50 p-6 rounded-lg mb-6"
                          whileHover={{
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <h4 className="text-xl font-semibold mb-4 text-[#1E88E5]">
                            Características
                          </h4>
                          <motion.ul
                            className="space-y-3"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                          >
                            {tipo.caracteristicas
                              .split(",")
                              .map((caracteristica, index) => (
                                <motion.li
                                  key={index}
                                  className="flex items-start"
                                  variants={itemFadeIn}
                                  whileHover={{ x: 5 }}
                                >
                                  <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                                  <span>{caracteristica.trim()}</span>
                                </motion.li>
                              ))}
                          </motion.ul>
                        </motion.div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                            Solicitar información
                          </Button>
                        </motion.div>

                        {proyecto.brochureUrl && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <a
                              href={proyecto.brochureUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                className="border-[#1E88E5] text-[#1E88E5] w-full"
                              >
                                <FileText className="mr-2 h-4 w-4" /> Ver
                                Brochure
                              </Button>
                            </a>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      )}

      {/* Ubicación - Solo si hay ubicación */}
      {proyecto.ubicacion &&
        proyecto.lugaresProximos &&
        Object.keys(proyecto.lugaresProximos).length > 0 && (
          <motion.section
            className="py-16 bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="flex flex-col items-center mb-12"
                variants={fadeIn}
              >
                <h2 className="text-3xl font-bold text-center mb-3">
                  UBICACIÓN PRIVILEGIADA
                </h2>
                <div className="w-20 h-1 bg-[#1E88E5]"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="order-2 md:order-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={slideFromLeft}
                >
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-[#1E88E5]">
                      LO QUE NECESITAS CERCA DE TI
                    </h3>

                    <motion.div
                      className="grid grid-cols-2 gap-4 mb-8"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {Object.entries(proyecto.lugaresProximos).map(
                        ([key, lugar], index) =>
                          lugar.activo && (
                            <motion.div key={key} variants={itemFadeIn}>
                              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold mb-2 flex items-center">
                                    <span className="w-3 h-3 bg-[#1E88E5] rounded-full mr-2"></span>
                                    {lugar.nombre?.toUpperCase() ||
                                      getNombreLugar(key).toUpperCase()}
                                  </h4>
                                  <p className="text-sm text-slate-600">
                                    {lugar.descripcion || ""}
                                  </p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="order-1 md:order-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={slideFromRight}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -top-4 -right-4 bg-[#1E88E5] text-white px-4 py-2 rounded-bl-lg font-semibold z-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Ubicación Estratégica
                    </motion.div>
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-xl border-4 border-white"
                      whileHover={{
                        scale: 1.02,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={
                          proyecto.imagenUbicacion ||
                          proyecto.imagen ||
                          "/modern-city-building.png"
                        }
                        alt={`Ubicación ${proyecto.nombre}`}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                        objectFit="cover"
                      />
                    </motion.div>
                    <motion.div
                      className="bg-white py-3 px-6 rounded-b-lg shadow-lg flex items-center justify-center"
                      whileHover={{ y: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MapPin className="text-[#1E88E5] mr-2" />
                      <p className="font-medium">{proyecto.ubicacion}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

      {/* Áreas Comunes - Solo si hay áreas comunes */}
      {areasComunes.length > 0 && (
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col items-center mb-12"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-3">
                ÁREAS COMUNES
              </h2>
              <div className="w-20 h-1 bg-[#1E88E5]"></div>
              <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
                Espacios diseñados para tu comodidad y entretenimiento
              </p>
            </motion.div>

            <Carousel className="w-full">
              <CarouselContent>
                {areasComunes.map((area) => (
                  <CarouselItem
                    key={area.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="border-none shadow-lg overflow-hidden group">
                          <div className="relative">
                            <Image
                              src={area.imagenURL || getImageForArea(area.id)}
                              alt={area.nombre}
                              width={600}
                              height={400}
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="p-4 text-white">
                                <p className="font-medium">
                                  {area.descripcion}
                                </p>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                              {area.nombre}
                            </h3>
                            <p className="text-slate-600 line-clamp-2">
                              {area.descripcion}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <motion.div
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CarouselPrevious className="static mx-2 bg-[#1E88E5] text-white hover:bg-[#1976D2] hover:text-white" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CarouselNext className="static mx-2 bg-[#1E88E5] text-white hover:bg-[#1976D2] hover:text-white" />
                </motion.div>
              </div>
            </Carousel>
          </div>
        </motion.section>
      )}

      {/* Banner de Brochure - Solo si existe brochureUrl */}
      {proyecto.brochureUrl && (
        <motion.section
          className="py-10 bg-gradient-to-r from-[#1565C0] to-[#1E88E5]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="text-white mb-6 md:mb-0 text-center md:text-left"
                variants={slideFromLeft}
              >
                <h3 className="text-2xl font-bold mb-2">
                  ¿Te interesa este proyecto?
                </h3>
                <p className="text-lg">
                  Descarga nuestro brochure completo con toda la información
                </p>
              </motion.div>
              <motion.div
                variants={slideFromRight}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex"
              >
                <a
                  href={proyecto.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#1E88E5] hover:bg-white/90 border-none text-lg px-8 py-6"
                  >
                    <FileText className="mr-2 h-5 w-5" /> Ver Brochure
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Contacto - Siempre se muestra */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[#1565C0] to-[#1E88E5] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideFromLeft}
            >
              <h2 className="text-3xl font-bold mb-6">CONTÁCTANOS</h2>
              <p className="text-xl mb-8">
                ¡Disfruta de calidad, prestigio y exclusividad en{" "}
                {proyecto.nombre}!
              </p>

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {proyecto.ubicacion && (
                  <motion.div
                    className="flex items-start bg-white/10 p-4 rounded-lg"
                    variants={itemFadeIn}
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <MapPin className="mr-4 mt-1 flex-shrink-0" />
                    <p>{proyecto.ubicacion}</p>
                  </motion.div>
                )}

                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Phone className="mr-4 mt-1 flex-shrink-0" />
                  <p>+51 947 455 553</p>
                </motion.div>

                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Mail className="mr-4 mt-1 flex-shrink-0" />
                  <p>ventas@inmobiliaria.com</p>
                </motion.div>

                <motion.a
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.jcmconstrucciones.com"
                >
                  <Globe className="mr-4 mt-1 flex-shrink-0" />
                  <p>www.jcmconstrucciones.com</p>
                </motion.a>

                <motion.a
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/jcm_constructorainmobiliaria/"
                >
                  <Instagram className="mr-4 mt-1 flex-shrink-0" />
                  <p>@inmobiliaria</p>
                </motion.a>
              </motion.div>

              {proyecto.videoUrl && (
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#1E88E5] hover:bg-white/90 hover:text-[#1565C0]"
                    asChild
                  >
                    <a
                      href={proyecto.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VISUALIZA EL PROYECTO EN 3D
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideFromRight}
              className="relative"
            >
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-white opacity-50"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 5, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-white opacity-50"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, -5, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              />

              <motion.div
                className="bg-white text-slate-800 p-8 rounded-lg shadow-2xl"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-[#1E88E5] text-center">
                  SOLICITA INFORMACIÓN
                </h3>

                <form className="space-y-5" onSubmit={handleSubmitForm}>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium mb-2 text-gray-700"
                    >
                      Nombre completo
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="nombre"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium mb-2 text-gray-700"
                    >
                      Teléfono
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                      placeholder="Tu teléfono"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                      placeholder="Tu correo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-sm font-medium mb-2 text-gray-700"
                    >
                      Mensaje
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                      placeholder="¿En qué podemos ayudarte?"
                    ></motion.textarea>
                  </div>

                  <div className="pt-2">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-[#1E88E5] hover:bg-[#1976D2] text-lg py-6"
                        disabled={formStatus.loading}
                      >
                        {formStatus.loading ? "Enviando..." : "Enviar mensaje"}
                      </Button>
                    </motion.div>
                  </div>
                </form>

                {formStatus.success && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                    ¡Mensaje enviado con éxito! Nos pondremos en contacto
                    contigo pronto.
                  </div>
                )}
                {formStatus.error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    Error: {formStatus.error}. Por favor, intenta nuevamente.
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// Función para obtener el nombre legible de un área
function getNombreArea(key) {
  const nombres = {
    gimnasio: "Gimnasio",
    piscina: "Piscina",
    sauna: "Sauna",
    coworking: "Área de Coworking",
    parrillas: "Área de Parrillas",
    juegos: "Sala de Juegos",
    terraza: "Terraza",
    salaEventos: "Salón de Eventos",
    zonaNinos: "Zona de Niños",
    cine: "Sala de Cine",
    yoga: "Sala de Yoga",
    jardin: "Jardín",
    lobby: "Lobby",
    estacionamiento: "Estacionamiento",
  };

  return nombres[key] || key;
}

// Función para obtener un icono para una característica
function getIconForCaracteristica(caracteristica, index) {
  const iconMap = {
    "estructura antisísmica": (
      <Building className="h-12 w-12 mb-4 text-[#1E88E5]" />
    ),
    ascensores: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-4 text-[#1E88E5]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    gimnasio: <Dumbbell className="h-12 w-12 mb-4 text-[#1E88E5]" />,
    "área de coworking": <Coffee className="h-12 w-12 mb-4 text-[#1E88E5]" />,
    "área de parrillas": <Utensils className="h-12 w-12 mb-4 text-[#1E88E5]" />,
  };

  // Buscar coincidencias parciales en el mapa de iconos
  for (const [key, icon] of Object.entries(iconMap)) {
    if (caracteristica.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }

  // Iconos por defecto para cuando no hay coincidencia
  const defaultIcons = [
    <Building key={0} className="h-12 w-12 mb-4 text-[#1E88E5]" />,
    <svg
      key={1}
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 mb-4 text-[#1E88E5]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.01" />
      <path d="M18 8h.01" />
      <path d="M12 8h.01" />
      <path d="M6 12h.01" />
      <path d="M18 12h.01" />
      <path d="M12 12h.01" />
      <path d="M6 16h.01" />
      <path d="M18 16h.01" />
      <path d="M12 16h.01" />
    </svg>,
    <Dumbbell key={2} className="h-12 w-12 mb-4 text-[#1E88E5]" />,
    <Coffee key={3} className="h-12 w-12 mb-4 text-[#1E88E5]" />,
  ];

  return defaultIcons[index % defaultIcons.length];
}

// Función para obtener una imagen para un área común
function getImageForArea(areaId) {
  const imageMap = {
    gimnasio: "/luxury-condominium.png",
    piscina: "/modern-apartment-building.png",
    coworking: "/modern-city-building.png",
    parrillas: "/modern-apartment-building.png",
    lobby: "/luxury-condominium.png",
  };

  return imageMap[areaId] || "/modern-apartment-building.png";
}

// Función para obtener el nombre legible de un lugar cercano
function getNombreLugar(key) {
  const nombres = {
    centrosComerciales: "Centros Comerciales",
    universidades: "Universidades",
    hoteles: "Hoteles",
    zonasExclusivas: "Zonas Exclusivas",
    parques: "Parques",
    hospitales: "Hospitales",
    colegios: "Colegios",
    restaurantes: "Restaurantes",
    transporte: "Transporte Público",
    bancos: "Bancos",
  };

  return nombres[key] || key;
}
