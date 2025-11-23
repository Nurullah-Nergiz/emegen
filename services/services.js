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

export const getServiceById = async (serviceId) => {
   return await serviceInstance.get(`/services/${serviceId}`);
};

export const createUserService = async (serviceData) => {
   return await serviceInstance.post(`/services`, serviceData);
};

export const updateUserService = async (serviceId, serviceData) => {
   return await serviceInstance.put(`/services/${serviceId}`, serviceData);
};

export const deleteUserService = async (serviceId) =>
   await serviceInstance.delete(`/services/${serviceId}`);
