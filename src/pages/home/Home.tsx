import React, { useEffect, useState } from "react";
import { PopulationContext, Survival, CitizenInfo } from "context";
import Grid from "components/PopulationGrid";
import UserDetails from "components/UserDetails";
import MainLayout from "layouts/Main";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Filters } from "./Home.styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BR_STATES_NAMES } from "constants/constants";
import { GridRowParams } from "@mui/x-data-grid";

const Home = () => {
  const {
    currentPageData,
    page,
    setPage,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    setInfected,
    loading,
    numberOfPages,
  } = React.useContext(PopulationContext);

  const [openUserDetails, setOpenUserDetails] = React.useState(false);
  const handleClose = () => setOpenUserDetails(false);

  const { urlPage } = useParams();
  const [selectedTab, setSelectedTab] = useState(filters.survival);
  const [selectedState, setSelectedState] = useState(filters.state);
  const [selectedUser, setSelectedUser] = useState<CitizenInfo | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    setPage(urlPage);
  }, [urlPage]);

  useEffect(() => {
    navigate(`/${page}`);
  }, [page]);

  const handleChangePage = (newPage: number) => {
    navigate(`/${newPage}`);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilters({ ...filters, name: newValue });
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: Survival) => {
    setFilters({ ...filters, survival: newValue });
    setSelectedTab(newValue);
  };

  const handleChangeState = (event: SelectChangeEvent) => {
    setFilters({ ...filters, state: event.target.value });
    setSelectedState(event.target.value as string);
  };

  const handleRowClick = (id: string) => {
    const userData = currentPageData.find((user) => user.id === id);
    setSelectedUser(userData);
    if (userData) {
      setOpenUserDetails(true);
    }
  };

  const handleInfect = () => {
    setInfected(selectedUser!.id);
    setSelectedUser({ ...selectedUser!, infected: true });
  };

  return (
    <MainLayout pageTitle="Population list">
      <Tabs
        style={{ margin: "0 0 0 0" }}
        value={selectedTab}
        onChange={handleChangeTab}
      >
        <Tab label="All" value="All" />
        <Tab label="Infected" value="Infected" />
        <Tab label="Survivor" value="Survivor" />
      </Tabs>
      <Filters>
        <TextField
          id="name-filter"
          label="Search by name"
          variant="outlined"
          value={filters.name}
          onChange={handleFilterName}
          style={{ width: "200px" }}
        />
        <Select
          id="state-filter"
          value={selectedState}
          label=""
          onChange={handleChangeState}
        >
          <MenuItem value={"All States"}>{"All States"}</MenuItem>
          {[...Array(26)].map((state, index) => (
            <MenuItem value={BR_STATES_NAMES[index]}>
              {BR_STATES_NAMES[index]}
            </MenuItem>
          ))}
        </Select>
      </Filters>

      <Grid
        height={"calc(100% - 252px)"}
        onRowClick={handleRowClick}
        populationDataPage={currentPageData}
        loading={loading}
        setPage={handleChangePage}
        page={parseInt(urlPage || "1")}
        setPageSize={setPageSize}
        numberOfPages={numberOfPages}
      />
      {selectedUser && (
        <UserDetails
          handleInfect={handleInfect}
          open={openUserDetails}
          handleClose={handleClose}
          userData={selectedUser}
        />
      )}
    </MainLayout>
  );
};

export default Home;
