import { useTaskActions } from "@/hooks/use-task-actions";
import { cn } from "@/lib/utils";
import type { Task } from "@/schemas/task.schema";
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
  const { deleteTask, toggleTaskCompleted } = useTaskActions();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    });
  };

  const handleToggleCompleted = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompleted(task.id);
      } catch (error) {
        console.error("Error toggling task completion:", error);
        toast.error("Failed to toggle task completion");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            task.completed ? "line-through text-gray-500" : "text-gray-900"
          )}
        >
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button
            variant="outline"
            onClick={handleToggleCompleted}
            disabled={isPending}
          >
            Update
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </CardAction>
      </CardHeader>
      {task.description && <CardContent>{task.description}</CardContent>}
    </Card>
  );
};
export default ItemTask;
