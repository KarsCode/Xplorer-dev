"use client";
//AIzaSyDccgfICZESR1RutaXrZXc1WouJeGXx28k

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';


type Restaurant = {
    lat: number;
    lng: number;
  };
const MapComponent: React.FC = () => {
  const center = {
    lat: 52.3676,
    lng: 4.9041,
  };

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);


  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [restaurantsWithin2km, setRestaurantsWithin2km] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    // Simulate user's location (in a real application, get the actual user location)
    const userLocationData = {
      lat: center.lat,  // Modify as needed
      lng: center.lng  // Modify as needed
    };
    setUserLocation(userLocationData);

    // Dummy restaurant data (replace with actual data)
    const restaurantData = [
        // Add 10 more restaurants within 2km here
        { lat: center.lat + 0.002, lng: center.lng + 0.002 },
        { lat: center.lat - 0.001, lng: center.lng - 0.001 },
        { lat: center.lat + 0.004, lng: center.lng + 0.004 },
        { lat: center.lat - 0.002, lng: center.lng - 0.002 },
        { lat: center.lat + 0.003, lng: center.lng + 0.003 },
        { lat: center.lat - 0.0015, lng: center.lng - 0.0015 },
        { lat: center.lat + 0.0035, lng: center.lng + 0.0035 },
        { lat: center.lat - 0.0018, lng: center.lng - 0.0018 },
        { lat: center.lat + 0.0025, lng: center.lng + 0.0025 },
      
    
        // Add 10 more restaurants outside 2km here
        { lat: center.lat + 0.015, lng: center.lng + 0.015 },
        { lat: center.lat - 0.015, lng: center.lng - 0.015 },
        { lat: center.lat + 0.02, lng: center.lng + 0.02 },
        { lat: center.lat - 0.02, lng: center.lng - 0.02 },
        { lat: center.lat + 0.025, lng: center.lng + 0.025 },
        { lat: center.lat - 0.025, lng: center.lng - 0.025 },
        { lat: center.lat + 0.03, lng: center.lng + 0.03 },
        { lat: center.lat - 0.03, lng: center.lng - 0.03 },
      ];

    // Filter restaurants within 2 kilometers of the user's location
    const filteredRestaurants = restaurantData.filter((restaurant) => {
      const distance = calculateDistance(userLocationData, restaurant);
      return distance <= 2;
    });

    setRestaurantsWithin2km(filteredRestaurants);
  }, []);

  const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = (Math.PI * coord1.lat) / 180;
    const lat2 = (Math.PI * coord2.lat) / 180;
    const dLat = lat2 - lat1;
    const dLng = (Math.PI * (coord2.lng - coord1.lng)) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log(distance)
    return distance;
    
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDccgfICZESR1RutaXrZXc1WouJeGXx28k', // Replace with your Google Maps API key
  });

  if (!isLoaded) {
    return null; // Don't render anything until the API is loaded
  }
 

  const mapStyleID = '2a6fc2afcc647095'; // Replace with the actual Style ID
  console.log(userLocation)

  const handleMarkerClick = (restaurant:Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="flex justify-center items-center w-72 h-72">
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={center}
        zoom={17}
        options={{
          mapId: mapStyleID,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="User Location"
            icon={{ url: '/icons8-pointing-at-self-30.png', scaledSize: new window.google.maps.Size(30, 30) }}
          />
        )}
        {restaurantsWithin2km.map((restaurant, index) => (
          <Marker
            key={index}
            position={restaurant}
            title="Restaurant"
            onClick={() => handleMarkerClick(restaurant)} // Open InfoWindow on click
          />
        ))}
        {selectedRestaurant && (
          <InfoWindow
            position={selectedRestaurant}
            onCloseClick={() => setSelectedRestaurant(null)} // Close   
          >
           <div>
            <h1 className='text-pink-500 font-extrabold'>Restaurant Name</h1>
            <p className='text-black'>
                Here is displayed the rating of the restaurant. 
            </p>
           </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
export default MapComponent
