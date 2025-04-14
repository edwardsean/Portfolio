"use client";

interface DownloadButtonProps {
  fileUrl: string;
  downloadName: string;
  children: React.ReactNode;
  className?: string;
}

export default function DownloadButton({
  fileUrl,
  downloadName,
  children,
  className = "",
}: DownloadButtonProps) {
  const downloadFile = () => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = downloadName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <button
      onClick={downloadFile}
      className={`px-6 py-3 bg-cyan-400/10 text-cyan-400 rounded-xl border border-cyan-400/20 hover:bg-cyan-400/20 transition-all ${className}`}
    >
      {children}
    </button>
  );
}
