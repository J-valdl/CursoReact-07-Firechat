import { updateProfile } from "firebase/auth";
import { useState } from "react";

import type { AuthError } from "firebase/auth";
import { useUser } from "reactfire";
//import { useUserActions } from "./use-user-actions";

/**
 * Hook personalizado para manejar las acciones del perfil de usuario
 * Permite actualizar el displayName y photoURL del usuario autenticado
 */
export const useProfileActions = () => {
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();
  //const { createOrUpdateUser } = useUserActions();

  /**
   * Actualiza el perfil del usuario en Firebase Auth y sincroniza con Firestore
   */
  const updateUserProfile = async (profileData: {
    displayName?: string;
    photoURL?: string;
  }) => {
    setLoading(true);

    try {
      // Validar que el usuario esté autenticado
      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      // Actualizar el perfil en Firebase Auth
      await updateProfile(user, {
        displayName: profileData.displayName || user.displayName,
        photoURL: profileData.photoURL || user.photoURL,
      });

      // Sincronizar los cambios con Firestore
      //await createOrUpdateUser(user);

      // Recargar el usuario para que ReactFire detecte los cambios
      await user.reload();

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      return {
        success: false,
        error: error as AuthError,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateUserProfile,
  };
};
