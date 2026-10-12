import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
      <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
        <nav className="relative mx-auto flex max-w-(--max-width) items-center justify-between px-8 py-4 max-md:p-4">
          <div className="font-sans text-[1.2rem] font-bold tracking-[-0.02em] whitespace-nowrap">harinder.dev</div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </CollapsibleTrigger>
          <ul className="hidden list-none gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="link"
                  className="h-auto p-0 text-base font-normal text-muted-foreground no-underline hover:text-highlight hover:no-underline"
                  onClick={() => handleNavigation(item.id)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <CollapsibleContent className="overflow-hidden md:hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up">
          <ul className="list-none">
            {navItems.map((item) => (
              <li key={item.id} className="border-t">
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-start rounded-none px-8 py-4 text-base font-normal hover:bg-secondary hover:text-highlight"
                  onClick={() => handleNavigation(item.id)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </header>
  );
};

export default Header;
