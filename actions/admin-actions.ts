"use server"

import db from "@/db/drizzle";
import { books } from "@/db/schema";
import { revalidatePath } from "next/cache";

interface IAddBook {
    id: string,
    title: string;
    subtitle: string | undefined,
    author: string;
    description: string;
}

export const addBook = async ({id, title, subtitle, author, description}: IAddBook) => {
    const newBook = await db.insert(books).values({
        id,
        title,
        description,
        subTitle: subtitle,
        author
    }).returning({bookId: books.id})

    revalidatePath("/choose-an-adventure")
    revalidatePath('/admin')

    return newBook
}