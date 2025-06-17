import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserProfile({ user, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative">
      <button
        ref={buttonRef}
        className="btn btn-light border-0"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle User Menu"
      >
        <i className="bi bi-person-circle fs-2"></i>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="card position-absolute end-0 mt-2 border-0 shadow rounded-4"
          style={{ width: "320px", zIndex: 1050 }}
        >
          <div className="card-body p-3 pt-2 position-relative">
            <h4 className="m-0 pb-2">Profile</h4>
            <button
              className="close_btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              style={{ fontSize: "1rem", color: "#000" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="d-flex align-items-center border rounded-3 p-1">
              <i className="bi bi-person-circle text-secondary ms-1 me-2 font_size_user"></i>

              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="fw-semibold fs-4 m-0">{user || "Guest"}</div>
                <div
                  className="text-muted email_font text-truncate"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title={email}
                >
                  {email || "Not available"}
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <span className="badge rounded-pill bg-success px-3 py-1">
                Active
              </span>
              <Link
                to="/logout"
                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                onClick={() => {
                  const navbar = document.querySelector(".navbar-collapse");
                  if (navbar?.classList.contains("show")) {
                    navbar.classList.remove("show");
                  }
                  setIsOpen(false);
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
