import { StreamVideoProvider } from '@/providers/StreamClientProvider'

const CommunityLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <main>
          <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}

export default CommunityLayout