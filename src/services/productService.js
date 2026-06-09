import { db, storage } from "../firebase/config";
import {
  collection, getDocs, getDoc, doc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { SAMPLE_PRODUCTS } from "../data/products";

const COL = "products";

export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, COL);
    const constraints = [];
    if (filters.category) constraints.push(where("category", "==", filters.category));
    if (filters.featured) constraints.push(where("featured", "==", true));
    if (filters.limit) constraints.push(limit(filters.limit));
    constraints.push(orderBy("createdAt", "desc"));
    q = query(q, ...constraints);
    const snap = await getDocs(q);
    if (snap.empty) return SAMPLE_PRODUCTS.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.featured && !p.featured) return false;
      return true;
    }).slice(0, filters.limit || 100);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return SAMPLE_PRODUCTS.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.featured && !p.featured) return false;
      return true;
    }).slice(0, filters.limit || 100);
  }
};

export const getProduct = async (id) => {
  try {
    const snap = await getDoc(doc(db, COL, id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return SAMPLE_PRODUCTS.find(p => p.id === id || p.slug === id) || null;
  } catch {
    return SAMPLE_PRODUCTS.find(p => p.id === id || p.slug === id) || null;
  }
};

export const addProduct = async (data, imageFiles = []) => {
  const urls = [];
  for (const file of imageFiles) {
    const r = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(r, file);
    urls.push(await getDownloadURL(r));
  }
  return addDoc(collection(db, COL), {
    ...data, images: urls, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
};

export const updateProduct = async (id, data) => {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteProduct = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
