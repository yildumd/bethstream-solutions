import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        // Check admin status
        try {
          const adminDoc = await getDoc(doc(db, "admins", u.uid));
          setIsAdmin(adminDoc.exists());
        } catch {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      name, email, createdAt: new Date(), role: "customer",
    });
    return cred;
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
