type Props = {
    children: React.ReactNode
}
const FeedWrapper = ({children}: Props) => {
  return (
      <div className="flex-1">
          {children}
    </div>
  )
}

export default FeedWrapper