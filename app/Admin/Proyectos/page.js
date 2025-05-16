// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Plus,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Building,
//   Edit,
//   Trash2,
//   Eye,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { getProyectos, eliminarProyecto } from "@/lib/firebase/proyectos";

// export default function ProyectosPage() {
//   const router = useRouter();
//   const [proyectos, setProyectos] = useState([]);
//   const [proyectosFiltrados, setProyectosFiltrados] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [busqueda, setBusqueda] = useState("");
//   const [filtroEstado, setFiltroEstado] = useState("todos");
//   const [vistaActiva, setVistaActiva] = useState("tarjetas");
//   const [proyectoAEliminar, setProyectoAEliminar] = useState(null);
//   const [eliminando, setEliminando] = useState(false);

//   useEffect(() => {
//     const cargarProyectos = async () => {
//       try {
//         const data = await getProyectos();
//         setProyectos(data);
//         setProyectosFiltrados(data);
//       } catch (error) {
//         console.error("Error al cargar proyectos:", error);
//         toast.error("Error", {
//           description:
//             "No se pudieron cargar los proyectos. Inténtelo de nuevo.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     cargarProyectos();
//   }, []);

//   useEffect(() => {
//     // Aplicar filtros cuando cambian los criterios
//     let resultado = [...proyectos];

//     // Filtrar por estado
//     if (filtroEstado !== "todos") {
//       resultado = resultado.filter(
//         (proyecto) => proyecto.estado === filtroEstado
//       );
//     }

//     // Filtrar por búsqueda
//     if (busqueda.trim() !== "") {
//       const terminoBusqueda = busqueda.toLowerCase();
//       resultado = resultado.filter(
//         (proyecto) =>
//           proyecto.nombre?.toLowerCase().includes(terminoBusqueda) ||
//           proyecto.ubicacion?.toLowerCase().includes(terminoBusqueda)
//       );
//     }

//     setProyectosFiltrados(resultado);
//   }, [busqueda, filtroEstado, proyectos]);

//   const handleEliminarProyecto = async () => {
//     if (!proyectoAEliminar) return;

//     try {
//       setEliminando(true);
//       await eliminarProyecto(proyectoAEliminar.id);

//       // Actualizar la lista de proyectos
//       setProyectos(proyectos.filter((p) => p.id !== proyectoAEliminar.id));
//       setProyectoAEliminar(null);

//       toast.success("Proyecto eliminado", {
//         description: "El proyecto ha sido eliminado exitosamente.",
//       });
//     } catch (error) {
//       console.error("Error al eliminar el proyecto:", error);
//       toast.error("Error", {
//         description: "No se pudo eliminar el proyecto. Inténtelo de nuevo.",
//       });
//     } finally {
//       setEliminando(false);
//     }
//   };

//   // Renderizar estado de carga
//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Proyectos</h1>
//           <Button disabled>
//             <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <Card key={i} className="overflow-hidden">
//               <div className="h-48 bg-muted animate-pulse"></div>
//               <CardContent className="p-4">
//                 <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
//                 <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-4"></div>
//                 <div className="flex justify-between">
//                   <div className="h-8 bg-muted animate-pulse rounded w-1/3"></div>
//                   <div className="h-8 bg-muted animate-pulse rounded w-1/4"></div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Proyectos</h1>
//           <p className="text-muted-foreground">
//             Gestiona tus proyectos inmobiliarios
//           </p>
//         </div>
//         <Button asChild>
//           <Link href="/Admin/Proyectos/nuevo">
//             <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
//           </Link>
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Buscar proyectos..."
//             className="pl-8"
//             value={busqueda}
//             onChange={(e) => setBusqueda(e.target.value)}
//           />
//         </div>

//         <div className="flex gap-2">
//           <Select value={filtroEstado} onValueChange={setFiltroEstado}>
//             <SelectTrigger className="w-[180px]">
//               <Filter className="mr-2 h-4 w-4" />
//               <SelectValue placeholder="Filtrar por estado" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Estado</SelectLabel>
//                 <SelectItem value="todos">Todos</SelectItem>
//                 <SelectItem value="en_venta">En Venta</SelectItem>
//                 <SelectItem value="entregado">Entregado</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>

