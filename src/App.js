import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";  // Import react-helmet
import Landing from "./components/landing/app";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import NewStream from "./components/stream/new-stream";
import { useSelector } from "react-redux";
import Dashboard from "./components/dashboard";
import Page404 from "./components/auth/404";
import JoinStream from "./components/stream/join-stream";


const App = () => {
  const user = useSelector((state) => state.auth.user);
 
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/sign-up" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={!user ? <Navigate to="/sign-in" /> : <Dashboard />} />
        <Route path="/start-stream" element={!user ? <Navigate to="/sign-in" /> : <NewStream />} />
        <Route path="/join-stream" element={<JoinStream />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
