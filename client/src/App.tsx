import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MovieProvider } from "./context/MovieContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "@/pages/not-found";
import { Skeleton } from "./components/Skeleton";

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const PhimBo = lazy(() => import("./pages/PhimBo"));
const PhimLe = lazy(() => import("./pages/PhimLe"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const GenreMovies = lazy(() => import("./pages/GenreMovies"));
const CountryMovies = lazy(() => import("./pages/CountryMovies"));
const YearMovies = lazy(() => import("./pages/YearMovies"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Header />
      <main className="pt-16 min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/phim-bo" component={PhimBo} />
          <Route path="/phim-le" component={PhimLe} />
          <Route path="/phim/:slug" component={MovieDetail} />
          <Route path="/tim-kiem" component={SearchResults} />
          <Route path="/the-loai/:genre" component={GenreMovies} />
          <Route path="/quoc-gia/:country" component={CountryMovies} />
          <Route path="/nam/:year" component={YearMovies} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </MovieProvider>
    </QueryClientProvider>
  );
}

export default App;
