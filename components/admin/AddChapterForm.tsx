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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useChapterModalStore } from "@/store/add-chapter-modal";
import { addChapterToBook } from "@/actions/admin-actions";

const formSchema = z.object({
  level: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

type Props = {
    bookId: string
}
const AddChapterForm = ({bookId}: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await addChapterToBook(bookId, values.level)
        form.reset()
  }
  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">Add chapter to book</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chapter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Add Chapter"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddChapterForm;
