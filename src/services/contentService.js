import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToCollection(collectionName, onData, onError) {
  const collectionQuery = query(collection(db, collectionName), orderBy("order", "asc"));

  return onSnapshot(
    collectionQuery,
    (snapshot) => {
      const items = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
      onData(items);
    },
    (error) => {
      console.error(`Subscribe ${collectionName} error:`, error);
      if (onError) onError(error);
    }
  );
}

export function subscribeToDoc(collectionName, docId, onData, onError) {
  return onSnapshot(
    doc(db, collectionName, docId),
    (snapshot) => {
      onData(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
    },
    (error) => {
      console.error(`Subscribe doc ${collectionName}/${docId} error:`, error);
      if (onError) onError(error);
    }
  );
}

export async function createItem(collectionName, data, order) {
  return addDoc(collection(db, collectionName), {
    ...data,
    order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateItem(collectionName, id, data) {
  return updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function deleteItem(collectionName, id) {
  return deleteDoc(doc(db, collectionName, id));
}

export async function reorderItems(collectionName, orderedItems) {
  const batch = writeBatch(db);

  orderedItems.forEach((item, index) => {
    batch.update(doc(db, collectionName, item.id), { order: index });
  });

  return batch.commit();
}

export async function setSingletonDoc(collectionName, docId, data) {
  return setDoc(
    doc(db, collectionName, docId),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function getCollectionCount(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.size;
}

export async function getSingletonExists(collectionName, docId) {
  const snapshot = await getDoc(doc(db, collectionName, docId));
  return snapshot.exists();
}
