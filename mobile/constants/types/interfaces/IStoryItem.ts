export interface IStoryItem {
  type: 'image' | 'video' | 'music' | 'text';
  uri: string;
}