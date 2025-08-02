import type { Task } from "@/schemas/task.shema";
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

  if (!user) {
    throw new Error("User not authenticated");
  }

  const db = useFirestore();
  const taskCollectionRef = collection(db, "tasks");

  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  // CREATE
  const createTask = async (data: { title: string; description?: string }) => {
    const newTask = {
      ...data,
      completed: false,
      userId: user!.uid,
    };

    return await addDoc(taskCollectionRef, newTask);
  };

  //  DELETE
  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc);
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const taskDoc = doc(db, "tasks", taskId);

    return await updateDoc(taskDoc, {
      completed: !task.completed,
    });
  };

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskCompletion,
  };
};
