import { useState } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import Google from "./google";

const LogIn = ({ setUser, setEmail }) => {
  useFormValidation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/login", formData);
      toast.success(res.data.message);
      setUser(res.data.user);
      setEmail(res.data.email);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.error) {
        const serverError = error.response.data.error;
        toast.error(
          Array.isArray(serverError) ? serverError.join("\n") : serverError
        );
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
            <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>

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
                  placeholder="Email"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="username">Email</label>
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
                    <>
                      <FiLogIn className="me-2" />
                      Log In
                    </>
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
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="fw-semibold text-decoration-none"
                  >
                    Register
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

export default LogIn;
