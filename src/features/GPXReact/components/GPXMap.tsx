import * as React from "react";
// @ts-ignore
import mapboxgl from "mapbox-gl";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardActions,
} from "@mui/material";
import {Icon} from "../../Shared";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESST_TOKEN;

export default function GPXMap() {

  const id = 'gpxmap';
  const map = React.useRef(null);
  const zoom = 9.6;
  const height = 450;
  const container = React.useRef(null);
  const center = [14.38, 35.94];
  
  React.useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
        container: container.current,
        style: process.env.REACT_APP_MAPBOX_STYLE,
        center,
        zoom: zoom,
        interactive: true,
    })
  })


  return (
    <Box sx={{m:0.5}}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          avatar={<Icon icon="map"/>}
          title="The Maltese Islands"
        /> 
        <Box
          id={id}
          sx={{ height }}
          ref={container}
        />
        <CardActions>
          <Button
            variant="contained"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              console.log ("flyTo...")
            }}
          >
            Fly to Somewhere
          </Button>
        </CardActions>
            
      </Card>
    </Box> 
  );
}
