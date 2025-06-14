import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import ListingPage from "./Components/Listing";
import ListingDetail from "./Components/ListingDetail";
import Footer from "./Components/footer";
import NewListing from "./Components/newlisting";
import EditListing from "./Components/editlisting";
import NotFound from "./Components/pageNotFound";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Logout from "./Components/logout";
import UserProfile from "./Components/userprofile";
import "./Components/rating.css";
import "./App.css";
import { FaRegCompass } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [searchText, setSearchText] = useState("");
  const closeNavbar = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user");
        setUser(res.data.user);
        setEmail(res.data.email);
      } catch {
        setUser(null);
        setEmail(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-md bg-white  sticky-top py-0">
          <div className="container-fluid fs-5 border-bottom">
            <Link className="navbar-brand m-0" to="/">
              <img className="logo_img" src="\logo_img.png" alt="logo"  />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse marg_navitem" id="navbarNav">
              <div className="navbar-nav  ">
                <Link className="nav-link font_nav ms-2" to="/" onClick={closeNavbar}>
                  Explore
                </Link>
              </div>
              <div className="navbar-nav ms-auto">
                <form
                  className="d-flex "
                  role="search"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className="form-control input_search me-2"
                    type="search"
                    placeholder="Search destination"
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="btn " id="btn_search" type="submit" onClick={closeNavbar}>
                    <FaMagnifyingGlass /> Search
                  </button>
                </form>
              </div>
              <div className="navbar-nav ms-auto gap-2 ">
                <Link
                  className="nav-link d-flex align-items-center font_nav"
                  to="/listing/new"
                  onClick={closeNavbar}
                >
                  <span>Become a Host</span>
                </Link>
                {user ? (
                  <UserProfile user={user} email={email} />
                ) : (
                  <>
                    <Link
                      className="nav-link font_nav fw-semibold text-dark"
                      to="/signup"
                      onClick={closeNavbar}
                    >
                      SignUp
                    </Link>
                    <Link
                      className="nav-link font_nav fw-semibold text-dark"
                      to="/login"
                      onClick={closeNavbar}
                    >
                      LogIn
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr />
        </nav>
        <ToastContainer />

        <Routes>
          <Route
            path="/signup"
            element={<Signup setUser={setUser} setEmail={setEmail} />}
          />
          <Route
            path="/login"
            element={<Login setUser={setUser} setEmail={setEmail} />}
          />
          <Route
            path="/logout"
            element={<Logout setUser={setUser} setEmail={setEmail} />}
          />
          <Route path="/" element={<ListingPage searchText={searchText} />} />
          <Route path="/listing/edit" element={<EditListing />} />
          <Route path="/listing/new" element={<NewListing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
