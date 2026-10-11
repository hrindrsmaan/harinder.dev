import { Fragment } from "react";
import { experienceData } from "../../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Experience = () => {
  return (
    <section id="experience">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <h2 className="mb-8 inline-block w-full border-b pb-2 text-center text-[1.75rem] max-md:text-[1.5rem]">Where I've Worked</h2>

        <div className="mx-auto flex max-w-(--max-width) flex-col">
          {experienceData.map((experience, index) => (
            <Fragment key={index}>
              {index > 0 && <Separator className="mt-8 mb-0 max-md:mt-6" />}
              <div className="flex items-start gap-6 max-md:flex-col max-md:gap-0">
                <div className="flex flex-[0_0_200px] flex-col items-start gap-2 max-md:mb-3 max-md:flex-[0_0_auto] max-md:gap-3 max-md:border-b max-md:pb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-left font-sans text-[1rem] font-bold tracking-[-0.01em] text-foreground max-md:min-w-0 max-md:flex-1">{experience.company}</div>
                  </div>
                  <div className="mb-1 font-sans text-[0.95rem] font-semibold text-foreground max-md:w-full max-md:text-[0.9rem]">{experience.position}</div>

                  <div className="mt-2 flex flex-col gap-2 max-md:w-full max-md:flex-row max-md:flex-wrap">
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

                <div className="flex-1 border-l pl-4 max-md:border-l-0 max-md:pl-0">
                  <div className="flex flex-col gap-3">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="relative pl-4 text-[0.9rem] leading-[1.6] text-foreground before:absolute before:left-0 before:content-['-'] max-md:pl-3 max-md:text-[0.85rem] max-md:leading-[1.5]"
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
