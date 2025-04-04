
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardProvider } from "@/context/DashboardContext";

import Index from "./pages/Index";
import WeatherDetailPage from "./pages/WeatherDetailPage";
import CryptoDetailPage from "./pages/CryptoDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DashboardProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weather/:cityId" element={<WeatherDetailPage />} />
            <Route path="/crypto/:cryptoId" element={<CryptoDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
