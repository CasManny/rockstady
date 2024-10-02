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

type Props = {
    chapterId: number
}

const formSchema = z.object({
  summary: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  lessonTitle: z.string().min(10, "provide lesson title"),
});
import BookSummary from "../admin/BookSummary";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { addLessonToChapter } from "@/actions/admin-actions";

const CreateLessonForm = ({ chapterId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      lessonTitle: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await addLessonToChapter(chapterId, values.lessonTitle, values.summary)
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="lessonTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">
                  Lesson Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Lesson title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">
                  Add chapter to book
                </FormLabel>
                <FormControl>
                  <BookSummary value={field.value} setValue={field.onChange} />
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

export default CreateLessonForm;
