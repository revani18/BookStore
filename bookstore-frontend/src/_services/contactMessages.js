import { API } from "../_api";

export const createContactMessage = async (data) => {
  return await API.post("/contact-messages", data);
};

export const getContactMessages = async () => {
  return await API.get("/contact-messages");
};

export const getContactMessage = async (id) => {
  return await API.get(`/contact-messages/${id}`);
};
