import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import Homepage from "./Components/Home";
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
import "./Components/rating.css"
import "./App.css";
import { FaRegCompass } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const[email,setEmail]=useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user");
        setUser(res.data.user);
        setEmail(res.data.email)
      } catch {
        setUser(null);
        setEmail(null)
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-0">
          <div className="container-fluid fs-5 ">
            <Link className="navbar-brand" to="/">
              <FaRegCompass className="fa-campass" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav  ">
                <Link className="nav-link " to="/">
                  Home
                </Link>
                <Link className="nav-link " to="/listing">
                  All Listing
                </Link>
                <Link className="nav-link" to="/listing/new">
                  Add New Listing
                </Link>
                <Link className="nav-link" to="#">
                  Disa
                </Link>
              </div>
              <div className="navbar-nav ms-auto ">
                {user ? (
                  <UserProfile user={user} email={email}/>
                ) : (
                  <>
                    <Link className="nav-link" to="/signup">
                      SignUp
                    </Link>
                    <Link className="nav-link " to="/login">
                      LogIn
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup setUser={setUser} setEmail={setEmail} />} />
          <Route path="/login" element={<Login setUser={setUser} setEmail={setEmail}/>} />
          <Route path="/logout" element={<Logout setUser={setUser} setEmail={setEmail}/>} />
          <Route path="/listing" element={<ListingPage />} />
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
