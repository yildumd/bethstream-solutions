import { db } from "../firebase/config";
import {
  collection, addDoc, getDocs, updateDoc, doc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";

const COL = "messages";

export const sendMessage = async (data) => {
  return addDoc(collection(db, COL), {
    ...data, read: false, createdAt: serverTimestamp(),
  });
};

export const getMessages = async () => {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const markRead = async (id) => {
  return updateDoc(doc(db, COL, id), { read: true });
};
