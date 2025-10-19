import { postInstance } from "./index";

export const getPost = (id) => postInstance.get(`/posts/${id}`);

export const setPost = (data) =>
   postInstance.post("/posts", data, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
