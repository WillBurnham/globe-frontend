import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import PinModal from "./Modal";
import PinDetails from "./Pin-Details";
import Pin from "./pin.png";

export default function Map(){

    const [pins, setPins] = useState([]);
    const [tempPins, setTempPins] = useState([]);
    const [coords, setCoords] = useState([0,0]);
    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [pinDetailsOpen, setPinDetailsOpen] = useState(false);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const handleOpenPinDetails = () => { setPinDetailsOpen(true) };
    const handleClosePinDetails = () => { setPinDetailsOpen(false) };

    const handlePinClicked = (e, props) => {
      var latitude = props[0];
      var longitude = props[1];
      var desc = props[2];
      var pinTitle = props[3];

      setLat(latitude);
      setLng(longitude);
      setDescription(desc);
      setTitle(pinTitle);

      e.stopPropagation();
      handleOpenPinDetails();
    }

    const Marker = ({ id,lat,lng,description,title }) => <button onClick={(e) => {handlePinClicked(e, [lat,lng,description,title])}} style={{backgroundColor:"transparent", border:"none"}}><img src={Pin} alt={title} height={30} width={30}/></button>;

    const defaultProps = {
        center: {
        lat: 30,
        lng: -95
        },
        zoom: 6
    };

    const handleModalCallBack = (data) => { setTempPins(tempPins.concat(data)); }

    useEffect(() => {
        axios.get("http://192.168.1.228:8081/pins").then(res => {
          setPins(res.data);
        })
    }, []);

    useEffect(() => {
      if (tempPins.length > 0) {
        if (pins.indexOf(tempPins[0]) === -1) {
          setPins(pins.concat(tempPins));
        }
        else {
          setTempPins([]);
        }
      }
    }, [tempPins, pins]);

    const addPin = (ev) => {
      handleOpen();
      setCoords([ev.lat, ev.lng]);
    };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={addPin}
      >
        {
          pins.map(pin => (
            <Marker
                key={pin.id}
                lat={pin.lat}
                lng={pin.lng}
                title={pin.title}
                description={pin.description}
            />
          ))
        }
      </GoogleMapReact>
      <PinModal 
        open={open}
        lat={coords[0]}
        lng={coords[1]}
        handleClose={handleClose}
        parentCallBack={handleModalCallBack}
      />
      <PinDetails
        open={pinDetailsOpen}
        lat={lat}
        lng={lng}
        description={description}
        title={title}
        handleClose={handleClosePinDetails}
      />
    </div>
  );
}