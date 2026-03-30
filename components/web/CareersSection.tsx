"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import GradientButton from "../shared/GradientButton";
import { MoveRight } from "lucide-react";
import PrimaryButton from "../shared/PrimaryButton";

const JOBS = [
  {
    id: 1,
    title: "Full Stack Developer",
    level: "Mid-Level",
    locations: ["Chennai", "Madurai"],
    smallDescription:
      "Primary Responsibility:Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases....",
    mainDescription:
      <div className="mt-4">
        {/* {activeJob.mainDescription} */}
        <h4 className="font-semibold mb-2">Primary Responsibility:</h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          Primary Responsibility:
          Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases and APIs using technologies such as Node.js, Python, Ruby, or Java.Designing, implementing, and managing databases (SQL or NoSQL) to ensure data integrity and efficient retrieval.Using version control systems like Git to manage code changes and collaborate with other developers.Implementing security best practices to protect applications from vulnerabilities and threats.Automating deployment processes and managing CI/CD pipelines to streamline development and release cycles.Working with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software.
        </p>
        <h4 className="font-semibold mb-2">Job Specification:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Strong knowledge of front-end technologies</li>
          <li>Experience with backend frameworks and databases</li>
          <li>Version control using Git</li>
          <li>Web security best practices</li>
          <li>Good communication skills</li>
        </ul>

        <div className="space-y-2 text-gray-700">
          <p><strong>Employment Type:</strong> Full-time</p>
          <p><strong>Work Place Type:</strong> Hybrid</p>
          <p><strong>Salary:</strong> Commensurate with experience</p>
          <p><strong>Experience Required:</strong> Minimum 3 Years</p>
        </div>
        <div className="mt-8">
          <PrimaryButton label='Get Started' icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />
        </div>
        {/* <button className="mt-6 bg-[#2563EB] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Apply Now →
        </button> */}
      </div>
  },
  {
    id: 2,
    title: "React Developer",
    level: "Mid-Level",
    locations: ["Chennai", "Madurai"],
    smallDescription:
      "Primary Responsibility:Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases....",
    mainDescription:
      <div className="mt-4">
        {/* {activeJob.mainDescription} */}
        <h4 className="font-semibold mb-2">Primary Responsibility:</h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          Primary Responsibility:
          Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases and APIs using technologies such as Node.js, Python, Ruby, or Java.Designing, implementing, and managing databases (SQL or NoSQL) to ensure data integrity and efficient retrieval.Using version control systems like Git to manage code changes and collaborate with other developers.Implementing security best practices to protect applications from vulnerabilities and threats.Automating deployment processes and managing CI/CD pipelines to streamline development and release cycles.Working with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software.
        </p>
        <h4 className="font-semibold mb-2">Job Specification:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Strong knowledge of front-end technologies</li>
          <li>Experience with backend frameworks and databases</li>
          <li>Version control using Git</li>
          <li>Web security best practices</li>
          <li>Good communication skills</li>
        </ul>

        <div className="space-y-2 text-gray-700">
          <p><strong>Employment Type:</strong> Full-time</p>
          <p><strong>Work Place Type:</strong> Hybrid</p>
          <p><strong>Salary:</strong> Commensurate with experience</p>
          <p><strong>Experience Required:</strong> Minimum 3 Years</p>
        </div>
        <div className="mt-8">
          <PrimaryButton label='Get Started' icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />
        </div>
        {/* <button className="mt-6 bg-[#2563EB] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Apply Now →
        </button> */}
      </div>
  },
  {
    id: 3,
    title: "Flutter Developer",
    level: "Mid-Level",
    locations: ["Chennai", "Madurai"],
    smallDescription:
      "Primary Responsibility:Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases....",
    mainDescription:
      <div className="mt-4">
        {/* {activeJob.mainDescription} */}
        <h4 className="font-semibold mb-2">Primary Responsibility:</h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          Primary Responsibility:
          Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases and APIs using technologies such as Node.js, Python, Ruby, or Java.Designing, implementing, and managing databases (SQL or NoSQL) to ensure data integrity and efficient retrieval.Using version control systems like Git to manage code changes and collaborate with other developers.Implementing security best practices to protect applications from vulnerabilities and threats.Automating deployment processes and managing CI/CD pipelines to streamline development and release cycles.Working with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software.
        </p>
        <h4 className="font-semibold mb-2">Job Specification:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Strong knowledge of front-end technologies</li>
          <li>Experience with backend frameworks and databases</li>
          <li>Version control using Git</li>
          <li>Web security best practices</li>
          <li>Good communication skills</li>
        </ul>

        <div className="space-y-2 text-gray-700">
          <p><strong>Employment Type:</strong> Full-time</p>
          <p><strong>Work Place Type:</strong> Hybrid</p>
          <p><strong>Salary:</strong> Commensurate with experience</p>
          <p><strong>Experience Required:</strong> Minimum 3 Years</p>
        </div>
        <div className="mt-8">
          <PrimaryButton label='Get Started' icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />
        </div>
        {/* <button className="mt-6 bg-[#2563EB] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Apply Now →
        </button> */}
      </div>
  },
  {
    id: 4,
    title: "PHP Developer",
    level: "Mid-Level",
    locations: ["Chennai", "Madurai"],
    smallDescription:
      "Primary Responsibility:Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases....",
    mainDescription:
      <div className="mt-4">
        {/* {activeJob.mainDescription} */}
        <h4 className="font-semibold mb-2">Primary Responsibility:</h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          Primary Responsibility:
          Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases and APIs using technologies such as Node.js, Python, Ruby, or Java.Designing, implementing, and managing databases (SQL or NoSQL) to ensure data integrity and efficient retrieval.Using version control systems like Git to manage code changes and collaborate with other developers.Implementing security best practices to protect applications from vulnerabilities and threats.Automating deployment processes and managing CI/CD pipelines to streamline development and release cycles.Working with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software.
        </p>
        <h4 className="font-semibold mb-2">Job Specification:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Strong knowledge of front-end technologies</li>
          <li>Experience with backend frameworks and databases</li>
          <li>Version control using Git</li>
          <li>Web security best practices</li>
          <li>Good communication skills</li>
        </ul>

        <div className="space-y-2 text-gray-700">
          <p><strong>Employment Type:</strong> Full-time</p>
          <p><strong>Work Place Type:</strong> Hybrid</p>
          <p><strong>Salary:</strong> Commensurate with experience</p>
          <p><strong>Experience Required:</strong> Minimum 3 Years</p>
        </div>
        <div className="mt-8">
          <PrimaryButton label='Get Started' icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />
        </div>
        {/* <button className="mt-6 bg-[#2563EB] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Apply Now →
        </button> */}
      </div>
  },
  {
    id: 5,
    title: "MERN Stack Developer",
    level: "Mid-Level",
    locations: ["Chennai", "Madurai"],
    smallDescription:
      "Primary Responsibility:Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases....",
    mainDescription:
      <div className="mt-4">
        {/* {activeJob.mainDescription} */}
        <h4 className="font-semibold mb-2">Primary Responsibility:</h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          Primary Responsibility:
          Designing and implementing user interfaces using HTML, CSS, and JavaScript frameworks like React or Angular. Building and maintaining server-side application logic, databases and APIs using technologies such as Node.js, Python, Ruby, or Java.Designing, implementing, and managing databases (SQL or NoSQL) to ensure data integrity and efficient retrieval.Using version control systems like Git to manage code changes and collaborate with other developers.Implementing security best practices to protect applications from vulnerabilities and threats.Automating deployment processes and managing CI/CD pipelines to streamline development and release cycles.Working with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality software.
        </p>
        <h4 className="font-semibold mb-2">Job Specification:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Strong knowledge of front-end technologies</li>
          <li>Experience with backend frameworks and databases</li>
          <li>Version control using Git</li>
          <li>Web security best practices</li>
          <li>Good communication skills</li>
        </ul>

        <div className="space-y-2 text-gray-700">
          <p><strong>Employment Type:</strong> Full-time</p>
          <p><strong>Work Place Type:</strong> Hybrid</p>
          <p><strong>Salary:</strong> Commensurate with experience</p>
          <p><strong>Experience Required:</strong> Minimum 3 Years</p>
        </div>
        <div className="mt-8">
          <PrimaryButton label='Get Started' icon={<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
          </svg>
          } />
        </div>
        {/* <button className="mt-6 bg-[#2563EB] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Apply Now →
        </button> */}
      </div>
  },
];

