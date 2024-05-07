// Import necessary modules
import express from 'express'; // Express framework for building web applications
import bodyParser from 'body-parser'; // Middleware to parse incoming request bodies
import methodOverride from 'method-override'; // Middleware to override HTTP methods for PUT and DELETE requests

// Create Express app
const app = express();
const port = 3000; // Port on which the server will listen

// Middleware setup
app.use(methodOverride('_method')); // Setup method override middleware
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Data storage arrays
let titles = []; // Array to store post titles
let contents = []; // Array to store post contents
let postIds = []; // Array to store post IDs
var index = 0; // Index to generate unique post IDs

// Route to render index page
app.get('/', (req, res) => {
    res.render('index.ejs'); // Render index page
});

// Route to render write page
app.get('/write', (req, res) => {
    res.render('write.ejs'); // Render write page
});

// Route to handle form submission for writing a new post
app.post("/write", (req, res) => {
    // Extract post title and content from the request body
    const newPostTitle = "Title: " + req.body.posttitle;
    const newPostContent = req.body.postbody;

    // Generate a unique ID for the post
    const postId = generatePostId();

    // Store post data in arrays
    titles.push(newPostTitle);
    contents.push(newPostContent);
    postIds.push(postId);

    res.redirect('/'); // Redirect to the index page
});

// Route to render viewpost page with post titles and contents
app.get('/viewpost', (req, res) => {
    res.render('viewpost.ejs', { titles, contents, postIds }); // Render viewpost page with data
});

// Route to render individual post by ID
app.get('/viewpost/:id', (req, res) => {
    // Extract post ID from URL params
    const postId = parseInt(req.params.id);
    
    // Check if the postId is valid and within array bounds
    if (postId >= 0 && postId < titles.length && postId < contents.length) {
        const postTitle = titles[postId];
        const postContent = contents[postId];
        res.render('viewpostbyID.ejs', { postTitle, postContent, postId }); // Render individual post
    } 
});

// Route to render update page for a specific post
app.get('/update/:id', (req, res) => {
    // Extract post ID from URL params
    const postId = parseInt(req.params.id);
    
    // Retrieve post title and content by ID
    const postTitle = titles[postId];
    const postContent = contents[postId];
    
    // Render update page with post data
    res.render('update.ejs', { postTitle, postContent, postId });
});

// Route to handle post update
app.put("/update/:id", (req, res) => {
    const postIdToUpdate = req.params.id; // Accessing post ID from URL params
    const updatedPostTitle = "Title: " + req.body.posttitle;
    const updatedPostContent = req.body.postbody;

    // Update the titles and contents arrays with the new data
    titles[postIdToUpdate] = updatedPostTitle;
    contents[postIdToUpdate] = updatedPostContent;

    console.log(`Updating post with ID: ${postIdToUpdate}`);
    res.redirect('/viewpost'); // Redirect to viewpost page after update
});

// Route to handle post deletion
app.post('/viewpost/:id', (req, res) => {
    const postIdToDelete = req.body.postId;

    // Delete the post with the specified ID from all arrays
    delete titles[postIdToDelete];
    delete contents[postIdToDelete];
    delete postIds[postIdToDelete];

    console.log(`Deleting post with ID: ${postIdToDelete}`);
    res.redirect('/viewpost'); // Redirect to viewpost page after deletion
});

// Function to generate unique post IDs
function generatePostId() {
    return index++; // Increment index for each new post
}

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});
