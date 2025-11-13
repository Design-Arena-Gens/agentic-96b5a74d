import "./globals.css";
import type { Metadata } from "next";

const title = "English Connector Coach";
const description =
  "Interactive lesson to master English connectors through explanations, guided practice, and adaptive quizzes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
