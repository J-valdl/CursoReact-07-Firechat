import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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
import { useProfileActions } from "@/hooks/use-profile-actions";
import type { User } from "firebase/auth";
import { toast } from "sonner";

const profileFormSchema = z.object({
  displayName: z.string().min(1, "Display name is required").optional(),
  photoURL: z.url("Invalid URL format").optional(),
});

type ProfileFormSchemaType = z.infer<typeof profileFormSchema>;

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user.photoURL || undefined,
    },
  });

  const onSubmit = async (data: ProfileFormSchemaType) => {
    const result = await updateUserProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    });

    if (result?.error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", result.error);
    } else {
      toast.success("Profile updated successfully");
      console.log("Profile updated successfully");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="bluuweb" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};
export default FormProfile;
