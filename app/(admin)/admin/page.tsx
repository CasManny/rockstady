import BookCollections from "@/components/admin/BookCollections";
import { Button } from "@/components/ui/button";
import { getBookcollections } from "@/db/admin-queries";
import React from "react";

const AdminHome = async () => {
  const bookcollections = getBookcollections();
  const [books] = await Promise.all([bookcollections]);
  return (
    <div className="p-5">
      <div className="">
        <BookCollections books={books} />
      </div>
    </div>
  );
};

export default AdminHome;
