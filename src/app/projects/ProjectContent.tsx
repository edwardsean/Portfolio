"use client";

import Image from "next/image";

interface Project {
  title: string;
  description: string;
  url?: string;
  github?: string;
  image: string;
  tech: string[];
  note?: string;
}

const projects: Project[] = [
  {
    title: "Couple's Website",
    description:
      "A website made for couples to play with. Includes a world map itinerary connected with a gallery page, a time dependent diary, and a 'Guess The Picture' game.",
    url: "https://coupleswebsite.vercel.app/menu",
    github: "https://github.com/edwardsean/Couple-s-Website",
    image: "/Portfolio/images/Couple-Website.png",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "QTRVSIM vector extension",
    description:
      "Extended the QTRVSim RISC-V simulator to support RISC-V Vector Extension (RVV) instructions, including vsetvl, vadd.vv, vlw.v, and vsw.v.",
    url: "https://github.com/edwardsean/QTRVSIM-vector-extension",
    github: "https://github.com/edwardsean/QTRVSIM-vector-extension",
    image: "/Portfolio/images/QTRVSIM.png",
    tech: ["C++", "RISC-V", "Qt-6"],
  },
  {
    title:
      "Handwritten Digit Recognition using Random Forest and K Nearest Neighbors.",
    description:
      "This project explores handwritten digit recognition using Artificial Neural Network models, specifically Random Forest and K-Nearest Neighbors algorithms.",
    url: "https://github.com/edwardsean/Handwritten-Digit-Recognition-using-Random-Forest-and-K-Nearest-Neighbors.",
    github:
      "https://github.com/edwardsean/Handwritten-Digit-Recognition-using-Random-Forest-and-K-Nearest-Neighbors.",
    image: "/Portfolio/images/K-Nearest.png",
    tech: ["C++", "OpenCV"],
  },
  {
    title: "Handwritten Equation Calculator",
    description:
      "A project that leverages TensorFlow to build a neural network capable of analyzing and solving handwritten equations.",
    image: "/Portfolio/images/Coming-Soon-Background.avif",
    tech: [
      "Swift",
      "TensorFlow/Keras/Pytorch",
      "Python",
      "SymPy",
      "OpenCV",
      "NumPy",
      "Pandas",
      "Node.js",
      "Firebase",
      "Jupyter",
    ],
    note: "In progress...",
  },
  {
    title: "Skin Type Detector",
    description:
      "A computer vision project which analyzes a person's skin type, supported with several skin care recommendations.",
    image: "/images/Coming-Soon-Background.avif",
    tech: ["Python", "OpenCV", "Jupyter", "PyTorch"],
    note: "In progress...",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 overflow-y-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-cyan-400">
        My Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 flex flex-col"
            style={{ minHeight: "550px" }}
          >
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h2>

              <p className="text-gray-300 mb-4">{project.description}</p>

              {project.note && (
                <p className="text-yellow-400 italic mb-4">{project.note}</p>
              )}
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300"
                  aria-label="GitHub repository"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
