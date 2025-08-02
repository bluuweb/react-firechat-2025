import { useTaskActions } from "@/hooks/use-task-actions";
import { cn } from "@/lib/utils";
import type { Task } from "@/schemas/task.shema";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const { deleteTask, toggleTaskCompletion } = useTaskActions();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error deleting task");
      }
    });
  };

  const handleToggleCompletion = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error toggling task completion");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            task.completed ? "line-through text-gray-500" : ""
          )}
        >
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button
            variant={"outline"}
            onClick={handleToggleCompletion}
            disabled={isPending}
          >
            Update
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </CardAction>
        {task.description && <CardContent>{task.description}</CardContent>}
      </CardHeader>
    </Card>
  );
};
export default ItemTask;
