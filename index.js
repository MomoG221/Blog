import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
    {
      id: 1,
      title: "The Global Popularity of Soccer",
      content:
        "Soccer, known as football outside North America, is the world's most popular sport, played and watched by millions globally. Originating in England in the mid-19th century, soccer has evolved into a major sport with significant cultural and economic impact.",
      author: "Jordan Smith",
      date: "2024-05-17T10:00:00Z",
    },
    {
      id: 2,
      title: "Understanding Soccer: Basic Rules and Gameplay",
      content:
        "In soccer, two teams of 11 players aim to score goals by getting the ball into the opposing team's net. Standard matches last 90 minutes, split into two 45-minute halves, with additional stoppage time added. Key positions include the goalkeeper, defenders, midfielders, and forwards, each with specific roles on the field.",
      author: "Jordan Smith",
      date: "2024-05-17T10:30:00Z",
    },
    {
      id: 3,
      title: "Major Soccer Competitions",
      content:
        "The FIFA World Cup, held every four years, is the most prestigious international tournament. The UEFA Champions League is an annual competition among Europe's top club teams. Domestic leagues such as the Premier League, La Liga, Bundesliga, Serie A, and Ligue 1 are among the top leagues worldwide.",
      author: "Jordan Smith",
      date: "2024-05-17T11:00:00Z",
    },
    {
      id: 4,
      title: "Famous Soccer Players Through History",
      content:
        "Historic legends like Pelé, Diego Maradona, and Johan Cruyff have left a lasting legacy in soccer. Modern icons such as Lionel Messi, Cristiano Ronaldo, Neymar, and Kylian Mbappé continue to captivate fans. In women's soccer, stars like Marta, Alex Morgan, and Megan Rapinoe have made significant contributions.",
      author: "Jordan Smith",
      date: "2024-05-17T11:30:00Z",
    },
    {
      id: 5,
      title: "Tactical Evolution in Soccer",
      content:
        "Soccer tactics have evolved from traditional formations like 4-4-2 to modern variations such as 4-3-3 and 3-5-2. Playing styles like Tiki-taka (short passing and movement), Gegenpressing (high pressing), and counter-attacking strategies showcase the diverse tactical approaches in the game.",
      author: "Jordan Smith",
      date: "2024-05-17T12:00:00Z",
    },
    {
      id: 6,
      title: "The Influence of Technology on Soccer",
      content:
        "Technological advancements have significantly impacted soccer. The introduction of VAR (Video Assistant Referee) helps referees with controversial decisions, and goal-line technology ensures accuracy in determining whether the ball has crossed the goal line.",
      author: "Jordan Smith",
      date: "2024-05-17T12:30:00Z",
    },
    {
      id: 7,
      title: "Soccer's Socio-Economic Impact",
      content:
        "Soccer generates significant revenue through sponsorships, broadcasting rights, and merchandise. Clubs often have deep-rooted connections with their local communities, fostering a sense of identity and pride. Soccer also plays a role in promoting social cohesion and physical fitness.",
      author: "Jordan Smith",
      date: "2024-05-17T13:00:00Z",
    },
    {
      id: 8,
      title: "The Growth of Women's Soccer",
      content:
        "Women's soccer has seen increasing popularity and investment, with significant strides in professional leagues like the NWSL (USA) and WSL (England). Despite challenges such as the gender pay gap, milestones like the USWNT's dominance in the Women's World Cup highlight the sport's growth.",
      author: "Jordan Smith",
      date: "2024-05-17T13:30:00Z",
    },
    {
      id: 9,
      title: "Youth Development and Grassroots Soccer",
      content:
        "Youth academies play a crucial role in nurturing young talent, while grassroots programs encourage participation from a young age, promoting physical activity and teamwork. These initiatives are essential for the long-term development and sustainability of soccer.",
      author: "Jordan Smith",
      date: "2024-05-17T14:00:00Z",
    },
    {
      id: 10,
      title: "Future Trends in Soccer",
      content:
        "Soccer is expanding into new markets like the USA, China, and India. Sustainability efforts aim to make soccer more environmentally friendly. Technological advancements, such as advanced analytics, training tools, and fan engagement platforms, are set to shape the future of the sport.",
      author: "Jordan Smith",
      date: "2024-05-17T14:30:00Z",
    },
  ];
  

let lastId = 10;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Write your code here//

//CHALLENGE 1: GET All posts

app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});


//CHALLENGE 3: POST a new post

app.post("/posts", (req, res) => {

  const newId = lastId += 1;

  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
  }

  lastId = newId;
  posts.push(post);
  res.json(post);

});

//CHALLENGE 4: PATCH a post when you just want to update one parameter

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found"});

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);

});

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) => {

  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  
  posts.splice(index, 1);
  res.json({ message: "Post deleted" });



});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
