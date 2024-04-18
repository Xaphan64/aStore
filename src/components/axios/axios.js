import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // baseURL: "http://localhost:8000/phones",
});

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};
