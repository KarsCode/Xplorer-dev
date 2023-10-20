"use client";
//AIzaSyDccgfICZESR1RutaXrZXc1WouJeGXx28k

import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, HeatmapLayer } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import { User } from '@prisma/client';
import getPosts from '@/app/actions/getPosts';



type Restaurant = {
    lat: number;
    lng: number;
    
  };
  interface MapComponentProps{
    currentUser:  User 
    auth? : boolean

  }


  interface Post{
    latitude: number;
    longitude: number
    title: string
    description: string
  }
  


const MapComponent: React.FC<MapComponentProps> = ({
  currentUser
}) => {
  const center = {
    lat: currentUser.latitude!,
    lng: currentUser.longitude!,
  };

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [restaurantsWithin2km, setRestaurantsWithin2km] = useState<{ lat: number; lng: number }[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [zoom, setZoom] = useState<number>(17);
  const [showMarkers, setShowMarkers] = useState(true);
  

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

  const { data: posts = [] } = getPosts();

  useEffect(() => {
    
    const userLocationData = {
      lat: center.lat,  // Modify as needed
      lng: center.lng  // Modify as needed
    };
    setUserLocation(userLocationData);

  
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
    return distance;
    
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDccgfICZESR1RutaXrZXc1WouJeGXx28k',
    libraries: ["visualization"] // Replace with your Google Maps API key
  });
  if (!isLoaded) {
    return null; // Don't render anything until the API is loaded
  }
 


  const mapStyleID = '2a6fc2afcc647095'; // Replace with the actual Style ID

  const handleMarkerClick = (restaurant:Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleEventClick = (post:Post) =>{
    setSelectedPost(post);
  }

  const heatmapData = posts.map((post:Post) => ({
    location: new window.google.maps.LatLng(post.latitude, post.longitude),
    weight: 1,
     // You can adjust the weight as needed
  }));


  
  // const [heatmapData, setHeatmapData] = useState<any[] | null>(null);

  // useEffect(() => {
  //   // Calculate heatmap data whenever `posts` change
  //   const newHeatmapData = posts.map((post: Post) => ({
  //     location: new window.google.maps.LatLng(post.latitude, post.longitude),
  //     weight: 1,
  //     // You can adjust the weight as needed
  //   }));

  //   setHeatmapData(newHeatmapData);
  // }, [posts]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    // Now, mapRef.current holds the Google Map instance, and you can use it to interact with the map.
  };



  const handleZoomChanged = () => {
    if (mapRef.current) {
     console.log("Hello")
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom !== undefined) {
        setZoom(currentZoom);
        

      // Check if zoom level is above 14 and update the state variable
      if (currentZoom > 14) {
        setShowMarkers(true);
      } else {
        setShowMarkers(false);
      }
    }
  }};

  return (
        

      <GoogleMap
      mapContainerStyle={{ height: '70vh', width: '70vw' }}
      center={center}
      zoom={zoom}
      options={{
        mapId: mapStyleID,
      }}
      onZoomChanged={handleZoomChanged}
      onLoad={handleMapLoad}
    > 


        
      {userLocation && (
        <Marker
          position={userLocation}
          title="User Location"
          icon={{ url: '/icons8-pointing-at-self-30.png', scaledSize: new window.google.maps.Size(30, 30) }}
        />
      )}



      {/* {showMarkers && restaurantsWithin2km.map((restaurant, index) => (
        <Marker
          key={index}
          position={restaurant}
          title="Restaurant"
          onClick={() => handleMarkerClick(restaurant)}
        />
      ))} */}

{showMarkers &&
        posts.map((post:Post, index:number) => (
          <Marker
            key={index}
            position={{ lat: post.latitude, lng: post.longitude }}
            title="Event"
            onClick={() => handleEventClick(post)}
          />
        ))}



        {selectedPost && (
          <InfoWindow
          position={{ lat: selectedPost.latitude, lng: selectedPost.longitude }}
            onCloseClick={() => setSelectedPost(null)} // Close   
          >
           <div>
            <h1 className='text-pink-500 font-extrabold'>{selectedPost.title}</h1>
            <p className='text-black'>
            {selectedPost.description}
            </p>
           </div>
          </InfoWindow>
        )}    



        
{heatmapData && (
  <HeatmapLayer
    data={heatmapData} // Adjust the radius value as needed
  />
)}

          


        






        
          
      </GoogleMap>



     
    
  );
};
export default MapComponent