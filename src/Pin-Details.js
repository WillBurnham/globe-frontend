import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const PinDetails = (props) => {
    const [spotDescription, setSpotDescription] = useState(props.description);

    const handleSpotDescriptionChange = (e) => { setSpotDescription(e.target.value); }

    const handleUpdateClicked = () => {

        const updatedPin = {
            title: props.title,
            description: spotDescription,
            lat: props.lat,
            lng: props.lng
        }
        
        if (props.description === spotDescription) {
            alert("No updates have been made.");
        } else {
            axios.put("http://192.168.1.228:8081/pins", updatedPin)
            .then(
                props.handleClose()
            );
        }
    }

    useEffect(() => {
        setSpotDescription(props.description);
    }, [props.description]);

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
            <center><DialogTitle>{props.title}</DialogTitle></center>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Spot Description"
                        defaultValue={spotDescription}
                        multiline
                        fullWidth
                        variant="standard"
                        onChange={handleSpotDescriptionChange}
                    />
                    <TextField
                        margin="dense"
                        id="lat"
                        label="Latitude"
                        defaultValue={props.lat}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="lng"
                        label="Longitute"
                        defaultValue={props.lng}
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button>Delete</Button>
                    <Button style={{marginLeft:"auto"}} onClick={handleUpdateClicked}>Update</Button>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PinDetails;