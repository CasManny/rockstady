import ChapterSummary from "@/components/chaptersLessons/ChapterSummary"
import { getChapterDetails } from "@/db/admin-queries"

type Props = {
  params: { chapterId: string}
}
const ChapterDetailsPage = async ({ params }: Props) => {
  const chapterData = getChapterDetails(parseInt(params.chapterId))
  const [chapterDetails] = await Promise.all([chapterData])
  return (
    <ChapterSummary chapter={chapterDetails} />
  )
}

export default ChapterDetailsPage