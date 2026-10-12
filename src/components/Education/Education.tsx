import { Plus } from "lucide-react";
import { educationData } from "../../data/portfolio";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Education = () => {
  return (
    <section id="education">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="flex items-baseline justify-between gap-4 border-b pb-5">
          <h2 className="mb-0 text-[clamp(1.625rem,4vw,2.125rem)]">Education</h2>
          <span className="font-mono text-(length:--fs-xs) text-muted-foreground">
            {educationData.length} schools
          </span>
        </div>

        <div className="flex flex-col">
          {educationData.map((education, index) => (
            <Collapsible key={index} className="group border-b last:border-b-0">
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-6 py-7 text-left font-sans max-md:gap-4 max-md:py-5">
                <span className="flex flex-1 items-baseline gap-6 max-md:flex-col max-md:gap-1.5">
                  <span className="w-[200px] shrink-0 font-mono text-[0.825rem] text-muted-foreground max-md:w-auto max-md:text-(length:--fs-xs)">
                    {education.duration}
                  </span>
                  <span className="text-[clamp(0.9375rem,2vw,1.25rem)] text-foreground">
                    <span className="font-medium">{education.degree}</span>{" "}
                    <span className="text-muted-foreground">
                      at {education.institution}
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
                  {education.location}
                </p>
                {education.description && (
                  <p className="mb-3 font-sans text-[1rem] leading-[1.75] text-muted-foreground max-md:text-[0.875rem]">
                    {education.description}
                  </p>
                )}
                <ul className="flex flex-col gap-3 font-sans">
                  {education.achievements.map(
                    (achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="text-[1rem] leading-[1.75] text-muted-foreground max-md:text-[0.875rem]"
                      >
                        {achievement}
                      </li>
                    )
                  )}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
