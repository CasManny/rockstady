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

    console.log("Seeding process ended...");
  } catch (error) {
    console.log(error);
  }
};

main();
