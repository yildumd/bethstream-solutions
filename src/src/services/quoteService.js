import { db } from "../firebase/config";
import {
  collection, addDoc, getDocs, updateDoc, doc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";

const COL = "quotes";

export const submitQuote = async (quoteData) => {
  return addDoc(collection(db, COL), {
    ...quoteData, status: "new", createdAt: serverTimestamp(),
  });
};

export const getQuotes = async () => {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateQuoteStatus = async (id, status) => {
  return updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() });
};
