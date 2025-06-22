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
    role: "Sr. Full Stack Developer",
    date: "Aug 2022 - Present",
    details: [
      "Built scalable React + Next.js apps for millions of users",
      "Created a universal search SDK from scratch",
      "Migrated apps to GCP Atlas for faster deployments",
      "Integrated Dynatrace + Splunk for monitoring",
    ],
  },
  {
    company: "Manulife",
    role: "Full-stack Developer",
    date: "Dec 2020 - Jul 2022",
    details: [
      "Developed full-stack apps to process & visualize data",
      "Followed agile development with daily stand-ups",
      "Integrated and debugged 3rd-party APIs",
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
      <h1 className="text-3xl font-bold mb-2">Hi, I'm Harinder 👋</h1>
      <p className="text-lg">
        Senior Full-Stack Developer (React / Next.js / TypeScript)
      </p>
      <p className="mb-8">
        I build clean, fast, and scalable web apps. Let’s make the web better.
      </p>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="font-bold">Harinder Singh</p>
        <p>📍 Toronto · Remote</p>
        <p>📧 hrinder.maan@gmail.com</p>
      </section>

      <section className="card">
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

      <section className="card">
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
