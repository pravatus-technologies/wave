import { IFriend } from './IFriend';

export interface IFriendRequest {
  id: number | string;
  person: IFriend;
  requestDate: string;
}
