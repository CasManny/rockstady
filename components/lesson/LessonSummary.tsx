type Props = {
  summary: string;
};
const LessonSummary = ({ summary }: Props) => {
  return <div className="container mx-auto w-full md:max-w-[800px] p-10 mt-2 mb-4">{summary}</div>;
};

export default LessonSummary;
