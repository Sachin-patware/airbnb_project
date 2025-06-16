// Footer.jsx
import { FaGlobe, FaFacebookF, FaXTwitter, FaInstagram , FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer position-footer">
      <div className="footer-left">
        <span>© 2025 Triphaven, Inc.</span>
        <span>· Privacy</span>
        <span>· Terms</span>
        <span>· Sitemap</span>
        <span>· Company details</span>
      </div>
      <div className="footer-right">
        <span>
          <FaGlobe /> English (IN)
        </span>
        <span>
          <FaRupeeSign /> INR
        </span>
        
         <a
    href="mailto:sachinpatware10@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-dark"
  >
   <IoMail className="icon  fs-4" />
  </a>
         <a
          href="tel:+917974390787"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <FaPhone className="icon  " />
  </a> 
 
        <a
          href="https://www.facebook.com/profile.php?id=100070612633498"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <FaFacebookF className="icon " />
        </a>
        <a
          href="https://x.com/patware_sa6889?t=LYMwQBfhI3GSEyFG9ZRszA&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <FaXTwitter className="icon" />
        </a>
        <a
          href="https://www.instagram.com/____sachin_.31/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
        >
          <FaInstagram className="icon" />
        </a>
       
      </div>
    </footer>
  );
};

export default Footer;
