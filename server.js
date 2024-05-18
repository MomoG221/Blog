import express from "express";  // Import the Express module for creating the web server.
import bodyParser from "body-parser";  // Import the body-parser middleware for parsing request bodies.
import axios from "axios";  // Import axios for making HTTP requests.

const app = express();  // Create an instance of an Express application.
const port = 3000;  // Define the port on which the server will listen for requests.
const API_URL = "http://localhost:4000";  // URL of the API server for managing posts.

app.use(express.static("public"));  // Serve static files from the "public" directory.

app.use(bodyParser.urlencoded({ extended: true }));  // Middleware to parse URL-encoded bodies.
app.use(bodyParser.json());  // Middleware to parse JSON bodies.

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);  // Fetch all posts from the API.
    console.log(response);  // Log the response for debugging purposes.
    res.render("index.ejs", { posts: response.data });  // Render the main page with the list of posts.
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });  // Handle errors and respond with a 500 status.
  }
});

// Route to render the page for creating a new post
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });  // Render the page with a form for creating a new post.
});

// Route to render the page for editing an existing post
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);  // Fetch the post by ID from the API.
    console.log(response.data);  // Log the response data for debugging purposes.
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,  // Pass the post data to the template.
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });  // Handle errors and respond with a 500 status.
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);  // Send a POST request to create a new post.
    console.log(response.data);  // Log the response data for debugging purposes.
    res.redirect("/");  // Redirect to the main page after successful creation.
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });  // Handle errors and respond with a 500 status.
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");  // Log a message indicating the route was called.
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );  // Send a PATCH request to update the post.
    console.log(response.data);  // Log the response data for debugging purposes.
    res.redirect("/");  // Redirect to the main page after successful update.
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });  // Handle errors and respond with a 500 status.
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);  // Send a DELETE request to delete the post.
    res.redirect("/");  // Redirect to the main page after successful deletion.
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });  // Handle errors and respond with a 500 status.
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);  // Log a message indicating the server is running.
});
