import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectsData } from "../../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="bg-secondary py-12">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <h2 className="mb-8 inline-block w-full border-b pb-2 text-center text-[1.75rem] max-md:text-[1.5rem]">Featured Projects</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-md:grid-cols-1">
          {projectsData.map((project) => (
            <Card key={project.id} className="gap-4 bg-card">
              <CardHeader className="gap-4">
                <div className="flex size-[35px] items-center justify-center border text-base">
                  {project.icon}
                </div>
                <CardTitle>
                  <h3 className="m-0 text-[1.1rem] font-bold tracking-[-0.01em]">
                    {project.title}
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="gap-4">
                <CardDescription className="text-(length:--fs-base) leading-relaxed">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-wrap gap-3">
                <Button
                  asChild
                  variant="link"
                  className="h-auto px-0 hover:text-highlight"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🚀 Live App
                  </a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="h-auto px-0 hover:text-highlight"
                >
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📋 View Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
