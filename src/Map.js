import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import PinModal from "./Modal";
import Pin from "./pin.png";

const Marker = ({ id,lat,lng,title }) => <img src={Pin} height={30} width={30}/>;

export default function Map(){

    const [pins, setPins] = useState([]);
    const [tempPins, setTempPins] = useState([]);
    const [coords, setCoords] = useState([0,0]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

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
    </div>
  );
}