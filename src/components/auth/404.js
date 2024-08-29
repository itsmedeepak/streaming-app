import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Navbar from "../landing/navbar";
import Footer from "../landing/footer";
import { Helmet } from "react-helmet";
export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - ZigyStream</title>
        <meta
          name="description"
          content="The page you're looking for does not exist on ZigyStream."
        />
        <meta name="keywords" content="ZigyStream 404, page not found" />
      </Helmet>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button variant="contained">Back Home</Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
