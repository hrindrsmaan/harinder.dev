import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border-strong py-8">
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="flex flex-col gap-6 max-md:gap-4">
          <div>
            <div className="font-sans text-[1.2rem] font-bold tracking-[-0.02em] whitespace-nowrap">harinder.dev</div>
            <p className="text-muted-foreground italic">
              Crafting digital experiences with passion and precision
            </p>
          </div>

          <div className="flex flex-wrap gap-8 max-md:gap-6">
            <div>
              <h4 className="mb-2 text-[1rem]">Navigation</h4>
              <ul>
                <li className="mb-1">
                  <a href="#home">Home</a>
                </li>
                <li className="mb-1">
                  <a href="#experience">Experience</a>
                </li>
                <li className="mb-1">
                  <a href="#projects">Projects</a>
                </li>
                <li className="mb-1">
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-[1rem]">Connect</h4>
              <ul>
                <li className="mb-1">
                  <a
                    href="https://www.linkedin.com/in/harindermaan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="https://github.com/hrindrsmaan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-[1rem]">Technologies</h4>
              <ul>
                <li className="mb-1">React & Next.js</li>
                <li className="mb-1">TypeScript</li>
                <li className="mb-1">Node.js</li>
                <li className="mb-1">AI Integration</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 max-md:flex-col max-md:text-center">
          <p className="text-[0.9rem] text-muted-foreground">
            &copy; {currentYear} Harinder Singh. Crafted with passion in
            Toronto.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
