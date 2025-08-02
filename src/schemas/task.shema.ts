export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string; // Reference to UserFirestoreSchema
}
