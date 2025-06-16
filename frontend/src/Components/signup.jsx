import { useState } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import { FiEye, FiEyeOff,} from "react-icons/fi";
import Google from "./google"

const Signup = ({ setUser, setEmail }) => {
  useFormValidation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/signup", formData);
      setUser(res.data.user);
      setEmail(res.data.email);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const serverError = error.response.data.error;
        const errorMessage = Array.isArray(serverError)
          ? serverError.join("\n")
          : serverError;
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 height_70">
      <div className="col-md-6 col-lg-5 col-12 offset-md-3 offset-lg-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-4">
            <h2 className="text-center mb-4 fw-bold">Create Your Account</h2>

            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-3 pe-5"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer text-muted fs-5"
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <>Sign Up</>
                  )}
                </button>
              </div>

              <div className="text-center text-muted mb-3">
                or continue with
              </div>

              <div className="d-flex justify-content-center gap-3 mb-3">
                <Google setUser={setUser} setEmail={setEmail} />
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none"
                  >
                    Log In
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
