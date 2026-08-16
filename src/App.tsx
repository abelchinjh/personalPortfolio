import { useEffect } from "react";
import { NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
import MotionLayer from "./MotionLayer";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import "./pages/Pages.css";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <MotionLayer />
      <div className="pointer-aura" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="page-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink className="brand" to="/" end>
            <span className="brand-mark"><span>AC</span></span>
            <span>Abel Chin</span>
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/portfolio">Work</NavLink>
            <a href="https://linkedin.com/in/abelchinjh" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <span className="availability"><i /> Building in public</span>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
      </Route>
    </Routes>
  );
}
