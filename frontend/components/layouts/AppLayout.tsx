import React from "react";
import Navbar from "./Navbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
