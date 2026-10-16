import { Plus } from "lucide-react";
import { experienceData } from "../../data/portfolio";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Experience = () => {
  return (
    <section id="experience" className="border-b-0">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="flex items-baseline justify-between gap-4 border-b pb-5">
          <h2 className="mb-0 text-[clamp(1.625rem,4vw,2.125rem)]">Experience</h2>
        </div>

        <div className="flex flex-col">
          {experienceData.map((experience, index) => (
            <Collapsible key={index} className="group border-b last:border-b-0">
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-6 py-7 text-left font-sans max-md:gap-4 max-md:py-5">
                <span className="flex flex-1 items-baseline gap-6 max-md:flex-col max-md:gap-1.5">
                  <span className="w-[200px] shrink-0 font-mono text-[0.825rem] text-muted-foreground max-md:w-auto max-md:text-(length:--fs-xs)">
                    {experience.period}
                  </span>
                  <span className="text-[clamp(0.9375rem,2vw,1.25rem)] text-foreground">
                    <span className="font-medium">{experience.position}</span>{" "}
                    <span className="text-muted-foreground">
                      at {experience.company}
                    </span>
                  </span>
                </span>
                <Plus
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-45"
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="pb-8 pl-[224px] max-md:pb-6 max-md:pl-0">
                <p className="mb-4 font-mono text-(length:--fs-xs) text-muted-foreground">
                  {experience.duration} · {experience.location}
                </p>
                <ul className="flex flex-col gap-3 font-sans">
                  {experience.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlightIndex}
                      className="text-[1rem] leading-[1.75] text-muted-foreground max-md:text-[0.875rem]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
