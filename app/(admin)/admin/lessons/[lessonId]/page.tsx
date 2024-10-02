import LessonDetails from '@/components/lessons-challenges/LessonDetails'
import { getLessonDetails } from '@/db/admin-queries'
type Props = {
    params: {lessonId: string}
}
const LessonPage = async ({ params }: Props) => {
    const lessonData = getLessonDetails(parseInt(params.lessonId))

    const [lesson] = await Promise.all([lessonData])
    if (!lesson) return 
  return (
   <LessonDetails lesson={lesson} />
  )
}

export default LessonPage