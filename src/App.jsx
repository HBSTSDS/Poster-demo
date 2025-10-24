import { StrictMode } from "react";
import PosterConfigurator from "./pages/PosterConfigurator.jsx";
import "./index.css";

export default function App() {
  // MVP: uma única página
  return (
    <StrictMode>
      <div className="page">
        <header className="topbar">
          <div className="brand">Demo - Souvenir Editions</div>
        </header>

        <main className="content">
          <PosterConfigurator />
        </main>
      </div>
    </StrictMode>
  );
}
