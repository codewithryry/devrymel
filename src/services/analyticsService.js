import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function trackVisit() {
  const ref = doc(db, "analytics", "portfolio");

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { views: 1 });
  } else {
    await updateDoc(ref, {
      views: increment(1)
    });
  }
}

export async function getViews() {
  const ref = doc(db, "analytics", "portfolio");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().views;
  }

  return 0;
}