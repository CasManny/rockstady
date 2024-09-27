import QuizHeader from "./QuizHeader"

type Props = {
    initialPercentage: number,
    initialHearts: number;
}

const BookQuiz = ({initialPercentage, initialHearts}: Props) => {
  return (
      <div>
          <QuizHeader hearts={initialHearts} percentage={initialPercentage}  />
    </div>
  )
}

export default BookQuiz