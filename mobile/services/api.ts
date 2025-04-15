import axios, { AxiosError } from 'axios';

import { API } from '@constants';
import { Post } from '@constants/types';
import { Logger } from '@utils/Logger';

export async function getPosts(page = 1, limit = 10): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(API.endpoints.getPosts, { params: { page, limit } });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    Logger.error(error, 'API', `Failed to fetch posts ${err.message}`);
    throw new Error('Failed to fetch posts');
  }
}
