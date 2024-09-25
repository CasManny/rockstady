type Props = {
    title: string
}
const ChapterBanner = ({title}: Props) => {
  return (
      <div className="p-5 bg-rs-yellow text-white rounded-xl font-extrabold">
          <h1 className="capitalize">{ title}</h1>
      </div>
  )
}

export default ChapterBanner