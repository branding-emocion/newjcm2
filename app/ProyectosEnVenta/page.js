"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Ruler,
  Home,
  Bed,
  Coffee,
  Dumbbell,
  Wifi,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProyectosEnVenta() {
  const [activeTab, setActiveTab] = useState("todos");

  const proyectos = [
    {
      id: "golf-view",
      nombre: "GOLF VIEW",
      ubicacion: "Av. Huamán 830, Victor Larco",
      descripcion:
        "Disfruta de calidad, prestigio y exclusividad en GOLF VIEW. Un moderno edificio con departamentos de 2 y 3 dormitorios, áreas comunes y una ubicación privilegiada cerca de todo lo que necesitas.",
      caracteristicas: [
        "Estructura antisísmica",
        "Dos ascensores",
        "Estacionamientos (primer piso y sótano)",
        "Dptos de 2 y 3 dormitorios",
        "Lobby",
        "Área de coworking",
        "Área de parrillas",
        "Gimnasio",
        "Área de tendales",
      ],
      cercania: [
        "Real Plaza",
        "UPAO",
        "Hilton",
        "Arcos del Golf",
        "Restaurantes",
        "Colegios y universidades",
        "Supermercados",
        "Bancos",
        "Clínicas",
        "Parques",
      ],
      tipos: [
        {
          nombre: "TIPO 1",
          area: "70 m²",
          dormitorios: 2,
          ubicacion: "2° piso - 13° piso",
          vista: "Exterior",
        },
        {
          nombre: "TIPO 2A",
          area: "150 m²",
          dormitorios: 3,
          ubicacion: "2° piso",
          vista: "Exterior",
        },
        {
          nombre: "TIPO 3A",
          area: "157 m²",
          dormitorios: 3,
          ubicacion: "2° piso",
          vista: "Exterior",
        },
        {
          nombre: "TIPO 2",
          area: "105 m²",
          dormitorios: 3,
          ubicacion: "3° piso - 13° piso",
          vista: "Exterior",
        },
        {
          nombre: "TIPO 3",
          area: "113 m²",
          dormitorios: 3,
          ubicacion: "3° piso - 13° piso",
          vista: "Exterior",
        },
      ],
      contacto: {
        telefono: "947 455 553",
        email: "ventas@jcmconstrucciones.com",
        direccion: "Calle Los Granados 403-Dpto801-Urb California",
        web: "www.jcmconstrucciones.com",
        facebook: "JCM constructorainmobiliaria",
        instagram: "jcm_constructorainmobiliaria",
        modelo3d: "https://bit.ly/EDIFICIO3DGOLFVIEW",
      },
      estado: "En venta",
      tipo: "Residencial",
      imagenes: ["/Fachadas/Golf.jpg", "/Fachadas/GolfoDia.jpg"],
    },
  ];

  const filteredProyectos =
    activeTab === "todos"
      ? proyectos
      : proyectos.filter(
          (proyecto) => proyecto.tipo.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Proyectos en Venta
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Descubre nuestros exclusivos desarrollos inmobiliarios diseñados
            para ofrecerte el más alto estándar de vida.
          </p>
        </div>

        <Tabs defaultValue="todos" className="w-full mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="todos" onClick={() => setActiveTab("todos")}>
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="residencial"
                onClick={() => setActiveTab("residencial")}
              >
                Residencial
              </TabsTrigger>
              <TabsTrigger
                value="comercial"
                onClick={() => setActiveTab("comercial")}
              >
                Comercial
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="todos" className="mt-8">
            <div className="grid grid-cols-1 gap-8">
              {filteredProyectos.map((proyecto) => (
                <ProyectoCard key={proyecto.id} proyecto={proyecto} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="residencial" className="mt-8">
            <div className="grid grid-cols-1 gap-8">
              {filteredProyectos.map((proyecto) => (
                <ProyectoCard key={proyecto.id} proyecto={proyecto} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comercial" className="mt-8">
            <div className="flex flex-col items-center justify-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Próximamente</h3>
              <p className="text-muted-foreground mb-4">
                Estamos desarrollando nuevos proyectos comerciales
              </p>
              <Button variant="outline">
                Contáctanos para más información
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProyectoCard({ proyecto }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("descripcion");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % proyecto.imagenes.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + proyecto.imagenes.length) % proyecto.imagenes.length
    );
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={proyecto.imagenes[currentImageIndex] || "/placeholder.svg"}
            alt={`Imagen de ${proyecto.nombre}`}
            fill
            className="object-cover"
          />
          {proyecto.imagenes.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
                aria-label="Imagen anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
                aria-label="Siguiente imagen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}
          <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-md">
            <h3 className="text-xl font-bold text-blue-600">
              {proyecto.nombre}
            </h3>
            <div className="flex items-center text-gray-700 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{proyecto.ubicacion}</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {proyecto.estado}
          </div>
        </div>

        <div className="p-6">
          <Tabs
            defaultValue="descripcion"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="tipos">Tipos</TabsTrigger>
              <TabsTrigger value="caracteristicas">Características</TabsTrigger>
              <TabsTrigger value="contacto">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="descripcion" className="space-y-4">
              <p>{proyecto.descripcion}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Áreas disponibles
                  </h4>
                  <ul className="space-y-2">
                    {proyecto.tipos.map((tipo, index) => (
                      <li key={index} className="flex items-center">
                        <Ruler className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{tipo.area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Cerca de ti
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.cercania.slice(0, 6).map((lugar, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {lugar}
                      </Badge>
                    ))}
                    {proyecto.cercania.length > 6 && (
                      <Badge variant="outline" className="bg-white">
                        +{proyecto.cercania.length - 6} más
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {proyecto.caracteristicas
                  .slice(0, 5)
                  .map((caracteristica, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0"
                    >
                      {caracteristica}
                    </Badge>
                  ))}
                {proyecto.caracteristicas.length > 5 && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0">
                    +{proyecto.caracteristicas.length - 5} más
                  </Badge>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tipos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proyecto.tipos.map((tipo, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border border-gray-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{tipo.nombre}</h4>
                        <Badge className="bg-blue-100 text-blue-800 border-0">
                          {tipo.area}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{tipo.dormitorios} Dormitorios</span>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{tipo.ubicacion}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Vista {tipo.vista}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="caracteristicas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Características del edificio
                  </h4>
                  <ul className="space-y-2">
                    {proyecto.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                          {index % 5 === 0 ? (
                            <Building2 className="h-4 w-4 text-blue-600" />
                          ) : index % 5 === 1 ? (
                            <Dumbbell className="h-4 w-4 text-blue-600" />
                          ) : index % 5 === 2 ? (
                            <Wifi className="h-4 w-4 text-blue-600" />
                          ) : index % 5 === 3 ? (
                            <Utensils className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Coffee className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <span>{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Lo que necesitas cerca de ti
                  </h4>
                  <ul className="space-y-2">
                    {proyecto.cercania.map((lugar, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-gray-100 p-1 rounded-full mr-3 mt-0.5">
                          <MapPin className="h-4 w-4 text-gray-600" />
                        </div>
                        <span>{lugar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacto">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Información de contacto
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{proyecto.contacto.telefono}</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{proyecto.contacto.email}</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{proyecto.contacto.direccion}</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span>{proyecto.contacto.web}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Redes sociales
                    </h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="text-pink-600 hover:text-pink-800">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Visualiza el proyecto en 3D
                    </h4>
                    <a
                      href={proyecto.contacto.modelo3d}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Ver modelo 3D
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <a
                href={`tel:+51${proyecto.contacto.telefono}`}
                className="flex justify-center items-center "
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Llamar ahora: {proyecto.contacto.telefono}
              </a>
            </Button>
            <Button variant="outline" className="flex-1">
              <Link
                href={"/Contacto"}
                className="flex justify-center items-center"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Solicitar información
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
