
const axios = require("axios");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const verifyEmail = async (email) => {
  const API_KEY = process.env.EMAIL_VERIFY_KEY;
  
  try {
    const response = await axios.get("https://api.hunter.io/v2/email-verifier", {
      params: {
        email,
        api_key: API_KEY,
      },
    });

    const { result, score } = response.data.data;

   
    return {
      isValid: result === "deliverable" || score > 80,
      status: result,
      score,
    };
  } catch (error) {
    console.error("Email verification error:", error.response?.data || error.message);
    return { isValid: false, error: "Verification failed" };
  }
};

module.exports = verifyEmail;