const AUTO_TIME = 3000;

export default function CareersSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeJob = JOBS[activeIndex];

  /** Start auto rotation */
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % JOBS.length);
    }, AUTO_TIME);
  };

  /** Reset timer when user clicks */
  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10">
        {/* LEFT LIST */}
        <div className="space-y-4 lg:space-y-10">
          {JOBS.map((job, index) => (
            <div
              key={job.id}
              onClick={() => handleClick(index)}
              className={clsx(
                "cursor-pointer rounded-xl border p-6 transition-all duration-300",
                activeIndex === index
                  ? "border-[#F15A23] bg-white"
                  : "border-white bg-white hover:border-[#F15A23]"
              )}
            >
              <h3 className={`text-lg font-bold ${activeIndex === index ? 'text-[#F15A23]' : ''}`}>{job.title}</h3>

              <div className="flex gap-2 mt-2">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                  {job.level}
                </span>
                {job.locations.map((loc) => (
                  <span
                    key={loc}
                    className="text-sm bg-gray-100 px-3 py-1 rounded-md"
                  >
                    {loc}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {job.smallDescription}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT DETAILS */}
        <div className="bg-white rounded-2xl p-8 border border-white">
          <h2 className="text-2xl font-semibold mb-4">
            MERN Stack Developer
          </h2>
          <div className="flex gap-2 mt-2">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
              {activeJob.level}
            </span>
            {activeJob.locations.map((loc) => (
              <span
                key={loc}
                className="text-sm bg-gray-100 px-3 py-1 rounded-md"
              >
                {loc}
              </span>
            ))}
          </div>
          {
            activeJob.mainDescription
          }
        </div>
      </div>
    </div>
  );
}
