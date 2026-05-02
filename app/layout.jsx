import "./globals.css";

export const metadata = {
  title: "Digital Gurukul Nepal",
  description: "Coding, AI, Web, App and Cyber Safety platform for Class 4–10 students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
