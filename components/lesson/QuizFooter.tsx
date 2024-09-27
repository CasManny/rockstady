type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "completed" | "none";
    disabled?: boolean;
    lessonId?: number;
  };

const QuizFooter = ({status, disabled, lessonId, onCheck}: Props) => {
  return (
    <div>QuizFooter</div>
  )
}

export default QuizFooter