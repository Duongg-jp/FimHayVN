import express from "express";
import { createServer } from "http";
import cors from "cors";
import session from "express-session";
import path from "path";
import { registerRoutes } from "./routes";
import { log } from "./vite";

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === "development";

// Middleware
app.use(express.json());
app.use(cors({
  origin: isDev ? ["http://localhost:5173", "http://localhost:3000"] : true,
  credentials: true
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "movie-website-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: !isDev,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }
}));

// Register API routes
registerRoutes(app)
  .then(server => {
    // Setup Vite dev server in development mode
    if (isDev) {
      import("./vite").then(({ setupVite }) => {
        setupVite(app, server);
      });
    } else {
      // Serve static files in production
      const staticPath = path.join(__dirname, "../dist");
      app.use(express.static(staticPath));
      
      // Handle SPA routes - always return index.html for any non-API path
      app.get("*", (req, res) => {
        // Skip API paths
        if (req.path.startsWith("/api")) return;
        
        res.sendFile(path.join(staticPath, "index.html"));
      });
    }

    // Error handling middleware
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
      });
    });

    // Start the server
    server.listen({
      port,
      host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
    }, () => {
      log(`serving on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

// Handle termination signals
process.on("SIGINT", () => {
  log("Server shutting down...");
  process.exit(0);
});

export { app };