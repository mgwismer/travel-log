import React, { useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import worldMap from '../assets/maps/world-110m.json';
import { SelectYear } from './select-year';
import './world-map.scss';

// hard-coded data
const westportCoordinates = [-73.3, 41.1];
const hiroshimaCoordinates = [132.45, 34.39];
const arcPath = {
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [westportCoordinates, hiroshimaCoordinates],
  }
}

export const WorldMap = () => {
  const [geographies, setGeographies] = useState([])
  const [yearInLife, setYearInLife] = useState('1964')

  const rotationAngle = useMemo(() => {
    if (yearInLife === '1964') {
      return [90, -30, 0]
    }
    if (yearInLife === '1980') {
      return [180, -30, 0]
    }
    return [90, -30, 0]
  }, [yearInLife])

  const projection = d3.geoOrthographic()
    .rotate(rotationAngle)
    .scale(500 / 2.1)
    .translate([600 / 2, 500 / 2])
    .clipAngle(100)
    .precision(.5);

  const geoGenerator = geoPath().projection(projection)
  const mapParameters = useMemo(() => {
    if (yearInLife === '1964') {
      return {
        locations: [{
          cx: projection(westportCoordinates)[0],
          cy: projection(westportCoordinates)[1],
        }],
        path: geoGenerator({})
      };
    }
    // year 1980 should center on Japan
    if (yearInLife === '1980') {
      return {
        locations: [
          {
            cx: projection(westportCoordinates)[0],
            cy: projection(westportCoordinates)[1],
          },
          {
            cx: projection(hiroshimaCoordinates)[0],
            cy: projection(hiroshimaCoordinates)[1],
          },
        ],
        path: geoGenerator(arcPath)
      }
    }
    return {
      locations: []
    }
  },[yearInLife])

  useEffect(() => {
    const wfeatures = feature(worldMap, worldMap.objects.countries).features;
    setGeographies(wfeatures);
  }, [])

  return (
    <div className='world-container'>
      <svg width={ 600 } height={ 450 } viewBox="0 0 800 450">
        <g className="countries">
          {
            geographies.map((d,i) => {
              return (
                  <path
                    key={ `path-${ i }` }
                    d={ geoGenerator(d) }
                    className="country"
                    fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }
                    stroke="#FFFFFF"
                    strokeWidth={ 0.5 }
                  />
              )
            })
          }
        </g>
        <g className="markers">
         {mapParameters.locations.map((d, i) => 
            <circle
              cx={d.cx}
              cy={d.cy}
              r={ 5 }
              fill="#E91E63"
              className="marker"
            />
          )}
          <path
            d={mapParameters.path}
            strokeWidth = { 2 }
            stroke = "#AA5678"
            fill="none"
          />
        </g>
      </svg>
      <div className='select-year'>
        <SelectYear
          year={yearInLife}
          changeYear={setYearInLife} 
        />
      </div>
    </div>
  )
}
