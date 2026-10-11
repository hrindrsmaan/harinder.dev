import { Button } from "@/components/ui/button";
import { portfolioData } from "../../data/portfolio";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="flex min-h-[60vh] items-center justify-center pt-[60px] max-md:min-h-auto max-md:px-4 max-md:pt-20 max-md:pb-8"
    >
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="max-w-(--max-width) text-center">
          <div className="mb-4 font-sans text-(length:--fs-xs) font-bold tracking-[0.06em] text-highlight uppercase">{portfolioData.greeting}</div>
          <h1 className="text-[clamp(2rem,5vw,2.5rem)] max-md:text-[1.8rem]">{portfolioData.name}</h1>

          <p className="mx-auto mb-8 max-w-[600px] text-(length:--fs-base) text-muted-foreground">{portfolioData.description}</p>

          <div className="flex flex-wrap justify-center gap-4">
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
