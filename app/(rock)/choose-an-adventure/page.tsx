import BookList from "@/components/choose-adventure/BookList"
import GetUserFeedback from "@/components/choose-adventure/GetUserFeedback"
import { getActiveUserProgress, getBooks } from "@/db/queries"
import { TriangleAlert } from "lucide-react"

const userDashboard = async () => {
  const booksData = getBooks()
  const activeBookUserProgressData = getActiveUserProgress()


  const [books, activeBook] = await Promise.all([booksData, activeBookUserProgressData])

  if (books.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <TriangleAlert className="size-9" />
        <h1 className="text-4xl text-black font-semibold">No book uploaded</h1>
      </div>
    )
  }
  return (
    <div className="h-full max-w-[912px] px-3 pt-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Choose a Book to start your Journey</h1>
      <BookList books={books} activeBookId={activeBook?.activeBookId} />
      <GetUserFeedback position />
  </div>
  )
}

export default userDashboard