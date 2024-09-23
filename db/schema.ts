import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: text('id').primaryKey().notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publish: boolean("publish").default(false),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const booksRelations = relations(books, ({ many }) => ({
  chapters: many(chapters),
  userProgress: many(userProgress),
}));

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  chapterTitle: text("chapter_title").notNull(),
  order: serial("order").notNull(),
});

export const chaptersRelations = relations(chapters, ({ many, one }) => ({
  book: one(books, {
    fields: [chapters.bookId],
    references: [books.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id")
    .references(() => chapters.id)
    .notNull(),
  lessonTitle: text("lesson_title").notNull(),
  introduction: text("introductiion").notNull(),
  mainIdea: text("main_idea"),
  supportingIdea: text("supporting_idea"),
  summary: text("summary"),
  infographics: text("info_graphics"),
  order: serial("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [lessons.chapterId],
    references: [chapters.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "TYPEIT"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .notNull()
    .references(() => lessons.id),
  question: text("question").notNull(),
  type: challengesEnum("type").notNull(),
  order: serial("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengesOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengesOptions = pgTable("challengesOption", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .notNull()
    .references(() => challenges.id, { onDelete: 'cascade'}),
  order: serial("order").notNull(),
  isCorrect: boolean("is_correct"),
  textOption: text("text_option"),
  info_graphics: text("info_graphics"),
});

export const challengesOptionsRelations = relations(
  challengesOptions,
  ({ one, many }) => ({
    challenge: one(challenges, {
      fields: [challengesOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .notNull()
    .references(() => challenges.id, { onDelete: 'cascade'}),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelation = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userImage: text("user_image").notNull(),
  activeBookId: text("active_book_id").notNull().references(() => books.id, { onDelete: "cascade"}),
  hearts: integer("hearts").default(5).notNull(),
  points: integer("points").notNull().default(0),
});

export const userProgressRelation = relations(userProgress, ({ one }) => ({
  activeBook: one(books, {
    fields: [userProgress.activeBookId],
    references: [books.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeroidEnd: timestamp("stripe_current_period_end").notNull(),
});
