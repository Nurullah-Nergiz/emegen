import { searchInstance } from "./index";

export const getSearch = (data) => {
   const params = new URLSearchParams(data).toString();
   console.log('Search params:', params);
   
   return searchInstance(`search/?${params}`);
};

/**
 *
 * @param {Object} data
 * @param {string} data.q - The search query string
 * @returns
 */
export const getSearchUsers = (data) => {
   const params = new URLSearchParams(data).toString();
   console.log('Search params:', params);
   return searchInstance(`search/users?${params}`);
};
