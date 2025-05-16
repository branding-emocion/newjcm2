"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getProyectoPorId, actualizarProyecto } from "@/lib/firebase/proyectos";
import { subirImagen } from "@/lib/firebase/storage";

export default function AreasComunesPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [areasComunes, setAreasComunes] = useState({
    gimnasio: {
      activo: false,
      descripcion:
        "Espacio equipado con máquinas de última generación para tu entrenamiento diario.",
      imagen: null,
      imagenURL: "",
    },
    piscina: {
      activo: false,
      descripcion:
        "Refréscate y relájate en nuestra piscina con vista panorámica.",
      imagen: null,
      imagenURL: "",
    },
    sauna: {
      activo: false,
      descripcion: "Espacio de relajación y desintoxicación para tu bienestar.",
      imagen: null,
      imagenURL: "",
    },
    coworking: {
      activo: false,
      descripcion:
        "Espacio diseñado para trabajar o estudiar con todas las comodidades necesarias.",
      imagen: null,
      imagenURL: "",
    },
    parrillas: {
      activo: false,
      descripcion:
        "Espacio perfecto para reuniones sociales y parrilladas con vista a la ciudad.",
      imagen: null,
      imagenURL: "",
    },
    juegos: {
      activo: false,
      descripcion: "Área de entretenimiento con juegos para todas las edades.",
      imagen: null,
      imagenURL: "",
    },
    terraza: {
      activo: false,
      descripcion:
        "Espacio al aire libre con vista panorámica para relajarse y socializar.",
      imagen: null,
      imagenURL: "",
    },
    salaEventos: {
      activo: false,
      descripcion: "Amplio salón para celebraciones y eventos privados.",
      imagen: null,
      imagenURL: "",
    },
    zonaNinos: {
      activo: false,
      descripcion:
        "Área segura y divertida diseñada especialmente para los más pequeños.",
      imagen: null,
      imagenURL: "",
    },
    cine: {
      activo: false,
      descripcion:
        "Sala de proyección para disfrutar películas con amigos y familia.",
      imagen: null,
      imagenURL: "",
    },
    yoga: {
      activo: false,
      descripcion: "Espacio tranquilo para practicar yoga y meditación.",
      imagen: null,
      imagenURL: "",
    },
    jardin: {
      activo: false,
      descripcion:
        "Áreas verdes cuidadosamente diseñadas para conectar con la naturaleza.",
      imagen: null,
      imagenURL: "",
    },
    lobby: {
      activo: false,
      descripcion: "Elegante recepción con servicio de conserjería.",
      imagen: null,
      imagenURL: "",
    },
    estacionamiento: {
      activo: false,
      descripcion:
        "Amplio estacionamiento con espacios asignados y seguridad 24/7.",
      imagen: null,
      imagenURL: "",
    },
  });

  const [nuevaArea, setNuevaArea] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
    imagenURL: "",
  });
  const [areasPersonalizadas, setAreasPersonalizadas] = useState([]);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const data = await getProyectoPorId(id);
        setProyecto(data);

        // Inicializar áreas comunes desde el proyecto
        if (data.areasComunes) {
          const areasActualizadas = { ...areasComunes };

          // Actualizar áreas predefinidas
          Object.keys(data.areasComunes).forEach((key) => {
            if (areasActualizadas[key]) {
              areasActualizadas[key] = {
                ...areasActualizadas[key],
                activo:
                  data.areasComunes[key].activo ||
                  data.areasComunes[key] === true,
                descripcion:
                  data.areasComunes[key].descripcion ||
                  areasActualizadas[key].descripcion,
                imagenURL: data.areasComunes[key].imagenURL || "",
              };
            }
          });

          setAreasComunes(areasActualizadas);
        }

        // Inicializar áreas personalizadas
        if (
          data.areasPersonalizadas &&
          Array.isArray(data.areasPersonalizadas)
        ) {
          setAreasPersonalizadas(data.areasPersonalizadas);
        }
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

  const handleImagenChange = (area, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAreasComunes({
          ...areasComunes,
          [area]: {
            ...areasComunes[area],
            imagen: file,
            imagenPreview: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagenPersonalizadaChange = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const nuevasAreas = [...areasPersonalizadas];
        nuevasAreas[index] = {
          ...nuevasAreas[index],
          imagen: file,
          imagenPreview: reader.result,
        };
        setAreasPersonalizadas(nuevasAreas);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNuevaImagenChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaArea({
          ...nuevaArea,
          imagen: file,
          imagenPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleArea = (area) => {
    setAreasComunes({
      ...areasComunes,
      [area]: {
        ...areasComunes[area],
        activo: !areasComunes[area].activo,
      },
    });
  };

  const actualizarDescripcion = (area, descripcion) => {
    setAreasComunes({
      ...areasComunes,
      [area]: {
        ...areasComunes[area],
        descripcion,
      },
    });
  };

  const actualizarDescripcionPersonalizada = (index, descripcion) => {
    const nuevasAreas = [...areasPersonalizadas];
    nuevasAreas[index] = {
      ...nuevasAreas[index],
      descripcion,
    };
    setAreasPersonalizadas(nuevasAreas);
  };

  const agregarAreaPersonalizada = () => {
    if (nuevaArea.nombre.trim() === "") {
      toast.error("Error", {
        description: "El nombre del área no puede estar vacío.",
      });
      return;
    }

    setAreasPersonalizadas([
      ...areasPersonalizadas,
      {
        id: Date.now().toString(),
        nombre: nuevaArea.nombre,
        descripcion: nuevaArea.descripcion,
        activo: true,
        imagen: nuevaArea.imagen,
        imagenPreview: nuevaArea.imagenPreview,
        imagenURL: "",
      },
    ]);

    setNuevaArea({
      nombre: "",
      descripcion: "",
      imagen: null,
      imagenPreview: null,
      imagenURL: "",
    });
  };

  const eliminarAreaPersonalizada = (id) => {
    setAreasPersonalizadas(
      areasPersonalizadas.filter((area) => area.id !== id)
    );
  };

  const guardarAreasComunes = async () => {
    try {
      setSaving(true);

      // Preparar objeto para actualizar
      const areasActualizadas = {};

      // Procesar áreas predefinidas
      for (const [key, area] of Object.entries(areasComunes)) {
        areasActualizadas[key] = {
          activo: area.activo,
          descripcion: area.descripcion,
          imagenURL: area.imagenURL,
        };

        // Si hay una nueva imagen, subirla
        if (area.imagen) {
          const path = `proyectos/${id}/areas-comunes/${key}_${Date.now()}`;
          const url = await subirImagen(area.imagen, path);
          areasActualizadas[key].imagenURL = url;
        }
      }

      // Procesar áreas personalizadas
      const areasPersonalizadasActualizadas = await Promise.all(
        areasPersonalizadas.map(async (area) => {
          const areaActualizada = { ...area };

          // Si hay una nueva imagen, subirla
          if (area.imagen) {
            const path = `proyectos/${id}/areas-comunes/${
              area.id
            }_${Date.now()}`;
            const url = await subirImagen(area.imagen, path);
            areaActualizada.imagenURL = url;
            delete areaActualizada.imagen;
            delete areaActualizada.imagenPreview;
          }

          return areaActualizada;
        })
      );

      // Actualizar el proyecto
      await actualizarProyecto(id, {
        areasComunes: areasActualizadas,
        areasPersonalizadas: areasPersonalizadasActualizadas,
      });

      toast.success("Áreas comunes actualizadas", {
        description: "Los cambios se han guardado correctamente.",
      });

      router.push(`/Admin/Proyectos/${id}`);
    } catch (error) {
      console.error("Error al guardar las áreas comunes:", error);
      toast.error("Error", {
        description:
          "Ocurrió un error al guardar los cambios. Inténtelo de nuevo.",
      });
    } finally {
      setSaving(false);
    }
  };

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
          <Link href="/Admin/Proyectos">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Proyectos
          </Link>
        </Button>
      </div>
    );
  }

  const areasOrdenadas = Object.entries(areasComunes).sort(([, a], [, b]) => {
    // Ordenar primero por activo (true primero) y luego por nombre
    if (a.activo === b.activo) return 0;
    return a.activo ? -1 : 1;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href={`/Admin/Proyectos/${id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Áreas Comunes</h1>
            <p className="text-muted-foreground">{proyecto.nombre}</p>
          </div>
        </div>

        <Button onClick={guardarAreasComunes} disabled={saving}>
          {saving ? (
            <>Guardando...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar Cambios
            </>
          )}
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Áreas Comunes Disponibles
        </h2>
        <p className="text-muted-foreground mb-6">
          Selecciona las áreas comunes que ofrece tu proyecto y personaliza sus
          descripciones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areasOrdenadas.map(([key, area]) => (
            <Card
              key={key}
              className={`overflow-hidden ${
                area.activo ? "border-primary" : ""
              }`}
            >
              <div className="relative h-48 bg-muted">
                {area.imagenPreview || area.imagenURL ? (
                  <Image
                    src={
                      area.imagenPreview ||
                      area.imagenURL ||
                      "/placeholder.svg?height=200&width=400&query=amenity"
                    }
                    alt={getNombreArea(key)}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-4xl">{getIconoArea(key)}</div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Switch
                    checked={area.activo}
                    onCheckedChange={() => toggleArea(key)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-lg font-semibold">
                      {getNombreArea(key)}
                    </Label>
                    <Textarea
                      value={area.descripcion}
                      onChange={(e) =>
                        actualizarDescripcion(key, e.target.value)
                      }
                      placeholder="Descripción del área común"
                      className="mt-2"
                      disabled={!area.activo}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`imagen-${key}`}>Imagen</Label>
                    <div className="mt-2">
                      <Input
                        id={`imagen-${key}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagenChange(key, e)}
                        disabled={!area.activo}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Áreas Personalizadas</h2>
        <p className="text-muted-foreground mb-6">
          Agrega áreas comunes adicionales específicas para este proyecto.
        </p>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nueva-area-nombre">Nombre del Área</Label>
                <Input
                  id="nueva-area-nombre"
                  value={nuevaArea.nombre}
                  onChange={(e) =>
                    setNuevaArea({ ...nuevaArea, nombre: e.target.value })
                  }
                  placeholder="Ej: Zona de Mascotas"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="nueva-area-imagen">Imagen</Label>
                <Input
                  id="nueva-area-imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleNuevaImagenChange}
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="nueva-area-descripcion">Descripción</Label>
                <Textarea
                  id="nueva-area-descripcion"
                  value={nuevaArea.descripcion}
                  onChange={(e) =>
                    setNuevaArea({ ...nuevaArea, descripcion: e.target.value })
                  }
                  placeholder="Describe esta área común..."
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={agregarAreaPersonalizada}>
                <Plus className="mr-2 h-4 w-4" /> Agregar Área
              </Button>
            </div>
          </CardContent>
        </Card>

        {areasPersonalizadas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areasPersonalizadas.map((area, index) => (
              <Card key={area.id} className="overflow-hidden border-primary">
                <div className="relative h-48 bg-muted">
                  {area.imagenPreview || area.imagenURL ? (
                    <Image
                      src={
                        area.imagenPreview ||
                        area.imagenURL ||
                        "/placeholder.svg?height=200&width=400&query=amenity"
                      }
                      alt={area.nombre}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-4xl">🏢</div>
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => eliminarAreaPersonalizada(area.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-semibold">
                        {area.nombre}
                      </Label>
                      <Textarea
                        value={area.descripcion}
                        onChange={(e) =>
                          actualizarDescripcionPersonalizada(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Descripción del área común"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`imagen-personalizada-${index}`}>
                        Imagen
                      </Label>
                      <div className="mt-2">
                        <Input
                          id={`imagen-personalizada-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImagenPersonalizadaChange(index, e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <div className="text-4xl mb-2">🏢</div>
            <p className="text-muted-foreground">No hay áreas personalizadas</p>
            <p className="text-sm text-muted-foreground">
              Agrega áreas comunes específicas para este proyecto utilizando el
              formulario de arriba.
            </p>
          </div>
        )}
      </div>
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
