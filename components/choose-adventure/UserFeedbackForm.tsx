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
import { Loader2 } from "lucide-react";
import { useFeedbackModalStore } from "@/store/feedback-modal";
import { Input } from "../ui/input";
import { createFeedback } from "@/actions/admin-actions";
import toast from "react-hot-toast";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  enjoy: z.string().min(4, "type is required"),
  newFeature: z.string(),
  change: z.string(),
  need: z.string(),
  feel: z.string(),
  confused: z.string(),
  easy: z.string(),
});
const UserFeedbackForm = () => {
  const { closeFeedbackModal } = useFeedbackModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      enjoy: "",
      newFeature: "",
      change: "",
      need: "",
      feel: "",
      confused: "",
      easy: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createFeedback(values);
    closeFeedbackModal();
    form.reset();
    toast.success("Thank you for your feedback");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enjoy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Which feature did you enjoy the most (e.g., book summaries,
                quizzes, leaderboard )
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newFeature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What features would you like to see added to make Rockstaddy
                even better
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="change"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                if you could change one thing about Rockstaddy, what would it
                be?
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="need"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                In what ways could Rockstaddy be personalized to better fit your
                needs
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Do you feel Rockstaddy could help you grow in your career or
                personal life? why?
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confused"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Was there anything about the platform that frustrated or
                confused you?
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="easy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How easy was it for you to navigate Rockstaddy and start using
                the platform?
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between flex-col gap-2 md:flex-row items-center">
          <Button onClick={() => closeFeedbackModal()}>cancel</Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "send feedback"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserFeedbackForm;
