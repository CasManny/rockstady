import { books, lessons } from "@/db/schema"
import { LineChart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
    book: typeof books.$inferSelect,
    lessons: typeof lessons.$inferSelect[] | undefined
}
const SummaryCard = ({book, lessons}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-5">
        <div className="">
          <Image
            src="/mastery.jpg"
            alt={book?.title!}
            width={500}
            height={500}
            className="h-[300px] w-[300px] rounded-md"
          />
        </div>
        <div className="p-5">
          <h1 className=" text-neutral-700 font-bold text-lg md:text-xl">
            BooK: <span>{book?.title}</span>
          </h1>
          <h3 className="my-2 text-neutral-500 text-sm">{book?.subTitle}</h3>
             <p className="">{book?.description}</p>
              {lessons?.length === 0 && <h1 className="mt-2 text-xl font-extrabold">No Lesson added to this Level yet </h1>}
              {lessons && (
                  <div className="flex flex-col">
                      <h1 className="text-lg font-semibold my-2">Lessons</h1>
                      {lessons?.map((lesson, index) => (
                          <Link href={`/admin/lessons/${lesson.id}`} className="flex gap-2 items-center mb-2 bg-rs-yellow/15 p-3 rounded-md">
                              <LineChart />
                              <h1>{ lesson.lessonTitle}</h1>
                          </Link>
                      ))}
                  </div>
              )}
        </div>
      </div>
  )
}

export default SummaryCard