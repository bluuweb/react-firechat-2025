import {
  emailFriendZodSchema,
  type EmailFriendZodSchema,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRoomActions } from "@/hooks/use-room-actions";
import { Search } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const { findOrCreateRoom } = useRoomActions();

  const form = useForm<EmailFriendZodSchema>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: EmailFriendZodSchema) {
    startTransition(async () => {
      const response = await findOrCreateRoom(values.email);

      if (response.success) {
        handleClickRoomId(response.roomId);
        toast.success("Friend encontrado, comienza a chatear");
        form.reset();
        return;
      }

      toast.error(response.message);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Buscar por email..."
                  className="h-9 bg-slate-50 border-slate-200 focus:border-blue-300 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          size="sm"
          disabled={isLoading || !form.watch("email")?.trim()}
          className="h-9 w-9 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormSearchFriend;
