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
import "./Projects.css";

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
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
