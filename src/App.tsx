import React from "react";
import "./index.css";
import HomePage from "./components/HomePage/HomePage";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  return (
    <>
      <HomePage />;
      <Analytics />
    </>
  );
};

export default App;
