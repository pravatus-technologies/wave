export interface IPost {
  id: string;
  author: string;
  avatar?: string;
  text?: string;
  media?: string[];
  link?: string;
  commentsList?: Comment[];
  time?: string;
  comments?: string;
  shares?: string;
  reactedBy?: string;
  reactions?: string;
}