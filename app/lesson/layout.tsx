type Props = {
    children: React.ReactNode
}
const LessonLayout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
      </div>
  )
}

export default LessonLayout