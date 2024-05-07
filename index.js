import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let titles = []; 
let contents = []; 
let postIds = [];

const post = 0;

var number = 1;
var index = 0 ;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rendering index page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Rendering write page
app.get('/write', (req, res) => {
    res.render('write.ejs');
});

// Handling form submission for writing a new post
app.post("/write", (req, res) => {
    const newPostTitle = "Post # " + number + req.body.posttitle;
    const newPostContent = req.body.postbody;
    console.log(newPostTitle);
    console.log(newPostContent);

    // Generating a unique ID for the post
    const postId = generatePostId();
    titles.push(newPostTitle);
    contents.push(newPostContent);
    postIds.push(postId);

    res.redirect('/');
});

// Rendering viewpost page with post titles and contents
app.get('/viewpost', (req, res) => {

    const y = post ;

    res.render('viewpost.ejs', { titles, contents, postIds, y});
});

app.get('/viewpost/:id', (req, res) => {
    // Convert postId to a number
    const postId = parseInt(req.params.id);
    
    // Check if postId is a valid number and within the range of titles and contents arrays
    if (postId >= 0 && postId < titles.length && postId < contents.length) {
        const postTitle = titles[postId];
        const postContent = contents[postId];
        res.render('viewpostbyID.ejs', { postTitle, postContent, postId });
    } 
});


// Handling post update
app.post("/update", (req, res) => {
    const postIdToUpdate = req.body.postId;
    // Here you can add the logic to update the post with the given postId
    // For now, let's just log the postId to console
    console.log(`Updating post with ID: ${postIdToUpdate}`);
    res.redirect('/viewpost');
});

// Handling post deletion
app.post('/viewpost/:id', (req, res) => {

    const postIdToDelete = req.body.postId;

    // Assuming titles, contents, and postIds are arrays
   
        // Delete the post with the specified ID from all arrays
        delete titles[postIdToDelete];
        delete contents[postIdToDelete];
        delete postIds[postIdToDelete];

        console.log(`Deleting post with ID: ${postIdToDelete}`);

        res.redirect('/viewpost');
    
});


// Function to generate unique post IDs
function generatePostId() {
    return index++;
}

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});
