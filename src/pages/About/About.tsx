import React, { useEffect } from "react";
import MainLayout from "layouts/Main";
import { Typography } from "@mui/material";

function Home() {

  return (
        <MainLayout pageTitle="About">
            <Typography variant="h1">About page</Typography>
        </MainLayout>
  );
}

export default Home;
