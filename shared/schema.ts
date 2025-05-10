import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  originalTitle: text("original_title"),
  posterUrl: text("poster_url").notNull(),
  backdropUrl: text("backdrop_url"),
  overview: text("overview").notNull(),
  releaseYear: integer("release_year").notNull(),
  rating: integer("rating"),
  duration: integer("duration"),
  type: text("type").notNull(), // 'series' or 'movie'
  genres: text("genres").array(),
  countries: text("countries").array(),
  trailerUrl: text("trailer_url"),
  episodeCount: integer("episode_count"),
  currentEpisode: integer("current_episode"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Movie = typeof movies.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
