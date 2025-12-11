import { GeoResolver } from ".";

export const resolveCoordinates = ({ latitude, longitude }) =>
   GeoResolver.get(
      `/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
   );
