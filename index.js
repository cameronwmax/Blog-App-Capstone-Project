import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const posts = [];
let name;
class Post {
  constructor(author = name, content) {
    this.author = author;
    this.content = content;
    this.date = this.#getDate();
    this.#pushPost();
  }

  #pushPost() {
    posts.push(this);
  }

  #getDate() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${month}/${date}/${year}`;
  }
}

app.get("/", (req, res) => {
  res.render("index.ejs", { posts, name });
});

app.post("/start", (req, res) => {
  name = req.body.name;
  res.redirect("/");
});

app.get("/addPost", (req, res) => {
  res.render("addPost.ejs", { name });
});

app.post("/addPost", (req, res) => {
  new Post(req.body.name, req.body.content);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
