// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Datos de ejemplo para el slider
// const sliderData = [
//   {
//     id: 1,
//     type: "video",
//     title: "Conozca nuestros proyectos",
//     description: "Descubra la calidad y el diseño que nos distingue",
//     videoThumbnail: "/projects/video-thumbnail.jpg",
//     videoUrl: "/Slider/Piloto.mp4", // Reemplazar con URL real
//   },

//   {
//     id: 2,
//     type: "image",
//     title: "Próximo Lanzamiento",
//     description: "Nuevo proyecto golf view",
//     image: "/Slider/Slider1.webp",
//     link: "/ProyectosEnVenta/proximo-lanzamiento",
//   },
// ];

// export default function HeroSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const videoRef = useRef(null);
//   const autoPlayRef = useRef(null);
//   const slideInterval = 5000; // 5 segundos por slide

//   // Función para detener el video cuando se cambia de slide
//   const stopVideoIfPlaying = useCallback(() => {
//     if (videoRef.current && isVideoPlaying) {
//       videoRef.current.pause();
//       setIsVideoPlaying(false);
//       setIsPlaying(true);
//     }
//   }, [isVideoPlaying]);

//   // Función para avanzar al siguiente slide
//   const nextSlide = useCallback(() => {
//     stopVideoIfPlaying();
//     setCurrentIndex((prevIndex) =>
//       prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [stopVideoIfPlaying]);

//   // Función para retroceder al slide anterior
//   const prevSlide = useCallback(() => {
//     stopVideoIfPlaying();
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
//     );
//   }, [stopVideoIfPlaying]);

//   // Función para ir a un slide específico
//   const goToSlide = useCallback(
//     (index) => {
//       if (index !== currentIndex) {
//         stopVideoIfPlaying();
//         setCurrentIndex(index);
//       }
//     },
//     [currentIndex, stopVideoIfPlaying]
//   );

//   // Controlar reproducción de video
//   const handleVideoPlay = () => {
//     if (videoRef.current) {
//       if (isVideoPlaying) {
//         videoRef.current.pause();
//         setIsVideoPlaying(false);
//         setIsPlaying(true); // Reanudar autoplay cuando se pausa el video
//       } else {
//         // Intentar reproducir el video y manejar posibles errores
//         const playPromise = videoRef.current.play();

//         if (playPromise !== undefined) {
//           playPromise
//             .then(() => {
//               setIsVideoPlaying(true);
//               setIsPlaying(false); // Pausar autoplay cuando se reproduce el video
//             })
//             .catch((error) => {
//               console.error("Error al reproducir el video:", error);
//             });
//         }
//       }
//     }
//   };

//   // Función para reproducir automáticamente el video cuando es visible
//   const autoPlayVideoWhenVisible = useCallback(() => {
//     const currentSlide = sliderData[currentIndex];
//     if (currentSlide.type === "video" && videoRef.current && !isVideoPlaying) {
//       const playPromise = videoRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsVideoPlaying(true);
//             setIsPlaying(false); // Pausar autoplay cuando se reproduce el video
//           })
//           .catch((error) => {
//             console.error("Error al reproducir el video:", error);
//           });
//       }
//     }
//   }, [currentIndex, isVideoPlaying]);

//   // Configurar autoplay
//   useEffect(() => {
//     if (isPlaying && !isVideoPlaying) {
//       autoPlayRef.current = setTimeout(nextSlide, slideInterval);
//     }
//     return () => {
//       if (autoPlayRef.current) {
//         clearTimeout(autoPlayRef.current);
//       }
//     };
//   }, [currentIndex, isPlaying, isVideoPlaying, nextSlide]);

//   // Manejar reproducción automática cuando el slide es un video
//   useEffect(() => {
//     const currentSlide = sliderData[currentIndex];
//     if (currentSlide.type === "video") {
//       // Pequeño retraso para asegurar que el DOM está listo
//       setTimeout(() => {
//         autoPlayVideoWhenVisible();
//       }, 100);
//     } else {
//       // Reiniciar estado de video cuando no es un slide de video
//       setIsVideoPlaying(false);
//       setIsPlaying(true);
//     }
//   }, [currentIndex, autoPlayVideoWhenVisible]);

