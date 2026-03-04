import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function logoutUser() {
    await handleLogout();
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        Moodify
      </Link>

      <div className="navbar__right" ref={dropdownRef}>
        <div className="tooltip">
          <button
            className="navbar__upload"
            onClick={() => navigate("/upload")}
          >
            <i className="ri-upload-cloud-line"></i>
          </button>
          <span className="tooltip-text">Upload Song</span>
        </div>

        <div className="tooltip">
          <button className="navbar__user" onClick={() => setOpen(!open)}>
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </button>
          <span className="tooltip-text">click to logout</span>
        </div>

        {open && (
          <div className="navbar__dropdown">
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
