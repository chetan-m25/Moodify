import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.scss";

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
      <div className="navbar__logo">Moodify</div>

      <div className="navbar__right" ref={dropdownRef}>
        <button className="navbar__user" onClick={() => setOpen(!open)}>
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </button>

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
