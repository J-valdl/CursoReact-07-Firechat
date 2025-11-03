import type { UserFirestoreSchema } from "@/schemas/user.schema";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export const useUserActions = () => {
  const db = useFirestore();

  const createOrUpdateUser = async (user: User) => {
    // Validar que el usuario esté disponible
    if (!user) {
      throw new Error("Usuario no disponible");
    }

    // Referencia al documento del usuario en Firestore
    const userDocRef = doc(db, "users", user.uid);

    // Datos del usuario para guardar en Firestore
    const userData: UserFirestoreSchema = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
    };

    // Crear o actualizar el documento (merge: true preserva campos existentes)
    return await setDoc(userDocRef, userData, {
      merge: true,
    });
  };

  return {
    createOrUpdateUser,
  };
};
