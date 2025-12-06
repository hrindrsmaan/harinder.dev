import { experienceData } from "../../data/portfolio";
import "./Experience.css";

const Experience = () => {
  const bulletStyle = "with-diamond";

  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Where I've Worked</h2>

        <div className="experience-timeline">
          {experienceData.map((experience, index) => (
            <div key={index} className="experience-card">
              <div className="company-header">
                <div className="company-logo">{experience.logo}</div>
                <div className="job-info">
                  <div className="job-title">{experience.position}</div>
                  <div className="job-duration">
                    {experience.company} • {experience.duration}
                  </div>
                </div>
              </div>

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
