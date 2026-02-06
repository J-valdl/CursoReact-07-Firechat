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
import {
  EmailFriendZodSchema,
  type EmailFriendZodSchemaType,
} from "@/lib/zod.schema";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const { findOrCreateRoom } = useRoomActions();
  const [isPending, startTransition] = useTransition();

  const form = useForm<EmailFriendZodSchemaType>({
    resolver: zodResolver(EmailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: EmailFriendZodSchemaType) {
    startTransition(async () => {
      const res = await findOrCreateRoom(values.email);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      handleClickRoomId(res.roomId);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="friend@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Buscando..." : "Buscar"}
        </Button>
      </form>
    </Form>
  );
};

export default FormSearchFriend;
