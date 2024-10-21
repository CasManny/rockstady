import ReadSummary from "../lessons-challenges/ReadSummary";

type Props = {
  summary: string;
  lessonTitle: string;
};
const LessonSummary = ({ summary, lessonTitle }: Props) => {
  return <div className="container mx-auto w-full md:max-w-[800px] p-10 mt-2 mb-4">
    <h1 className="text-2xl sm:text-4xl font-semibold my-2">{ lessonTitle}</h1>
    <ReadSummary value={summary} />
  </div>;
};

export default LessonSummary;
