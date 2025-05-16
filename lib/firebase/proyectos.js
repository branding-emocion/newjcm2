import { db, storage } from "@/config/firebase/firebaseClient";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Referencia a la colección de proyectos
const proyectosRef = collection(db, "proyectos");

// Función para obtener todos los proyectos
export const getProyectos = async () => {
  const snapshot = await getDocs(proyectosRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Función para obtener proyectos por estado
export const getProyectosPorEstado = async (estado) => {
  const q = query(proyectosRef, where("estado", "==", estado));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Función para obtener un proyecto por ID
export const getProyectoPorId = async (id) => {
  const docRef = doc(db, "proyectos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    return null;
  }
};

// Función para subir una imagen
export const subirImagen = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Función para eliminar una imagen
export const eliminarImagen = async (url) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

// Función para crear un nuevo proyecto
export const crearProyecto = async (proyecto, imagenFile) => {
  let imagenURL = proyecto.imagen;

  // Si hay una imagen nueva, subirla
  if (imagenFile) {
    const path = `proyectos/${Date.now()}_${imagenFile.name}`;
    imagenURL = await subirImagen(imagenFile, path);
  }

  // Crear el proyecto con la URL de la imagen
  const docRef = await addDoc(proyectosRef, {
    ...proyecto,
    imagen: imagenURL,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...proyecto,
    imagen: imagenURL,
  };
};

// Función para actualizar un proyecto
export const actualizarProyecto = async (id, proyecto, imagenFile) => {
  const docRef = doc(db, "proyectos", id);
  let imagenURL = proyecto.imagen;

  // Si hay una imagen nueva, subirla
  if (imagenFile) {
    const path = `proyectos/${Date.now()}_${imagenFile.name}`;
    imagenURL = await subirImagen(imagenFile, path);
    proyecto.imagen = imagenURL;
  }

  // Actualizar el proyecto
  await updateDoc(docRef, {
    ...proyecto,
    updatedAt: serverTimestamp(),
  });

  return {
    id,
    ...proyecto,
  };
};

// Función para eliminar un proyecto
export const eliminarProyecto = async (id, imagenURL) => {
  // Eliminar la imagen si existe
  if (imagenURL) {
    try {
      await eliminarImagen(imagenURL);
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

  // Eliminar el documento
  const docRef = doc(db, "proyectos", id);
  await deleteDoc(docRef);

  return id;
};
