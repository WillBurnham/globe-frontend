import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const PinDetails = (props) => {
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
            <center><DialogTitle>{props.title}</DialogTitle></center>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Spot Description"
                        defaultValue={props.description}
                        multiline
                        fullWidth
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                        }}
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PinDetails;