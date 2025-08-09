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
import { Send } from "lucide-react";
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
        className="flex gap-2 items-end"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Escribe tu mensaje..."
                  className="resize-none border-2 focus:border-blue-300 rounded-full px-4 py-2 bg-slate-50 focus:bg-white transition-colors"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading || !form.watch("text")?.trim()}
          size="lg"
          className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};
export default FormMessageChat;