//   // Manejar reproducción de video
//   useEffect(() => {
//     const handleVideoEnd = () => {
//       setIsVideoPlaying(false);
//       setIsPlaying(true); // Reanudar autoplay cuando termina el video
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener("ended", handleVideoEnd);
//       return () => {
//         if (videoRef.current) {
//           videoRef.current.removeEventListener("ended", handleVideoEnd);
//         }
//       };
//     }
//   }, [videoRef.current]);

//   // Detener el video cuando el componente se desmonta
//   useEffect(() => {
//     return () => {
//       if (videoRef.current) {
//         videoRef.current.pause();
//       }
//     };
//   }, []);

//   // Variantes para animaciones
//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//   };

//   // Dirección de la animación
//   const [[page, direction], setPage] = useState([0, 0]);

//   // Actualizar página con dirección
//   const paginate = (newDirection) => {
//     if (newDirection > 0) {
//       nextSlide();
//     } else {
//       prevSlide();
//     }
//     setPage([page + newDirection, newDirection]);
//   };

//   return (
//     <div className="relative w-full h-[80vh] overflow-hidden">
//       {/* Slides */}
//       <AnimatePresence initial={false} custom={direction}>
//         <motion.div
//           key={currentIndex}
//           custom={direction}
//           variants={slideVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{
//             x: { type: "spring", stiffness: 300, damping: 30 },
//             opacity: { duration: 0.5 },
//           }}
//           className="absolute inset-0 w-full h-full"
//         >
//           {sliderData[currentIndex].type === "image" ? (
//             // Slide de imagen
//             <div className="relative w-full h-full">
//               <Image
//                 src={sliderData[currentIndex].image || "/placeholder.svg"}
//                 alt={sliderData[currentIndex].title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.5 }}
//                 >
//                   <h2 className="text-3xl md:text-5xl font-bold mb-2">
//                     {sliderData[currentIndex].title}
//                   </h2>
//                   <p className="text-lg md:text-xl mb-6 max-w-2xl">
//                     {sliderData[currentIndex].description}
//                   </p>
//                   <Link
//                     href={sliderData[currentIndex].link}
//                     className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
//                   >
//                     Ver Proyecto
//                     <ChevronRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </motion.div>
//               </div>
//             </div>
//           ) : (
//             // Slide de video
//             <div className="relative w-full h-full">
//               <div className="absolute inset-0 bg-black/80 z-0" />

//               {/* Thumbnail con botón de play/pause */}
//               <div className="relative w-full h-full">
//                 <Image
//                   src={
//                     sliderData[currentIndex].videoThumbnail ||
//                     "/placeholder.svg"
//                   }
//                   alt={sliderData[currentIndex].title}
//                   fill
//                   className={cn(
//                     "object-cover transition-opacity duration-300",
//                     isVideoPlaying ? "opacity-0" : "opacity-60"
//                   )}
//                 />
//                 <div
//                   className={cn(
//                     "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
//                     isVideoPlaying ? "opacity-0" : "opacity-100"
//                   )}
//                 >
//                   <button
//                     onClick={handleVideoPlay}
//                     className="flex items-center justify-center w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
//                     aria-label={
//                       isVideoPlaying ? "Pausar video" : "Reproducir video"
//                     }
//                   >
//                     <Play className="h-10 w-10 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {/* Video */}
//               <div
//                 className={cn(
//                   "absolute inset-0 w-full h-full transition-opacity duration-300",
//                   isVideoPlaying ? "opacity-100 z-10" : "opacity-0"
//                 )}
//               >
//                 <video
//                   ref={videoRef}
//                   src={sliderData[currentIndex].videoUrl}
//                   className="w-full h-full object-cover"
//                   controls={false}
//                   playsInline
//                   preload="auto"
//                 />

