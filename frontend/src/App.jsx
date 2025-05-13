import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Homepage from "./Components/Home";
import ListingPage from "./Components/Listing";
import ListingDetail from "./Components/ListingDetail";
import Footer from "./Components/footer";
import NewListing from "./Components/newlisting";
import EditListing from "./Components/editlisting";
import NotFound from "./Components/pageNotFound"
import "./App.css";
import { FaRegCompass } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-md bg-white border-bottom height sticky-top">
        <div className="container-fluid">
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
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/listings">
                All Listing
              </Link>
              <Link className="nav-link" to="/listings/new">
                Add New Listing
              </Link>
              <Link className="nav-link" to="#">
                Disa
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/listings" element={<ListingPage />} />
          <Route path="/listing/edit" element={<EditListing />} />
          <Route path="/listings/new" element={<NewListing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
