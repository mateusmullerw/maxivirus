import React, { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { CitizenInfo } from "context";
import { Typography, Avatar, Chip, Pagination } from "@mui/material";
import { AvatarContainer, GridContainer } from "./PopoulationGrid.styles";
import { useNavigate } from "react-router-dom";

const renderInfected = (infected: boolean | undefined) => {
  const label = infected ? "Infected" : "Suvivor";
  const color = infected ? "error" : "success";
  return <Chip label={label} color={color} />;
};

type AvatarProp = {
  name: string;
  image: string;
};
const renderAvatar = (name: string | undefined, image: string | undefined) => {
  return (
    <AvatarContainer>
      <Avatar src={image} />
      <Typography>{name}</Typography>
    </AvatarContainer>
  );
};

const columns: GridColDef[] = [
  {
    disableExport: true,
    field: "id",
    headerName: "ID",
    sortable: false,
  },
  {
    width: 220,
    disableExport: true,
    field: "name",
    headerName: "Name",
    renderCell: (params: GridRenderCellParams<AvatarProp>) =>
      renderAvatar(params.value?.name, params.value?.image),
    sortable: false,
  },
  {
    disableExport: true,
    field: "age",
    headerName: "Age",
    sortable: true,
  },
  {
    disableExport: true,
    field: "gender",
    headerName: "Gender",
    sortable: true,
  },
  {
    width: 120,
    disableExport: true,
    field: "infected",
    headerName: "Infected",
    renderCell: (params: GridRenderCellParams<boolean>) =>
      renderInfected(params.value),
    sortable: true,
  },
  {
    width: 130,
    disableExport: true,
    field: "doi",
    headerName: "Date of infection",
    sortable: true,
  },
  {
    width: 150,
    disableExport: true,
    field: "state",
    headerName: "State",
    sortable: true,
  },
  {
    width: 150,
    disableExport: true,
    field: "city",
    headerName: "City",
    sortable: true,
  },
  {
    width: 250,
    disableExport: true,
    field: "email",
    headerName: "Email",
    sortable: true,
  },
  {
    width: 150,
    disableExport: true,
    field: "phone",
    headerName: "Phone",
    sortable: true,
  },
];

type GridProps = {
  height: string;
  populationDataPage: CitizenInfo[];
  loading: boolean;
  setPage: Function;
  page: number;
  setPageSize: Function;
  numberOfPages: number;
  onRowClick: Function;
};

const Grid: React.FC<GridProps> = ({
  height,
  populationDataPage,
  loading,
  setPage,
  page,
  setPageSize,
  numberOfPages,
  onRowClick,
}) => {

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const rows = populationDataPage.map((item) => {
    const fullName = item.name.first + " " + item.name.last;
    return {
      id: item.email,
      name: { name: fullName, image: item.picture.thumbnail },
      infected: item.infected,
      state: item.location.state,
      city: item.location.city,
      age: item.dob.age,
      gender: item.gender,
      doi: item.infected
        ? new Date(item.registered.date).toLocaleDateString("en-US")
        : "",
      email: item.email,
      phone: item.cell,
    };
  });

  const initialState = {
    columns: {
      columnVisibilityModel: {
        id: false,
        email: false,
        phone: false,
        gender: false,
      },
    },
  };

  const data = {
    initialState: initialState,
    columns: columns,
    rows: rows,
  };

  return (
    <GridContainer height={height}>
      <DataGrid
        style={{ width: "100%"}}
        autoPageSize
        disableColumnFilter
        hideFooter
        onPageSizeChange={handleChangePageSize}
        editMode="row"
        onRowClick={(params: GridRowParams) => onRowClick(params.id)}
        loading={loading}
        {...data}
      />
      <Pagination
        color="primary"
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
        page={page}
      />
    </GridContainer>
  );
};

export default Grid;
