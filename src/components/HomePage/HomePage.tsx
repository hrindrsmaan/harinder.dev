import React from "react";

const projects = [
  {
    title: "JSON Formatter",
    desc: "Web tool to format/minify JSON",
    live: "https://json-formatter-chi.vercel.app/json-formatter",
    github: "https://github.com/YOUR_GITHUB_REPO_JSON_FORMATTER",
  },
  {
    title: "Stripe Integration Demo",
    desc: "Next.js app demonstrating payment flows",
    live: "https://stripe-nextjs-chi.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_STRIPE",
  },
  {
    title: "API Generator (Mockfy)",
    desc: "Mock REST API generator for QA testing",
    live: "https://mockify-mu.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_MOCKFY",
  },
  {
    title: "Solana Meme Coin Generator",
    desc: "Blockchain side project",
    live: "https://solana-meme-coin-generator.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_SOLANA_MEME",
  },
];

const HomePage = () => {
  return (
    <main className="container">
      <h1>Hi I'm Harinder</h1>

      <section className="card">
        <h2>About Me</h2>
        <p className="name">Harinder Singh</p>
        <p>Senior Full-Stack Developer</p>
        <p className="small">📧 hrinder.maan@gmail.com</p>
        <p>I code, I fix, I save the day</p>
      </section>

      <section className="card">
        <h2>Experience</h2>

        <div className="experience">
          <p className="role">Sr. Full Stack Developer</p>
          <p className="small">Scotiabank · Permanent Full-time</p>
          <p className="small">Aug 2022 - Present · 2 yrs 11 mos</p>
          <p className="small">Toronto, Ontario, Canada · Remote</p>
          <ul>
            <li>
              Designed and developed scalable web applications using React,
              Next.js, and TypeScript, enhancing user experience.
            </li>
            <li>
              Created a universal search SDK from scratch, streamlining internal
              team operations and collaboration.
            </li>
            <li>
              Migrated legacy frontend applications to GCP Atlas, significantly
              improving deployment time and scalability.
            </li>
            <li>
              Integrated observability tools like Dynatrace and Splunk for
              proactive issue detection and monitoring.
            </li>
          </ul>
        </div>

        <div className="experience">
          <p className="role">Full-stack Developer</p>
          <p className="small">Manulife</p>
          <p className="small">Dec 2020 - Jul 2022 · 1 yr 8 mos</p>
          <p className="small">Toronto, Ontario, Canada · Remote</p>
          <ul>
            <li>
              Developed full-stack web applications which processed, analyzed
              and rendered data visually.
            </li>
            <li>
              Planned, wrote, and debugged web applications and software with
              complete accuracy.
            </li>
            <li>
              Followed agile development practices with daily stand-ups and
              regular product demo days with product stakeholders.
            </li>
            <li>Interacted with third-party APIs.</li>
            <li>
              Defined and conducted design processes at all stages, including
              research, conceptualization, testing, and implementation.
            </li>
            <li>Committed code to GIT and performed 75+ code reviews.</li>
            <li>
              Redesigned sites to enhance the navigation and improve visual
              appeal.
            </li>
            <li>
              Troubleshot, tested, and remedied issues before software
              deployment.
            </li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2>Projects</h2>
        {projects.map((proj) => (
          <div key={proj.title} className="project">
            <p className="proj-title">{proj.title}</p>
            <p className="small">{proj.desc}</p>
            <div className="links">
              <a href={proj.live} target="_blank" rel="noopener noreferrer">
                Live
              </a>
              <a href={proj.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
