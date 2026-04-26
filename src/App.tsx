import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingElements from "./components/FloatingElements/FloatingElements";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import JSCompiler from "./components/JSCompiler/JSCompiler";
import JobTrackerPage from "./components/JobTracker/JobTrackerPage";
import { CanonicalUrlManager } from "./hooks/useCanonicalUrl";

import "./styles/globals.css";

function App() {
  return (
    <Router>
      <CanonicalUrlManager />
      <div className="App">
        <FloatingElements />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Experience />
                <Education />
                <Projects />
                <Contact />
                <section className="coming-soon-section">
                  <div className="coming-soon-container">
                    <h3>🚧 JavaScript Online Compiler (Under Construction)</h3>
                    <p>
                      I'm working on an interactive JavaScript compiler where
                      you can write, run, and test JavaScript code directly in
                      your browser. Try the early version!
                    </p>
                    <a
                      href="/js-compiler"
                      className="btn btn-primary compiler-link"
                    >
                      Try Early Version →
                    </a>
                  </div>
                </section>
              </>
            }
          />
          <Route path="/js-compiler" element={<JSCompiler />} />
          <Route path="/job-tracker" element={<JobTrackerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
