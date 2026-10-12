import { portfolioData } from "../../data/portfolio";

const socialLinks = [
  { href: portfolioData.social.linkedin, label: "LinkedIn" },
  { href: portfolioData.social.github, label: "GitHub" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t py-10 max-md:py-8">
      <div className="mx-auto flex max-w-(--max-width) flex-wrap items-center justify-between gap-4 px-8 font-sans text-[0.875rem] text-muted-foreground max-md:px-4">
        <p className="mb-0">
          &copy; {currentYear} {portfolioData.name}
        </p>

        <ul className="flex gap-8 max-md:gap-6">
          {socialLinks.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
