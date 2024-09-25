type Props = {
    children: React.ReactNode,

} 
const StickyWrapper = ({children}: Props) => {
  return (
      <div className="hidden lg:block w-[200px] h-full sticky top-0">
          <div className=" flex flex-col gap-y-4">
              {children}
          </div>
    </div>
  )
}

export default StickyWrapper