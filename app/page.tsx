import Image from "next/image";
import Link from "next/link";
import DownloadButton from "@components/DownloadButton";

export default function Home() {
  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900" />

        <div className="relative space-y-12">
          {/* Name with Gradient Animation */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
            Edward Sean Alexander
          </h1>

          {/* Search Bar with Glow Effect */}
          <div className="w-full max-w-2xl relative group">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-5 rounded-2xl bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm group-hover:border-emerald-400/50"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Profile Section with Glass Morphism */}
          <div className="flex flex-col md:flex-row items-center gap-12 p-8 bg-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-lg hover:border-emerald-400/30 transition-all duration-300">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-emerald-400/20 hover:border-emerald-400/40 transition-all group">
              <Image
                src="/images/edward-photo.jpeg"
                alt="Edward Alexander Profile Picture"
                width={256}
                height={256}
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                quality={90}
                priority
                sizes="(max-width: 768px) 100vw, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>

            <div className="max-w-2xl text-left space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                A 3rd-year Computer Science student at the Chinese University of
                Hong Kong, Shenzhen, aiming to gain professional IT and
                programming experience. Actively involved in research,
                organisations, and created self-made projects using multiple
                programming languages. Excellent problem-solving abilities and a
                commitment to writing clean, scalable code.
              </p>
              <div className="flex gap-4">
                <Link href="/projects">
                  <button className="px-6 py-3 bg-emerald-400/10 text-emerald-400 rounded-xl border border-emerald-400/20 hover:bg-emerald-400/20 transition-all">
                    View Projects
                  </button>
                </Link>

                {/* <button
                  className="px-6 py-3 bg-cyan-400/10 text-cyan-400 rounded-xl border border-cyan-400/20 hover:bg-cyan-400/20 transition-all"
                  onClick={downloadCV}
                >
                  Download CV
                </button> */}
                <DownloadButton
                  fileUrl="/files/Edward_CV.pdf"
                  downloadName="Edward_Alexander_CV.pdf"
                >
                  Download CV
                </DownloadButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