//                 {/* Overlay pause button when video is playing */}
//                 {isVideoPlaying && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <button
//                       onClick={handleVideoPlay}
//                       className="flex items-center justify-center w-20 h-20 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
//                       aria-label="Pausar video"
//                     >
//                       <Pause className="h-10 w-10 text-white" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Texto del video */}
//               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.5 }}
//                 >
//                   <h2 className="text-3xl md:text-5xl font-bold mb-2">
//                     {sliderData[currentIndex].title}
//                   </h2>
//                   <p className="text-lg md:text-xl mb-6 max-w-2xl">
//                     {sliderData[currentIndex].description}
//                   </p>
//                 </motion.div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* Controles de navegación */}
//       <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center space-x-4 z-10">
//         {/* Botón de autoplay */}
//         <button
//           onClick={() => setIsPlaying(!isPlaying)}
//           className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
//           aria-label={
//             isPlaying ? "Pausar presentación" : "Reproducir presentación"
//           }
//         >
//           {isPlaying ? (
//             <Pause className="h-5 w-5 text-white" />
//           ) : (
//             <Play className="h-5 w-5 text-white" />
//           )}
//         </button>

//         {/* Botón anterior */}
//         <button
//           onClick={() => paginate(-1)}
//           className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
//           aria-label="Slide anterior"
//         >
//           <ChevronLeft className="h-5 w-5 text-white" />
//         </button>

//         {/* Botón siguiente */}
//         <button
//           onClick={() => paginate(1)}
//           className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
//           aria-label="Siguiente slide"
//         >
//           <ChevronRight className="h-5 w-5 text-white" />
//         </button>
//       </div>

//       {/* Indicadores de slide */}
//       <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
//         {sliderData.map((slide, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={cn(
//               "h-3 rounded-full transition-all duration-300 flex items-center justify-center",
//               index === currentIndex
//                 ? "bg-blue-600 w-8"
//                 : "bg-white/50 hover:bg-white/80 w-3"
//             )}
//             aria-label={`Ir al slide ${index + 1}`}
//           >
//             {slide.type === "video" && <span className="sr-only">Video</span>}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

