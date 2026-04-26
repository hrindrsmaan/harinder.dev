// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/");
      // Wait a bit for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // If on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <div className="logo">harinder.dev</div>
        <ul className="nav-links">
          <li>
            <button onClick={() => handleNavigation("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => handleNavigation("experience")}>
              Experience
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("projects")}>
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("contact")}>Contact</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
