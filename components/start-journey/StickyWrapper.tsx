type Props = {
    children: React.ReactNode,

} 
const StickyWrapper = ({children}: Props) => {
  return (
      <div className="hidden lg:block w-[200px]">
          {/* <div className="min-h-[calc(100vh-48px)] flex flex-col gap-y-4"> */}
              {children}
          {/* </div> */}
    </div>
  )
}

export default StickyWrapper