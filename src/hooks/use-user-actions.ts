import type { UserFirestore } from "@/schemas/user.schema";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export const useUserActions = () => {
  const db = useFirestore();

  const createOrUpdateUser = async (user: User) => {
    if (!user) throw new Error("Usuario no disponible");

    // Referenciar el documento del usuario en Firestore
    const userDocRef = doc(db, "users", user.uid);

    const userData: UserFirestore = {
      email: user.email || "",
      uid: user.uid,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
    };

    return await setDoc(userDocRef, userData, {
      merge: true,
    });
  };

  return {
    createOrUpdateUser,
  };
};
