import { IStoryItem } from "./IStoryItem";

export interface IStory {
  uid: string;
  items: IStoryItem[];
};