// Datos de ejemplo para el slider
const sliderData = [
  {
    id: 1,
    type: "video",
    title: "Conozca nuestros proyectos",
    description: "Descubra la calidad y el diseño que nos distingue",
    videoThumbnail: "/projects/video-thumbnail.jpg",
    videoUrl:
      "https://jcmconstrucciones.com/proyectos/wp-content/uploads/2023/06/NuevasMedidas.mp4", // Reemplazar con URL real
  },

  {
    id: 2,
    type: "image",
    title: "Próximo Lanzamiento",
    description: "Nuevo proyecto golf view",
    image: "/Slider/Slider1.webp",
    link: "/ProyectosEnVenta/proximo-lanzamiento",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const autoPlayRef = useRef(null);
  const slideInterval = 5000; // 5 segundos por slide

  // Función para detener el video cuando se cambia de slide
  const stopVideoIfPlaying = useCallback(() => {
    if (videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setIsPlaying(true);
    }
  }, [isVideoPlaying]);

  // Función para avanzar al siguiente slide
  const nextSlide = useCallback(() => {
    stopVideoIfPlaying();
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  }, [stopVideoIfPlaying]);

  // Función para retroceder al slide anterior
  const prevSlide = useCallback(() => {
    stopVideoIfPlaying();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  }, [stopVideoIfPlaying]);

  // Función para ir a un slide específico
  const goToSlide = useCallback(
    (index) => {
      if (index !== currentIndex) {
        stopVideoIfPlaying();
        setCurrentIndex(index);
      }
    },
    [currentIndex, stopVideoIfPlaying]
  );

  // Controlar reproducción de video
  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        // Don't automatically resume autoplay when pausing the video
        // setIsPlaying(true); - Remove this line
      } else {
        // Pausar el autoplay antes de intentar reproducir
        setIsPlaying(false);

        // Intentar reproducir el video y manejar posibles errores
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true);
            })
            .catch((error) => {
              console.error("Error al reproducir el video:", error);
              // Si falla la reproducción, restaurar el autoplay
              setIsPlaying(true);
            });
        }
      }
    }
  };

  // Función para reproducir automáticamente el video cuando es visible
  const autoPlayVideoWhenVisible = useCallback(() => {
    const currentSlide = sliderData[currentIndex];
    // Only auto-play if we haven't manually paused the video before
    if (
      currentSlide.type === "video" &&
      videoRef.current &&
      !isVideoPlaying &&
      isPlaying
    ) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
            setIsPlaying(false); // Pausar autoplay cuando se reproduce el video
          })
          .catch((error) => {
            console.error("Error al reproducir el video:", error);
          });
      }
    }
  }, [currentIndex, isVideoPlaying, isPlaying]);

  // Configurar autoplay
  useEffect(() => {
    if (isPlaying && !isVideoPlaying) {
      autoPlayRef.current = setTimeout(nextSlide, slideInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isPlaying, isVideoPlaying, nextSlide]);

  // Manejar reproducción automática cuando el slide es un video
  useEffect(() => {
    const currentSlide = sliderData[currentIndex];
    if (currentSlide.type === "video") {
      // Pequeño retraso para asegurar que el DOM está listo
      setTimeout(() => {
        autoPlayVideoWhenVisible();
      }, 100);
    } else {
      // Reiniciar estado de video cuando no es un slide de video
      setIsVideoPlaying(false);
      setIsPlaying(true);
    }
  }, [currentIndex, autoPlayVideoWhenVisible]);

  // Manejar reproducción de video
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsVideoPlaying(false);
      setIsPlaying(true); // Reanudar autoplay cuando termina el video
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd);
        }
      };
    }
  }, [videoRef.current]);

  // Detener el video cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        if (autoPlayRef.current) {
          clearTimeout(autoPlayRef.current);
        }
      }
    };
  }, []);

  // Variantes para animaciones
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Dirección de la animación
  const [[page, direction], setPage] = useState([0, 0]);

  // Actualizar página con dirección
  const paginate = (newDirection) => {
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {sliderData[currentIndex].type === "image" ? (
            // Slide de imagen
            <div className="relative w-full h-full">
              <Image
                src={sliderData[currentIndex].image || "/placeholder.svg"}
                alt={sliderData[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">
                    {sliderData[currentIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    {sliderData[currentIndex].description}
                  </p>
                  <Link
                    href={sliderData[currentIndex].link}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    Ver Proyecto
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          ) : (
            // Slide de video
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/80 z-0" />

              {/* Thumbnail con botón de play/pause */}
              <div className="relative w-full h-full">
                <Image
                  src={
                    sliderData[currentIndex].videoThumbnail ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt={sliderData[currentIndex].title}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-300",
                    isVideoPlaying ? "opacity-0" : "opacity-60"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                    isVideoPlaying ? "opacity-0" : "opacity-100"
                  )}
                >
                  <button
                    onClick={handleVideoPlay}
                    className="flex items-center justify-center w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                    aria-label={
                      isVideoPlaying ? "Pausar video" : "Reproducir video"
                    }
                  >
                    <Play className="h-10 w-10 text-white" />
                  </button>
                </div>
              </div>

              {/* Video */}
              <div
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-300",
                  isVideoPlaying ? "opacity-100 z-10" : "opacity-0"
                )}
              >
                <video
                  ref={videoRef}
                  src={sliderData[currentIndex].videoUrl}
                  className="w-full h-full object-cover"
                  controls={false}
                  playsInline
                  preload="auto"
                  onClick={handleVideoPlay}
                />

                {/* Overlay pause button when video is playing */}
                {isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handleVideoPlay}
                      className="flex items-center justify-center w-20 h-20 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
                      aria-label="Pausar video"
                    >
                      <Pause className="h-10 w-10 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Texto del video */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">
                    {sliderData[currentIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    {sliderData[currentIndex].description}
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controles de navegación */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center space-x-4 z-10">
        {/* Botón de autoplay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
          aria-label={
            isPlaying ? "Pausar presentación" : "Reproducir presentación"
          }
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>

        {/* Botón anterior */}
        <button
          onClick={() => paginate(-1)}
          className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        {/* Botón siguiente */}
        <button
          onClick={() => paginate(1)}
          className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {sliderData.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 rounded-full transition-all duration-300 flex items-center justify-center",
              index === currentIndex
                ? "bg-blue-600 w-8"
                : "bg-white/50 hover:bg-white/80 w-3"
            )}
            aria-label={`Ir al slide ${index + 1}`}
          >
            {slide.type === "video" && <span className="sr-only">Video</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
