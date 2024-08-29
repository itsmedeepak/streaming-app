import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Hero from "./hero";
import Footer from "./footer";
import Navbar from "./navbar";
import { Helmet } from "react-helmet";

export default function LandingPage() {
  return (
    <>

      <CssBaseline />
      <Navbar />
      <Hero />
      {/* <Footer/> */}
    </>
  );
}
