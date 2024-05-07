import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


const titles = [];
const contents = [];

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
    } );

app.get('/write', (req, res) => {
    res.render('write.ejs');
    } );

app.post("/write", (req, res)=>{
        const newPostTitle = req.body.posttitle
        const newPostContent = req.body.postbody 
        console.log(newPostTitle) 
        console.log(newPostContent) 

        titles.push(newPostTitle)
        contents.push(newPostContent)

        res.redirect('/')

      })
    
app.get('/viewpost', (req, res) => {
    res.render('viewpost.ejs', { titles, contents }); // Passing titles and contents to the template
});

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
    });
