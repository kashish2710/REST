const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const {v4:uuidv4}=require("uuid");
const methodOverride = require('method-override');




app.listen(port,()=>{
    console.log(`listening to the port :${port}`);
})

app.use(express.urlencoded ({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



app.get("/blogs",(req,res)=>{
   res.render("index.ejs",{blogs})
});

app.get("/blogs/new",(req,res)=>{
    res.render("new.ejs");
})

app.patch("blogs/:id",(req,res)=>{
  
    let { id }=req.params;
    let newcontent=req.body.content;
    let blog= blogs.find((b)=>id===b.id);
      
    blog.content=newcontent;
    console.log("patch is working");
    res.redirect("/blogs");

})

app.post("/blogs",(req,res)=>{
   let {author,content}=req.body;
   let id=uuidv4();
   blogs.push({id,author,content});
  res.redirect("/blogs");
})


app.get("/blogs/:id",(req,res)=>{
    let { id }=req.params;
   let blog= blogs.find((b)=>id===b.id);
    res.render("show.ejs",{blog});
})

app.get("/blogs/:id/edit",(req,res)=>{
      let { id }=req.params;
     let blog= blogs.find((b)=>id===b.id);
    res.render("edit.ejs",{blog});
})


let blogs=[
    {
        id:uuidv4(),
        author:"ria",
        content:"I have visited beach yestesday .It was super fun , i really liked the sunset !"
    },
     {  id:uuidv4(),
        author:"tia",
        content:"I have started doing clay art , it is so fun and interesting activity!"
    },
     {  id:uuidv4(),
        author:"lia",
        content:"I have visited new cafe , the coffee was so delicious  !"
    }
]

