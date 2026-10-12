import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-(--max-width) items-center px-8 py-4 max-md:p-4">
        <Link
          to="/"
          // Link alone won't scroll when already on "/", so always return to the top.
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-sans text-[1.075rem] font-bold tracking-[-0.02em] whitespace-nowrap text-foreground no-underline hover:text-foreground"
        >
          harinder.dev
        </Link>
      </nav>
    </header>
  );
};

export default Header;
