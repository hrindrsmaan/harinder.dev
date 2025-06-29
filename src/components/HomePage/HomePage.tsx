import React, { useState } from "react";
import Footer from "../Footer/Footer";
import "./HomePage.css"; // Make sure this CSS file is in the same directory or adjust path

type Project = {
  title: string;
  desc: string;
  live: string;
};

type Experience = {
  company: string;
  role: string;
  date: string;
  details: string[];
  location: string;
};

const projects: Project[] = [
  {
    title: "JSON Formatter",
    desc: "Web tool to format or minify JSON easily.",
    live: "https://json-formatter-chi.vercel.app/json-formatter",
  },
  {
    title: "Stripe Integration Demo",
    desc: "Next.js app showing payment flows.",
    live: "https://stripe-nextjs-chi.vercel.app/",
  },
  {
    title: "API Generator (Mockfy)",
    desc: "Create mock REST APIs for QA testing.",
    live: "https://mockify-mu.vercel.app/",
  },
  {
    title: "Solana Meme Coin Generator",
    desc: "Blockchain fun project for token creation.",
    live: "https://solana-meme-coin-generator.vercel.app/",
  },
];

const experiences: Experience[] = [
  {
    company: "Scotiabank",
    location: "Toronto, ON",
    role: "Senior Front-End Developer",
    date: "Aug 2022 – Present",
    details: [
      "Owned front-end of a SaaS-style financial portal used by 10,000+ employees, cutting dashboard load time by 60% and boosting satisfaction scores by 25%.",
      "Partnered with product, design & ops in a 7-person squad to ship expense-management features that reduced month-end close time by 30%.",
      "Mentored 4 junior developers in React/TypeScript best practices, raising team velocity by 20% and slashing PR revisions by 50%.",
      "Championed migration from PCF to AWS/GCP, achieving 40% faster deployments and saving $25K+ annually in cloud costs.",
      "Implemented code-splitting, lazy loading and caching strategies, proactively raising the bar for performance across all squads.",
    ],
  },
  {
    company: "Manulife",
    location: "Toronto, ON",
    role: "Full-Stack Developer",
    date: "Dec 2020 – Aug 2022",
    details: [
      "Led front-end development of a B2B insurance-agent portal, reducing policy processing time by 50% through optimized React workflows.",
      "Built a shared UI component library (15+ React components with Storybook), accelerating new feature rollout by 35%.",
      "Integrated AWS S3 for document storage and Django REST APIs for secure data access, ensuring 100% compliance in quarterly security audits.",
    ],
  },
];

const HomePage: React.FC = () => {
  const [activeCompany, setActiveCompany] = useState<string>(
    experiences[0].company
  );

  const activeExperience = experiences.find(
    (exp) => exp.company === activeCompany
  );

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-1">Hi, I'm Harinder 👋</h1>
      <p className="homepage-subtitle">Senior Full Stack Software Developer</p>

      <div className="skills-container">
        {["React", "TypeScript", "Next.js", "JavaScript"].map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>

      <section>
        <h2 className="section-heading">About Me</h2>
        <p className="about-text">
          I’m Harinder Singh, a Senior Full-Stack Developer based in Toronto
          (remote). For over 8 years, I’ve built scalable web applications using
          React, Next.js, and TypeScript. <br />
          <br />
          Lately, I’ve also been building AI-integrated apps with Hugging Face,
          OpenAI APIs to add smart, cutting-edge features.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where I've Worked</h2>

        <div className="tabs-container">
          {experiences.map((exp) => (
            <button
              key={exp.company}
              className={`tab-button ${
                activeCompany === exp.company ? "active" : ""
              }`}
              onClick={() => setActiveCompany(exp.company)}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {activeExperience && (
          <div className="border p-4 rounded shadow-sm">
            <p className="font-semibold text-lg">{activeExperience.role}</p>
            <p className="text-sm text-gray-500 mb-2">
              {activeExperience.date}
            </p>

            <div className="accordion-container">
              {activeExperience.details.map((detail, idx) => (
                <details key={idx}>
                  <summary>{detail.split(" ")[0]}...</summary>
                  <p>{detail}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {projects.map((proj) => (
          <div key={proj.title} className="project mb-4 border-b pb-2">
            <p className="font-medium">{proj.title}</p>
            <p className="text-gray-600">{proj.desc}</p>
            <div className="mt-1">
              <a href={proj.live} target="_blank" rel="noopener noreferrer">
                🚀 Live App
              </a>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
