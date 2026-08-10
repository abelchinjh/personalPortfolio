import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import "./pages/Pages.css";

function Layout() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-one" aria-hidden />
      <div className="ambient ambient-two" aria-hidden />
      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark">AC</span>
          <span>Abel Chin</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/portfolio">Work</NavLink>
          <a href="https://linkedin.com/in/abelchinjh" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </nav>
      <Outlet />
    </div>
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
