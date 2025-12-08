import FloatingElements from "./components/FloatingElements/FloatingElements";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <FloatingElements />
      <Header />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
