import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";
import {Box, Container, Grid} from "@mui/material";

export default function Home() {
  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <NavBar />
        <Container sx={{pt:5, pb:5, minHeight:"83vh"}}>
            <Box sx={{flexGrow:1}}>
                <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                    <Grid item xs={2} sm={4} md={4}>
                    <PostCard />
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}
