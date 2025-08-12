import { searchInstance } from "./index";

export const getSearch = (query) => searchInstance(`search/?q=${query}`);

/**
 *
 * @param {Object} data
 * @param {string} data.q - The search query string
 * @returns
 */
export const getSearchUsers = (data) => {
   const params = new URLSearchParams(data).toString();
   return searchInstance(`search/users?${params}`);
};
