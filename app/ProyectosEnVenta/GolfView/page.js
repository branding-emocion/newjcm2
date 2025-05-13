"use client";

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
  Download,
  ArrowDown,
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <Image
          src="/Fachadas/Golf.jpg"
          alt="Golf View - Edificio de Apartamentos de Lujo"
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
              <motion.div variants={fadeIn}>
                <Badge className="bg-[#1E88E5] text-white mb-4 px-4 py-1 text-sm rounded-full">
                  NUEVO PROYECTO
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                GOLF VIEW
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-8">
                Disfruta de calidad, prestigio y exclusividad en el mejor
                proyecto residencial de Victor Larco
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-4"
              >
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

                <motion.div variants={itemFadeIn}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white text-[#1E88E5] hover:bg-white/90 border-none"
                  >
                    <a
                      href="https://bit.ly/EDIFICIO3DGOLFVIEW"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visualizar en 3D
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#1E88E5] hover:bg-white/90 border-none"
                    asChild
                  >
                    <a
                      href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" /> Descargar Brochure
                    </a>
                  </Button>
                </motion.div>
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

      {/* Resumen del Proyecto */}
      <motion.section
        className="py-8 bg-white border-b"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                FLATS DE
              </h3>
              <p className="text-2xl font-semibold">71 m² HASTA 156 m²</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                UBICACIÓN
              </h3>
              <p className="text-2xl font-semibold">
                Av. Huamán 830, Victor Larco
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-bold text-[#1E88E5] mb-2">
                DEPARTAMENTOS
              </h3>
              <p className="text-2xl font-semibold">2 y 3 Dormitorios</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-bold text-[#1E88E5] mb-2">ENTREGA</h3>
              <p className="text-2xl font-semibold">2026</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Banner de Brochure */}
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-[#1E88E5] hover:bg-white/90 border-none"
                asChild
              >
                <a
                  href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" /> Descargar Brochure
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Características Principales */}
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
            <motion.div variants={itemFadeIn}>
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
                    <Building className="h-12 w-12 mb-4 text-[#1E88E5]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    ESTRUCTURA ANTISÍSMICA
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    DOS ASCENSORES
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                      <path d="M5 10h14" />
                      <path d="M5 14h14" />
                      <path d="M5 18h14" />
                      <path d="M19 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                      <path d="M12 6V3" />
                      <path d="M8 3h8" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    ÁREA DE TENDALES
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    ESTACIONAMIENTOS
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemFadeIn}>
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
                    <Dumbbell className="h-12 w-12 mb-4 text-[#1E88E5]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    GIMNASIO
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                    <Coffee className="h-12 w-12 mb-4 text-[#1E88E5]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    ÁREA DE COWORKING
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                    <Utensils className="h-12 w-12 mb-4 text-[#1E88E5]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">
                    ÁREA DE PARRILLAS
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemFadeIn}>
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
                      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
                      <path d="M8 7h.01" />
                      <path d="M16 7h.01" />
                      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-center">LOBBY</h3>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Departamentos */}
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

          <Tabs defaultValue="tipo1" className="w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scaleUp}
            >
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="tipo1"
                  className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                >
                  TIPO 1
                </TabsTrigger>
                <TabsTrigger
                  value="tipo2a"
                  className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                >
                  TIPO 2A
                </TabsTrigger>
                <TabsTrigger
                  value="tipo3a"
                  className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                >
                  TIPO 3A
                </TabsTrigger>
                <TabsTrigger
                  value="tipo2"
                  className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                >
                  TIPO 2
                </TabsTrigger>
                <TabsTrigger
                  value="tipo3"
                  className="data-[state=active]:bg-[#1E88E5] data-[state=active]:text-white py-3"
                >
                  TIPO 3
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="tipo1" className="mt-8">
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
                    70 m²
                  </motion.div>
                  <motion.div
                    className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Image
                      src="/modern-apartment-floor-plan.png"
                      alt="Plano Tipo 1"
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
                    2 DORMITORIOS
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">TIPO 1</h3>
                  <p className="text-lg mb-2 text-gray-700">
                    Área total: 70 m²
                  </p>
                  <p className="text-lg mb-6 text-gray-700">
                    Ubicación: 2° piso - 13° piso
                  </p>

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
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala comedor con balcón</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Cocina</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>2 dormitorios (1 principal)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>2 baños (1 principal, 1 compartido)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Centro de lavado</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                        Solicitar información
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#1E88E5] text-[#1E88E5] w-full"
                        asChild
                      >
                        <a
                          href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" /> Brochure
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="tipo2a" className="mt-8">
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
                    150 m²
                  </motion.div>
                  <motion.div
                    className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Image
                      src="/9wuur.png"
                      alt="Plano Tipo 2A"
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
                    3 DORMITORIOS
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">TIPO 2A</h3>
                  <p className="text-lg mb-2 text-gray-700">
                    Área total: 150 m²
                  </p>
                  <p className="text-lg mb-6 text-gray-700">
                    Ubicación: 2° piso
                  </p>

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
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala comedor con balcón</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Cocina</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>3 dormitorios (1 principal)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>
                          3 baños (1 principal, 1 compartido, 1 visita)
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Centro de lavado</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Terraza compartida</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                        Solicitar información
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#1E88E5] text-[#1E88E5] w-full"
                        asChild
                      >
                        <a
                          href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" /> Brochure
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="tipo3a" className="mt-8">
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
                    157 m²
                  </motion.div>
                  <motion.div
                    className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Image
                      src="/placeholder.svg?key=yuiz7"
                      alt="Plano Tipo 3A"
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
                    3 DORMITORIOS
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">TIPO 3A</h3>
                  <p className="text-lg mb-2 text-gray-700">
                    Área total: 157 m²
                  </p>
                  <p className="text-lg mb-6 text-gray-700">
                    Ubicación: 2° piso
                  </p>

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
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala comedor con balcón</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Cocina</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala de estar</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>3 dormitorios (1 principal)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>
                          3 baños (1 principal, 1 compartido, 1 visita)
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Centro de lavado</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Terraza compartida</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                        Solicitar información
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#1E88E5] text-[#1E88E5] w-full"
                        asChild
                      >
                        <a
                          href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" /> Brochure
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="tipo2" className="mt-8">
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
                    105 m²
                  </motion.div>
                  <motion.div
                    className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Image
                      src="/placeholder.svg?key=i3oyg"
                      alt="Plano Tipo 2"
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
                    3 DORMITORIOS
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">TIPO 2</h3>
                  <p className="text-lg mb-2 text-gray-700">
                    Área total: 105 m²
                  </p>
                  <p className="text-lg mb-6 text-gray-700">
                    Ubicación: 3° piso - 13° piso
                  </p>

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
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala comedor con balcón</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Cocina</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>3 dormitorios (1 principal)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>
                          3 baños (1 principal, 1 compartido, 1 visita)
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Centro de lavado</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                        Solicitar información
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#1E88E5] text-[#1E88E5] w-full"
                        asChild
                      >
                        <a
                          href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" /> Brochure
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="tipo3" className="mt-8">
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
                    113 m²
                  </motion.div>
                </motion.div>

                <motion.div
                  className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-lg"
                  whileHover={{
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Image
                    src="/placeholder.svg?key=mojkc"
                    alt="Plano Tipo 3"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={slideFromRight}
                >
                  <Badge className="bg-[#1E88E5] text-white mb-2 w-fit">
                    3 DORMITORIOS
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">TIPO 3</h3>
                  <p className="text-lg mb-2 text-gray-700">
                    Área total: 113 m²
                  </p>
                  <p className="text-lg mb-6 text-gray-700">
                    Ubicación: 3° piso - 13° piso
                  </p>

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
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala comedor con balcón</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Cocina</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Sala de estar</span>
                      </motion.li>

                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>3 dormitorios (1 principal)</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>
                          3 baños (1 principal, 1 compartido, 1 visita)
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        variants={itemFadeIn}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight className="mr-2 h-5 w-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                        <span>Centro de lavado</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#1E88E5] hover:bg-[#1976D2] w-full">
                        Solicitar información
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-[#1E88E5] text-[#1E88E5] w-full"
                        asChild
                      >
                        <a
                          href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" /> Brochure
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Ubicación */}
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
                  <motion.div variants={itemFadeIn}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <span className="w-3 h-3 bg-[#1E88E5] rounded-full mr-2"></span>
                          REAL PLAZA
                        </h4>
                        <p className="text-sm text-slate-600">
                          Centro comercial a minutos de distancia
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemFadeIn}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <span className="w-3 h-3 bg-[#1E88E5] rounded-full mr-2"></span>
                          UPAO
                        </h4>
                        <p className="text-sm text-slate-600">
                          Universidad cercana
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemFadeIn}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <span className="w-3 h-3 bg-[#1E88E5] rounded-full mr-2"></span>
                          HILTON
                        </h4>
                        <p className="text-sm text-slate-600">
                          Hotel de lujo en la zona
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemFadeIn}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <span className="w-3 h-3 bg-[#1E88E5] rounded-full mr-2"></span>
                          ARCOS DEL GOLF
                        </h4>
                        <p className="text-sm text-slate-600">Zona exclusiva</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 11H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
                        <path d="M11 7c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v2h-4V9c0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6Z" />
                        <path d="M12 6V3" />
                        <path d="M10 3h4" />
                        <path d="M17 22H7a2 2 0 0 1-2-2v-9" />
                        <path d="M19 11v9a2 2 0 0 1-2 2" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        RESTAURANTES
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        COLEGIOS
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                        <path d="M2 7h20" />
                        <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                        <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        SUPERMERCADOS
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="2" x2="22" y1="9" y2="9" />
                        <path d="M12 7v10" />
                        <path d="m19 7-3 10" />
                        <path d="m5 7 3 10" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        BANCOS
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                        <path d="M16 3v3a2 2 0 0 0 2 2h3" />
                        <path d="M8 21v-3a2 2 0 0 0-2-2H3" />
                        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        CLÍNICAS
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-2 text-[#1E88E5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                        <circle cx="12" cy="8" r="2" />
                      </svg>
                      <h4 className="font-semibold text-center text-sm">
                        PARQUES
                      </h4>
                    </div>
                  </motion.div>
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
                    src="/Fachadas/GolfoDia.jpg"
                    alt="Ubicación Golf View"
                    width={800}
                    height={500}
                    className="w-full h-auto  "
                    objectFit="cover"
                  />
                </motion.div>
                <motion.div
                  className="bg-white py-3 px-6 rounded-b-lg shadow-lg flex items-center justify-center"
                  whileHover={{ y: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="text-[#1E88E5] mr-2" />
                  <p className="font-medium">Av. Huamán 830, Victor Larco</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Áreas Comunes */}
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
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden group">
                      <div className="relative">
                        <Image
                          src="/6yndq.png"
                          alt="Gimnasio"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <p className="font-medium">
                              Mantente en forma sin salir del edificio
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 bg-white">
                        <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                          GIMNASIO
                        </h3>
                        <p className="text-slate-600">
                          Espacio equipado con máquinas de última generación
                          para tu entrenamiento diario.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden group">
                      <div className="relative">
                        <Image
                          src="/2ckc5.png"
                          alt="Área de Coworking"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <p className="font-medium">
                              Trabaja cómodamente desde tu edificio
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 bg-white">
                        <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                          ÁREA DE COWORKING
                        </h3>
                        <p className="text-slate-600">
                          Espacio diseñado para trabajar o estudiar con todas
                          las comodidades necesarias.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden group">
                      <div className="relative">
                        <Image
                          src="/it16h.png"
                          alt="Área de Parrillas"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <p className="font-medium">
                              Disfruta de reuniones sociales con amigos y
                              familia
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 bg-white">
                        <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                          ÁREA DE PARRILLAS
                        </h3>
                        <p className="text-slate-600">
                          Espacio perfecto para reuniones sociales y parrilladas
                          con vista a la ciudad.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden group">
                      <div className="relative">
                        <Image
                          src="/dflud.png"
                          alt="Lobby"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <p className="font-medium">
                              Elegante recepción para residentes y visitantes
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 bg-white">
                        <h3 className="text-xl font-bold mb-2 text-[#1E88E5]">
                          LOBBY
                        </h3>
                        <p className="text-slate-600">
                          Elegante recepción que da la bienvenida a residentes y
                          visitantes con un diseño moderno.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>
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

      {/* Banner de Brochure */}
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
              <Button
                size="lg"
                className="bg-white text-[#1E88E5] hover:bg-white/90 border-none text-lg px-8 py-6"
                asChild
              >
                <a
                  href="/Brochures/BROCHURE_GOLF_VIEW.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" /> Descargar Brochure
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contacto */}
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
                ¡Disfruta de calidad, prestigio y exclusividad en Golf View!
              </p>

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <MapPin className="mr-4 mt-1 flex-shrink-0" />
                  <p>Calle Los Granados 403-Dpto801-Urb California</p>
                </motion.div>

                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Phone className="mr-4 mt-1 flex-shrink-0" />
                  <p>947 455 553</p>
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
                  <p>ventas@jcmconstrucciones.com</p>
                </motion.div>

                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Globe className="mr-4 mt-1 flex-shrink-0" />
                  <p>www.jcmconstrucciones.com</p>
                </motion.div>

                <motion.div
                  className="flex items-start bg-white/10 p-4 rounded-lg"
                  variants={itemFadeIn}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Instagram className="mr-4 mt-1 flex-shrink-0" />
                  <p>jcm_constructorainmobiliaria</p>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-[#1E88E5] hover:bg-white/90 hover:text-[#1565C0]"
                >
                  <a
                    href="https://bit.ly/EDIFICIO3DGOLFVIEW"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VISUALIZA EL PROYECTO EN 3D
                  </a>
                </Button>
              </motion.div>
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

                <form className="space-y-5">
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
                      >
                        Enviar mensaje
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
