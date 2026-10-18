import ThemeSelector from "./ThemeSelector";
import { useEffect } from "react";
import { useMotionAllowed } from "./useMotionAllowed";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import "./pages/Pages.css";
export default function App({ route = "/" }: { route?: string }) {
  const motionAllowed = useMotionAllowed();
  useEffect(() => {
    document.documentElement.dataset.motion = motionAllowed ? "on" : "off";
  }, [motionAllowed]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Abel Chin home">
          <img src="/favicon.svg" width="28" height="28" alt="" />
          Abel Chin
        </a>
        <nav aria-label="Primary navigation">
          <a href="/portfolio">Work</a>
          <a href="/#background">Background</a>
          <a href="/#contact">
            Contact
          </a>
          <ThemeSelector />
        </nav>
      </header>
      {route.replace(/\/$/, "") === "/portfolio" ? (
        <PortfolioPage />
      ) : (
        <HomePage />
      )}
      <footer className="footer">
        <span>© {new Date().getFullYear()} Abel Chin</span>

      </footer>
    </>
  );
}
