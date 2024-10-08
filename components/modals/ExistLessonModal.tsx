"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useExistModalStore } from "@/store/use-exit-modal";

const ExitModal = () => {
    const { isOpen, close} = useExistModalStore()
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/mascot_sad.svg"}
              alt="mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center text-black font-bold text-2xl">
            Wait, don't go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You're about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4 ">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size="lg"
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant={"dangerOutline"}
              className="w-full"
              size="lg"
              onClick={() => {
                close();
                router.push("/start-journey");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
