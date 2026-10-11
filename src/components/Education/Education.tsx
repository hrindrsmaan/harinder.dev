import { Fragment } from "react";
import { educationData } from "../../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "./Education.css";

const Education = () => {
  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div className="education-timeline">
          {educationData.map((education, index) => (
            <Fragment key={index}>
              {index > 0 && <Separator className="mt-8 mb-0 max-md:mt-6" />}
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
                    <Badge
                      variant="outline"
                      className="h-auto w-full justify-start gap-2 border-l-3 bg-card px-2.5 py-1 text-[0.85rem] font-normal text-foreground max-md:min-w-[140px] max-md:flex-1 max-md:px-2 max-md:text-[0.8rem] border-l-border-strong"
                    >
                      <span aria-hidden="true">📅</span>
                      {education.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="h-auto w-full justify-start gap-2 border-l-3 bg-card px-2.5 py-1 text-[0.85rem] font-normal text-foreground max-md:min-w-[140px] max-md:flex-1 max-md:px-2 max-md:text-[0.8rem] border-l-muted-foreground"
                    >
                      <span aria-hidden="true">📍</span>
                      {education.location}
                    </Badge>
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
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
