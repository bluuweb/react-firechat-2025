import FormTask from "@/components/tasks/form-task";
import ListTask from "@/components/tasks/list-task";
import { Suspense } from "react";

const TasksPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>

      <FormTask />

      <Suspense fallback={<div>Loading tasks...</div>}>
        <ListTask />
      </Suspense>
    </div>
  );
};
export default TasksPage;
