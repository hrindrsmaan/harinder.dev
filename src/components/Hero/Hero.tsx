import { portfolioData } from "../../data/portfolio";

const Hero = () => {
  return (
    <section
      id="home"
      className="border-b-0 pt-28 pb-16 max-md:pt-20 max-md:pb-10"
    >
      <div className="mx-auto max-w-(--max-width) px-8 max-md:px-4">
        <div className="max-w-[820px]">
          <p className="mb-5 flex items-center gap-2.5 font-mono text-(length:--fs-xs) tracking-[0.12em] text-muted-foreground uppercase">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-status-available"
            />
            {portfolioData.role} · {portfolioData.location}
          </p>

          <h1 className="mb-6 text-[clamp(2.375rem,7vw,4.375rem)] leading-[1.05] tracking-[-0.03em]">
            {portfolioData.name}
          </h1>

          <p className="mb-0 max-w-[720px] font-sans text-[clamp(0.9375rem,2vw,1.25rem)] leading-[1.65] text-muted-foreground">
            {portfolioData.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
