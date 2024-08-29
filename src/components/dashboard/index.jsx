import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../landing/navbar";
import TableAllStreams from "./table";
import { Box, Button } from "@mui/material";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard - ZigyStream</title>
        <meta
          name="description"
          content="Manage your live streams, view analytics, and control your ZigyStream account from the dashboard."
        />
        <meta
          name="keywords"
          content="ZigyStream dashboard, live stream management, stream analytics"
        />
      </Helmet>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          width: "70%",
          minWidth: "390px",
          margin: "0 auto",
          marginTop: "150px",
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" href="/start-stream">
            Start Streaming
          </Button>
        </Box>
        <TableAllStreams />
      </Box>
    </>
  );
}
