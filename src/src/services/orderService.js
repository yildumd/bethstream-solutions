import { db } from "../firebase/config";
import {
  collection, addDoc, getDocs, getDoc, doc, updateDoc,
  query, orderBy, serverTimestamp, where,
} from "firebase/firestore";

const COL = "orders";

export const createOrder = async (orderData) => {
  return addDoc(collection(db, COL), {
    ...orderData, status: "pending", createdAt: serverTimestamp(),
  });
};

export const getOrders = async (userId = null) => {
  let q = userId
    ? query(collection(db, COL), where("userId", "==", userId), orderBy("createdAt", "desc"))
    : query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateOrderStatus = async (id, status) => {
  return updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() });
};
