import React, {useEffect} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import "./Home.css";
import {fetchPopulationData} from '../../api/axios';
import { PopulationContext } from '../../context';

function Home() {
    const { populationData, editCitzen, page, setPage, resultsPerPage, setResultsPerPage } = React.useContext(PopulationContext)

    
  return (
    <div className="Home">
        <button onClick={() => setPage(page +1)}>next page</button>
        <button onClick={() => setResultsPerPage(resultsPerPage +10)}>number per page + 10</button>

        {/* <Drawer variant="permanent" open={false}>
          <List>
          {['Dashboard', 'Survivors', 'Infected', 'About'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer> */}
        <div className='home-content'>Content</div>
    </div>
  );
}

export default Home;
