"use client";

import { useState, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  FiChevronLeft,
  FiFile,
  FiFolder,
  FiFileText,
  FiDownload,
  FiSearch,
} from "react-icons/fi";

interface FileItem {
  name: string;
  type: "file" | "folder";
  path: string;
  content?: string;
  downloadUrl?: string;
  children?: FileItem[];
  contentUrl?: string;
}

const initialFiles: FileItem[] = [
  {
    name: "CUHK",
    type: "folder",
    path: "/CUHK",
    children: [
      {
        name: "YEAR-1",
        type: "folder",
        path: "/CUHK/YEAR-1",
        children: [
          {
            name: "MATH-1001 (Calculus I)",
            type: "folder",
            path: "/CUHK/YEAR-1/MATH-1001 (Calculus I)",
            children: [
              {
                name: "Assignment 1",
                type: "file",
                path: `/CUHK/YEAR-1/MATH-1001 \(Calculus I)/Assignment-1`,
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-1.pdf",
              },
              {
                name: "Assignment 2",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-2",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-2.pdf",
              },
              {
                name: "Assignment 3",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-3",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-3.pdf",
              },
              {
                name: "Assignment 4",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-4",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-4.pdf",
              },
              {
                name: "Assignment 5",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-5",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-5.pdf",
              },
              {
                name: "Assignment 6",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-6",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-6.pdf",
              },
              {
                name: "Assignment 8",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-8",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-8.pdf",
              },
              {
                name: "Assignment 9",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-9",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-9.pdf",
              },
              {
                name: "Assignment 10",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-10",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-10.pdf",
              },
              {
                name: "Assignment 11",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-11",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-11.pdf",
              },
              {
                name: "Assignment 12",
                type: "file",
                path: "/CUHK/YEAR-1/MATH-1001/Assignment-12",
                contentUrl: "/files/CUHK/YEAR-1/MATH-1001/Assignment-12.pdf",
              },
            ],
          },
          {
            name: "CSC-1003 (Introduction to Computer Science and Java Programming)",
            type: "folder",
            path: "/CUHK/YEAR-1/CSC-1003 (Introduction to Computer Science and Java Programming)",
            // children: [
            //     {

            //     },
            // ],
          },
        ],
      },
    ],
  },
  {
    name: "README.md",
    type: "file",
    path: "/README.md",
    content:
      "# Homework Archive\n\nThis repository contains my academic works and projects.",
  },
];

export default function ArchivePage() {
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [history, setHistory] = useState<string[]>(["/"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const findAllMatches = (
    items: FileItem[],
    query: string,
    path: string = ""
  ): FileItem[] => {
    return items.reduce<FileItem[]>((acc, item) => {
      const currentPath = `${path}/${item.name}`;
      const newItem = { ...item, path: currentPath };

      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(newItem);
      }

      if (item.type === "folder" && item.children) {
        acc.push(...findAllMatches(item.children, query, currentPath));
      }

      return acc;
    }, []);
  };

  const searchRecommendations = useMemo(() => {
    if (!searchQuery) return [];
    return findAllMatches(initialFiles, searchQuery);
  }, [searchQuery]);

  const handleRecommendationClick = (item: FileItem) => {
    const pathComponents = item.path.split("/").filter((p) => p);
    const fileName = pathComponents.pop();
    const folderPath = `/${pathComponents.join("/")}`;

    setCurrentPath(folderPath);
    setHistory([folderPath]);

    const targetFile = findAllMatches(initialFiles, fileName || "").find(
      (f) => f.name === fileName && f.path === item.path
    );

    if (targetFile) {
      setSelectedFile(targetFile);
    }

    setSearchQuery("");
    setShowRecommendations(false);
  };

  const getCurrentFiles = () => {
    const pathParts = currentPath.split("/").filter((p) => p);
    let currentItems: FileItem[] = initialFiles;

    for (const part of pathParts) {
      const folder = currentItems.find(
        (item) => item.name === part && item.type === "folder"
      );
      if (folder?.children) {
        currentItems = folder.children;
      } else {
        return [];
      }
    }
    return currentItems;
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setHistory([...history, path]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentPath(newHistory[newHistory.length - 1]);
    }
  };

  const handleFileClick = (item: FileItem) => {
    if (item.type === "folder") {
      navigateTo(item.path);
    } else {
      setSelectedFile(item);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FiFileText className="text-red-500" />;
      case "md":
        return <FiFileText className="text-blue-500" />;
      default:
        return <FiFile className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto h-[90vh] flex flex-col">
        {/* Search Bar with Recommendations */}
        <div className="mb-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowRecommendations(true);
              }}
              onBlur={() =>
                setTimeout(() => setShowRecommendations(false), 100)
              }
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            {showRecommendations && searchRecommendations.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto border border-gray-700">
                {searchRecommendations.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleRecommendationClick(item)}
                    className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    {item.type === "folder" ? (
                      <FiFolder className="text-yellow-500 mr-2 flex-shrink-0" />
                    ) : (
                      <FiFile className="text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-300 truncate">
                      {item.path.replace("//", "/")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={goBack}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              aria-label="Go back"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {history.map((path, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPath(path)}
                  className="text-sm text-gray-400 hover:text-emerald-400"
                >
                  {path === "/" ? "root" : path.split("/").pop()}
                  {index < history.length - 1 && " / "}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          <div className="w-1/3 bg-gray-800 rounded-lg flex flex-col border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">File Explorer</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {getCurrentFiles().map((item) => (
                <div
                  key={item.path}
                  onClick={() => handleFileClick(item)}
                  className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer mb-1 transition-colors"
                >
                  {item.type === "folder" ? (
                    <FiFolder className="text-yellow-500 mr-2 flex-shrink-0" />
                  ) : (
                    getFileIcon(item.name)
                  )}
                  <span className="text-sm truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/3 bg-gray-800 rounded-lg flex flex-col border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Content Viewer</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {selectedFile ? (
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {selectedFile.name}
                    </h3>
                    {(selectedFile.downloadUrl || selectedFile.contentUrl) && (
                      <a
                        href={
                          selectedFile.downloadUrl || selectedFile.contentUrl
                        }
                        download
                        className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <FiDownload className="mr-2" />
                        Download
                      </a>
                    )}
                  </div>

                  <div className="flex-1 overflow-auto">
                    {selectedFile.content ? (
                      selectedFile.name.endsWith(".md") ? (
                        <div className="prose prose-invert max-w-none">
                          {selectedFile.content}
                        </div>
                      ) : (
                        <SyntaxHighlighter
                          language={selectedFile.name.split(".").pop()}
                          style={vscDarkPlus}
                          className="rounded-lg h-full"
                        >
                          {selectedFile.content}
                        </SyntaxHighlighter>
                      )
                    ) : (
                      <iframe
                        src={
                          selectedFile.contentUrl || selectedFile.downloadUrl
                        }
                        className="w-full h-full rounded-lg"
                        title={selectedFile.name}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Select a file to view its content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
