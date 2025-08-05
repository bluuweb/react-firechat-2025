import { messageZodSchema, type MessageZodSchemType } from "@/lib/zod.schemas";
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
import { useMessagesActions } from "@/hooks/user-messages-actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  const [isLoading, startTransition] = useTransition();

  const { sendMessage } = useMessagesActions(roomId);

  const form = useForm<MessageZodSchemType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: MessageZodSchemType) {
    startTransition(async () => {
      try {
        await sendMessage(values.text);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("No se pudo enviar el mensaje");
      }
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "enviando mensaje" : "enviar"}
        </Button>
      </form>
    </Form>
  );
};
export default FormMessageChat;
