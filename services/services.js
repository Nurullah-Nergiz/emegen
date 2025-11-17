const { serviceInstance } = require(".");

export const getUserServices = async (username) => {
   try {
      return await serviceInstance.get(`/users/${username}/services`);
   } catch (error) {
      if (error.response?.status === 404) {
         return { data: [], status: 404 };
      }
      // throw error;
   }
};

export const getServiceById = async (username, serviceId) => {
   try {
      return await serviceInstance.get(
         `/users/${username}/services/${serviceId}`
      );
   } catch (error) {
      if (error.response?.status === 404) {
         return { data: null, status: 404 };
      }
      // throw error;
   }
};

export const createUserService = async ( serviceData) => {
   return await serviceInstance.post(
      `/services`,
      serviceData
   );
};
