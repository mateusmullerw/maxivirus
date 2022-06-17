import React, { useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridRowParams  } from '@mui/x-data-grid';
import {CitizenInfo} from 'context';
import { Typography, Avatar, Chip, Pagination } from '@mui/material';
import { AvatarContainer, GridContainer } from './PopoulationGrid.styles';
import { useNavigate } from "react-router-dom";

const renderInfected = (infected: boolean | undefined) => {
  const label = infected ? "Infected" : "Suvivor"
  const color = infected ? "error" : "success"
  return(
    <Chip label={label} color={color}/>
  )
}

type AvatarProp = {
  name: string,
  image: string,
}
const renderAvatar = (name: string | undefined, image: string | undefined) => {
  return(
    <AvatarContainer>
       <Avatar src={image}/>
       <Typography>{name}</Typography>
    </AvatarContainer>
  )
}

const columns: GridColDef[] = [
  {
    disableExport: true,
    field: "id",
    filterable: false,
    headerName: "ID",
    sortable: false,
    
  },
  {
    width: 220,
    disableExport: true,
    field: "name",
    filterable: false,
    headerName: "Name",
    renderCell: (params: GridRenderCellParams<AvatarProp>) => renderAvatar(params.value?.name, params.value?.image),
    sortable: false,
    
  },
  {
    width: 120,
    disableExport: true,
    field: "infected",
    filterable: true,
    headerName: "Infected",
    renderCell: (params: GridRenderCellParams<boolean>) => renderInfected(params.value),
    sortable: true,
    
  },
  {
    width: 150,
    disableExport: true,
    field: "state",
    filterable: true,
    headerName: "State",
    sortable: true,    
  },
]

type GridProps = {
  populationDataPage: CitizenInfo[],
  loading: boolean,
  setPage: Function,
  page: number,
  setPageSize: Function,
}
const Grid: React.FC<GridProps> = ({populationDataPage, loading, setPage, page, setPageSize}) => {
  const navigate = useNavigate();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
  }

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/user/${params.id}`)
    console.log(params)

  }

    const rows = populationDataPage.map(item => {
      const fullName = item.name.first + " " + item.name.last
      return{
        id: item.email,
        name: {name: fullName, image: item.picture.thumbnail},
        infected: item.infected,
        state: item.location.state,
        nationality: item.nat,
      }
    })

    const initialState = {
      columns: {
        columnVisibilityModel: {
          id: false,
        }
      }
    }

    const data = {
      initialState: initialState,
      columns: columns,
      rows: rows,
    }
  
    return (
      <GridContainer >
        <DataGrid
          style={{width: "100%"}}
          autoPageSize
          disableColumnFilter
          hideFooter
          onPageSizeChange={handleChangePageSize}
          editMode="row"
          onRowClick={handleRowClick}
          loading={loading}
          {...data}
        />
         <Pagination 
         count={10} 
         variant="outlined" 
         shape="rounded" 
         onChange={handleChangePage}
         page={page}
         />
      </GridContainer>
    );
  }

  export default Grid;