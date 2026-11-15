import { API } from "../_api";

export const getDashboardSummary = async () => {
  return await API.get("/dashboard/summary");
};
