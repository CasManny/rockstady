"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateClassModal } from "@/store/create-class-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateClassModal = () => {
  const { isOpen, close: closeCreateClassModal } = useCreateClassModal();
  return (
    <Dialog open={isOpen} onOpenChange={closeCreateClassModal}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Create a Community!</DialogTitle>
          <Input placeholder="community name" className="my-2 p-5" />
          <Button className="w-full bg-blue-1/80 text-white hover:bg-blue-1">Create Class</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
