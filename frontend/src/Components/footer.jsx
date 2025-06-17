import {
  FaGlobe,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPhone,
} from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light py-3 border-top">
      <div className="container">
        <div className="row text-center text-md-start gy-3">
          {/* Left Side */}
          <div className="col-12 col-md-6 d-flex flex-wrap justify-content-center justify-content-md-start gap-2 small text-secondary">
            <span>© 2025 Triphaven, Inc.</span>
            <span>· Privacy</span>
            <span>· Terms</span>
            <span>· Sitemap</span>
            <span>· Company details</span>
          </div>

          {/* Right Side */}
          <div className="col-12 col-md-6 d-flex flex-wrap justify-content-center justify-content-md-end gap-3 align-items-center">
            <span className="d-flex align-items-center gap-1">
              <FaGlobe /> English (IN)
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaRupeeSign /> INR
            </span>
            <a
              href="mailto:sachinpatware10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5"
            >
              <IoMail />
            </a>
            <a
              href="tel:+917974390787"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5"
            >
              <FaPhone />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100070612633498"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/patware_sa6889?t=LYMwQBfhI3GSEyFG9ZRszA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/____sachin_.31/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-5"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
