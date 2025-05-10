import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMovieSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all movies
  app.get("/api/movies", async (req, res) => {
    try {
      const movies = await storage.getAllMovies();
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to get a single movie by ID
  app.get("/api/movies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }
      
      const movie = await storage.getMovieById(id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.json(movie);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to get movies by type (series or movie)
  app.get("/api/movies/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      if (type !== "series" && type !== "movie") {
        return res.status(400).json({ message: "Invalid movie type" });
      }
      
      const movies = await storage.getMoviesByType(type);
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to get movies by genre
  app.get("/api/movies/genre/:genre", async (req, res) => {
    try {
      const genre = req.params.genre;
      const movies = await storage.getMoviesByGenre(genre);
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to get movies by country
  app.get("/api/movies/country/:country", async (req, res) => {
    try {
      const country = req.params.country;
      const movies = await storage.getMoviesByCountry(country);
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to get movies by year
  app.get("/api/movies/year/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      if (isNaN(year)) {
        return res.status(400).json({ message: "Invalid year" });
      }
      
      const movies = await storage.getMoviesByYear(year);
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to search movies
  app.get("/api/movies/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const movies = await storage.searchMovies(query);
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to create a new movie
  app.post("/api/movies", async (req, res) => {
    try {
      const validationResult = insertMovieSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid movie data", 
          errors: validationResult.error.errors 
        });
      }
      
      const newMovie = await storage.createMovie(validationResult.data);
      res.status(201).json(newMovie);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to update a movie
  app.patch("/api/movies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }
      
      // Validate only the provided fields
      const partialMovieSchema = insertMovieSchema.partial();
      const validationResult = partialMovieSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid movie data", 
          errors: validationResult.error.errors 
        });
      }
      
      const updatedMovie = await storage.updateMovie(id, validationResult.data);
      
      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.json(updatedMovie);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // API route to delete a movie
  app.delete("/api/movies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }
      
      const success = await storage.deleteMovie(id);
      
      if (!success) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
