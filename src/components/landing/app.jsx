import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Hero from "./hero";
import Footer from "./footer";
import Navbar from "./navbar";
import { Helmet } from "react-helmet";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>ZigyStream - Welcome to the Future of Streaming</title>
        <meta
          name="description"
          content="ZigyStream is the ultimate platform for live streaming. Join or start your own stream effortlessly."
        />
        <meta
          name="keywords"
          content="ZigyStream, live streaming, video streaming, join stream, start stream"
        />
      </Helmet>
      <CssBaseline />
      <Navbar />
      <Hero />
      {/* <Footer/> */}
    </>
  );
}
