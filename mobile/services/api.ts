import axios, { AxiosError } from 'axios';

import { API } from '@constants';
import { IFriend, IPost } from '@constants/types/interfaces';
import { Logger } from '@utils/Logger';

export async function getPosts(page = 1, limit = 10): Promise<IPost[]> {
  try {
    const response = await axios.get<IPost[]>(API.endpoints.getPosts, { params: { page, limit } });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    Logger.error(error, 'API', `Failed to fetch posts ${err.message}`);
    throw new Error('Failed to fetch posts');
  }
}

export async function getFriends(page = 1, limit = 10): Promise<IFriend[]> {
  try {
    const response = await axios.get<IFriend[]>(API.endpoints.getFriends, {
      params: { page, limit },
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    Logger.error(error, 'API', `Failed to fetch posts ${err.message}`);
    throw new Error('Failed to fetch friends');
  }
}
