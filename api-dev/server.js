const express = require("express");
const cors = require("cors");
const { generatePosts } = require("./data");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/posts", (req, res) => {
  const count = parseInt(req.query.count) || 25;
  const posts = generatePosts(count);
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
