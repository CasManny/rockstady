"use client"
import { books, chapters, lessons } from "@/db/schema"
import { Button } from "../ui/button"
import { ArrowBigLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import SummaryCard from "./SummaryCard"
import { useState } from "react"
import CreateLessonForm from "./CreateLessonForm"

type Props = {
    chapter: (typeof chapters.$inferSelect & {
        book: typeof books.$inferSelect,
        lessons: typeof lessons.$inferSelect[]
    }) | undefined
}
const ChapterSummary = ({ chapter }: Props) => {
    const router = useRouter()
    const [openEditor, setOpenEditor] = useState(false)
    const handleEditor = () => {
        setOpenEditor((prev) => !prev)
    }
  return (
      <div className="p-5">
          <div className="flex justify-between items-center">
              <Button onClick={() => router.back()}><ArrowBigLeft /> Back</Button>
              <Button onClick={handleEditor}>
                  {openEditor ? "close Editor" : "Add a Lesson"}
              </Button>
          </div>
          <h1 className="mt-5 text-xl text-neutral-700 font-extrabold">Level: { chapter?.chapterTitle}</h1>
          <SummaryCard book={chapter?.book!} lessons={chapter?.lessons} />
          {openEditor && <CreateLessonForm chapterId={chapter?.id!} />}
    </div>
  )
}

export default ChapterSummary