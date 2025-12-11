import { TendersInstance } from ".";

export const getTenders = () => {
   return TendersInstance.get("/tenders/");
};

export const addTender = (data) => {
   return TendersInstance.post("/tenders/", data);
};

export const getTender = (id) => {
   return TendersInstance.get(`/tenders/${id}`);
};

export const updateTender = (id, data) => {
   return TendersInstance.put(`/tenders/${id}`, data);
};

export const deleteTender = (id) => {
   return TendersInstance.delete(`/tenders/${id}`);
};

export const getMyTenders = (filter = {},
   paginationOptions = {
      page: 0,
      limit: 10,
   }
) => {
   return TendersInstance.get(`/tenders/me?page=${paginationOptions.page}&limit=${paginationOptions.limit}`);
};

export const getInvitedTenderList = (
   filter = {},
   paginationOptions = {
      page: 0,
      limit: 10,
   }
) => {
   return TendersInstance.get(`/tenders/invited?page=${paginationOptions.page}&limit=${paginationOptions.limit}`);
};

export const getUserTenders = (
   username,
   filter = {},
   paginationOptions = {
      page: 0,
      limit: 10,
   }
) => {
   return TendersInstance.get(
      `/users/${username}/tenders?page=${paginationOptions.page}&limit=${paginationOptions.limit}`
   );
};
