// import "./globals.css";
// import { Inter } from "next/font/google";
// import Header from "../components/header";
// import Footer from "../components/footer";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-gray-900 text-white`}>
//         <Header />
//         <main className="min-h-screen pt-20">
//           {" "}
//           {/* Offset for fixed header */}
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
      </body>
    </html>
  );
}
