import React, { useEffect, useState } from "react";
import { PopulationContext } from "context";
import Grid from "components/PopulationGrid";
import MainLayout from "layouts/Main";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Filters } from "./Home.styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {BR_STATES_NAMES} from 'constants/constants';

function Home() {
  const {
    currentPageData,
    editCitzen,
    page,
    setPage,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    loading,
    numberOfPages,
  } = React.useContext(PopulationContext);
  const navigate = useNavigate();
  const { urlPage } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedState, setSelectedState] = useState("27");

  const tabFilterMap = {
    0: "All",
    1: "Infected",
    2: "Survivor",
  };

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

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: 0 | 1 | 2
  ) => {
    setFilters({ ...filters, survival: tabFilterMap[newValue] });
    setSelectedTab(newValue);
  };

  const handleChangeState = (event: SelectChangeEvent) => {

    setFilters({ ...filters, state: BR_STATES_NAMES[parseInt(event.target.value)] })
    setSelectedState(event.target.value as string);
  };

  return (
    <MainLayout pageTitle="Population list">
     
      <Filters>
        <TextField
          id="name-filter"
          label="Search by name"
          variant="outlined"
          value={filters.name}
          onChange={handleFilterName}
        />
        <Select
          id="state-filter"
          value={selectedState}
          label=""
          onChange={handleChangeState}
        >
          <MenuItem value={"27"}>{"All States"}</MenuItem>
          {[...Array(26)].map((state, index )=>  <MenuItem value={index}>{BR_STATES_NAMES[index]}</MenuItem>)}
        </Select>
      </Filters>
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        <Tab label={tabFilterMap[0]} />
        <Tab label={tabFilterMap[1]} />
        <Tab label={tabFilterMap[2]} />
      </Tabs>
      <Grid
        populationDataPage={currentPageData}
        loading={loading}
        setPage={handleChangePage}
        page={parseInt(urlPage || "1")}
        setPageSize={setPageSize}
        numberOfPages={numberOfPages}
      />
    </MainLayout>
  );
}

export default Home;

