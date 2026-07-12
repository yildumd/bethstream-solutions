import { db } from "../firebase/config";
import {
  collection, getDocs, getDoc, doc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, serverTimestamp,
} from "firebase/firestore";
import { uploadImages } from "./uploadService";
import { SAMPLE_PRODUCTS } from "../data/products";

const COL = "products";

export const getProducts = async (filters = {}) => {
  try {
    const constraints = [];
    if (filters.category) constraints.push(where("category", "==", filters.category));
    if (filters.featured) constraints.push(where("featured", "==", true));
    constraints.push(orderBy("createdAt", "desc"));
    if (filters.limit) constraints.push(limit(filters.limit));

    const q    = query(collection(db, COL), ...constraints);
    const snap = await getDocs(q);

    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    const simpleConstraints = [];
    if (filters.category) simpleConstraints.push(where("category", "==", filters.category));
    if (filters.featured) simpleConstraints.push(where("featured", "==", true));

    const q2    = query(collection(db, COL), ...simpleConstraints);
    const snap2 = await getDocs(q2);

    if (!snap2.empty) {
      let results = snap2.docs.map(d => ({ id: d.id, ...d.data() }));
      if (filters.limit) results = results.slice(0, filters.limit);
      return results;
    }

    return SAMPLE_PRODUCTS
      .filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.featured && !p.featured) return false;
        return true;
      })
      .slice(0, filters.limit || 100);

  } catch (err) {
    console.warn("Firestore query failed, using samples:", err.message);
    return SAMPLE_PRODUCTS
      .filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.featured && !p.featured) return false;
        return true;
      })
      .slice(0, filters.limit || 100);
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
  let imageUrls = data.images || [];
  if (imageFiles.length > 0) {
    const uploaded = await uploadImages(imageFiles);
    imageUrls = [...imageUrls, ...uploaded];
  }
  return addDoc(collection(db, COL), {
    ...data,
    images:    imageUrls,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateProduct = async (id, data, imageFiles = []) => {
  let imageUrls = data.images || [];
  if (imageFiles && imageFiles.length > 0) {
    const uploaded = await uploadImages(imageFiles);
    imageUrls = [...imageUrls, ...uploaded];
  }
  return updateDoc(doc(db, COL, id), {
    ...data,
    images:    imageUrls,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id) => {
  return deleteDoc(doc(db, COL, id));
};