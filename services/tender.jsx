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

export const getMyTenders = () => {
   return TendersInstance.get("/tenders/me");
};

export const getInvitedTenderList = () => {
   return TendersInstance.get("/tenders/invited");
};
