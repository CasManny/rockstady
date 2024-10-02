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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { addChallenge } from "@/actions/admin-actions";
import { useChallengeModalStore } from "@/store/add-challenge-modal";

const formSchema = z.object({
  question: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  type: z.string().min(4, "type is required"),
  quote: z.string(),
});
const LessonChallengeForm = ({ lessonId }: { lessonId: number }) => {
  const { closeChallengeModal } = useChallengeModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      type: "",
      quote: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
      await addChallenge(lessonId, values.question, values.type, values.quote);
    //   form.reset()
  }
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold">Set Quiz questions</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Quote</FormLabel>
                <FormControl>
                  <Input placeholder="quote" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select challenge type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SELECT">SELECT</SelectItem>
                    <SelectItem value="TYPEIT">TYPEIT</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col my-5">
            <p className="p-2 font-semibold">
              Note: <code>Quote goes with Type: TYPEIT</code> while{" "}
              <code>Question goes with type: SELECT</code>
            </p>
            <div className="flex justify-between items-center">
              <Button onClick={() => closeChallengeModal()}>cancel</Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Add Quiz question"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LessonChallengeForm;
