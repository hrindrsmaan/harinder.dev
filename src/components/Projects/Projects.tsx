import { projectsData } from "../../data/projects";
import "./Projects.css";

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚀 Live App
                </a>
                <a
                  href={project.codeUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📋 View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