//           <Tabs
//             value={vistaActiva}
//             onValueChange={setVistaActiva}
//             className="w-[180px]"
//           >
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="tarjetas">Tarjetas</TabsTrigger>
//               <TabsTrigger value="tabla">Tabla</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </div>

//       {proyectosFiltrados.length === 0 ? (
//         <div className="text-center py-12 border-2 border-dashed rounded-lg">
//           <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//           <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
//           <p className="text-muted-foreground mb-6">
//             {busqueda || filtroEstado !== "todos"
//               ? "No se encontraron proyectos con los filtros aplicados."
//               : "Aún no has creado ningún proyecto."}
//           </p>
//           <Button asChild>
//             <Link href="/Admin/Proyectos/nuevo">
//               <Plus className="mr-2 h-4 w-4" /> Crear Proyecto
//             </Link>
//           </Button>
//         </div>
//       ) : (
//         <Tabs value={vistaActiva} className="w-full">
//           <TabsContent value="tarjetas" className="mt-0">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {proyectosFiltrados.map((proyecto) => (
//                 <Card key={proyecto.id} className="overflow-hidden">
//                   <div className="relative h-48">
//                     <Image
//                       src={
//                         proyecto.imagen ||
//                         "/placeholder.svg?height=400&width=600&query=modern building"
//                       }
//                       alt={proyecto.nombre}
//                       fill
//                       className="object-cover"
//                     />
//                     <div className="absolute top-2 right-2">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="bg-black/20 hover:bg-black/40 text-white"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/Admin/Proyectos/public/${proyecto.id}`}
//                             >
//                               <Eye className="mr-2 h-4 w-4" /> Ver Público
//                             </Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/Admin/Proyectos/editar/${proyecto.id}`}
//                             >
//                               <Edit className="mr-2 h-4 w-4" /> Editar
//                             </Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             className="text-red-600"
//                             onClick={() => setProyectoAEliminar(proyecto)}
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" /> Eliminar
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                     {proyecto.destacado && (
//                       <Badge className="absolute top-2 left-2 bg-yellow-500">
//                         Destacado
//                       </Badge>
//                     )}
//                   </div>
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-semibold text-lg truncate">
//                         {proyecto.nombre}
//                       </h3>
//                       <Badge
//                         className={
//                           proyecto.estado === "en_venta"
//                             ? "bg-blue-500"
//                             : "bg-green-500"
//                         }
//                       >
//                         {proyecto.estado === "en_venta"
//                           ? "En Venta"
//                           : "Entregado"}
//                       </Badge>
//                     </div>
//                     <p className="text-muted-foreground text-sm mb-4 truncate">
//                       {proyecto.ubicacion}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <div className="text-sm">
//                         <span className="text-muted-foreground">Entrega:</span>{" "}
//                         <span className="font-medium">
//                           {proyecto.fechaEntrega}
//                         </span>
//                       </div>
//                       <div className="text-sm">
//                         <span className="text-muted-foreground">Área:</span>{" "}
//                         <span className="font-medium">
//                           {proyecto.areaMin} - {proyecto.areaMax} m²
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="tabla" className="mt-0">
//             <div className="rounded-md border">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b bg-muted/50">
//                     <th className="py-3 px-4 text-left font-medium">Nombre</th>
//                     <th className="py-3 px-4 text-left font-medium">
//                       Ubicación
//                     </th>
//                     <th className="py-3 px-4 text-left font-medium">Estado</th>
//                     <th className="py-3 px-4 text-left font-medium">Entrega</th>
//                     <th className="py-3 px-4 text-left font-medium">
//                       Área (m²)
//                     </th>
//                     <th className="py-3 px-4 text-center font-medium">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {proyectosFiltrados.map((proyecto) => (
//                     <tr key={proyecto.id} className="border-b">
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-3">
//                           <div className="relative h-10 w-10 rounded-md overflow-hidden">
//                             <Image
//                               src={
//                                 proyecto.imagen ||
//                                 "/placeholder.svg?height=40&width=40&query=building"
//                               }
//                               alt={proyecto.nombre}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <div className="font-medium">{proyecto.nombre}</div>
//                           {proyecto.destacado && (
//                             <Badge className="bg-yellow-500">Destacado</Badge>
//                           )}
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-muted-foreground">
//                         {proyecto.ubicacion}
//                       </td>
//                       <td className="py-3 px-4">
//                         <Badge
//                           className={
//                             proyecto.estado === "en_venta"
//                               ? "bg-blue-500"
//                               : "bg-green-500"
//                           }
//                         >
//                           {proyecto.estado === "en_venta"
//                             ? "En Venta"
//                             : "Entregado"}
//                         </Badge>
//                       </td>
//                       <td className="py-3 px-4">{proyecto.fechaEntrega}</td>
//                       <td className="py-3 px-4">
//                         {proyecto.areaMin} - {proyecto.areaMax}
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex justify-center gap-2">
//                           <Button variant="outline" size="icon" asChild>
//                             <Link
//                               href={`/Admin/Proyectos/public/${proyecto.id}`}
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button variant="outline" size="icon" asChild>
//                             <Link href={`/Admin/Proyectos/${proyecto.id}`}>
//                               <Edit className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="text-red-600"
//                             onClick={() => setProyectoAEliminar(proyecto)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </TabsContent>
//         </Tabs>
//       )}

//       {/* Diálogo de confirmación para eliminar proyecto */}
//       <Dialog
//         open={!!proyectoAEliminar}
//         onOpenChange={(open) => !open && setProyectoAEliminar(null)}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirmar eliminación</DialogTitle>
//             <DialogDescription>
//               ¿Estás seguro de que deseas eliminar el proyecto{" "}
//               <span className="font-semibold">{proyectoAEliminar?.nombre}</span>
//               ? Esta acción no se puede deshacer.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancelar</Button>
//             </DialogClose>
//             <Button
//               variant="destructive"
//               onClick={handleEliminarProyecto}
//               disabled={eliminando}
//             >
//               {eliminando ? "Eliminando..." : "Eliminar"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Building,
  Edit,
  Trash2,
  Eye,
  Upload,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getProyectos,
  eliminarProyecto,
  actualizarProyecto,
} from "@/lib/firebase/proyectos";
import { subirArchivo, obtenerUrlArchivo } from "@/lib/firebase/storage";
import { Label } from "@/components/ui/label";

export default function ProyectosPage() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  const [proyectosFiltrados, setProyectosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [vistaActiva, setVistaActiva] = useState("tarjetas");
  const [proyectoAEliminar, setProyectoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [modalPdfAbierto, setModalPdfAbierto] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [archivoPdf, setArchivoPdf] = useState(null);
  const [subiendoPdf, setSubiendoPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState("");

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const data = await getProyectos();
        setProyectos(data);
        setProyectosFiltrados(data);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        toast.error("Error", {
          description:
            "No se pudieron cargar los proyectos. Inténtelo de nuevo.",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarProyectos();
  }, []);

  useEffect(() => {
    // Aplicar filtros cuando cambian los criterios
    let resultado = [...proyectos];

    // Filtrar por estado
    if (filtroEstado !== "todos") {
      resultado = resultado.filter(
        (proyecto) => proyecto.estado === filtroEstado
      );
    }

    // Filtrar por búsqueda
    if (busqueda.trim() !== "") {
      const terminoBusqueda = busqueda.toLowerCase();
      resultado = resultado.filter(
        (proyecto) =>
          proyecto.nombre?.toLowerCase().includes(terminoBusqueda) ||
          proyecto.ubicacion?.toLowerCase().includes(terminoBusqueda)
      );
    }

    setProyectosFiltrados(resultado);
  }, [busqueda, filtroEstado, proyectos]);

  const handleEliminarProyecto = async () => {
    if (!proyectoAEliminar) return;

    try {
      setEliminando(true);
      await eliminarProyecto(proyectoAEliminar.id);

      // Actualizar la lista de proyectos
      setProyectos(proyectos.filter((p) => p.id !== proyectoAEliminar.id));
      setProyectoAEliminar(null);

      toast.success("Proyecto eliminado", {
        description: "El proyecto ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      toast.error("Error", {
        description: "No se pudo eliminar el proyecto. Inténtelo de nuevo.",
      });
    } finally {
      setEliminando(false);
    }
  };

  const handleSubirPdf = async () => {
    if (!archivoPdf || !proyectoSeleccionado) return;

    if (archivoPdf.type !== "application/pdf") {
      setErrorPdf("Solo se permiten archivos PDF");
      return;
    }

    try {
      setSubiendoPdf(true);
      setErrorPdf("");

      // Ruta para guardar el PDF: proyectos/{proyectoId}/brochure.pdf
      const ruta = `proyectos/${proyectoSeleccionado.id}/brochure.pdf`;

      // Subir el archivo a Firebase Storage
      await subirArchivo(ruta, archivoPdf);

      // Obtener la URL del archivo
      const urlPdf = await obtenerUrlArchivo(ruta);

      // Crear una copia actualizada del proyecto con la URL del brochure
      const proyectoActualizado = {
        ...proyectoSeleccionado,
        brochureUrl: urlPdf,
        brochureActualizado: new Date().toISOString(),
      };

      // Usar la función actualizarProyecto existente, pasando null como imagenFile
      await actualizarProyecto(
        proyectoSeleccionado.id,
        proyectoActualizado,
        null
      );

      // Actualizar la lista de proyectos en el estado local
      const proyectosActualizados = proyectos.map((p) =>
        p.id === proyectoSeleccionado.id
          ? {
              ...p,
              brochureUrl: urlPdf,
              brochureActualizado: new Date().toISOString(),
            }
          : p
      );

      setProyectos(proyectosActualizados);
      setProyectosFiltrados(
        proyectosFiltrados.map((p) =>
          p.id === proyectoSeleccionado.id
            ? {
                ...p,
                brochureUrl: urlPdf,
                brochureActualizado: new Date().toISOString(),
              }
            : p
        )
      );

      toast.success("Brochure subido", {
        description: "El brochure ha sido subido exitosamente.",
      });

      // Cerrar el modal y limpiar estados
      setModalPdfAbierto(false);
      setArchivoPdf(null);
      setProyectoSeleccionado(null);
    } catch (error) {
      console.error("Error al subir el brochure:", error);
      setErrorPdf("Error al subir el archivo. Inténtelo de nuevo.");
      toast.error("Error", {
        description: "No se pudo subir el brochure. Inténtelo de nuevo.",
      });
    } finally {
      setSubiendoPdf(false);
    }
  };

  const abrirModalPdf = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalPdfAbierto(true);
    setErrorPdf("");
  };

  const verPdf = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  // Renderizar estado de carga
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-muted animate-pulse rounded w-1/3"></div>
                  <div className="h-8 bg-muted animate-pulse rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-muted-foreground">
            Gestiona tus proyectos inmobiliarios
          </p>
        </div>
        <Button asChild>
          <Link href="/Admin/Proyectos/nuevo">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="en_venta">En Venta</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Tabs
            value={vistaActiva}
            onValueChange={setVistaActiva}
            className="w-[180px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tarjetas">Tarjetas</TabsTrigger>
              <TabsTrigger value="tabla">Tabla</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {proyectosFiltrados.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
          <p className="text-muted-foreground mb-6">
            {busqueda || filtroEstado !== "todos"
              ? "No se encontraron proyectos con los filtros aplicados."
              : "Aún no has creado ningún proyecto."}
          </p>
          <Button asChild>
            <Link href="/Admin/Proyectos/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Crear Proyecto
            </Link>
          </Button>
        </div>
      ) : (
        <Tabs value={vistaActiva} className="w-full">
          <TabsContent value="tarjetas" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosFiltrados.map((proyecto) => (
                <Card key={proyecto.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={
                        proyecto.imagen ||
                        "/placeholder.svg?height=400&width=600&query=modern building" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={proyecto.nombre}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-black/20 hover:bg-black/40 text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/Admin/Proyectos/public/${proyecto.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" /> Ver Público
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/Admin/Proyectos/editar/${proyecto.id}`}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => abrirModalPdf(proyecto)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {proyecto.brochureUrl
                              ? "Actualizar Brochure"
                              : "Subir Brochure"}
                          </DropdownMenuItem>
                          {proyecto.brochureUrl && (
                            <DropdownMenuItem
                              onClick={() => verPdf(proyecto.brochureUrl)}
                            >
                              <Eye className="mr-2 h-4 w-4" /> Ver Brochure
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setProyectoAEliminar(proyecto)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {proyecto.destacado && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg truncate">
                        {proyecto.nombre}
                      </h3>
                      <Badge
                        className={
                          proyecto.estado === "en_venta"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }
                      >
                        {proyecto.estado === "en_venta"
                          ? "En Venta"
                          : "Entregado"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 truncate">
                      {proyecto.ubicacion}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Entrega:</span>{" "}
                        <span className="font-medium">
                          {proyecto.fechaEntrega}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Área:</span>{" "}
                        <span className="font-medium">
                          {proyecto.areaMin} - {proyecto.areaMax} m²
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tabla" className="mt-0">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Nombre</th>
                    <th className="py-3 px-4 text-left font-medium">
                      Ubicación
                    </th>
                    <th className="py-3 px-4 text-left font-medium">Estado</th>
                    <th className="py-3 px-4 text-left font-medium">Entrega</th>
                    <th className="py-3 px-4 text-left font-medium">
                      Área (m²)
                    </th>
                    <th className="py-3 px-4 text-center font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proyectosFiltrados.map((proyecto) => (
                    <tr key={proyecto.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden">
                            <Image
                              src={
                                proyecto.imagen ||
                                "/placeholder.svg?height=40&width=40&query=building" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={proyecto.nombre}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium">{proyecto.nombre}</div>
                          {proyecto.destacado && (
                            <Badge className="bg-yellow-500">Destacado</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {proyecto.ubicacion}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            proyecto.estado === "en_venta"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }
                        >
                          {proyecto.estado === "en_venta"
                            ? "En Venta"
                            : "Entregado"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{proyecto.fechaEntrega}</td>
                      <td className="py-3 px-4">
                        {proyecto.areaMin} - {proyecto.areaMax}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link
                              href={`/Admin/Proyectos/public/${proyecto.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/Admin/Proyectos/${proyecto.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => abrirModalPdf(proyecto)}
                            title={
                              proyecto.brochureUrl
                                ? "Actualizar Brochure"
                                : "Subir Brochure"
                            }
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {proyecto.brochureUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => verPdf(proyecto.brochureUrl)}
                              title="Ver Brochure"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-600"
                            onClick={() => setProyectoAEliminar(proyecto)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Diálogo de confirmación para eliminar proyecto */}
      <Dialog
        open={!!proyectoAEliminar}
        onOpenChange={(open) => !open && setProyectoAEliminar(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el proyecto{" "}
              <span className="font-semibold">{proyectoAEliminar?.nombre}</span>
              ? Esta acción no se puede deshacer.
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

      {/* Modal para subir PDF */}
      <Dialog open={modalPdfAbierto} onOpenChange={setModalPdfAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {proyectoSeleccionado?.brochureUrl
                ? "Actualizar Brochure"
                : "Subir Brochure"}
            </DialogTitle>
            <DialogDescription>
              {proyectoSeleccionado?.brochureUrl
                ? "Sube un nuevo PDF para reemplazar el brochure actual."
                : "Sube un PDF como brochure para este proyecto."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pdf-file">Archivo PDF</Label>
              <Input
                id="pdf-file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setArchivoPdf(e.target.files[0])}
              />
              {errorPdf && <p className="text-sm text-red-500">{errorPdf}</p>}
            </div>

            {proyectoSeleccionado?.brochureUrl && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Ya existe un brochure. Al subir uno nuevo, se reemplazará el
                  anterior.
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setModalPdfAbierto(false);
                setArchivoPdf(null);
                setErrorPdf("");
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubirPdf}
              disabled={!archivoPdf || subiendoPdf}
            >
              {subiendoPdf ? (
                <>Subiendo...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {proyectoSeleccionado?.brochureUrl ? "Actualizar" : "Subir"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
