
import { GoogleLogin } from "@react-oauth/google";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoogleLoginButton = ({ setUser, setEmail }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "/auth/google",
        {
          idToken: credentialResponse.credential,
        },
        { withCredentials: true }
      );

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
}
  };


  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} />
    </div>
  );
};

export default GoogleLoginButton;
