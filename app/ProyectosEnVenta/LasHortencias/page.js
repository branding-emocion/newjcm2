"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Download,
  MapPin,
  Home,
  DollarSign,
  Phone,
  Mail,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HortensiasPage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <ProjectInfoSection />
    </main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/projects/hortensias/exterior.jpg",
      title: "Fachada",
    },
    {
      image: "/projects/hortensias/living.jpg",
      title: "Sala de estar",
    },
    {
      image: "/projects/hortensias/kitchen.jpg",
      title: "Cocina",
    },
    {
      image: "/projects/hortensias/bedroom.jpg",
      title: "Dormitorio principal",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section ref={ref} className="relative bg-white overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Slider */}
        <div className="relative h-[50vh] lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors z-10"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors z-10"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Project Info */}
        <div className="p-6 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-md mb-4">
              RESIDENCIAL
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Las Hortensias 269
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              CALLE LAS HORTENSIAS 269 - URB. CALIFORNIA, TRUJILLO - PERÚ
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Home className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600 text-center">
                  2-3 Dormitorios
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-sm text-gray-600 text-center">
                  75-120 m²
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600 text-center">
                  Urb. California
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600 text-center">
                  Desde $120,000
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 22V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16" />
                  <path d="M2 22h20" />
                  <path d="M7 10.5V22" />
                  <path d="M17 10.5V22" />
                  <path d="M12 10.5V22" />
                  <path d="M2 10.5h20" />
                </svg>
                <span className="text-sm text-gray-600 text-center">
                  Estacionamiento
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-sm text-gray-600 text-center">
                  Entrega Dic. 2023
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="#contacto"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                Solicitar información
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/brochure/las-hortensias-269"
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar brochure
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="https://wa.me/51947455553?text=Hola,%20estoy%20interesado%20en%20Las%20Hortensias%20269"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Link>
              <Link
                href="tel:+51947455553"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Llamar
              </Link>
              <Link
                href="mailto:ventas@jcmconstructora.com"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectInfoSection() {
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const galleryImages = [
    { src: "/projects/hortensias/living.jpg", alt: "Sala de estar" },
    { src: "/projects/hortensias/kitchen.jpg", alt: "Cocina" },
    { src: "/projects/hortensias/bedroom.jpg", alt: "Dormitorio principal" },
    { src: "/projects/hortensias/bathroom.jpg", alt: "Baño" },
    { src: "/projects/hortensias/dining.jpg", alt: "Comedor" },
    { src: "/projects/hortensias/exterior.jpg", alt: "Fachada" },
  ];

  const floorPlans = [
    {
      id: "tipo-1a",
      title: "TIPO 1A",
      area: "63m²",
      bedrooms: 2,
      bathrooms: 1,
      image: "/projects/hortensias/floor-plans/tipo-1a.jpg",
      price: "Desde $120,000",
    },
    {
      id: "tipo-1",
      title: "TIPO 1",
      area: "67m²",
      bedrooms: 2,
      bathrooms: 1,
      image: "/projects/hortensias/floor-plans/tipo-1.jpg",
      price: "Desde $126,000",
    },
    {
      id: "tipo-2",
      title: "TIPO 2",
      area: "81m²",
      bedrooms: 3,
      bathrooms: 2,
      image: "/projects/hortensias/floor-plans/tipo-2.jpg",
      price: "Desde $149,000",
    },
    {
      id: "tipo-3a",
      title: "TIPO 3A",
      area: "95m²",
      bedrooms: 3,
      bathrooms: 2,
      image: "/projects/hortensias/floor-plans/tipo-3a.jpg",
      price: "Desde $169,000",
    },
  ];

  const amenities = [
    "Ascensor",
    "Estacionamiento",
    "Seguridad 24/7",
    "Terraza común",
    "Gimnasio",
    "Sala de eventos",
    "Zona de parrilla",
    "Cámaras de seguridad",
  ];

  const openGallery = (index) => {
    setActiveGalleryImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setActiveGalleryImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setActiveGalleryImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveGalleryImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <section ref={ref} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Descripción</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="floor-plans">Planos</TabsTrigger>
            <TabsTrigger value="progress">Avance</TabsTrigger>
            <TabsTrigger value="contact" id="contacto">
              Contacto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Acerca del proyecto
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Exclusivo edificio residencial ubicado en la mejor zona de
                    Trujillo. Las Hortensias 269 ofrece apartamentos de lujo con
                    acabados de primera calidad, amplios espacios y excelente
                    iluminación natural.
                  </p>
                  <p className="text-gray-700 mb-6">
                    El proyecto cuenta con áreas comunes que incluyen gimnasio,
                    sala de eventos, terraza con zona de parrilla y
                    estacionamiento subterráneo. Su ubicación privilegiada
                    permite fácil acceso a centros comerciales, colegios y
                    parques.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Características
                  </h3>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Ubicación
                  </h3>
                  <div className="rounded-lg overflow-hidden h-[300px] relative mb-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.9359286256!2d-79.04680492394823!3d-8.108356082818388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7fe3fae92d%3A0x48b3e39e4088d4dd!2sUrb.%20California%2C%20V%C3%ADctor%20Larco%20Herrera%2013009%2C%20Peru!5e0!3m2!1sen!2sus!4v1684881054700!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Las Hortensias 269"
                    ></iframe>
                  </div>
                </motion.div>
              </div>

              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Información de contacto
                  </h3>

                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Desde $120,000</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Financiamiento disponible con las principales entidades
                      bancarias
                    </p>

                    <Link
                      href="#contacto"
                      className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 transition-colors mb-3"
                      onClick={() =>
                        document.getElementById("contacto").click()
                      }
                    >
                      Solicitar información
                    </Link>

                    <Link
                      href="/brochure/las-hortensias-269"
                      className="block w-full py-3 px-4 bg-white text-blue-600 text-center font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Descargar brochure
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium mb-2">Oficina de ventas</h4>
                    <p className="text-gray-600 mb-1">
                      Av. Principal 123, Trujillo
                    </p>
                    <p className="text-gray-600 mb-1">
                      Lunes a Viernes: 9am - 6pm
                    </p>
                    <p className="text-gray-600 mb-1">Sábados: 9am - 1pm</p>
                    <p className="text-gray-600 mb-4">
                      Teléfono: (044) 123-4567
                    </p>

                    <Link
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Ver en Google Maps
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Galería de imágenes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openGallery(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
              {activeGalleryImage !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                  onClick={closeGallery}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 md:left-8 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 md:right-8 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>

                  <button
                    onClick={closeGallery}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Cerrar galería"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-4xl max-h-[80vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={
                        galleryImages[activeGalleryImage].src ||
                        "/placeholder.svg"
                      }
                      alt={galleryImages[activeGalleryImage].alt}
                      width={1200}
                      height={800}
                      className="object-contain max-h-[80vh]"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                      <h3 className="text-white text-lg font-semibold">
                        {galleryImages[activeGalleryImage].alt}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="floor-plans" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Planos y tipologías
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {floorPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {plan.title}
                        </h3>
                        <span className="text-blue-600 font-semibold">
                          {plan.area}
                        </span>
                      </div>
                      <div className="flex space-x-4 text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Home className="h-4 w-4 text-blue-600 mr-1" />
                          {plan.bedrooms} Dormitorios
                        </span>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          {plan.bathrooms} Baños
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Amplio departamento con excelente distribución y
                        acabados de primera calidad.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          {plan.price}
                        </span>
                        <Link
                          href="#contacto"
                          onClick={() =>
                            document.getElementById("contacto").click()
                          }
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          Más información
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Avance de la obra
              </h2>
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-0 ml-6 border-l-2 border-blue-600 h-full"></div>

                {/* Phases */}
                <div className="space-y-12 ml-12">
                  <div className="relative">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 1
                        </h3>
                        <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
                          Completado
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Preparación del terreno y excavación. Incluye limpieza
                        del terreno, nivelación y excavación para los cimientos.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Image
                          src="/projects/hortensias/progress/phase1-1.jpg"
                          alt="Preparación del terreno"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                        <Image
                          src="/projects/hortensias/progress/phase1-2.jpg"
                          alt="Excavación"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 2
                        </h3>
                        <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
                          Completado
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Cimentación y estructura base. Construcción de los
                        cimientos, columnas y vigas principales que soportarán
                        el edificio.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Image
                          src="/projects/hortensias/progress/phase2-1.jpg"
                          alt="Cimentación"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                        <Image
                          src="/projects/hortensias/progress/phase2-2.jpg"
                          alt="Estructura base"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 3
                        </h3>
                        <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
                          Completado
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Levantamiento de muros y losas. Construcción de paredes,
                        techos y divisiones interiores de cada nivel del
                        edificio.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Image
                          src="/projects/hortensias/progress/phase3-1.jpg"
                          alt="Levantamiento de muros"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                        <Image
                          src="/projects/hortensias/progress/phase3-2.jpg"
                          alt="Construcción de losas"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 4
                        </h3>
                        <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
                          Completado
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Instalaciones y redes. Colocación de tuberías, cableado
                        eléctrico, sistemas de ventilación y demás instalaciones
                        técnicas.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Image
                          src="/projects/hortensias/progress/phase4-1.jpg"
                          alt="Instalaciones eléctricas"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                        <Image
                          src="/projects/hortensias/progress/phase4-2.jpg"
                          alt="Instalaciones sanitarias"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 border-blue-200 ring-2 ring-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 5 (Actual)
                        </h3>
                        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                          En progreso
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Acabados e interiores. Instalación de pisos,
                        revestimientos, carpintería, sanitarios, cocinas y demás
                        acabados finales.
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Image
                          src="/projects/hortensias/progress/phase5-1.jpg"
                          alt="Instalación de acabados"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                        <Image
                          src="/projects/hortensias/progress/phase5-2.jpg"
                          alt="Acabados interiores"
                          width={300}
                          height={200}
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative opacity-50">
                    <div className="absolute -left-[3.25rem] mt-1.5 w-6 h-6 rounded-full border-4 border-white bg-gray-300 shadow"></div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Fase 6
                        </h3>
                        <span className="text-sm bg-gray-100 text-gray-800 py-1 px-3 rounded-full">
                          Próximamente
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Entrega final. Limpieza general, inspecciones finales y
                        entrega de unidades a los propietarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Estado actual del proyecto
                </h3>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: "83%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Inicio de obra</span>
                    <span>83% completado</span>
                    <span>Entrega</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  El proyecto Las Hortensias 269 se encuentra actualmente en la{" "}
                  <strong>Fase 5</strong>, correspondiente a la instalación de
                  acabados e interiores. Se están colocando los pisos de
                  porcelanato importado, instalando la carpintería, sanitarios
                  suspendidos y demás acabados de lujo. La fecha estimada de
                  entrega se mantiene para Diciembre 2023.
                </p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Solicitar información
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nombres"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Nombres *
                        </label>
                        <input
                          type="text"
                          id="nombres"
                          name="nombres"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="apellidos"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          id="apellidos"
                          name="apellidos"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="telefono"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Teléfono o Celular *
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="tipologia"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tipología de interés
                      </label>
                      <select
                        id="tipologia"
                        name="tipologia"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="tipo-1a">Tipo 1A - 63m²</option>
                        <option value="tipo-1">Tipo 1 - 67m²</option>
                        <option value="tipo-2">Tipo 2 - 81m²</option>
                        <option value="tipo-3a">Tipo 3A - 95m²</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      ></textarea>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="privacy"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Acepto la{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          política de privacidad
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    >
                      <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                    </button>
                  </form>
                </div>

                <div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Información de contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Dirección
                          </h4>
                          <p className="text-gray-600">
                            Calle Las Hortensias 269, Urb. California, Trujillo
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Teléfono
                          </h4>
                          <p className="text-gray-600">
                            (044) 123-4567 / 947 455 553
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Email</h4>
                          <p className="text-gray-600">
                            ventas@jcmconstructora.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      ¿Por qué elegirnos?
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Más de 12 años de experiencia en el mercado
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Acabados importados de Europa
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Ubicaciones estratégicas en zonas de alta plusvalía
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Diseños modernos con amplios espacios
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Excelente iluminación natural
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
