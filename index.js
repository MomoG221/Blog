import express from "express";  // Import the Express module for creating the web server.
import bodyParser from "body-parser";  // Import the body-parser middleware for parsing request bodies.

const app = express();  // Create an instance of an Express application.
const port = 4000;  // Define the port on which the server will listen for requests.

// In-memory data store
let posts = [  // Array to store blog post data.
    {
      id: 1,
      title: "The Global Popularity of Soccer",
      content: "Soccer, known as football outside North America, is the world's most popular sport, played and watched by millions globally. Originating in England in the mid-19th century, soccer has evolved into a major sport with significant cultural and economic impact.",
      author: "Jordan Smith",
      date: "2024-05-17T10:00:00Z",
    },
    // ... other posts ...
];

let lastId = 10;  // Variable to keep track of the last used post ID.

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware to parse URL-encoded bodies.
app.use(bodyParser.json());  // Middleware to parse JSON bodies.

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);  // Respond with the list of all posts in JSON format.
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));  // Find the post by ID.
  if (!post) return res.status(404).json({ message: "Post not found" });  // Return 404 if post not found.
  res.json(post);  // Respond with the found post in JSON format.
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;  // Increment the last used ID to get a new unique ID.
  const post = {  // Create a new post object with data from the request body.
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
  };
  lastId = newId;  // Update the last used ID.
  posts.push(post);  // Add the new post to the in-memory data store.
  res.json(post);  // Respond with the newly created post in JSON format.
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));  // Find the post by ID.
  if (!post) return res.status(404).json({ message: "Post not found" });  // Return 404 if post not found.

  if (req.body.title) post.title = req.body.title;  // Update the title if provided in the request body.
  if (req.body.content) post.content = req.body.content;  // Update the content if provided in the request body.
  if (req.body.author) post.author = req.body.author;  // Update the author if provided in the request body.

  res.json(post);  // Respond with the updated post in JSON format.
});

// DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));  // Find the index of the post by ID.
  if (index === -1) return res.status(404).json({ message: "Post not found" });  // Return 404 if post not found.
  
  posts.splice(index, 1);  // Remove the post from the in-memory data store.
  res.json({ message: "Post deleted" });  // Respond with a message indicating successful deletion.
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);  // Log a message indicating the server is running.
});
