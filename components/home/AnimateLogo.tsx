import { Mountain } from 'lucide-react'
const AnimateLogo = () => {
  return (
    <div className="relative w-32 h-32 mb-8">
    <div className="absolute inset-0 rounded-full bg-rs-yellow/25 opacity-20 animate-pulse"></div>
    <div className="absolute inset-2 rounded-full bg-rs-yellow/40 opacity-40 animate-ping"></div>
    <div className="absolute inset-4 rounded-full bg-rs-yellow/20 opacity-60 animate-spin"></div>
    {/* <div className="absolute inset-6 rounded-full bg-green-200 opacity-80 animate-bounce"></div> */}
    <Mountain className="absolute inset-0 m-auto h-16 w-16 text-rs-yellow animate-pulse" />
  </div>
  )
}

export default AnimateLogo