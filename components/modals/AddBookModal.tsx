"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBookModalStore } from "@/store/add-book-modal";
import AddBookForm from "../admin/AddBookForm";

const AddBookModal = () => {
  const { isOpen, closeBookModal } = useBookModalStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={closeBookModal}>
      <AlertDialogContent className="bg-white w-full text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Book to collection</AlertDialogTitle>
        </AlertDialogHeader>
        <AddBookForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddBookModal;
