
import { Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import UserSidebar from '@/components/choose-adventure/UserSidebar'
const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger><Menu className='text-white' /></SheetTrigger>
            <SheetContent className='p-0 z-[100] bg-white text-black' side={'left'}>
                <UserSidebar />
            </SheetContent>
      </Sheet>
  )
}

export default MobileSidebar