import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Footer from "./components/Footer/Footer";
import { CanonicalUrlManager } from "./hooks/useCanonicalUrl";

import "./styles/globals.css";

function App() {
  return (
    <Router>
      <CanonicalUrlManager />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Experience />
                <Education />
              </>
            }
          />
          {/* Unknown paths (e.g. the retired /job-tracker) redirect home
              instead of rendering a blank page. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
