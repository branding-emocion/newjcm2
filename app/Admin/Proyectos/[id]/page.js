"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Building,
  ArrowLeft,
  Edit,
  MapPin,
  Calendar,
  Ruler,
  Download,
  ExternalLink,
  ImageIcon,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { getProyectoPorId, eliminarProyecto } from "@/lib/firebase/proyectos";

export default function DetalleProyectoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [activeTab, setActiveTab] = useState("detalles");
  const [confirmEliminar, setConfirmEliminar] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const data = await getProyectoPorId(id);
        setProyecto(data);
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
        toast.error("Error", {
          description: "No se pudo cargar la información del proyecto.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProyecto();
  }, [id]);

  const handleEliminarProyecto = async () => {
    try {
      setEliminando(true);
      await eliminarProyecto(id);
      toast.success("Proyecto eliminado", {
        description: "El proyecto ha sido eliminado exitosamente.",
      });
      router.push("/Admin/Proyectos");
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      toast.error("Error", {
        description: "No se pudo eliminar el proyecto. Inténtelo de nuevo.",
      });
    } finally {
      setEliminando(false);
      setConfirmEliminar(false);
    }
  };

  // Función para obtener áreas comunes activas
  const getAreasActivas = () => {
    if (!proyecto?.areasComunes) return [];

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

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <Building className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
        <h3 className="mt-4 text-lg font-semibold">Cargando proyecto...</h3>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <Building className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Proyecto no encontrado</h3>
        <p className="text-muted-foreground mb-6">
          No se encontró el proyecto con el ID especificado.
        </p>
        <Button asChild>
          <Link href="/Admin/Proyectos">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Proyectos
          </Link>
        </Button>
      </div>
    );
  }

  const areasActivas = getAreasActivas();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/Admin/Proyectos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{proyecto.nombre}</h1>
            <p className="text-muted-foreground">Detalle del proyecto</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/Admin/Proyectos/public/${id}`}>
              <Eye className="mr-2 h-4 w-4" /> Ver Público
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/Admin/Proyectos/${id}/editar`}>
              <Edit className="mr-2 h-4 w-4" /> Editar Proyecto
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setConfirmEliminar(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative h-80">
              <Image
                src={
                  proyecto.imagen ||
                  "/placeholder.svg?height=400&width=800&query=modern building" ||
                  "/placeholder.svg"
                }
                alt={proyecto.nombre}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {proyecto.destacado && (
                  <Badge className="bg-amber-500">Destacado</Badge>
                )}
                <Badge
                  className={
                    proyecto.estado === "en_venta"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }
                >
                  {proyecto.estado === "en_venta" ? "En Venta" : "Entregado"}
                </Badge>
              </div>
            </div>

            <CardContent className="pt-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="detalles">Detalles</TabsTrigger>
                  <TabsTrigger value="areas-comunes">Áreas Comunes</TabsTrigger>
                  <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
                </TabsList>

                <TabsContent value="detalles" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Ubicación
                        </p>
                        <p className="font-medium">{proyecto.ubicacion}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Entrega</p>
                        <p className="font-medium">{proyecto.fechaEntrega}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Área</p>
                        <p className="font-medium">
                          {proyecto.areaMin} - {proyecto.areaMax} m²
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">Descripción</h3>
                  <p className="text-muted-foreground mb-6">
                    {proyecto.descripcion}
                  </p>

                  <h3 className="text-xl font-bold mb-3">Características</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proyecto.caracteristicas?.map((caracteristica, index) => (
                      <Badge key={index} variant="outline" className="py-1.5">
                        {caracteristica}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="areas-comunes" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Áreas Comunes</h3>
                    <Button variant="outline" asChild>
                      <Link href={`/Admin/Proyectos/${id}/areas-comunes`}>
                        <Edit className="mr-2 h-4 w-4" /> Administrar Áreas
                      </Link>
                    </Button>
                  </div>

                  {areasActivas.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <div className="text-4xl mb-2">🏢</div>
                      <p className="text-muted-foreground">
                        No hay áreas comunes configuradas
                      </p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href={`/Admin/Proyectos/${id}/areas-comunes`}>
                          <Edit className="mr-2 h-4 w-4" /> Configurar Áreas
                          Comunes
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {areasActivas.map((area) => (
                        <Card key={area.id} className="overflow-hidden">
                          <div className="relative h-48">
                            {area.imagenURL ? (
                              <Image
                                src={
                                  area.imagenURL ||
                                  "/placeholder.svg?height=300&width=400&query=amenity"
                                }
                                alt={area.nombre}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full bg-muted">
                                <div className="text-4xl">
                                  {getIconoArea(area.id)}
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="pt-4">
                            <h4 className="font-semibold text-lg mb-2">
                              {area.nombre}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {area.descripcion ||
                                `Espacio dedicado para ${area.nombre.toLowerCase()}`}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="departamentos" className="mt-6">
                  <h3 className="text-xl font-bold mb-6">
                    Tipos de Departamentos
                  </h3>

                  {!proyecto.tiposDepartamentos ||
                  proyecto.tiposDepartamentos.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <p className="text-muted-foreground">
                        No hay información disponible sobre los tipos de
                        departamentos
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {proyecto.tiposDepartamentos.map((tipo, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold flex items-center">
                                  {tipo.nombre}
                                  <Badge className="ml-2 bg-blue-500">
                                    {tipo.dormitorios} Dormitorios
                                  </Badge>
                                </h3>
                                <Badge variant="outline">
                                  ${tipo.precio.toLocaleString()}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Dormitorios
                                  </p>
                                  <p className="font-medium">
                                    {tipo.dormitorios}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Baños
                                  </p>
                                  <p className="font-medium">{tipo.banos}</p>
                                </div>

                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Área
                                  </p>
                                  <p className="font-medium">{tipo.area} m²</p>
                                </div>

                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Precio
                                  </p>
                                  <p className="font-medium">
                                    ${tipo.precio.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <h5 className="font-semibold mb-2">
                                Características
                              </h5>
                              <p className="text-muted-foreground">
                                {tipo.caracteristicas}
                              </p>
                            </div>

                            <div>
                              <div className="relative h-64 border-4 border-gray-100 rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    tipo.planoURL ||
                                    "/placeholder.svg?height=400&width=600&query=floor plan"
                                  }
                                  alt={`Plano ${tipo.nombre}`}
                                  fill
                                  className="object-contain"
                                />
                                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
                                  {tipo.area} m²
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Galería de Imágenes */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Galería de Imágenes</h3>
              </div>

              {!proyecto.galeria || proyecto.galeria.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No hay imágenes en la galería
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href={`/Admin/Proyectos/${id}/galeria`}>
                      <ImageIcon className="mr-2 h-4 w-4" /> Agregar Imágenes
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {proyecto.galeria?.map((imagen, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div
                          className="relative h-40 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setImagenSeleccionada(imagen)}
                        >
                          <Image
                            src={
                              imagen.url ||
                              "/placeholder.svg?height=200&width=300&query=building"
                            }
                            alt={`Imagen ${index + 1} del proyecto`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>
                            {imagen.titulo || `Imagen ${index + 1}`}
                          </DialogTitle>
                          {imagen.descripcion && (
                            <DialogDescription>
                              {imagen.descripcion}
                            </DialogDescription>
                          )}
                        </DialogHeader>
                        <div className="relative h-[60vh] w-full">
                          <Image
                            src={
                              imagen.url ||
                              "/placeholder.svg?height=800&width=1200&query=building"
                            }
                            alt={imagen.titulo || `Imagen ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Resumen del Proyecto
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge
                    className={`mt-1 ${
                      proyecto.estado === "en_venta"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {proyecto.estado === "en_venta" ? "En Venta" : "Entregado"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{proyecto.ubicacion}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Fecha de Entrega
                  </p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{proyecto.fechaEntrega}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Tipos de Departamentos
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.isArray(proyecto.tiposDepartamentos) &&
                      proyecto.tiposDepartamentos.map((tipo, index) => (
                        <Badge key={index} variant="outline">
                          {typeof tipo === "string"
                            ? tipo
                            : `${tipo.dormitorios} Dormitorios`}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <div className="flex items-center mt-1">
                    <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">
                      {proyecto.areaMin} - {proyecto.areaMax} m²
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-semibold mb-2">Acciones Rápidas</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={`/Admin/Proyectos/editar/${id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Editar Proyecto
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={`/Admin/Proyectos/${id}/areas-comunes`}>
                        <Edit className="mr-2 h-4 w-4" /> Administrar Áreas
                        Comunes
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" /> Descargar Brochure
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={`/Admin/Proyectos/public/${id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Ver Sitio
                        Público
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de confirmación para eliminar proyecto */}
      <Dialog open={confirmEliminar} onOpenChange={setConfirmEliminar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el proyecto{" "}
              <span className="font-semibold">{proyecto.nombre}</span>? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleEliminarProyecto}
              disabled={eliminando}
            >
              {eliminando ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
