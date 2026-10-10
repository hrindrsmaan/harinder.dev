import { educationData } from "../../data/portfolio";
import "./Education.css";

const Education = () => {
  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div className="education-timeline">
          {educationData.map((education, index) => (
            <div key={index} className="education-card">
              <div className="education-layout">
                <div className="institution-side">
                  <div className="institution-header-row">
                    <div className="institution-logo">{education.logo}</div>
                    <div className="institution-name">
                      {education.institution}
                    </div>
                  </div>
                  <div className="degree-title">{education.degree}</div>
                  {education.description && (
                    <div className="education-description">
                      {education.description}
                    </div>
                  )}
                  <div className="info-cards">
                    <div className="info-card duration-card">
                      <span className="duration-icon">📅</span>
                      <span className="card-content">{education.duration}</span>
                    </div>
                    <div className="info-card location-card">
                      <span className="location-icon">📍</span>
                      <span className="card-content">{education.location}</span>
                    </div>
                  </div>
                </div>

                <div className="achievements-side">
                  <div className="achievements">
                    {education.achievements.map(
                      (achievement, achievementIndex) => (
                        <div
                          key={achievementIndex}
                          className="achievement-item"
                        >
                          {achievement}
                        </div>
                      )
                    )}
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

export default Education;
