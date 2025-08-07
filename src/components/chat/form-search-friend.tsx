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

      // console.log(response);
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
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="shadcn@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"outline"}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Buscando Friend..." : "Buscar"}
        </Button>
      </form>
    </Form>
  );
};
export default FormSearchFriend;
