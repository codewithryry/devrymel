import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "projects";

export function subscribeToPublishedProjects(onData, onError) {
  const projectsQuery = query(collection(db, COLLECTION), orderBy("order", "asc"));

  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      const projects = snapshot.docs
        .map((document) => ({ id: document.id, ...document.data() }))
        .filter((project) => project.status === "published");

      onData(projects);
    },
    (error) => {
      console.error("Subscribe published projects error:", error);
      if (onError) onError(error);
    }
  );
}

export function subscribeToAllProjects(onData, onError) {
  const projectsQuery = query(collection(db, COLLECTION), orderBy("order", "asc"));

  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      const projects = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));

      onData(projects);
    },
    (error) => {
      console.error("Subscribe all projects error:", error);
      if (onError) onError(error);
    }
  );
}

export async function createProject(data, nextOrder) {
  return addDoc(collection(db, COLLECTION), {
    title: data.title || "",
    description: data.description || "",
    detailedDescription: data.detailedDescription || "",
    technologies: data.technologies || [],
    features: data.features || [],
    category: data.category || "",
    githubUrl: data.githubUrl || "",
    demoUrl: data.demoUrl || "",
    image: data.image || "",
    featured: !!data.featured,
    status: data.status === "published" ? "published" : "draft",
    order: nextOrder,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateProject(id, data) {
  return updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProject(project) {
  return deleteDoc(doc(db, COLLECTION, project.id));
}

export async function reorderProjects(orderedProjects) {
  const batch = writeBatch(db);

  orderedProjects.forEach((project, index) => {
    batch.update(doc(db, COLLECTION, project.id), { order: index });
  });

  return batch.commit();
}
