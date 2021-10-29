import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import PinModal from './Modal';


const Navbar = () => {
    const nameStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "inline"
    }
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                    justify="space-between" 
                    container 
                    >
                        <Grid item>
                            <h2 style={nameStyle}>Dumping Grounds</h2>
                        </Grid>
                        <Grid item>
                            <PinModal/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;