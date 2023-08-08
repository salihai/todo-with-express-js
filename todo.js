const bodyParser = require('body-parser')
// import dependencies
const express = require("express");
// Create a new express application object
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

const todos = [];

app.listen(4444, () => {
    console.log("Server is Listening on port 4444");
});

app.get('/', (req, res)=>{
    console.log(req);
    res.send(todos);
});

app.post('/', (req, res) =>{
    const data = req.body;

    if(todos.length == 0){
        todos.push({id:1, name:data.name, description:data.description});
    }else{
        const lastElement = todos[todos.length-1];
        const lastId = lastElement.id;
        todos.push({id: lastId+1, name:data.name, description:data.description});
    }

    res.send(todos);
});

app.put('/', (req, res) =>{

    const data = req.body;

    const item = todos.find((item) => item.id == req.query.id);

    if(item){
        item.name = data.name;
        item.description = data.description;
        res.send(todos);
    }else{
        res.status(400).send('400 Bad Request');
    }

    //res.send(todos);
    //console.log(req.query);
    //console.log(req.body);
});

app.delete('/', (req, res) =>{

    const item = todos.find((item) => item.id == req.query.id);

    const index = todos.indexOf(item);
    
    if(item){
        todos.splice(index, 1);
        res.send(todos);
    }else{
        res.status(400).send('400 Bad Request');
    }
    
    //res.send(todos);
    //console.log(req.query.id);
});

// Array for Todos
/*const todos = []
//middleware
app.use("/static", express.static("static"))
app.use(express.urlencoded({extended: true}))
//Routes
app.get("/test", (req, res) => {
    res.send("Hello")
})
app.get("/", (req, res) => {
    res.render("index.ejs", {
        name: "Saliha",
        todos: todos
    })
})
app.post("/", (req, res) => {
    // push new todo into array
    todos.push(req.body)
    // redirect back to main page (refresh page)
    res.redirect("/")
})
// run your application, so it listens on port 4444
app.listen(4444, () => {
    console.log("Server is Listening on port 4444")
})*/