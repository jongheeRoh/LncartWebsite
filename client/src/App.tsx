import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Schedule from "@/pages/schedule";
import Notices from "@/pages/notices-new";
import NoticeDetail from "@/pages/notice-detail-clean";
import Gallery from "@/pages/gallery";
import GalleryWrite from "@/pages/gallery-write";
import Entrance from "@/pages/entrance";
import MiddleSchool from "@/pages/middle-school";
import HighSchool from "@/pages/high-school";
import MiddleSchoolDetail from "@/pages/middle-school-detail";
import HighSchoolDetail from "@/pages/high-school-detail";
import MiddleSchoolEntrance from "@/pages/middle-school-entrance";
import HighSchoolEntrance from "@/pages/high-school-entrance";
import MiddleSchoolRoadmap from "@/pages/middle-school-roadmap";
import HighSchoolRoadmap from "@/pages/high-school-roadmap";
import Directions from "@/pages/directions";
import GalleryDetail from "@/pages/gallery-detail";
import Admin from "@/pages/admin";
import AdminRoadmap from "@/pages/admin-roadmap";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <Switch>
      {/* Detail pages without navbar/footer */}
      <Route path="/middle-school/:id" component={MiddleSchoolDetail} />
      <Route path="/high-school/:id" component={HighSchoolDetail} />
      <Route path="/notices/:id" component={NoticeDetail} />
      <Route path="/gallery/:id" component={GalleryDetail} />
      
      {/* Regular pages with navbar/footer */}
      <Route>
        <>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/notices" component={Notices} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/entrance" component={Entrance} />
            <Route path="/entrance/middle-school" component={MiddleSchoolEntrance} />
            <Route path="/entrance/high-school" component={HighSchoolEntrance} />
            <Route path="/middle-school-roadmap" component={MiddleSchoolRoadmap} />
            <Route path="/high-school-roadmap" component={HighSchoolRoadmap} />
            <Route path="/middle-school" component={MiddleSchool} />
            <Route path="/high-school" component={HighSchool} />
            <Route path="/directions" component={Directions} />
            <Route path="/admin" component={Admin} />
            <Route path="/admin/roadmap" component={AdminRoadmap} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
