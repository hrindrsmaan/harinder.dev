import { experienceData } from "../../data/portfolio";
import "./Experience.css";

const Experience = () => {
  const bulletStyle = "with-diamond";

  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Where I've Worked</h2>

        <div className="section-subtitle">
          Building impactful solutions at scale
        </div>

        <div className="experience-timeline">
          {experienceData.map((experience, index) => (
            <div key={index} className="experience-card">
              <div className="experience-layout">
                <div className="company-side">
                  <div className="company-logo">{experience.logo}</div>
                  <div className="company-name">{experience.company}</div>
                  <div className="job-title">{experience.position}</div>
                  {experience.description && (
                    <div className="job-description">
                      {experience.description}
                    </div>
                  )}
                  <div className="info-cards">
                    <div className="info-card duration-card">
                      <span className="duration-icon">📅</span>
                      <span className="card-content">
                        {experience.duration}
                      </span>
                    </div>
                    <div className="info-card location-card">
                      <span className="location-icon">📍</span>
                      <span className="card-content">
                        {experience.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="highlights-side">
                  <div className="highlights">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className={`highlight-item ${bulletStyle}`}
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
