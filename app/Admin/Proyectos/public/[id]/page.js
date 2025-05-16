"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProyectoPorId } from "@/lib/firebase/proyectos";

export default function AreasComunesPublicPage({ params }) {
  const { id } = params;
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const data = await getProyectoPorId(id);
        setProyecto(data);
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyecto();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <div className="mx-auto h-12 w-12 text-muted-foreground animate-pulse">
          🏢
        </div>
        <h3 className="mt-4 text-lg font-semibold">
          Cargando áreas comunes...
        </h3>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <div className="mx-auto h-12 w-12 text-muted-foreground">🏢</div>
        <h3 className="mt-4 text-lg font-semibold">Proyecto no encontrado</h3>
        <p className="text-muted-foreground mb-6">
          No se encontró el proyecto con el ID especificado.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Link>
        </Button>
      </div>
    );
  }

  // Función para obtener áreas comunes activas
  const getAreasActivas = () => {
    if (!proyecto.areasComunes) return [];

    const areas = [];

    // Procesar áreas predefinidas
    Object.entries(proyecto.areasComunes).forEach(([key, value]) => {
      if (value === true || (typeof value === "object" && value.activo)) {
        areas.push({
          id: key,
          nombre: getNombreArea(key),
          descripcion: typeof value === "object" ? value.descripcion : "",
          imagenURL: typeof value === "object" ? value.imagenURL : "",
        });
      }
    });

    // Agregar áreas personalizadas
    if (
      proyecto.areasPersonalizadas &&
      Array.isArray(proyecto.areasPersonalizadas)
    ) {
      proyecto.areasPersonalizadas.forEach((area) => {
        if (area.activo !== false) {
          areas.push({
            id: area.id,
            nombre: area.nombre,
            descripcion: area.descripcion,
            imagenURL: area.imagenURL,
          });
        }
      });
    }

    return areas;
  };

  const areasActivas = getAreasActivas();

  return (
    <div className="container mx-auto p-4">
      <div className="relative h-[40vh] w-full mb-8 rounded-xl overflow-hidden">
        <Image
          src={
            proyecto.imagen ||
            "/placeholder.svg?height=600&width=1200&query=modern building amenities"
          }
          alt={proyecto.nombre}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white mb-2">ÁREAS COMUNES</h1>
          <p className="text-white/90 text-xl">
            Espacios diseñados para tu comodidad y entretenimiento
          </p>
        </div>
      </div>

      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href={`/Admin/Proyectos`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al proyecto
          </Link>
        </Button>
      </div>

      {areasActivas.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-2xl font-bold mb-2">Sin áreas comunes</h3>
          <p className="text-muted-foreground">
            Este proyecto no cuenta con áreas comunes configuradas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areasActivas.map((area) => (
            <Card key={area.id} className="overflow-hidden">
              <div className="relative h-80">
                {area.imagenURL ? (
                  <Image
                    src={area.imagenURL || "/placeholder.svg"}
                    alt={area.nombre}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <div className="text-8xl">{getIconoArea(area.id)}</div>
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">
                  {area.nombre.toUpperCase()}
                </h3>
                <p className="text-muted-foreground">
                  {area.descripcion ||
                    `Espacio dedicado para ${area.nombre.toLowerCase()}`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
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

// Función para obtener un icono para cada área
function getIconoArea(key) {
  const iconos = {
    gimnasio: "🏋️",
    piscina: "🏊",
    sauna: "🧖",
    coworking: "💻",
    parrillas: "🍖",
    juegos: "🎮",
    terraza: "🌇",
    salaEventos: "🎉",
    zonaNinos: "👶",
    cine: "🎬",
    yoga: "🧘",
    jardin: "🌳",
    lobby: "🏢",
    estacionamiento: "🚗",
  };

  return iconos[key] || "🏢";
}
