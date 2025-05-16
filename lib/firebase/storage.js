import { storage } from "@/config/firebase/firebaseClient";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Función para subir una imagen
export const subirImagen = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

// Función para eliminar una imagen
export const eliminarImagen = async (url) => {
  try {
    // Extraer la ruta de la URL
    const path = decodeURIComponent(url.split("?")[0].split("/o/")[1]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
};
// Subir un archivo a Firebase Storage
export const subirArchivo = async (ruta, archivo) => {
  const storageRef = ref(storage, ruta);
  const resultado = await uploadBytes(storageRef, archivo);
  return resultado;
};

// Obtener la URL de un archivo
export const obtenerUrlArchivo = async (ruta) => {
  const storageRef = ref(storage, ruta);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Eliminar un archivo
export const eliminarArchivo = async (ruta) => {
  const storageRef = ref(storage, ruta);
  await deleteObject(storageRef);
};
