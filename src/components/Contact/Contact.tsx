import { portfolioData } from "../../data/portfolio";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 className="contact-title">Let's Build Something Amazing</h2>
          <p className="contact-description">
            I'm always excited to work on challenging projects and collaborate
            with passionate teams. Whether it's a startup MVP or
            enterprise-scale application, let's discuss how we can bring your
            vision to life.
          </p>

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
