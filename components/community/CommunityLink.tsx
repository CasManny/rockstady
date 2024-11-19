import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

interface CommunityLinkProps {
    label: string;
    id: string,
    icon: LucideIcon | IconType

}

const CommunityLink = ({label, id, icon: Icon}: CommunityLinkProps) => {
  return (
    <Button asChild size={'sm'} className={cn('my-2')}>
            <Link href={`/community/${id}`}>
                <Icon className="size-3.5 mr-1 shrink-0" />
                <span className="text-sm truncate">{ label}</span>
            </Link>
      </Button>
  )
}

export default CommunityLink