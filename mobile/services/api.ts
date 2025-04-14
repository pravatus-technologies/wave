import { API } from "@/constants";
import { Post } from "@/constants/types";
import Logger from "@/utils/Logger";
import axios from "axios";

export async function getPosts(page = 1, limit = 10): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(API.endpoints.getPosts, { params: { page, limit }, });
    return response.data;
  } catch (error: any) {
    Logger.error(error, "API", `Failed to fetch posts ${error.message}`);
    throw new Error("Failed to fetch posts");
  }
}