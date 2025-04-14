import { API } from "@/constants";
import Logger from "@/utils/Logger";
import axios from "axios";

export const getPosts = async () => {
  try {
    const res = await axios.get(API.endpoints.getPosts);
    return res.data;
  } catch (error) {
    Logger.error(error, "API", `Failed to fetch posts ${JSON.stringify(error)}`)
    throw new Error("Unable to load posts. Please try again later");
  }
}