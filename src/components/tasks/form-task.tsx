import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTaskActions } from "@/hooks/use-task-actions";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const FormTask = () => {
  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();

  const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: TaskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Failed to create task");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Escribe el título de la tarea..."
                  className="bg-slate-50 border-slate-200 focus:border-blue-300 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe la tarea..."
                  className="bg-slate-50 border-slate-200 focus:border-blue-300 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Crear Tarea
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FormTask;
