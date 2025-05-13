"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Home,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Datos de ejemplo para los proyectos en venta
const projectsData = [
  {
    id: "hortensias-269",
    title: "Las Hortensias 269",
    location: "Urb. California, Trujillo",
    status: "En construcción",
    delivery: "Diciembre 2023",
    price: "Desde $120,000",
    description:
      "Exclusivo edificio residencial con apartamentos de 2 y 3 dormitorios, acabados de primera calidad y excelente iluminación natural.",
    features: [
      "2-3 dormitorios",
      "75-120 m²",
      "Estacionamiento",
      "Áreas comunes",
    ],
    mainImage: "/projects/hortensias-269.jpg",
    interiorImages: [
      "/projects/hortensias-interior-1.jpg",
      "/projects/hortensias-interior-2.jpg",
      "/projects/hortensias-interior-3.jpg",
    ],
    link: "/ProyectosEnVenta/las-hortensias-269",
    brochureLink: "/brochures/las-hortensias-269.pdf",
  },
  {
    id: "begonias",
    title: "Las Begonias",
    location: "Av. Principal, Trujillo",
    status: "Pre-venta",
    delivery: "Julio 2024",
    price: "Desde $95,000",
    description:
      "Moderno complejo residencial que combina diseño contemporáneo, funcionalidad y confort, ofreciendo espacios amplios y luminosos.",
    features: ["1-3 dormitorios", "60-110 m²", "Gimnasio", "Terraza común"],
    mainImage: "/projects/begonias.jpg",
    interiorImages: [
      "/projects/begonias-interior-1.jpg",
      "/projects/begonias-interior-2.jpg",
      "/projects/begonias-interior-3.jpg",
    ],
    link: "/ProyectosEnVenta/las-begonias",
    brochureLink: "/Brochures/BROCHURE_ GOLF_VIEW.pdf",
  },
];

export default function ProjectsShowcase() {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const nextProject = () => {
    setCurrentProject((prev) =>
      prev === projectsData.length - 1 ? 0 : prev + 1
    );
    setSelectedThumbnail(0); // Reset thumbnail selection when changing projects
  };

  const prevProject = () => {
    setCurrentProject((prev) =>
      prev === 0 ? projectsData.length - 1 : prev - 1
    );
    setSelectedThumbnail(0); // Reset thumbnail selection when changing projects
  };

  const project = projectsData[currentProject];
  const displayImage =
    selectedThumbnail === 0
      ? project.mainImage
      : project.interiorImages[selectedThumbnail - 1];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white"
      id="proyectos-en-venta"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PROYECTOS EN VENTA
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nuestros exclusivos proyectos inmobiliarios diseñados para
            ofrecer la mejor calidad de vida y excelente inversión.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project Image Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentProject}-${selectedThumbnail}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={displayImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />

                {selectedThumbnail === 0 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-sm">
                        {project.status}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white text-2xl font-bold">
                        {project.price}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => setSelectedThumbnail(0)}
                  className={cn(
                    "flex-shrink-0 w-16 h-12 relative rounded-md overflow-hidden transition-all",
                    selectedThumbnail === 0
                      ? "ring-2 ring-blue-600"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={project.mainImage || "/placeholder.svg"}
                    alt={`${project.title} exterior`}
                    fill
                    className="object-cover"
                  />
                </button>

                {project.interiorImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumbnail(idx + 1)}
                    className={cn(
                      "flex-shrink-0 w-16 h-12 relative rounded-md overflow-hidden transition-all",
                      selectedThumbnail === idx + 1
                        ? "ring-2 ring-blue-600"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Interior ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project Info Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{project.location}</span>
                </div>

                <p className="text-gray-700 mb-6">{project.description}</p>

                <div className="grid grid-cols-2 gap-y-4 mb-8">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">{project.features[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3h18v18H3z" />
                    </svg>
                    <span className="text-gray-700">{project.features[1]}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">
                      Entrega: {project.delivery}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    <span className="text-gray-700">{project.features[2]}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={project.link}
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-md"
                  >
                    Ver proyecto
                  </Link>
                  <Link
                    href={project.brochureLink}
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors rounded-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Brochure
                  </Link>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={prevProject}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Anterior</span>
                </button>

                <div className="flex space-x-2">
                  {projectsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentProject(idx);
                        setSelectedThumbnail(0);
                      }}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        idx === currentProject
                          ? "bg-blue-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      )}
                      aria-label={`Ver proyecto ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextProject}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="text-sm font-medium">Siguiente</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View all projects link */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/ProyectosEnVenta"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
