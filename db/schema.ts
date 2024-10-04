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
  id: text('id').primaryKey(),
  title: text("title").notNull(),
  subTitle: text("sub_title"),
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
  bookId: text("book_id").references(() => books.id, { onDelete: "cascade" }).notNull(),
  chapterTitle: text("chapter_title").notNull(),
  order: integer('order').notNull(),
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
  chapterId: integer("chapter_id").references(() => chapters.id, { onDelete: "cascade"}).notNull(),
  lessonTitle: text("lesson_title").notNull(),
  summary: text("summary").notNull(),
  infographics: text("info_graphics"),
  order: integer("order").notNull()
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
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: 'cascade'}).notNull(),
  question: text("question"),
  quote: text('quote'),
  type: text("type").notNull(),
  order: integer("order").notNull(),
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
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: 'cascade'}).notNull(),
  order: integer("order").notNull(),
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
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: 'cascade'}).notNull(),
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
  userName: text("user_name"),
  userImage: text("user_image").default('/mascot.svg'),
  activeBookId: text("active_book_id").references(() => books.id, { onDelete: "cascade"}).notNull(),
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
  stripeCustomerId: text("stripe_customer_id").unique().notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeroidEnd: timestamp("stripe_current_period_end").notNull(),
});

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  newFeature: text('new_feature'),
  change: text('change'),
  need: text('need'),
  feel: text('feel'),
  confused: text('confused'),
  easy: text('easy'),
  enjoy: text('enjoy')
})
