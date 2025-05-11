import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 4000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container vh-100 text-center pt-5">
      <h2>404 - Page Not Found ⚠️</h2>
      <p>Redirecting to home page....</p>
    </div>
  );
};
export default NotFound;

