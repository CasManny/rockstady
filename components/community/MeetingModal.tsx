import { ReactNode } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonIcon,
  buttonText,
  image,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-white px-6 py-9 text-black">
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("font-bold text-3xl leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1/80 hover:bg-blue-1 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="image" width={13} height={13} />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;