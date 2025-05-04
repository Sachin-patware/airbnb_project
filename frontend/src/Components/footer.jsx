// Footer.jsx
import { FaGlobe, FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer position-footer">
      <div className="footer-left">
        <span>© 2025 Airbnb, Inc.</span>
        <span>· Privacy</span>
        <span>· Terms</span>
        <span>· Sitemap</span>
        <span>· Company details</span>
      </div>
      <div className="footer-right">
        <span><FaGlobe /> English (IN)</span>
        <span><FaRupeeSign /> INR</span>
        <FaFacebookF className="icon" />
        <FaXTwitter className="icon" />
        <FaInstagram className="icon" />
      </div>
    </footer>
  );
};

export default Footer;
