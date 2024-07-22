import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Admin from "./components/admin/Admin";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { AuthProvider } from "./components/auth/AuthProvider";
import Profile from "./components/auth/Profile";
import Registration from "./components/auth/Registration";
import RequireAuth from "./components/auth/RequireAuth";
import ExistingMovies from "./components/movies/ExistingMovies";
import ExistingProjections from "./components/projections/ExistingProjections";
import MovieListing from "./components/movies/MovieListing";
import ProjectionListing from "./components/projections/ProjectionListing";
import AddMovie from "./components/movies/AddMovie";
import EditMovie from "./components/movies/EditMovie";
import AddProjection from "./components/projections/AddProjection";
import EditProjection from "./components/projections/EditProjection";
import BoughtTicketsSuccess from "./components/bought-tickets/BoughtTicketsSuccess";
import About from "./components/about/About";
import Checkout from "./components/bought-tickets/Checkout";
import StripeProvider from "./components/payment/StripeProvider";
import FindBoughtTickets from "./components/bought-tickets/FindBoughtTickets";

function App() {
  return(
    <AuthProvider>
      <StripeProvider>
        <main>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/about" element={<About />} />
                <Route path="/edit-movie/:movieId" element={<EditMovie />} />
                <Route path="/edit-projection/:projectionId" element={<EditProjection />} />
                <Route path="/existing-movies" element={<ExistingMovies />} />
                <Route path="/existing-projections" element={<ExistingProjections />} />
                <Route path="/add-movie" element={<AddMovie />} />
                <Route path="/add-projection" element={<AddProjection />} />
                <Route path="buy-ticket/:movieId"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
                />
                
                <Route path="/browse-all-movies" element={<MovieListing />} />
                <Route path="/browse-all-projections" element={<ProjectionListing />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/bought-ticket-success" element={<BoughtTicketsSuccess />} />
                <Route path="/find-bought-tickets" element={<FindBoughtTickets />} />
                
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </Router>
            <Footer />
          </main>
      </StripeProvider>
    </AuthProvider>
  );
}

export default App;