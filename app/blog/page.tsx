"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
  type: "certificate" | "project" | "research";
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Received the AWS CCP Certification",
    date: "2024-07-25",
    content: "Successfully passed the AWS Certified Cloud Practitioner exam.",
    type: "certificate",
  },
  {
    id: 2,
    title: "Got into the BIRD-CRITIC Research Project",
    date: "2025-02-12",
    content:
      "Assigned to help creating test cases to test LLMs for a project called BIRD-CRITIC that is related to benchmarking LLM’S capability for interactive text2SQL tasks.",
    type: "research",
  },
  {
    id: 3,
    title: "Research Update: BIRD-CRITIC",
    date: "2025-03-15",
    content:
      "Until this day, I have successfully made 30 test cases using python which is ensured with correctness and efficient time complexity. I have also fixed the generated LLM's SQL query including query from GPT and QWEM, which is originally in error. These queries are also fed to the test cases for the next process, which is training the LLM using the testcases.",
    type: "research",
  },
  {
    id: 4,
    title: "Project Update: Handwritten Equation Calculator",
    date: "2025-03-25",
    content:
      "Just learned how to use swift and applied it on XCode for the frontend of the app.",
    type: "project",
  },
  {
    id: 5,
    title: "Research Update: BIRD-CRITIC",
    date: "2025-04-03",
    content: `My mentor has assigned me to a new project after finishing the previous testcase assignment. There are two new projects: 

1. BIRD-interact Project: 
    - This project focuses on resolving ambiguity in Text-to-SQL tasks. 
2. livesqlbench Project: 
    - Build a benchmark evaluation platform for Text-to-SQL, similar to livecodebench, that can be regularly updated.`,
    type: "research",
  },
];

export default function BlogPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPostsForDate = (date: Date) => {
    return blogPosts.filter((post) => isSameDay(parseISO(post.date), date));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    setSelectedDate(null);
  };

  const displayedPosts = selectedDate
    ? getPostsForDate(selectedDate)
    : [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

  const activityCounts = {
    projects: blogPosts.filter((post) => post.type === "project").length,
    certificates: blogPosts.filter((post) => post.type === "certificate")
      .length,
    research: blogPosts.filter((post) => post.type === "research").length,
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col">
      <div className="max-w-7xl mx-auto flex-1 flex gap-8 w-full h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <h1 className="text-4xl font-bold text-cyan-400 mb-8">
            {selectedDate
              ? `Updates on ${format(selectedDate, "MMMM dd, yyyy")}`
              : "Latest Updates"}
          </h1>
          {displayedPosts.length > 0 ? (
            <div className="space-y-6">
              {displayedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        post.type === "certificate"
                          ? "text-cyan-400"
                          : post.type === "project"
                          ? "text-purple-400"
                          : "text-green-400"
                      }`}
                    >
                      {post.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-cyan-400">
                      {format(parseISO(post.date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center text-cyan-400">
              No posts found for this date
            </div>
          )}
        </div>

        <div className="w-96 h-[calc(100vh-6rem)] sticky top-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-cyan-400/10 rounded-full text-cyan-400"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-cyan-400">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-cyan-400/10 rounded-full text-cyan-400"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm text-cyan-400 font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4 flex-1">
              {daysInMonth.map((day) => {
                const dayPosts = getPostsForDate(day);
                const hasPosts = dayPosts.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <div
                    key={day.toString()}
                    className={`relative flex items-center justify-center w-8 h-8 mx-auto rounded-full cursor-pointer
                        ${
                          !isSameMonth(day, currentDate)
                            ? "text-gray-600"
                            : "text-gray-300"
                        }
                        ${hasPosts ? "bg-cyan-400/20 text-cyan-400" : ""}
                        ${
                          isSelected
                            ? "bg-cyan-400 text-gray-900 font-bold"
                            : ""
                        }
                        hover:bg-cyan-400/10 transition-colors`}
                    onClick={() => setSelectedDate(day)}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>

            {/* Activity counters section */}
            <div className="mt-auto pt-4 border-t border-gray-700">
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-purple-400/10 rounded-lg">
                  <div className="text-purple-400 font-bold text-xl">
                    {activityCounts.projects}
                  </div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center p-2 bg-cyan-400/10 rounded-lg">
                  <div className="text-cyan-400 font-bold text-xl">
                    {activityCounts.certificates}
                  </div>
                  <div className="text-xs text-gray-400">Certificates</div>
                </div>
                <div className="text-center p-2 bg-green-400/10 rounded-lg">
                  <div className="text-green-400 font-bold text-xl">
                    {activityCounts.research}
                  </div>
                  <div className="text-xs text-gray-400">Research</div>
                </div>
              </div>

              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-4 w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Show All Posts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
