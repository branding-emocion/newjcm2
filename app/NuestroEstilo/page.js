"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NuestroEstiloPage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <StyleFeaturesSection />
      <MaterialsSection />
      <GallerySection />
      <ProcessSection />
      <CTASection />
    </main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative h-[60vh] flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/NuestroEstilo.jpg"
          alt="Nuestro Estilo - JCM Constructora Inmobiliaria"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            NUESTRO ESTILO
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={
              isInView
                ? { opacity: 1, width: "100px" }
                : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1 bg-blue-500 mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl text-white/90 leading-relaxed"
          >
            Deseamos plasmar un estilo propio en cada uno de nuestros proyectos,
            que harán de nuestra marca única y destacable. Descubra la
            elegancia, calidad y atención al detalle que nos distingue en el
            mercado inmobiliario.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StyleFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const styleFeatures = [
    {
      id: "luxury",
      title: "ACABADOS DE LUJO",
      description:
        "Los acabados de nuestros departamentos son importados con altos estándares de calidad y garantía. Nuestros proveedores europeos, quienes producen sanitarios, pisos, cerámicos, porcelanatos y la línea de acabados, demuestran elegancia con iluminación en el mercado Italiano.",
      images: ["/GaleriaEstilos/Lujo2.png"],
    },
    {
      id: "spaces",
      title: "AMPLIOS AMBIENTES",
      description:
        "Nos caracterizamos por que los ambientes de cada departamento tienen un amplio espacio, con una distribución óptima y funcional. Nuestros clientes disfrutan de ambientes cómodos y bien proporcionados, perfectos para la vida moderna.",
      images: ["/GaleriaEstilos/Lujo1.png"],
    },
    {
      id: "light",
      title: "ILUMINACIÓN NATURAL",
      description:
        "Nos preocupamos por que la mayor cantidad de iluminación y ventilación natural sea óptima, de esta forma contribuimos a la reducción del consumo de energía, además aprovechando la mayor cantidad de luz natural posible.",
      images: ["/GaleriaEstilos/Ilu.png"],
    },
    {
      id: "location",
      title: "UBICACIÓN ESTRATÉGICA",
      description:
        "La ubicación es el factor importante al momento de elegir dónde vivir, por ello, nuestros proyectos inmobiliarios, además de confortables y con un diseño exclusivo, cuentan con una ubicación estratégica en zonas de gran plusvalía, cerca de centros comerciales, colegios y áreas recreativas.",
      images: ["/GaleriaEstilos/interbank.jpg"],
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Distintivas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestros proyectos se caracterizan por cuatro pilares fundamentales
            que definen nuestro estilo único y garantizan la máxima satisfacción
            de nuestros clientes.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="space-y-24">
          {styleFeatures.map((feature, index) => (
            <StyleFeatureItem
              key={feature.id}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StyleFeatureItem({ feature, index, isInView }) {
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`grid md:grid-cols-2 gap-8 items-center ${
        isEven ? "" : "md:grid-flow-dense"
      }`}
    >
      <div className={isEven ? "md:order-1" : "md:order-2"}>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isItemInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 rounded-lg overflow-hidden shadow-xl"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={feature.images[0] || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20, y: 20 }}
            animate={
              isItemInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isEven ? 20 : -20, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-4 -right-4 w-2/3 rounded-lg overflow-hidden shadow-xl z-0"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={feature.images[1] || "/placeholder.svg"}
                alt={`${feature.title} detalle`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className={isEven ? "md:order-2" : "md:order-1"}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={
            isItemInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? -30 : 30 }
          }
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {feature.title}
          </h3>
          <div className="w-16 h-1 bg-blue-600 mb-6"></div>
          <p className="text-gray-600 leading-relaxed mb-6">
            {feature.description}
          </p>
          <Link
            href={`/ProyectosEnVenta`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Ver proyectos con esta característica
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MaterialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const materials = [
    {
      name: "Porcelanato Italiano",
      description:
        "Acabados de la más alta calidad importados directamente de Italia.",
      image: "/materials/PorcelanatoItaliano.jpg",
    },
    {
      name: "Grifería Europea",
      description:
        "Grifos y accesorios de baño con diseños modernos y funcionales.",
      image: "/materials/Grifo.jpg",
    },
    {
      name: "Sanitarios Suspendidos",
      description:
        "Inodoros suspendidos que aportan elegancia y facilitan la limpieza.",
      image: "/materials/BañoSuspendido.jpg",
    },
    {
      name: "Puertas de Seguridad",
      description: "Puertas blindadas que garantizan la seguridad de su hogar.",
      image: "/materials/Puertas.jpg",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Materiales Premium
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seleccionamos cuidadosamente los mejores materiales importados para
            garantizar la durabilidad, estética y funcionalidad de nuestros
            proyectos.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={material.image || "/placeholder.svg"}
                  alt={material.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {material.name}
                </h3>
                <p className="text-gray-600">{material.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: "/GaleriaEstilos/Sala.jpg",
      alt: "Sala de estar moderna",
      category: "Interiores",
    },
    {
      src: "/GaleriaEstilos/Cocina.jpeg",
      alt: "Cocina de diseño",
      category: "Cocinas",
    },
    {
      src: "/GaleriaEstilos/Baño.jpeg",
      alt: "Baño de lujo",
      category: "Baños",
    },
    {
      src: "/GaleriaEstilos/Dormitorio.jpeg",
      alt: "Dormitorio principal",
      category: "Dormitorios",
    },
    {
      src: "/GaleriaEstilos/Fachada.jpg",
      alt: "Fachada moderna",
      category: "Exteriores",
    },
    {
      src: "/GaleriaEstilos/Plaza.png",
      alt: "Detalle arquitectónico",
      category: "Detalles",
    },
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galería de Estilos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nuestra galería de imágenes para apreciar el estilo
            distintivo y la calidad de nuestros proyectos inmobiliarios.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-medium bg-blue-600 px-2 py-1 rounded-md inline-block mb-2 w-fit">
                    {image.category}
                  </span>
                  <h3 className="text-white text-lg font-semibold">
                    {image.alt}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 md:left-8 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Imagen anterior"
              >
                <ArrowRight className="h-6 w-6 text-white rotate-180" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 md:right-8 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Siguiente imagen"
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Cerrar galería"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {galleryImages[selectedImage].alt}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {galleryImages[selectedImage].category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openItem, setOpenItem] = useState(0);

  const processSteps = [
    {
      title: "Diseño Arquitectónico",
      description:
        "Nuestro equipo de arquitectos diseña cada proyecto con un enfoque en la funcionalidad, estética y aprovechamiento óptimo de los espacios. Trabajamos con las últimas tendencias en diseño y arquitectura para crear ambientes modernos y atemporales.",
    },
    {
      title: "Selección de Materiales",
      description:
        "Seleccionamos cuidadosamente los mejores materiales, priorizando la calidad, durabilidad y estética. Importamos acabados de Europa que cumplen con los más altos estándares internacionales para garantizar un resultado excepcional.",
    },
    {
      title: "Construcción de Calidad",
      description:
        "Nuestro proceso constructivo sigue rigurosos controles de calidad en cada etapa. Contamos con un equipo de profesionales altamente calificados y utilizamos tecnologías avanzadas para asegurar la excelencia en la ejecución.",
    },
    {
      title: "Acabados de Lujo",
      description:
        "La fase de acabados es donde nuestro estilo distintivo cobra vida. Instalamos porcelanatos italianos, griferías europeas, sanitarios suspendidos y otros elementos premium que elevan el nivel de sofisticación de nuestros proyectos.",
    },
    {
      title: "Control de Calidad Final",
      description:
        "Antes de la entrega, realizamos exhaustivas inspecciones para garantizar que cada detalle cumple con nuestros estándares. Verificamos instalaciones, acabados y funcionamiento de todos los sistemas para asegurar la satisfacción total del cliente.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Proceso
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conozca el meticuloso proceso que seguimos para garantizar la
            excelencia en cada uno de nuestros proyectos inmobiliarios.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-4"
            >
              <div
                className={cn(
                  "border rounded-lg transition-all duration-200",
                  openItem === index
                    ? "border-blue-200 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                )}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full p-4 text-left"
                  aria-expanded={openItem === index}
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors",
                        openItem === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      )}
                    >
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <div>
                    {openItem === index ? (
                      <Minus className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openItem === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-gray-200">
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const benefits = [
    "Acabados importados de Europa",
    "Diseños modernos y funcionales",
    "Amplios espacios con excelente iluminación",
    "Ubicaciones estratégicas",
    "Atención personalizada",
    "Garantía de calidad",
  ];

  return (
    <section ref={ref} className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experimente Nuestro Estilo
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Descubra por qué nuestros clientes eligen JCM Constructora
              Inmobiliaria para su inversión inmobiliaria. Visite nuestros
              proyectos y experimente la calidad y el estilo que nos distingue.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center"
                >
                  <Check className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/ProyectosEnVenta"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                Ver Proyectos
              </Link>
              <Link
                href="/contactenos"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Contáctenos
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/style/showcase-apartment.jpg"
                alt="Apartamento de lujo JCM"
                width={600}
                height={400}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-md inline-block mb-3">
                  Destacado
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Las Hortensias 269
                </h3>
                <p className="text-white/90 mb-4">
                  Exclusivo edificio residencial con acabados de lujo y
                  ubicación privilegiada.
                </p>
                <Link
                  href="/ProyectosEnVenta/las-hortensias-269"
                  className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
                >
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
