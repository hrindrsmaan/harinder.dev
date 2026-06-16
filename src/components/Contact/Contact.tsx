import { portfolioData } from "../../data/portfolio";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 className="contact-title">Let's Build Something Amazing</h2>

          <div className="social-links">
            <a
              href={portfolioData.social.linkedin}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.social.github}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="/resume.pdf"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
