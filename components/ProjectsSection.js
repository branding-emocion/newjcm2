"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Home,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase/firebaseClient";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  // Modificamos el hook useInView para que no sea "once: true"
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const isTitleInView = useInView(titleRef, { amount: 0.2 });

  // Función para extraer el ID de YouTube de una URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;

    // Patrones para diferentes formatos de URL de YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|music\.youtube\.com\/watch\?v=)([^&?]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/,
      /youtube\.com\/shorts\/([^&]+)/,
    ];

    // Intentar extraer el ID con cada patrón
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Cargar proyectos desde Firebase
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        setLoading(true);
        // Consulta con filtro para proyectos destacados
        const proyectosRef = collection(db, "proyectos");
        const q = query(proyectosRef, where("destacado", "==", true));

        const querySnapshot = await getDocs(q);

        const proyectosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Crear thumbnails a partir de la galería
          const thumbnails = data.galeria
            ? data.galeria.map((item) => ({
                video: item.url, // Asumiendo que la URL puede ser un video o imagen
                label: item.titulo || data.nombre || "Vista",
                description: item.descripcion || "",
              }))
            : [];

          // Extraer características para mostrar como features
          const features = [
            // Información de dormitorios del primer tipo de departamento si existe
            data.tiposDepartamentos && data.tiposDepartamentos.length > 0
              ? `${data.tiposDepartamentos[0].dormitorios} dormitorios`
              : "",
            // Rango de áreas
            `${data.areaMin}-${data.areaMax} m²`,
            // Primera característica si existe
            data.caracteristicas && data.caracteristicas.length > 0
              ? data.caracteristicas[0]
              : "",
            // Segunda característica si existe
            data.caracteristicas && data.caracteristicas.length > 1
              ? data.caracteristicas[1]
              : "Áreas comunes",
          ].filter(Boolean); // Eliminar valores vacíos

          return {
            id: doc.id,
            title: data.nombre,
            location: data.ubicacion,
            status: data.estado === "en_venta" ? "En venta" : data.estado,
            delivery: data.fechaEntrega || "Consultar",
            price:
              data.tiposDepartamentos && data.tiposDepartamentos.length > 0
                ? `Desde $${data.tiposDepartamentos[0].precio.toLocaleString()}`
                : "Consultar precio",
            description: data.descripcion,
            features,
            mainVideo: data.videoUrl || "", // Usar videoUrl si existe
            mainImage:
              data.imagen ||
              (data.galeria && data.galeria.length > 0
                ? data.galeria[0].url
                : ""),
            thumbnails,
            link: `/Proyecto/${doc.id}`,
            brochureLink: data.brochureUrl || "#",
            tour3DLink: data.videoUrl || "#", // Usar videoUrl para el tour 3D si existe
            contactPhone: "947 455 553", // Número de contacto por defecto
          };
        });

        setProjects(proyectosData);
        console.log("Proyectos cargados:", proyectosData);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        setError("Error al cargar proyectos");
      } finally {
        setLoading(false);
      }
    };

    cargarProyectos();
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setSelectedThumbnail(0);
    setIsPlaying(false);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setSelectedThumbnail(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <section className="py-24 bg-white" id="proyectos-en-venta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PROYECTOS EN VENTA
          </h2>
          <div className="w-24 h-1 bg-[#193148] mx-auto mt-6 mb-8"></div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193148]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Si hay un error, mostrar mensaje de error
  if (error) {
    return (
      <section className="py-24 bg-white" id="proyectos-en-venta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PROYECTOS EN VENTA
          </h2>
          <div className="w-24 h-1 bg-[#193148] mx-auto mt-6 mb-8"></div>
          <div className="text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  // Si no hay proyectos, mostrar mensaje
  if (projects.length === 0) {
    return (
      <section className="py-24 bg-white" id="proyectos-en-venta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PROYECTOS EN VENTA
          </h2>
          <div className="w-24 h-1 bg-[#193148] mx-auto mt-6 mb-8"></div>
          <p className="text-gray-600">
            No hay proyectos destacados disponibles actualmente.
          </p>
        </div>
      </section>
    );
  }

  const project = projects[currentProject];

  // Determinar qué contenido mostrar (video o imagen)
  const currentMedia =
    selectedThumbnail === 0
      ? project.mainVideo || project.mainImage
      : project.thumbnails[selectedThumbnail - 1]?.video || "";

  // Determinar si el recurso es un video o una imagen
  const isVideo =
    currentMedia &&
    (currentMedia.endsWith(".mp4") ||
      currentMedia.endsWith(".webm") ||
      currentMedia.includes("youtube.com") ||
      currentMedia.includes("youtu.be") ||
      currentMedia.includes("music.youtube.com"));

  // Obtener URL de embed para YouTube si es aplicable
  const youtubeEmbedUrl =
    isVideo &&
    (currentMedia.includes("youtube") || currentMedia.includes("youtu.be"))
      ? getYoutubeEmbedUrl(currentMedia)
      : null;

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white"
      id="proyectos-en-venta"
    >
      <div className="container mx-auto px-4">
        {/* Reemplazamos el motion.div con un div normal para el título */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PROYECTOS EN VENTA
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nuestros exclusivos proyectos inmobiliarios diseñados para
            ofrecer la mejor calidad de vida y excelente inversión.
          </p>
          <div className="w-24 h-1 bg-[#193148] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project Video/Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gray-900">
              {youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  className="w-full h-full"
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : isVideo ? (
                <>
                  <video
                    ref={videoRef}
                    src={currentMedia}
                    className="w-full h-full object-cover"
                    poster={project.mainImage || "/placeholder.svg?key=bc5lo"}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {!isPlaying && (
                    <button
                      onClick={togglePlayPause}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                      aria-label="Reproducir video"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-[#193148] ml-1" />
                      </div>
                    </button>
                  )}
                </>
              ) : (
                <img
                  src={currentMedia || project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}

              {!youtubeEmbedUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
              )}

              {/* Title and description overlay - solo si no es un video de YouTube */}
              {!youtubeEmbedUrl && (
                <div className="absolute bottom-16 left-4 right-4 pointer-events-none">
                  <h4 className="text-white text-xl font-bold mb-1">
                    {selectedThumbnail === 0
                      ? project.title
                      : project.thumbnails[selectedThumbnail - 1]?.label ||
                        project.title}
                  </h4>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {selectedThumbnail === 0
                      ? project.description
                      : project.thumbnails[selectedThumbnail - 1]
                          ?.description || project.description}
                  </p>
                </div>
              )}

              {/* Status badge */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="bg-[#193148] text-white px-4 py-1 text-sm font-medium rounded-sm">
                  {project.status}
                </span>
              </div>

              {/* Price */}
              {/* <div className="absolute bottom-4 left-4 pointer-events-none">
                <span className="text-white text-2xl font-bold">
                  {project.price}
                </span>
              </div> */}
            </div>

            {/* Thumbnails */}
            {project.thumbnails && project.thumbnails.length > 0 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                {project.thumbnails.map((thumbnail, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedThumbnail(idx + 1);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "flex-shrink-0 w-20 h-16 relative rounded-md overflow-hidden transition-all",
                      selectedThumbnail === idx + 1
                        ? "ring-2 ring-blue-600"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    {thumbnail.video &&
                    (thumbnail.video.endsWith(".mp4") ||
                      thumbnail.video.includes("youtube.com") ||
                      thumbnail.video.includes("youtu.be")) ? (
                      <div className="absolute inset-0 bg-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={thumbnail.video || ""}
                        alt={thumbnail.label}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1">
                      <p className="text-[10px] font-medium truncate">
                        {thumbnail.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Info Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h3>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-4 w-4 mr-2 text-[#193148]" />
              <span>{project.location}</span>
            </div>

            <p className="text-gray-700 mb-6">{project.description}</p>

            <div className="grid grid-cols-2 gap-y-4 mb-8">
              {project.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  {idx === 0 && (
                    <Home className="h-5 w-5 text-[#193148] mr-2" />
                  )}
                  {idx === 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#193148] mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3h18v18H3z" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <Calendar className="h-5 w-5 text-[#193148] mr-2" />
                  )}
                  {idx === 3 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#193148] mr-2"
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
                  )}
                  <span className="text-gray-700">
                    {idx === 2 ? `Entrega: ${project.delivery}` : feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button asChild className="flex-1 bg-[#193148] hover:bg-blue-700">
                <Link href={project.link}>Ver proyecto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-blue-600 text-[#193148] hover:bg-blue-50"
              >
                <Link href={project.brochureLink}>
                  <Download className="mr-2 h-4 w-4" />
                  Brochure
                </Link>
              </Button>
            </div>

            {/* 3D Tour Link - Solo mostrar si hay un videoUrl */}
            {project.tour3DLink && project.tour3DLink !== "#" && (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 mb-4"
              >
                <Link
                  href={project.tour3DLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7.5V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 7.5L12 3L21 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7.5L12 16.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7.5 10.5L12 7.5L16.5 10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  VISUALIZA EL PROYECTO EN 3D
                </Link>
              </Button>
            )}

            {/* Contact Button */}
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <a
                href={`https://wa.me/${project.contactPhone.replace(
                  /\s+/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9 16.124 19.0521 17.6242 17.5518C19.1245 16.0516 19.9724 14.0273 19.9724 11.9176C19.9724 9.80781 19.1245 7.78361 17.6242 6.28333C17.6161 6.27519 17.6081 6.26709 17.6 6.25899V6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.512 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.635 11.92C18.635 13.6664 17.916 15.3418 16.66 16.57C15.4995 17.6812 13.9687 18.3141 12.37 18.32L12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6033 13.4958 10.7279 14.5293 12.07 15.22C12.4402 15.4079 12.8391 15.5395 13.25 15.61C13.6703 15.7488 14.1148 15.8017 14.56 15.77C14.8245 15.7347 15.0778 15.6457 15.3069 15.5075C15.536 15.3693 15.7366 15.1845 15.9 14.96C16.0428 14.6957 16.1143 14.3949 16.1064 14.0905C16.0986 13.786 16.0116 13.4901 15.85 13.24C15.7691 13.1696 15.6757 13.1179 15.575 13.0881C15.4744 13.0583 15.3686 13.0512 15.265 13.0671L15.61 13.59Z" />
                </svg>
                COMUNÍCATE CON NUESTRO DIRECTOR COMERCIAL
              </a>
            </Button>
          </div>
        </div>

        {/* Navigation controls */}
        {projects.length > 1 && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevProject}
              className="flex items-center text-gray-600 hover:text-[#193148] transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Anterior</span>
            </button>

            <div className="flex space-x-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentProject(idx);
                    setSelectedThumbnail(0);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    idx === currentProject
                      ? "bg-[#193148] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Ver proyecto ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="flex items-center text-gray-600 hover:text-[#193148] transition-colors"
            >
              <span className="text-sm font-medium">Siguiente</span>
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        )}

        {/* View all projects link */}
        {/* <div className="text-center mt-16">
          <Link
            href="/ProyectosEnVenta"
            className="inline-flex items-center text-[#193148] hover:text-blue-800 font-medium transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
