import { Fragment } from "react";
import { experienceData } from "../../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "./Experience.css";

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Where I've Worked</h2>

        <div className="experience-timeline">
          {experienceData.map((experience, index) => (
            <Fragment key={index}>
              {index > 0 && <Separator className="mt-8 mb-0 max-md:mt-6" />}
              <div className="experience-layout">
                <div className="company-side">
                  <div className="company-header-row">
                    <div className="company-name">{experience.company}</div>
                  </div>
                  <div className="job-title">{experience.position}</div>

                  <div className="info-cards">
                    <Badge
                      variant="outline"
                      className="h-auto w-full justify-start gap-2 border-l-3 bg-card px-2.5 py-1 text-[0.85rem] font-normal text-foreground max-md:min-w-[140px] max-md:flex-1 max-md:px-2 max-md:text-[0.8rem] border-l-border-strong"
                    >
                      <span aria-hidden="true">📅</span>
                      {experience.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="h-auto w-full justify-start gap-2 border-l-3 bg-card px-2.5 py-1 text-[0.85rem] font-normal text-foreground max-md:min-w-[140px] max-md:flex-1 max-md:px-2 max-md:text-[0.8rem] border-l-muted-foreground"
                    >
                      <span aria-hidden="true">📍</span>
                      {experience.location}
                    </Badge>
                  </div>
                </div>

                <div className="highlights-side">
                  <div className="highlights">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="highlight-item"
                      >
                        {highlight}
                      </div>
                    ))}
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

export default Experience;
