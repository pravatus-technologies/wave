const express = require("express");
const cors = require("cors");
const faker = require("faker");
const fs = require("fs");
const path = require("path");

const videoFolderPath = path.join(__dirname, "assets/videos");
const videoFiles = fs
  .readdirSync(videoFolderPath)
  .filter((file) => file.endsWith(".mp4"));

console.log(
  "Serving static files from:",
  path.join(__dirname, "assets/videos")
);

const app = express();
app.use(cors());

app.use(
  "/static/videos",
  express.static(path.join(__dirname, "assets/videos"))
);

function generateRandomStories(count = 10) {
  const stories = [];

  for (let i = 0; i < count; i++) {
    const itemsCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
    const items = [];

    for (let j = 0; j < itemsCount; j++) {
      const isVideo = Math.random() > 0.5 && videoFiles.length > 0;
      if (isVideo) {
        const filename = faker.random.arrayElement(videoFiles);
        items.push({
          type: "video",
          uri: `http://192.168.10.67:3000/static/videos/${filename}`, // adjust domain/port as needed
        });
      } else {
        items.push({
          type: "image",
          uri: `https://picsum.photos/seed/${faker.datatype.uuid()}/400/700`,
        });
      }
    }

    stories.push({
      uid: faker.datatype.uuid(),
      items,
    });
  }

  return stories;
}

// Generate fake friends
function generateRandomFriends(count) {
  const bios = [
    "Loves hiking and collects vinyl records.",
    "Speaks 4 languages and makes a mean lasagna.",
    "Dreams of visiting every national park in North America.",
    "Amateur astronomer and karaoke enthusiast.",
    "Runs a book club and hates spoilers.",
    "Bakes sourdough on weekends, gamer at night.",
    "Tech nerd by day, salsa dancer by night.",
    "Keeps a terrarium named Kevin.",
    "Has a rescue cat that acts like a dog.",
    "Writes poetry on napkins during coffee breaks.",
  ];

  const friends = [];

  for (let i = 0; i < count; i++) {
    friends.push({
      id: faker.datatype.uuid(),
      avatar: `https://i.pravatar.cc/150?img=${faker.datatype.number({
        min: 1,
        max: 70,
      })}`,
      friendName: faker.name.findName(),
      shortBio: faker.random.arrayElement(bios),
      mutualFriends: faker.datatype.number({ min: 0, max: 50 }),
    });
  }

  return friends;
}

function generateRandomPosts(count, startId = 0, page = 1) {
  const youtubeLinks = [
    "https://youtu.be/kPa7bsKwL-c?feature=shared",
    "https://youtu.be/ekr2nIex040?feature=shared",
    "https://youtu.be/fLexgOxsZu0?feature=shared",
    "https://youtu.be/qMxX-QOV9tI?feature=shared",
    "https://youtu.be/DhzDmhytrTI?feature=shared",
    "https://youtu.be/LXEKuttVRIo?feature=shared",
    "https://youtu.be/CcS1fsuT10M?feature=shared",
    "https://youtu.be/L215z9C4Zd8?feature=shared",
    "https://youtu.be/WW7EFEJUUlE?feature=shared",
    "https://youtu.be/SlPhMPnQ58k?feature=shared",
    "https://youtu.be/cBVGlBWQzuc?feature=shared",
    "https://youtu.be/DzwkcbTQ7ZE?feature=shared",
    "https://youtu.be/pSAtptOY7dI?feature=shared",
    "https://youtu.be/rgHHJkzn5TU?feature=shared",
    // add more as needed...
  ];

  const images = [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    "https://images.unsplash.com/photo-1581090700227-1e8c0428f1f5",
  ];

  const posts = [];

  for (let i = 0; i < count; i++) {
    const isVideo = Math.random() > 0.5;
    const media = isVideo
      ? [faker.random.arrayElement(youtubeLinks)]
      : [
          faker.random.arrayElement(images),
          ...(Math.random() > 0.7 ? [faker.random.arrayElement(images)] : []),
        ];

    posts.push({
      id: faker.datatype.uuid(), // ✅ globally unique
      author: faker.name.findName(),
      avatar: `https://i.pravatar.cc/100?img=${faker.datatype.number({
        min: 1,
        max: 70,
      })}`,
      text: faker.lorem.sentence(),
      media,
      time: faker.date.recent().toLocaleTimeString(), // fixed time format
      comments: `${faker.datatype.number({ min: 100, max: 5000 })} Comments`,
      shares: `${faker.datatype.number({ min: 10, max: 500 })} Shares`,
      reactedBy: `${faker.name.firstName()} & ${faker.datatype.number({
        min: 1,
        max: 5,
      })}k others`,
      reactions: faker.random.arrayElement([
        "❤️ 🌸 🤣",
        "🔥 🎸 💯",
        "✈️ 🍣 🧠",
        "🍿 🤖 🎬",
      ]),
      commentsList: [
        {
          name: faker.name.findName(),
          avatar: `https://i.pravatar.cc/100?img=${faker.datatype.number({
            min: 1,
            max: 70,
          })}`,
          text: faker.lorem.sentence(),
          time: "45m",
        },
      ],
    });
  }

  return posts;
}

app.get("/stories", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const allStories = generateRandomStories(limit);
  res.json(allStories);
});

app.get("/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  const posts = generateRandomPosts(limit, startIndex, page);
  res.json(posts);
});

app.get("/friends", (req, res) => {
  const count = parseInt(req.query.count) || 10;
  const friends = generateRandomFriends(count);
  res.json(friends);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
