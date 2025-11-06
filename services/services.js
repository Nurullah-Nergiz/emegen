const { serviceInstance } = require(".");

export const getUserServices = async (username) =>
   serviceInstance.get(`/users/${username}/services`);
