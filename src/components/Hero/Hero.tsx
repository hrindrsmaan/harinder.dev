import { Button } from "@/components/ui/button";
import { portfolioData } from "../../data/portfolio";
import "./Hero.css";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
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
            <Button
              size="lg"
              className="px-6"
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border-strong px-6"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
