import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripPlannerProvider } from "./hooks/useTripPlanner";
import Header from "./components/Header";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import PlanTrip from "./pages/PlanTrip";
import Archives from "./pages/Archives";
import Events from "./pages/Events";
import Journey from "./pages/Journey";
import PostTrip from "./pages/PostTrip";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TripPlannerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/plan-trip" element={<PlanTrip />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/events" element={<Events />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/post-trip" element={<PostTrip />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TripPlannerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
