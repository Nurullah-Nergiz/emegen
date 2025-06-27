import { TendersInstance } from ".";

export const getTenders = () => {
   return TendersInstance.get("/tenders/");
};

