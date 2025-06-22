const projects = [
  {
    title: "JSON Formatter",
    desc: "Web tool to format or minify JSON easily.",
    live: "https://json-formatter-chi.vercel.app/json-formatter",
    github: "https://github.com/YOUR_GITHUB_REPO_JSON_FORMATTER",
  },
  {
    title: "Stripe Integration Demo",
    desc: "Next.js app showing payment flows.",
    live: "https://stripe-nextjs-chi.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_STRIPE",
  },
  {
    title: "API Generator (Mockfy)",
    desc: "Create mock REST APIs for QA testing.",
    live: "https://mockify-mu.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_MOCKFY",
  },
  {
    title: "Solana Meme Coin Generator",
    desc: "Blockchain fun project for token creation.",
    live: "https://solana-meme-coin-generator.vercel.app/",
    github: "https://github.com/YOUR_GITHUB_REPO_SOLANA_MEME",
  },
];

const HomePage = () => {
  return (
    <main className="container">
      <h1>Hi, I'm Harinder 👋</h1>
      <p>Senior Full-Stack Developer (React / Next.js / TypeScript)</p>
      <p>
        I build clean, fast, and scalable web apps. Let’s make the web better.
      </p>

      <section className="card">
        <h2>About Me</h2>
        <p className="name">Harinder Singh</p>
        <p>📍 Toronto · Remote</p>
        <p>📧 hrinder.maan@gmail.com</p>
      </section>

      <section className="card">
        <h2>Experience</h2>

        <div className="experience">
          <p className="role">Sr. Full Stack Developer @ Scotiabank</p>
          <p className="small">Aug 2022 - Present</p>
          <ul>
            <li>Built scalable React + Next.js apps for millions of users</li>
            <li>Created a universal search SDK from scratch</li>
            <li>Migrated apps to GCP Atlas for faster deployments</li>
            <li>Integrated Dynatrace + Splunk for monitoring</li>
          </ul>
        </div>

        <div className="experience">
          <p className="role">Full-stack Developer @ Manulife</p>
          <p className="small">Dec 2020 - Jul 2022</p>
          <ul>
            <li>Developed full-stack apps to process & visualize data</li>
            <li>Followed agile development with daily stand-ups</li>
            <li>Integrated and debugged 3rd-party APIs</li>
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
                🚀 Live App
              </a>
            </div>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Harinder Singh — All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
