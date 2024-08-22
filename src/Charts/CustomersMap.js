import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CustomersOnMap = ({locations}) => {
  const [mapsData, setMapsData] = useState([]);
  const centerPosition = [37.0902, -95.7129];
  //Assume that we get the latitude and longitude from a geo location API
  const cdata = [
    { _id: 'El Paso', count: 13, latitude: 31.7619, longitude: -106.4850 },
    { _id: 'Stockton', count: 13, latitude: 37.9577, longitude: -121.2908 },
    { _id: 'Plano', count: 13, latitude: 33.0198, longitude: -96.6989 },
    { _id: 'Oakland', count: 11, latitude: 37.8044, longitude: -122.2711 },
    { _id: 'Washington', count: 11, latitude: 38.9072, longitude: -77.0369 },
    { _id: 'Seattle', count: 11, latitude: 47.6062, longitude: -122.3321 },
    { _id: 'Kansas City', count: 11, latitude: 39.0997, longitude: -94.5786 },
    { _id: 'Las Vegas', count: 11, latitude: 36.1699, longitude: -115.1398 },
    { _id: 'San Antonio', count: 11, latitude: 29.4241, longitude: -98.4936 },
    { _id: 'St. Paul', count: 11, latitude: 44.9537, longitude: -93.0900 },
    { _id: 'Houston', count: 10, latitude: 29.7604, longitude: -95.3698 },
    { _id: 'Dallas', count: 10, latitude: 32.7767, longitude: -96.7970 },
    { _id: 'Hialeah', count: 10, latitude: 25.8576, longitude: -80.2781 },
    { _id: 'Wichita', count: 10, latitude: 37.6872, longitude: -97.3301 },
    { _id: 'Boston', count: 9, latitude: 42.3601, longitude: -71.0589 },
    { _id: 'Austin', count: 9, latitude: 30.2672, longitude: -97.7431 },
    { _id: 'San Jose', count: 9, latitude: 37.3382, longitude: -121.8863 },
    { _id: 'Cincinnati', count: 9, latitude: 39.1031, longitude: -84.5120 },
    { _id: 'Laredo', count: 9, latitude: 27.5036, longitude: -99.5075 },
    { _id: 'Henderson', count: 8, latitude: 36.0395, longitude: -114.9817 },
    { _id: 'Detroit', count: 8, latitude: 42.3314, longitude: -83.0458 },
    { _id: 'Fort Worth', count: 8, latitude: 32.7555, longitude: -97.3308 },
    { _id: 'Jacksonville', count: 8, latitude: 30.3322, longitude: -81.6557 },
    { _id: 'Aurora', count: 8, latitude: 39.7294, longitude: -104.8319 },
    { _id: 'Colorado Springs', count: 8, latitude: 38.8339, longitude: -104.8214 },
    { _id: 'Chula Vista', count: 8, latitude: 32.6401, longitude: -117.0842 },
    { _id: 'San Francisco', count: 8, latitude: 37.7749, longitude: -122.4194 },
    { _id: 'Columbus', count: 7, latitude: 39.9612, longitude: -82.9988 },
    { _id: 'Toledo', count: 7, latitude: 41.6528, longitude: -83.5379 },
    { _id: 'Chicago', count: 7, latitude: 41.8781, longitude: -87.6298 },
    { _id: 'Los Angeles', count: 7, latitude: 34.0522, longitude: -118.2437 },
    { _id: 'Santa Ana', count: 7, latitude: 33.7455, longitude: -117.8677 },
    { _id: 'Tucson', count: 7, latitude: 32.2226, longitude: -110.9747 },
    { _id: 'Lexington', count: 7, latitude: 38.0406, longitude: -84.5037 },
    { _id: 'Denver', count: 7, latitude: 39.7392, longitude: -104.9903 },
    { _id: 'Jersey City', count: 7, latitude: 40.7178, longitude: -74.0431 },
    { _id: 'Memphis', count: 7, latitude: 35.1495, longitude: -90.0490 },
    { _id: 'Corpus Christi', count: 7, latitude: 27.8006, longitude: -97.3964 },
    { _id: 'Atlanta', count: 6, latitude: 33.7490, longitude: -84.3880 },
    { _id: 'Tulsa', count: 6, latitude: 36.1539, longitude: -95.9928 },
    { _id: 'Bakersfield', count: 6, latitude: 35.3733, longitude: -119.0187 },
    { _id: 'Minneapolis', count: 6, latitude: 44.9778, longitude: -93.2650 },
    { _id: 'Greensboro', count: 6, latitude: 36.0726, longitude: -79.7920 },
    { _id: 'Riverside', count: 6, latitude: 33.9533, longitude: -117.3962 },
    { _id: 'Gilbert', count: 6, latitude: 33.3528, longitude: -111.7890 },
    { _id: 'Newark', count: 6, latitude: 40.7357, longitude: -74.1724 },
    { _id: 'Buffalo', count: 6, latitude: 42.8864, longitude: -78.8784 },
    { _id: 'Garland', count: 5, latitude: 32.9126, longitude: -96.6389 },
    { _id: 'Orlando', count: 5, latitude: 28.5383, longitude: -81.3792 },
    { _id: 'St. Petersburg', count: 5, latitude: 27.7676, longitude: -82.6403 },
    { _id: 'Oklahoma City', count: 5, latitude: 35.4676, longitude: -97.5164 },
    { _id: 'St. Louis', count: 5, latitude: 38.6270, longitude: -90.1994 },
    { _id: 'Honolulu', count: 5, latitude: 21.3069, longitude: -157.8583 },
    { _id: 'San Diego', count: 5, latitude: 32.7157, longitude: -117.1611 },
    { _id: 'Baltimore', count: 5, latitude: 39.2904, longitude: -76.6122 },
    { _id: 'Chattanooga', count: 5, latitude: 35.0456, longitude: -85.3097 },
    { _id: 'Nashville', count: 5, latitude: 36.1627, longitude: -86.7816 },
    { _id: 'New York', count: 5, latitude: 40.7128, longitude: -74.0060 },
    { _id: 'Philadelphia', count: 4, latitude: 39.9526, longitude: -75.1652 },
    { _id: 'Glendale', count: 4, latitude: 34.1425, longitude: -118.2551 },
    { _id: 'Tampa', count: 4, latitude: 27.9506, longitude: -82.4572 },
    { _id: 'Charlotte', count: 4, latitude: 35.2271, longitude: -80.8431 },
    { _id: 'Phoenix', count: 4, latitude: 33.4484, longitude: -112.0740 },
    { _id: 'Portland', count: 4, latitude: 45.5152, longitude: -122.6784 },
    { _id: 'Fort Wayne', count: 3, latitude: 41.0793, longitude: -85.1394 },
    { _id: 'Anaheim', count: 3, latitude: 33.8366, longitude: -117.9143 },
    { _id: 'Cleveland', count: 3, latitude: 41.4993, longitude: -81.6944 },
    { _id: 'Miami', count: 3, latitude: 25.7617, longitude: -80.1918 },
    { _id: 'Lincoln', count: 3, latitude: 40.8136, longitude: -96.7026 },
    { _id: 'Indianapolis', count: 3, latitude: 39.7684, longitude: -86.1581 },
    { _id: 'Arlington', count: 3, latitude: 32.7357, longitude: -97.1081 },
    { _id: 'Raleigh', count: 2, latitude: 35.7796, longitude: -78.6382 },
    { _id: 'Madison', count: 2, latitude: 43.0731, longitude: -89.4012 }
  ]

  useEffect(() => {
    setMapsData(cdata);
  }, []);

  const MapContent = () => {
    const map = useMap();

    useEffect(() => {
      if (mapsData.length > 0) {
        // Clear previous markers
        map.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
          }
        });

        // Define circle marker options
        const circleMarkerOptions = {
          radius: 8,
          fillColor: "#F9E400", 
          color: "#000", 
          weight: 1,
          opacity: 1,
          fillOpacity: 0.6,
        };

        // Add circle markers
        mapsData.forEach((city) => {
          L.circleMarker([city.latitude, city.longitude], circleMarkerOptions)
            .bindPopup(`${city._id}: ${city.count} customers`)
            .addTo(map);
        });
      }
    }, [mapsData, map]);

    return null;
  };

  return (
    <MapContainer center={centerPosition} zoom={4} style={{ height: "90vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapContent />
    </MapContainer>
  );
};

export default CustomersOnMap;
