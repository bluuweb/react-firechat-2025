import { useTaskActions } from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const ListTask = () => {
  const { tasks } = useTaskActions();

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <ItemTask
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};
export default ListTask;
