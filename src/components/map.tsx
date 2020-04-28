import React from 'react';
import { Geography, Geographies, ComposableMap, ZoomableGroup } from "react-simple-maps"
import newMexTopo from '../assets/maps/newMexTopo.json';
import japanTopo from '../assets/maps/gadm36_JPN_2.json';

// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

console.log('geo url', geoUrl);
console.log('new mex', newMexTopo);
export const MapTest = () => {
    return (
        <div>
            <ComposableMap 
                projection="geoAlbers"
                projectionConfig={{ scale: 200 }}
            >
                <ZoomableGroup>
                    <Geographies geography={japanTopo}>
                        {({geographies, projection}) => geographies.map(geography => {
                            return <Geography 
                                key={geography.rsmKey}
                                geography={geography}
                                style={{
                                    default: {
                                       fill: "#ECEFF1",
                                       stroke: "#607D8B",
                                       strokeWidth: 0.75,
                                       outline: "none",
                                    },
                                    hover: {
                                       fill: "#CFD8DC",
                                       stroke: "#607D8B",
                                       strokeWidth: 1,
                                       outline: "none",
                                    },
                                    pressed: {
                                       fill: "#FF5722",
                                       stroke: "#607D8B",
                                       strokeWidth: 1,
                                       outline: "none",
                                    }
                                }}
                            />
                        }
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}