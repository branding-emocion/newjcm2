"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

// Datos para la sección de estilo
const styleFeatures = [
  {
    id: "luxury",
    title: "ACABADOS DE LUJO",
    description:
      "Utilizamos materiales de primera calidad y acabados premium que reflejan elegancia y sofisticación en cada detalle.",
    image: "/GaleriaEstilos/Lujo2.png",
    icon: "/icons/luxury.svg",
  },
  {
    id: "spaces",
    title: "AMPLIOS AMBIENTES",
    description:
      "Diseñamos espacios generosos y bien distribuidos que maximizan la comodidad y funcionalidad para nuestros clientes.",
    image: "/GaleriaEstilos/Lujo1.png",
    icon: "/icons/spaces.svg",
  },
  {
    id: "light",
    title: "AMPLIA ILUMINACIÓN",
    description:
      "Priorizamos la luz natural con grandes ventanales que crean ambientes luminosos y acogedores durante todo el día.",
    image: "/GaleriaEstilos/Ilu.png",
    icon: "/icons/light.svg",
  },
  {
    id: "location",
    title: "UBICACIÓN ESTRATÉGICA",
    description:
      "Seleccionamos las mejores ubicaciones con acceso a servicios, comercios y vías principales para una vida cómoda y conectada.",
    image: "/GaleriaEstilos/Plaza.png",
    icon: "/icons/location.svg",
  },
];

export default function OurStyleSection() {
  const [activeFeature, setActiveFeature] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-[100px] opacity-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full filter blur-[100px] opacity-5"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            NUESTRO ESTILO
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Deseamos plasmar un estilo propio en cada uno de nuestros proyectos,
            que harán de nuestra marca única y destacable.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-8"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {styleFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      activeFeature === feature.id
                        ? { height: "auto", opacity: 1 }
                        : {
                            height: 0,
                            opacity: 0,
                            transitionEnd: { display: "none" },
                          }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-200 text-sm mb-4">
                      {feature.description}
                    </p>
                  </motion.div>

                  <div className="absolute bottom-6 right-6">
                    <motion.div
                      animate={
                        activeFeature === feature.id
                          ? { rotate: 45, scale: 1.1 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.2 }}
                      className="bg-blue-500 rounded-full p-2 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/NuestroEstilo"
            className="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 transition-colors duration-300 font-medium rounded-md"
          >
            LEER MÁS
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
