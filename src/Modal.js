import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PinModal = (props) => {
    const [spotName, setSpotName] = useState("");
    const [spotDescription, setSpotDescription] = useState("");
    const handleSpotNameChange = (e) => {
        setSpotName(e.target.value);
    }
    const handleSpotDescriptionChange = (e) => {
        setSpotDescription(e.target.value);
    }
    const placePin = () => {
        const pin = {
            title: spotName,
            description: spotDescription,
            lat: props.lat,
            lng: props.lng
        }
        axios.post("http://192.168.1.228:8081/create-pin", pin)
            .then(res => console.log(res))
            .then(
                props.handleClose()
            );
    }
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Place a Spot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Before placing the pin, please provide some information about this spot.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Spot Name"
                        fullWidth
                        variant="standard"
                        required={true}
                        onChange={handleSpotNameChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Spot Description"
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
                <Button onClick={props.handleClose}>Close</Button>
                <Button onClick={placePin}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PinModal;