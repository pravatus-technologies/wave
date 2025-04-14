import { IFriend, IFriendRequest } from "./types";

export const FRIENDS: IFriend[] = [
  {
    id: 'f3e21b2d-298d-443d-a63f-cd21c908b18d',
    avatar: 'https://i.pravatar.cc/150?img=10',
    firstName: 'Liam',
    lastName: 'Cruz',
    subTitle: 'Loves hiking and coffee. Based in Vancouver.',
  },
  {
    id: 'a8b0cfe0-6e4b-46d7-a059-10cda7eb9efc',
    avatar: 'https://i.pravatar.cc/150?img=12',
    firstName: 'Sophia',
    lastName: 'Nguyen',
    subTitle: 'Digital nomad exploring SE Asia. Dog person 🐶.',
  },
  {
    id: 'ef47b40c-57e2-4d0f-aef2-9cc3cfa5e1e4',
    avatar: 'https://i.pravatar.cc/150?img=5',
    firstName: 'Noah',
    lastName: 'Anderson',
    subTitle: 'Full-stack dev. Plays bass in a garage band.',
  },
  {
    id: '2cfa6574-f30c-45d6-a3c6-56a6c930d6d4',
    avatar: 'https://i.pravatar.cc/150?img=3',
    firstName: 'Ava',
    lastName: 'Patel',
    subTitle: 'Yoga teacher and part-time UX designer.',
  },
  {
    id: 'bcb9ec24-5a56-4b36-9ec4-66ab984ea4aa',
    avatar: 'https://i.pravatar.cc/150?img=7',
    firstName: 'Elijah',
    lastName: 'Smith',
    subTitle: 'Runs a local coffee shop. Gamer on weekends.',
  },
];
export const FRIEND_REQUESTS: IFriendRequest[] = [
  {
    id: '2b9f1d3e-9f41-4c75-8e67-dfc96f7ad7a1',
    person: {
      id: 'd9012c1b-4a7f-4569-9bb0-bae2fd9e2bd4',
      avatar: 'https://i.pravatar.cc/150?img=24',
      firstName: 'Isabella',
      lastName: 'Reyes',
      subTitle: 'Plant lover and weekend pottery artist.',
    },
    requestDate: '2025-04-01T10:15:00Z',
  },
  {
    id: '3e1741b0-e097-4e01-9dd3-2235676d54c2',
    person: {
      id: 'd6a92d2f-1db6-4c6d-98b1-27e2b97e6cd0',
      avatar: 'https://i.pravatar.cc/150?img=33',
      firstName: 'James',
      lastName: 'Tan',
      subTitle: 'Crypto enthusiast and part-time streamer.',
    },
    requestDate: '2025-04-02T08:45:00Z',
  },
  {
    id: 'd4a5e6e3-a188-4a99-a90c-ffb2e7f8e9cb',
    person: {
      id: '7b0d02f1-52f7-41d5-bde7-8b8f2c7b4f19',
      avatar: 'https://i.pravatar.cc/150?img=18',
      firstName: 'Emma',
      lastName: 'Chavez',
      subTitle: 'Reads mystery novels and writes poetry.',
    },
    requestDate: '2025-03-30T17:30:00Z',
  },
  {
    id: '84c8d1aa-f78c-4d6a-93bb-2f4d43b7f65f',
    person: {
      id: 'c4f64e76-93e4-4636-8893-d5f79a2f231b',
      avatar: 'https://i.pravatar.cc/150?img=38',
      firstName: 'Lucas',
      lastName: 'Santos',
      subTitle: 'Mountain biker who codes for fun.',
    },
    requestDate: '2025-04-03T13:20:00Z',
  },
  {
    id: 'ae4cd02a-b4c9-4a69-9ee1-3e8a63f21c3d',
    person: {
      id: 'fbbbc2ef-7034-47f4-b53e-10d79a49fc55',
      avatar: 'https://i.pravatar.cc/150?img=48',
      firstName: 'Amelia',
      lastName: 'Wong',
      subTitle: 'Voiceover artist and audiobook narrator.',
    },
    requestDate: '2025-04-01T21:10:00Z',
  },
];
