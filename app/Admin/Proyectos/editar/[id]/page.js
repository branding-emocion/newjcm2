"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building,
  Save,
  ArrowLeft,
  Upload,
  Plus,
  X,
  FileText,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  getProyectoPorId,
  actualizarProyecto,
  subirImagen,
} from "@/lib/firebase/proyectos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación para el formulario
const proyectoSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  ubicacion: z.string().min(5, {
    message: "La ubicación debe tener al menos 5 caracteres.",
  }),
  descripcion: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres.",
    })
    .max(500, {
      message: "La descripción no debe exceder los 500 caracteres.",
    }),
  estado: z.enum(["en_venta", "entregado"], {
    message: "Seleccione un estado válido.",
  }),
  fechaEntrega: z.string().min(4, {
    message: "Ingrese un año válido.",
  }),
  destacado: z.boolean().default(false),
  areaMin: z.coerce.number().min(20, {
    message: "El área mínima debe ser al menos 20 m².",
  }),
  areaMax: z.coerce.number().min(20, {
    message: "El área máxima debe ser al menos 20 m².",
  }),
  videoUrl: z.string().url().optional().or(z.literal("")),
});

export default function EditarProyectoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [proyecto, setProyecto] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para imágenes y archivos
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState(null);
  const [galeriaImagenes, setGaleriaImagenes] = useState([]);

  // Estados para características y áreas comunes
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");

  const [areasComunes, setAreasComunes] = useState({
    gimnasio: {
      activo: false,
      descripcion:
        "Espacio equipado con máquinas de última generación para tu entrenamiento diario.",
    },
    piscina: {
      activo: false,
      descripcion:
        "Refréscate y relájate en nuestra piscina con vista panorámica.",
    },
    sauna: {
      activo: false,
      descripcion: "Espacio de relajación y desintoxicación para tu bienestar.",
    },
    coworking: {
      activo: false,
      descripcion:
        "Espacio diseñado para trabajar o estudiar con todas las comodidades necesarias.",
    },
    parrillas: {
      activo: false,
      descripcion:
        "Espacio perfecto para reuniones sociales y parrilladas con vista a la ciudad.",
    },
    juegos: {
      activo: false,
      descripcion: "Área de entretenimiento con juegos para todas las edades.",
    },
    terraza: {
      activo: false,
      descripcion:
        "Espacio al aire libre con vista panorámica para relajarse y socializar.",
    },
    salaEventos: {
      activo: false,
      descripcion: "Amplio salón para celebraciones y eventos privados.",
    },
    zonaNinos: {
      activo: false,
      descripcion:
        "Área segura y divertida diseñada especialmente para los más pequeños.",
    },
    cine: {
      activo: false,
      descripcion:
        "Sala de proyección para disfrutar películas con amigos y familia.",
    },
    yoga: {
      activo: false,
      descripcion: "Espacio tranquilo para practicar yoga y meditación.",
    },
    jardin: {
      activo: false,
      descripcion:
        "Áreas verdes cuidadosamente diseñadas para conectar con la naturaleza.",
    },
    lobby: {
      activo: false,
      descripcion: "Elegante recepción con servicio de conserjería.",
    },
    estacionamiento: {
      activo: false,
      descripcion:
        "Amplio estacionamiento con espacios asignados y seguridad 24/7.",
    },
  });

  // Estados para tipos de departamentos
  const [tiposDepartamentos, setTiposDepartamentos] = useState([]);

  // Inicializar el formulario
  const form = useForm({
    resolver: zodResolver(proyectoSchema),
    defaultValues: {
      nombre: "",
      ubicacion: "",
      descripcion: "",
      estado: "en_venta",
      fechaEntrega: "",
      destacado: false,
      areaMin: 70,
      areaMax: 150,
      videoUrl: "",
    },
  });

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const data = await getProyectoPorId(id);
        if (!data) {
          toast.error("Error", {
            description: "No se encontró el proyecto especificado.",
          });
          router.push("/Admin/Proyectos");
          return;
        }

        setProyecto(data);

        // Cargar datos en el formulario
        form.reset({
          nombre: data.nombre || "",
          ubicacion: data.ubicacion || "",
          descripcion: data.descripcion || "",
          estado: data.estado || "en_venta",
          fechaEntrega: data.fechaEntrega || "",
          destacado: data.destacado || false,
          areaMin: data.areaMin || 70,
          areaMax: data.areaMax || 150,
          videoUrl: data.videoUrl || "",
        });

        // Cargar imagen principal
        if (data.imagen) {
          setImagenPrincipalPreview(data.imagen);
        }

        // Cargar características
        if (data.caracteristicas && Array.isArray(data.caracteristicas)) {
          setCaracteristicas(data.caracteristicas);
        }

        // Cargar áreas comunes
        if (data.areasComunes) {
          const areasActualizadas = { ...areasComunes };
          Object.entries(data.areasComunes).forEach(([key, value]) => {
            if (areasActualizadas[key]) {
              areasActualizadas[key] = {
                activo:
                  value === true ||
                  (typeof value === "object" && value.activo === true),
                descripcion:
                  typeof value === "object"
                    ? value.descripcion || areasActualizadas[key].descripcion
                    : areasActualizadas[key].descripcion,
              };
            }
          });
          setAreasComunes(areasActualizadas);
        }

        // Cargar tipos de departamentos
        if (data.tiposDepartamentos && Array.isArray(data.tiposDepartamentos)) {
          const tiposConPlanos = data.tiposDepartamentos.map((tipo) => ({
            ...tipo,
            planoFile: null,
            planoPreview: tipo.planoURL || null,
          }));
          setTiposDepartamentos(tiposConPlanos);
        }

        // Cargar galería de imágenes
        if (data.galeria && Array.isArray(data.galeria)) {
          setGaleriaImagenes(
            data.galeria.map((img) => ({
              ...img,
              file: null,
              preview: img.url,
            }))
          );
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
  }, [id, router, form]);

  // Función para manejar la carga de imagen principal
  const handleImagenPrincipalChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenPrincipal(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPrincipalPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar la carga de imágenes para la galería
  const handleGaleriaImagenChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const nuevasImagenes = files.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve({
              file,
              preview: reader.result,
              titulo: "",
              descripcion: "",
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(nuevasImagenes).then((imagenes) => {
        setGaleriaImagenes([...galeriaImagenes, ...imagenes]);
      });
    }
  };

  // Función para eliminar una imagen de la galería
  const eliminarImagenGaleria = (index) => {
    setGaleriaImagenes(galeriaImagenes.filter((_, i) => i !== index));
  };

  // Función para actualizar el título de una imagen de la galería
  const actualizarTituloImagen = (index, titulo) => {
    const nuevasImagenes = [...galeriaImagenes];
    nuevasImagenes[index].titulo = titulo;
    setGaleriaImagenes(nuevasImagenes);
  };

  // Función para actualizar la descripción de una imagen de la galería
  const actualizarDescripcionImagen = (index, descripcion) => {
    const nuevasImagenes = [...galeriaImagenes];
    nuevasImagenes[index].descripcion = descripcion;
    setGaleriaImagenes(nuevasImagenes);
  };

  // Función para manejar la carga de planos
  const handlePlanoChange = (e, tipoId) => {
    const file = e.target.files?.[0];
    if (file) {
      setTiposDepartamentos(
        tiposDepartamentos.map((tipo) => {
          if (tipo.id === tipoId) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setTiposDepartamentos((prev) =>
                prev.map((t) =>
                  t.id === tipoId ? { ...t, planoPreview: reader.result } : t
                )
              );
            };
            reader.readAsDataURL(file);

            return { ...tipo, planoFile: file };
          }
          return tipo;
        })
      );
    }
  };

  // Función para agregar una nueva característica
  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim() !== "") {
      setCaracteristicas([...caracteristicas, nuevaCaracteristica]);
      setNuevaCaracteristica("");
    }
  };

  // Función para eliminar una característica
  const eliminarCaracteristica = (index) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

  // Función para cambiar un área común
  const cambiarAreaComun = (area, valor) => {
    setAreasComunes({
      ...areasComunes,
      [area]: {
        ...areasComunes[area],
        activo: valor,
      },
    });
  };

  // Función para actualizar la descripción de un área común
  const actualizarDescripcionAreaComun = (area, descripcion) => {
    setAreasComunes({
      ...areasComunes,
      [area]: {
        ...areasComunes[area],
        descripcion,
      },
    });
  };

  // Función para agregar un nuevo tipo de departamento
  const agregarTipoDepartamento = () => {
    const nuevoId =
      tiposDepartamentos.length > 0
        ? Math.max(...tiposDepartamentos.map((t) => t.id)) + 1
        : 1;

    setTiposDepartamentos([
      ...tiposDepartamentos,
      {
        id: nuevoId,
        nombre: `Tipo ${nuevoId}`,
        dormitorios: 2,
        banos: 2,
        area: 70,
        precio: 100000,
        caracteristicas: "Sala comedor, cocina, dormitorio principal con baño",
        planoFile: null,
        planoPreview: null,
      },
    ]);
  };

  // Función para eliminar un tipo de departamento
  const eliminarTipoDepartamento = (id) => {
    setTiposDepartamentos(tiposDepartamentos.filter((tipo) => tipo.id !== id));
  };

  // Función para actualizar un tipo de departamento
  const actualizarTipoDepartamento = (id, campo, valor) => {
    setTiposDepartamentos(
      tiposDepartamentos.map((tipo) =>
        tipo.id === id ? { ...tipo, [campo]: valor } : tipo
      )
    );
  };

  // Función para guardar el proyecto
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Validar que haya una imagen principal
      if (!imagenPrincipalPreview) {
        toast.error("Error", {
          description:
            "Debe seleccionar una imagen principal para el proyecto.",
        });
        setIsSubmitting(false);
        return;
      }

      // Validar que haya al menos un tipo de departamento
      if (tiposDepartamentos.length === 0) {
        toast.error("Error", {
          description: "Debe agregar al menos un tipo de departamento.",
        });
        setIsSubmitting(false);
        return;
      }

      // Preparar áreas comunes para guardar
      const areasActivas = {};
      Object.entries(areasComunes).forEach(([key, area]) => {
        if (area.activo) {
          areasActivas[key] = {
            activo: true,
            descripcion: area.descripcion,
          };
        }
      });

      // Procesar los planos de los tipos de departamentos primero
      const tiposDepartamentosActualizados = await Promise.all(
        tiposDepartamentos.map(async (tipo) => {
          // Si hay un nuevo archivo de plano, subirlo
          if (tipo.planoFile) {
            const path = `proyectos/${id}/planos/${tipo.id}_${Date.now()}_${
              tipo.planoFile.name
            }`;
            const planoURL = await subirImagen(tipo.planoFile, path);

            // Devolver el tipo con la URL del plano actualizada
            return {
              ...tipo,
              planoURL,
              planoFile: null, // No guardar el archivo en la base de datos
              planoPreview: null, // No guardar la vista previa en la base de datos
            };
          }

          // Si no hay un nuevo archivo pero hay una vista previa (URL existente)
          if (!tipo.planoFile && tipo.planoPreview && !tipo.planoURL) {
            return {
              ...tipo,
              planoURL: tipo.planoPreview,
              planoFile: null,
              planoPreview: null,
            };
          }

          // Si no hay cambios, mantener la URL existente
          return tipo;
        })
      );

      // Crear el objeto de proyecto actualizado
      const proyectoActualizado = {
        ...data,
        caracteristicas,
        areasComunes: areasActivas,
        tiposDepartamentos: tiposDepartamentosActualizados.map(
          ({ planoFile, planoPreview, ...resto }) => resto
        ),
        updatedAt: new Date().toISOString(),
      };

      // Si hay una nueva imagen principal, subirla
      if (imagenPrincipal) {
        proyectoActualizado.imagen = await subirImagen(
          imagenPrincipal,
          `proyectos/${id}/principal/${Date.now()}_${imagenPrincipal.name}`
        );
      } else {
        proyectoActualizado.imagen = imagenPrincipalPreview;
      }

      // Procesar las imágenes de la galería
      const galeriaActualizada = await Promise.all(
        galeriaImagenes.map(async (imagen, index) => {
          // Si es una imagen existente sin cambios
          if (!imagen.file && imagen.url) {
            return {
              id: imagen.id || Date.now() + index,
              url: imagen.url,
              titulo: imagen.titulo || "",
              descripcion: imagen.descripcion || "",
              fecha: imagen.fecha || new Date().toISOString(),
            };
          }

          // Si es una nueva imagen
          if (imagen.file) {
            const path = `proyectos/${id}/galeria/${Date.now()}_${index}_${
              imagen.file.name
            }`;
            const url = await subirImagen(imagen.file, path);
            return {
              id: Date.now() + index,
              url,
              titulo: imagen.titulo || "",
              descripcion: imagen.descripcion || "",
              fecha: new Date().toISOString(),
            };
          }

          return null;
        })
      );

      // Filtrar valores nulos
      const galeriaFiltrada = galeriaActualizada.filter((img) => img !== null);

      // Actualizar el proyecto con todos los datos
      await actualizarProyecto(id, {
        ...proyectoActualizado,
        galeria:
          galeriaFiltrada.length > 0
            ? galeriaFiltrada
            : proyectoActualizado.galeria,
      });

      toast.success("Proyecto actualizado", {
        description: "El proyecto ha sido actualizado exitosamente.",
      });

      // Redireccionar a la vista del proyecto
      router.push(`/Admin/Proyectos/${id}`);
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
      toast.error("Error", {
        description:
          "Ocurrió un error al actualizar el proyecto. Inténtelo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para avanzar a la siguiente pestaña
  const avanzarPestana = () => {
    if (activeTab === "general") {
      form
        .trigger([
          "nombre",
          "ubicacion",
          "descripcion",
          "estado",
          "fechaEntrega",
        ])
        .then((isValid) => {
          if (isValid) setActiveTab("caracteristicas");
        });
    } else if (activeTab === "caracteristicas") {
      setActiveTab("departamentos");
    } else if (activeTab === "departamentos") {
      setActiveTab("imagenes");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center py-12">
        <div className="mx-auto h-12 w-12 text-muted-foreground animate-pulse">
          🏢
        </div>
        <h3 className="mt-4 text-lg font-semibold">Cargando proyecto...</h3>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Editar Proyecto</h1>
            <p className="text-muted-foreground">{proyecto?.nombre}</p>
          </div>
        </div>

        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? (
            <>Guardando...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar Cambios
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="caracteristicas">
                  Características
                </TabsTrigger>
                <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
                <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del Proyecto</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Golf View" {...field} />
                            </FormControl>
                            <FormDescription>
                              Ingrese el nombre comercial del proyecto.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ubicacion"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ubicación</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej: Av. Huamán 830, Victor Larco"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Dirección completa del proyecto.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="fechaEntrega"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha de Entrega</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej: 2026" {...field} />
                              </FormControl>
                              <FormDescription>
                                Año estimado de entrega del proyecto.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="estado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un estado" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="en_venta">
                                    En Venta
                                  </SelectItem>
                                  <SelectItem value="entregado">
                                    Entregado
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Estado actual del proyecto.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="destacado"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Proyecto Destacado</FormLabel>
                                <FormDescription>
                                  Marcar como proyecto destacado en la página
                                  principal.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="areaMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Área Mínima (m²)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Área del departamento más pequeño.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="areaMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Área Máxima (m²)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Área del departamento más grande.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="descripcion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe el proyecto..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Descripción detallada del proyecto.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button type="button" onClick={avanzarPestana}>
                          Siguiente: Características
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="caracteristicas" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Características del Proyecto
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caracteristicas.map((caracteristica, index) => (
                          <Badge
                            key={index}
                            className="flex items-center gap-1 py-1.5"
                          >
                            {caracteristica}
                            <button
                              type="button"
                              onClick={() => eliminarCaracteristica(index)}
                              className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Nueva característica..."
                          value={nuevaCaracteristica}
                          onChange={(e) =>
                            setNuevaCaracteristica(e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button type="button" onClick={agregarCaracteristica}>
                          <Plus className="h-4 w-4 mr-2" /> Agregar
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Áreas Comunes
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Selecciona las áreas comunes básicas. Para una gestión
                        más detallada, utiliza la sección de Áreas Comunes.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(areasComunes).map(([key, area]) => (
                          <div
                            key={key}
                            className="flex items-start space-x-2 border p-3 rounded-md"
                          >
                            <Checkbox
                              id={key}
                              checked={area.activo}
                              onCheckedChange={(checked) =>
                                cambiarAreaComun(key, checked === true)
                              }
                            />
                            <div className="space-y-1 leading-none w-full">
                              <label
                                htmlFor={key}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {getNombreArea(key)}
                              </label>
                              {area.activo && (
                                <Textarea
                                  value={area.descripcion}
                                  onChange={(e) =>
                                    actualizarDescripcionAreaComun(
                                      key,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Descripción para ${getNombreArea(
                                    key
                                  )}`}
                                  className="mt-2 text-xs"
                                  rows={2}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/Admin/Proyectos/${id}/areas-comunes`}>
                            Gestionar Áreas Comunes
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button type="button" onClick={avanzarPestana}>
                        Siguiente: Departamentos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="departamentos" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">
                        Tipos de Departamentos
                      </h3>
                      <Button type="button" onClick={agregarTipoDepartamento}>
                        <Plus className="h-4 w-4 mr-2" /> Agregar Tipo
                      </Button>
                    </div>

                    {tiposDepartamentos.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed rounded-lg mb-6">
                        <Building className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          No hay tipos de departamentos configurados
                        </p>
                        <Button
                          onClick={agregarTipoDepartamento}
                          className="mt-4"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Agregar Tipo de
                          Departamento
                        </Button>
                      </div>
                    ) : (
                      tiposDepartamentos.map((tipo) => (
                        <div
                          key={tipo.id}
                          className="mb-6 p-4 border rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <Input
                                value={tipo.nombre}
                                onChange={(e) =>
                                  actualizarTipoDepartamento(
                                    tipo.id,
                                    "nombre",
                                    e.target.value
                                  )
                                }
                                className="font-semibold w-40"
                              />
                              <Badge className="ml-2 bg-blue-500">
                                {tipo.dormitorios} Dormitorios
                              </Badge>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              type="button"
                              onClick={() => eliminarTipoDepartamento(tipo.id)}
                            >
                              <X className="h-4 w-4 mr-2" /> Eliminar
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    Dormitorios
                                  </label>
                                  <Select
                                    value={tipo.dormitorios.toString()}
                                    onValueChange={(value) =>
                                      actualizarTipoDepartamento(
                                        tipo.id,
                                        "dormitorios",
                                        Number.parseInt(value)
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">
                                    Baños
                                  </label>
                                  <Select
                                    value={tipo.banos.toString()}
                                    onValueChange={(value) =>
                                      actualizarTipoDepartamento(
                                        tipo.id,
                                        "banos",
                                        Number.parseInt(value)
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">
                                    Área (m²)
                                  </label>
                                  <Input
                                    type="number"
                                    value={tipo.area}
                                    onChange={(e) =>
                                      actualizarTipoDepartamento(
                                        tipo.id,
                                        "area",
                                        Number.parseFloat(e.target.value)
                                      )
                                    }
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-medium">
                                    Precio ($)
                                  </label>
                                  <Input
                                    type="number"
                                    value={tipo.precio}
                                    onChange={(e) =>
                                      actualizarTipoDepartamento(
                                        tipo.id,
                                        "precio",
                                        Number.parseFloat(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="mt-4">
                                <label className="text-sm font-medium">
                                  Características
                                </label>
                                <Textarea
                                  value={tipo.caracteristicas}
                                  onChange={(e) =>
                                    actualizarTipoDepartamento(
                                      tipo.id,
                                      "caracteristicas",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Sala comedor con balcón, cocina, dormitorio principal con baño, etc."
                                  className="mt-2"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Plano del Departamento
                              </label>
                              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                {tipo.planoPreview ? (
                                  <div className="relative h-48 mb-2">
                                    <Image
                                      src={
                                        tipo.planoPreview || "/placeholder.svg"
                                      }
                                      alt={`Plano ${tipo.nombre}`}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="py-8">
                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                      Sube el plano del departamento
                                    </p>
                                  </div>
                                )}

                                <div className="mt-2">
                                  <label
                                    htmlFor={`plano-${tipo.id}`}
                                    className="cursor-pointer"
                                  >
                                    <div className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                                      <Upload className="h-4 w-4 mr-2" />
                                      {tipo.planoPreview
                                        ? "Cambiar Plano"
                                        : "Subir Plano"}
                                    </div>
                                    <input
                                      id={`plano-${tipo.id}`}
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handlePlanoChange(e, tipo.id)
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    <div className="flex justify-end">
                      <Button type="button" onClick={avanzarPestana}>
                        Siguiente: Imágenes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="imagenes" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Imagen Principal
                      </h3>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center mb-4">
                        {imagenPrincipalPreview ? (
                          <div className="relative h-64 mb-2">
                            <Image
                              src={imagenPrincipalPreview || "/placeholder.svg"}
                              alt="Vista previa"
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="py-8">
                            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Sube la imagen principal del proyecto
                            </p>
                          </div>
                        )}

                        <div className="mt-2">
                          <label
                            htmlFor="imagen-principal"
                            className="cursor-pointer"
                          >
                            <div className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                              <Upload className="h-4 w-4 mr-2" />
                              {imagenPrincipalPreview
                                ? "Cambiar Imagen"
                                : "Subir Imagen"}
                            </div>
                            <input
                              id="imagen-principal"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImagenPrincipalChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                          Galería de Imágenes
                        </h3>
                        <Button variant="outline" asChild>
                          <Link href={`/Admin/Proyectos/${id}/galeria`}>
                            Gestionar Galería Completa
                          </Link>
                        </Button>
                      </div>

                      <div className="border-2 border-dashed rounded-lg p-4 text-center mb-4">
                        <div className="py-8">
                          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Arrastra imágenes o haz clic para seleccionar
                          </p>
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="galeria-imagenes"
                            className="cursor-pointer"
                          >
                            <div className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                              <Upload className="h-4 w-4 mr-2" />
                              Subir Imágenes
                            </div>
                            <input
                              id="galeria-imagenes"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleGaleriaImagenChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {galeriaImagenes.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {galeriaImagenes.map((imagen, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div className="relative h-48">
                              <Image
                                src={imagen.preview || imagen.url}
                                alt={`Vista previa ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => eliminarImagenGaleria(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardContent className="pt-4">
                              <div className="space-y-4">
                                <div>
                                  <label
                                    htmlFor={`titulo-${index}`}
                                    className="text-sm font-medium"
                                  >
                                    Título (opcional)
                                  </label>
                                  <Input
                                    id={`titulo-${index}`}
                                    value={imagen.titulo || ""}
                                    onChange={(e) =>
                                      actualizarTituloImagen(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Ej: Fachada principal"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={`descripcion-${index}`}
                                    className="text-sm font-medium"
                                  >
                                    Descripción (opcional)
                                  </label>
                                  <Textarea
                                    id={`descripcion-${index}`}
                                    value={imagen.descripcion || ""}
                                    onChange={(e) =>
                                      actualizarDescripcionImagen(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Ej: Vista de la fachada principal desde la avenida"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    <Separator className="my-6" />

                    <div>
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ej: https://youtube.com/watch?v=..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              URL de YouTube o Vimeo para mostrar un video del
                              proyecto.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Resumen del Proyecto
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">
                      {form.watch("nombre") || "Sin nombre"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <Badge
                      className={`mt-1 ${
                        form.watch("estado") === "en_venta"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {form.watch("estado") === "en_venta"
                        ? "En Venta"
                        : "Entregado"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="font-medium">
                      {form.watch("ubicacion") || "Sin ubicación"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Fecha de Entrega
                    </p>
                    <p className="font-medium">
                      {form.watch("fechaEntrega") || "No especificada"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tipos de Departamentos
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tiposDepartamentos.map((tipo) => (
                        <Badge key={tipo.id} variant="outline">
                          {tipo.dormitorios} Dormitorios
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Área</p>
                    <p className="font-medium">
                      {form.watch("areaMin")} - {form.watch("areaMax")} m²
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Características
                    </p>
                    <p className="font-medium">
                      {caracteristicas.length} características
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Áreas Comunes
                    </p>
                    <p className="font-medium">
                      {
                        Object.values(areasComunes).filter(
                          (area) => area.activo
                        ).length
                      }{" "}
                      áreas activas
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Galería</p>
                    <p className="font-medium">
                      {galeriaImagenes.length} imágenes
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-semibold">Estado del Formulario</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          imagenPrincipalPreview ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm">Imagen Principal</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          form.formState.isValid
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm">Datos Básicos</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          caracteristicas.length > 0
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm">Características</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          tiposDepartamentos.length > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm">Tipos de Departamentos</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={`/Admin/Proyectos`}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Proyectos
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={`/Admin/Proyectos/${id}/areas-comunes`}>
                      Gestionar Áreas Comunes
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={`/Admin/Proyectos/public/${id}`}>
                      Ver Vista Pública
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Form>
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
