import type { Task } from "@/schemas/task.schema";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useTaskActions = () => {
  const { data: user } = useUser();

  // console.log({ user });

  const db = useFirestore();
  const tasksRef = collection(db, "tasks");

  const tasksQuery = query(
    tasksRef,
    where("userId", "==", user!.uid) // Filtra por el ID del usuario autenticado
  );

  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id", // 👈 Agrega el ID del documento a cada objeto
    suspense: true, // 👈 Habilita el modo suspense
  });

  // CREATE
  const createTask = async (taskData: {
    title: string;
    description?: string;
  }) => {
    const newTask = {
      ...taskData, // 👈 SPREAD OPERATOR
      completed: false, // Por defecto, una tarea nueva no está completada
      userId: user!.uid, // Asigna el ID del usuario autenticado
    };

    return await addDoc(tasksRef, newTask);
  };

  // DELETE
  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    return await deleteDoc(taskDoc);
  };

  // TOGGLE COMPLETED
  const toggleTaskCompleted = async (id: string) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error("Task not found");
    }

    const taskDoc = doc(db, "tasks", id);
    return await updateDoc(taskDoc, {
      completed: !task.completed, // Cambia el estado de completado
    });
  };

  return {
    loading: status === "loading",
    error: status === "error",
    tasks: tasks as Task[],

    // Actions
    createTask,
    deleteTask,
    toggleTaskCompleted,
  };
};
