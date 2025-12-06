// @ts-nocheck
import { portfolioData } from "../../data/portfolio";
import "./Hero.css";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-greeting">{portfolioData.greeting}</div>
          <h1 className="hero-title">{portfolioData.name}</h1>

          <p className="hero-description">{portfolioData.description}</p>

          <div className="cta-buttons">
            <button
              onClick={() => scrollToSection("projects")}
              className="btn btn-primary"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn btn-secondary"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
