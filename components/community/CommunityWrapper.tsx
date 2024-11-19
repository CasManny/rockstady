import React from 'react'
import { useToggle } from "react-use";
import { Button } from '../ui/button';
import { FaCaretDown } from "react-icons/fa";
import { cn } from '@/lib/utils';

interface CommunityWrapperProps {
    children: React.ReactNode;
    label: string;
  }

const CommunityWrapper = ({children, label}: CommunityWrapperProps) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center gap-2 px-3.5 group">
        <Button
        //   variant={"transparent"}
          className="p-0.5 text-sm text-black shrink-0 size-6"
          onClick={toggle}
              >
                  
          <FaCaretDown className={cn('size-4 transition-transform', on && '-rotate-90')} />
        </Button>
        <Button
        //   variant={"transparent"}
          size={"sm"}
          className="group px-1.5 text-sm text-black font-bold h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>

     
      </div>
      { on && children}
    </div>
  )
}

export default CommunityWrapper