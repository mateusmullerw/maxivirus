import React, { useEffect } from "react";
import { PopulationContext } from "context";
import MainLayout from "layouts/Main";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function UserDetails() {
  const {
    currentPageData,
    editCitzen,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
  } = React.useContext(PopulationContext);

  const { id } = useParams();

  const userData = currentPageData.find((user) => user.id === id);
  console.log(userData);

  return (
    <MainLayout pageTitle="User Details">
      {userData && (
        <>
          <Typography>{userData.name.first}</Typography>
          <Typography>{userData.gender}</Typography>
          <Typography>{userData.infected}</Typography>
          <Typography>{userData.phone}</Typography>
        </>
      )}
    </MainLayout>
  );
}

export default UserDetails;
