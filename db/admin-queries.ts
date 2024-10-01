import { cache } from "react";
import db from "./drizzle";

export const getBookcollections = cache(async () => {
    const books = await db.query.books.findMany({
        columns: {
            title: true,
            author: true,
            imageUrl: true,
            id: true
        }
    })
    return books
})