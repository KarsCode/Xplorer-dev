import axios from 'axios';
type PositionError = {
    code: number;
    message: string;
  };
  const getLocation = (onLocationReceived: (coords: GeolocationCoordinates) => void, onError: (error: PositionError) => void) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onLocationReceived(position.coords);
          },
          (error) => {
            onError(error);
          }
        );
      }else {
        onError({ code: 2, message: 'Geolocation is not supported by this browser.' });
       }
  };



  export default async function postUserLocation(email:string) {
    getLocation(
        (coords) => {
          const lat=coords.latitude;
          const long=coords.longitude;
          axios.post('/api/location',{email,lat,long});
        },
        (error) => {
          console.error('Error:', error.message);
        }
      );



  }