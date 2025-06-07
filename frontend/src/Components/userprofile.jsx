import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserProfile({ user, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="position-relative">
      <button
        className="btn btn-light border-0"
        onClick={togglePopup}
        aria-label="User Profile"
      >
        <i className="bi bi-person-circle fs-2"></i>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="card position-absolute end-0 mt-2 shadow-sm"
          style={{ width: "310px", zIndex: 1050 }}
        >
          <div className="card-body p-2">
            <div className="d-flex">
              <i className="bi bi-person-circle fs-1 text-secondary me-3 align-self-start"></i>
              <div className="flex-grow-1 text-break">
                <div className="fw-normal mb-1">
                {user || "Guest"}
                </div>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                 {email || "Not available"}
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between align-items-center">
              <span className="badge bg-success">Active</span>
              <Link to="/logout" className="btn btn-sm btn-outline-danger">
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
