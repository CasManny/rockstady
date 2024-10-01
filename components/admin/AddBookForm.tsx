"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useBookModalStore } from "@/store/add-book-modal";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { generatebookCode } from "@/constants";
import { addBook } from "@/actions/admin-actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  subtitle: z.string().optional(),
  author: z.string().min(2, "Author must be provided"),
  desc: z.string().min(10, "Provide a breif summary for book"),
});

const AddBookForm = () => {
  const { closeBookModal } = useBookModalStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      author: "",
      desc: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const code = generatebookCode();
    const newBook = await addBook({
      id: code,
      title: values.title,
      subtitle: values.subtitle,
      author: values.author,
      description: values.desc,
    });
    router.push(`/admin/books/${newBook[0].bookId}`);
    closeBookModal();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter book name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Enter book subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter book Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter brief summary of book"
                  className="resize-none h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="button" onClick={() => closeBookModal()}>Cancel</Button>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Add book"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBookForm;
