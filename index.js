import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
/*import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
*/
let posts=[];
let idOfPost =0;

app.get("/", (req, res) => {
res.render("index.ejs", { PostCount: posts.length,PostContent:posts});
});

//show form to user
app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
 });

 //save the new post to array object
app.post("/createPost", (req, res) => {
  //Step 2 - Make the generate name functionality work
  //Hint: When the "Generate Name" button in index.ejs is clicked, it should hit up this route.
let currentPost={
  idp:idOfPost,
  title:req.body["title"], 
  date:req.body["date"],
  author:req.body["author"],
  content:req.body["content"]
};
//auto incremenrt to post id so we can get unique ids for every post
idOfPost++;

posts.push(currentPost);
 console.log(posts);
  res.render("success.ejs",{PostContent:posts});
  
 });

//show the post to be edited with editable fields
app.get("/editPost/currentID", (req, res) => {
   let currentID = parseInt(req.idp);
console.log("current id:", currentID );
  res.render("editPost.ejs");
});

app.get("/success", (req, res) => {
res.render("index.ejs");
});


app.get("/view/1", (req, res) => {
res.render("index.ejs");
});


app.delete("/delete/1", (req, res) => {
  //Deleting
  res.sendStatus(200);
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});