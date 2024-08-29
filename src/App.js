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
      <Helmet>
      <Helmet>
        <title>{process.env.REACT_APP_ZEGO_APP_ID}ZigyStream - Welcome to the Future of Streaming</title>
        <meta name="description" content="ZigyStream is the ultimate platform for live streaming. Join or start your own stream effortlessly." />
        <meta name="keywords" content="ZigyStream, live streaming, video streaming, join stream, start stream, live video, streaming platform, video broadcast, live content, stream online, real-time video, live show, video chat, streaming service, live event, stream hosting, video platform, streaming app, video sharing, live broadcasting, interactive streaming, online video, video streaming app, live video chat, professional streaming, stream integration, live streaming solutions, video stream, stream quality, live stream events, video streaming solutions, streaming technology, live stream service, video conference, live stream platform, online streaming, video streaming service, real-time streaming, streaming tools, video content, live video service, video production, streaming apps, live video solutions, video on demand, video sharing platform, live stream technology, video streaming solutions, live event streaming, interactive video, live performance, live video broadcasting, stream management, video broadcasting solutions, online live streaming, video content creation, live show streaming, live video platform, streaming experiences, video streaming technology, live video streaming solutions, video streaming technology solutions, live video management, streaming content, video hosting platform, online video streaming solutions, live event broadcasting, real-time video streaming solutions, video streaming management, live video event solutions, video live streaming, streaming and broadcasting, interactive video streaming, video streaming and hosting" />

        {/* Open Graph Meta Tags for Facebook */}
        <meta property="og:title" content="ZigyStream - Welcome to the Future of Streaming" />
        <meta property="og:description" content="ZigyStream is the ultimate platform for live streaming. Join or start your own stream effortlessly." />
        <meta property="og:image" content="https://yourwebsite.com/images/landing-preview.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="ZigyStream - Welcome to the Future of Streaming" />
        <meta name="twitter:description" content="ZigyStream is the ultimate platform for live streaming. Join or start your own stream effortlessly." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/landing-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />

      </Helmet>
      </Helmet>
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
