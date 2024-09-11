import type { Metadata } from "next";
import "./globals.scss";
import NavBar from "./components/navBar/page";
import Footer from "./components/footer/page";


export const metadata: Metadata = {
  title: "Gymbeast",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
