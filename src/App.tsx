import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Footer from "./components/Footer/Footer";
import JobTrackerPage from "./components/JobTracker/JobTrackerPage";
import { CanonicalUrlManager } from "./hooks/useCanonicalUrl";

import "./styles/globals.css";

function App() {
  return (
    <Router>
      <CanonicalUrlManager />
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Experience />
                <Education />
              </>
            }
          />
          <Route path="/job-tracker" element={<JobTrackerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
