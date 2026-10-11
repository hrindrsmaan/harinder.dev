import { Button } from "@/components/ui/button";
import { portfolioData } from "../../data/portfolio";

const Contact = () => {
  return (
    <section id="contact" className="py-12 text-center">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="mx-auto max-w-(--max-width)">
          <h2 className="mb-8 inline-block pb-2 text-[1.75rem] max-md:text-[1.5rem]">Let's Build Something Amazing</h2>

          <div className="flex flex-wrap justify-center gap-6 max-md:gap-4">
            <Button asChild variant="outline" size="lg" className="px-4 text-base">
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-4 text-base">
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="px-4 text-base">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
