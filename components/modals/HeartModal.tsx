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
import { useHeartModalStore } from "@/store/heart-modal";

const HeartModal = () => {
  const { isOpen, closeHeartModal } = useHeartModalStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const onClick = () => {
    close();
    router.push("/store");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={closeHeartModal}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/mascot_bad.svg"}
              alt="mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center text-black font-bold text-2xl">
            You Ran out of heart
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts, or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4 ">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size="lg"
              onClick={onClick}
            >
              Get Unlimited Hearts
            </Button>
            <Button
              variant={"primaryOutline"}
              className="w-full"
              size="lg"
              onClick={close}
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartModal;
