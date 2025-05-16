import { toast } from "sonner";

// Función para mostrar notificaciones de éxito
export function notificarExito(titulo, mensaje) {
  toast.success(titulo, {
    description: mensaje,
    duration: 5000,
  });
}

// Función para mostrar notificaciones de error
export function notificarError(titulo, mensaje) {
  toast.error(titulo, {
    description: mensaje,
    duration: 5000,
  });
}

// Función para mostrar notificaciones informativas
export function notificarInfo(titulo, mensaje) {
  toast.info(titulo, {
    description: mensaje,
    duration: 5000,
  });
}

// Función para mostrar notificaciones de advertencia
export function notificarAdvertencia(titulo, mensaje) {
  toast.warning(titulo, {
    description: mensaje,
    duration: 5000,
  });
}

// Función para mostrar notificaciones de carga
export function notificarCarga(titulo, mensaje, promesa) {
  return toast.promise(promesa, {
    loading: titulo,
    success: (data) => mensaje.success || "Operación completada con éxito",
    error: (error) => mensaje.error || "Ha ocurrido un error",
  });
}
