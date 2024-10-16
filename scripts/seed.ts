import { config } from "dotenv";
config({ path: ".env.local" }); //
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding process started...");
      await db.delete(schema.books)
    await db.delete(schema.chapters);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);
    await db.delete(schema.feedbacks)

    await db.insert(schema.books).values([
      {
        id: "1",
        title: "Mastery",
        subTitle: "unlocking the strategy of masters",
        author: "Robert Greene",
        description:
          "Learning how to become a master in a particular skill, moving throught phases of apprentice to masters",
      },
   
    ]);

    await db.insert(schema.chapters).values([
      {
        id: 1,
        bookId: "1",
        chapterTitle: "Introduction",
        order: 1,
      }
    
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Introduction to Programming",
        summary:"In this lesson, we covered the basic concepts of programming, including variables, data types, and control structures.",
        order: 1,
      },
      {
        id: 2,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Variables and Data Types",
        summary: "This lesson explains how to declare variables and the importance of data types in programming.",
        order: 2
      },
      {
        id: 3,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Control Structures",
        summary: "In this lesson, we discussed if-else statements, switch cases, and loops such as for and while.",
        order: 3,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Assuming this lesson exists
        question: "What is a variable?",
        type: "SELECT", // Assuming this is a valid type in your challengesEnum
        order: 1,
      },
      {
        id: 2,
        lessonId: 1, // Assuming this lesson exists
        quote: "variables store data",
        type: "TYPEIT", // Assuming this is a valid type in your challengesEnum
        order: 2,
      },
      {
        id: 3,
        lessonId: 1, // Assuming this lesson exists
        question: "What are data types?",
        type: "SELECT",
        order: 3,
      },
      {
        id: 4,
        lessonId: 1, // Assuming this lesson exists
        question: "who is cas?",
        type: "SELECT",
        order: 3,
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 1,
        isCorrect: true,
        textOption: "variables are used to store values",
        order: 1,
      },
      {
        challengeId: 1,
        isCorrect: false,
        textOption: "variables are for jokes",
        order: 2,
      },
      {
        challengeId: 1,
        isCorrect: false,
        textOption: "variables are used by fools",
        order: 3
      },
      {
        challengeId: 1,
        isCorrect: false,
        textOption: "variables are used by beginners in the industry",
        order: 4,
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 3,
        isCorrect: false,
        textOption: "data types are nonsense",
        order: 1,
      },
      {
        challengeId: 3,
        isCorrect: true,
        textOption: "data types are different ways data is stored",
        order: 2
      },
      {
        challengeId: 3,
        isCorrect: false,
        textOption: "data types are for children",
        order: 3,
      },
      {
        challengeId: 3,
        isCorrect: false,
        textOption: "data types are a joke",
        order: 4
      },
    ]);
    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 4,
        isCorrect: false,
        textOption: "mumu",
        order: 1,
      },
      {
        challengeId: 4,
        isCorrect: true,
        textOption: "developer",
        order: 2
      },
      {
        challengeId: 4,
        isCorrect: false,
        textOption: "pig",
        order: 3,
      },
      {
        challengeId: 4,
        isCorrect: false,
        textOption: "elephant",
        order: 4
      },
    ]);

    console.log("Seeding process ended...");
  } catch (error) {
    console.log(error);
  }
};

main();
