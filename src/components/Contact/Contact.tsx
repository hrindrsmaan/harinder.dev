import { Button } from "@/components/ui/button";
import { portfolioData } from "../../data/portfolio";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 className="contact-title">Let's Build Something Amazing</h2>

          <div className="social-links">
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
