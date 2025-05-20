"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

// Datos para la sección de blog
const blogPosts = [
  {
    id: "post-1",
    title: "5 ventajas indiscutibles de vivir en un departamento",
    excerpt:
      "¿Quieres saber cuáles son las ventajas de vivir en un departamento y porqué es una excelente inversión? Continúa leyendo porque conocerás 5 razones por las que debes comprar un departamento...",
    image: "/blog/ventajas-departamento.jpg",
    date: "15 Mayo, 2023",
    readTime: "5 min",
    author: "Carlos Mendoza",
    link: "/blog/ventajas-departamento",
  },
  {
    id: "post-2",
    title: "8 ideas increíbles para decorar el cuarto de tus hijos",
    excerpt:
      "Todos queremos que la habitación de nuestros hijos sea la más linda de todas. La premisa es clara: lograr que el cuarto se vea bonito, aprovechar el espacio disponible al...",
    image: "/blog/decorar-cuarto-hijos.jpg",
    date: "28 Abril, 2023",
    readTime: "7 min",
    author: "María Sánchez",
    link: "/blog/decorar-cuarto-hijos",
  },
  {
    id: "post-3",
    title: "Consejos para mantener tu departamento siempre ordenado",
    excerpt:
      "Si dedicas todos los días diez minutos a limpiar lograrás tener la casa ordenada y además no tendrás que esforzarte el doble para hacer la limpieza general al fin de...",
    image: "/blog/departamento-ordenado.jpg",
    date: "10 Abril, 2023",
    readTime: "4 min",
    author: "Ana Torres",
    link: "/blog/departamento-ordenado",
  },
];

export default function BlogSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            NUESTRO BLOG
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre consejos, tendencias y novedades del mundo inmobiliario
            para tomar las mejores decisiones.
          </p>
          <div className="w-24 h-1 bg-[#193148] mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 h-full flex flex-col group-hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1 text-[#193148]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-[#193148]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#193148] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1 text-[#193148]" />
                      <span>{post.author}</span>
                    </div>

                    <Link
                      href={post.link}
                      className="inline-flex items-center text-[#193148] font-medium text-sm group-hover:text-blue-800 transition-colors"
                    >
                      Leer más
                      <motion.div
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
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
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-[#193148] text-white hover:bg-blue-700 transition-colors duration-300 font-medium rounded-md"
          >
            VER TODOS LOS ARTÍCULOS
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
