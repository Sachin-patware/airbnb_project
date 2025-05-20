import { useState } from "react";
import axios from '../axiosInstance';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFormValidation  from "../hooks/useFormValidation";

const Signup = ({setUser}) => {
     useFormValidation();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
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
        const res = await axios.post(
          "/signup",
          formData
        );
         setUser(res.data.user)
          setUser(res.data.userid);
        toast.success(res.data.message);
        navigate("/");
       } catch (error) {
            if (error.response && error.response.data) {
            
              const serverError = error.response.data.error;
              const errorMessage = Array.isArray(serverError)
                ? serverError.join("\n")
                : serverError;
              toast.error(errorMessage);
            } 
          }
          finally {
      setLoading(false); 
    }
    };
  

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="text-center mb-4">User SignUp</h2>

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <div className="valid-feedback">
      Looks good !
    </div> <div className="invalid-feedback">Username is required.</div>
              </div>

           
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="valid-feedback">Valid email!</div>
                <div className="invalid-feedback">Please enter a valid email.</div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Password is required.</div>
              </div>

            
              <div className="d-grid">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Signing up..." : "SignUp"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
