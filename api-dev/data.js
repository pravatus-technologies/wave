const faker = require("faker");

const sampleReactions = ["❤️", "🔥", "🤣", "🌸", "🍣", "✈️", "🎬", "🍿"];
const youtubeLinks = [
  "https://youtu.be/41O_MydqxTU",
  "https://youtu.be/LXEKuttVRIo",
  "https://youtu.be/nKhMA5d0adA",
  "https://youtu.be/EXeTwQWrcwY",
];
const imageLinks = [
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
];

function getRandom(array, count = 1) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function generatePosts(count = 100) {
  return Array.from({ length: count }, (_, i) => {
    const name = faker.name.findName();
    const avatar = `https://i.pravatar.cc/100?img=${faker.datatype.number({
      min: 1,
      max: 70,
    })}`;

    const mediaType = Math.random() > 0.5 ? "youtube" : "image";
    const media =
      mediaType === "youtube"
        ? [getRandom(youtubeLinks)]
        : getRandom(imageLinks, faker.datatype.number({ min: 1, max: 3 }));

    return {
      id: `post-${i}`,
      author: name,
      avatar,
      text: faker.lorem.sentence(),
      media,
      time: faker.date.recent().toLocaleTimeString(),
      comments: `${faker.datatype.number({ min: 10, max: 3000 })} Comments`,
      shares: `${faker.datatype.number({ min: 10, max: 500 })} Shares`,
      reactedBy: `${faker.name.firstName()} & ${faker.datatype.number({
        min: 1,
        max: 9,
      })}k others`,
      reactions: getRandom(sampleReactions, 3).join(" "),
      commentsList: [
        {
          name: faker.name.findName(),
          avatar: `https://i.pravatar.cc/100?img=${faker.datatype.number({
            min: 1,
            max: 70,
          })}`,
          text: faker.lorem.sentence(),
          time: `${faker.datatype.number({ min: 1, max: 60 })}m`,
        },
      ],
    };
  });
}

module.exports = { generatePosts };
