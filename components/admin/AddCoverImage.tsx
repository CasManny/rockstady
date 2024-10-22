"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import BookCoverUpload from '@/components/admin/BookCoverUpload'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { uploadCoverImage } from "@/actions/admin-actions";

const formSchema = z.object({
  image: z.string().min(10, "link to image must be provided"),
});

type Props = {
  coverImage: string | undefined;
  bookId: string;
};
const AddCoverImage = ({ coverImage, bookId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: coverImage,
    },
  });
  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await uploadCoverImage(values.image, bookId)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-extrabold text-2xl">Add Book coverImage</FormLabel>
              <FormControl>
                <BookCoverUpload value={field.value} onChange={field.onChange} endpoint="imageUploader" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Add book cover"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCoverImage;
