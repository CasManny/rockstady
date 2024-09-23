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
    await db.delete(schema.books), await db.delete(schema.chapters);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.books).values([
      {
        id: "1",
        title: "Mastery",
        author: "Robert Greene",
        description:
          "Learning how to become a master in a particular skill, moving throught phases of apprentice to masters",
      },
      {
        id: "2",
        title: "Unlock it",
        author: "Dan Lok",
        description:
          "Exposing the strength behind self moltivation and determination in achieveing success at different level in health, buisiness and relationship",
      },
      {
        id: "3",
        title: "Hooked",
        author: "Nir Eyal",
        description: "How to build eye catching product for your users",
      },
      {
        id: "4",
        title: "Million Dollar Weekend",
        author: "Noah Kahan",
        description:
          "Getting knowledge on the easiest way to launch a product within a week and make millions of dollar",
      },
    ]);

    await db.insert(schema.chapters).values([
      {
        id: 1,
        bookId: "1",
        chapterTitle: "Introduction",
      },
      {
        id: 2,
        bookId: "1",
        chapterTitle: "First Chapter",
      },
      {
        id: 3,
        bookId: "1",
        chapterTitle: "second Chapter",
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Introduction to Programming",
        introduction: "This lesson introduces the basics of programming.",
        mainIdea:
          "Programming is the process of creating a set of instructions for a computer to follow.",
        supportingIdea:
          "Understanding programming fundamentals is essential for software development.",
        summary:
          "In this lesson, we covered the basic concepts of programming, including variables, data types, and control structures.",
      },
      {
        id: 2,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Variables and Data Types",
        introduction:
          "Learn about variables and different data types in programming.",
        mainIdea: "Variables are used to store data values.",
        supportingIdea:
          "Data types define the type of data that can be stored in a variable.",
        summary:
          "This lesson explains how to declare variables and the importance of data types in programming.",
      },
      {
        id: 3,
        chapterId: 1, // Assuming this chapter exists
        lessonTitle: "Control Structures",
        introduction:
          "Control structures allow you to dictate the flow of your program.",
        mainIdea:
          "Control structures include conditional statements and loops.",
        supportingIdea:
          "They are essential for making decisions in code execution.",
        summary:
          "In this lesson, we discussed if-else statements, switch cases, and loops such as for and while.",
        infographics: "url_to_infographic_3.png",
        order: 1,
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
        question: "Explain the difference between local and global variables.",
        type: "TYPEIT", // Assuming this is a valid type in your challengesEnum
        order: 2,
      },
      {
        id: 3,
    lessonId: 1, // Assuming this lesson exists
    question: "What are data types?",
    type: "SELECT",
    order: 1,
      },
    ]);
      
      await db.insert(schema.challengesOptions).values([
          {
              challengeId: 1,
              isCorrect: true,
              textOption: "variables are used to store values"
          },
          {
              challengeId: 1,
              isCorrect: false,
              textOption: "variables are for jokes"
          },
          {
              challengeId: 1,
              isCorrect: false,
              textOption: "variables are used by fools",
              
          },
          {
              challengeId: 1,
              isCorrect: false,
              textOption: "variables are used by beginners in the industry",

          }
      ])
      await db.insert(schema.challengesOptions).values([
          {
              challengeId: 2,
              textOption: "Explain the difference between local and global variables.",

          }
      ])

      await db.insert(schema.challengesOptions).values([
          {
              challengeId: 3,
              isCorrect: false,
              textOption: "data types are nonsense"
          },
          {
              challengeId: 3,
              isCorrect: true,
              textOption: "data types are different ways data is stored"
          },
          {
              challengeId: 3,
              isCorrect: false,
              textOption: "data types are for children"
          },
          {
              challengeId: 3,
              isCorrect: false,
              textOption: "data types are a joke"
          }
      ])

    console.log("Seeding process elnded...");
  } catch (error) {
    console.log(error);
  }
};

main();
