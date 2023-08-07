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
    
    for(let i=0; i<todos.length; i++){
        let todoItem = todos[i];
        if(todoItem.id == req.query.id){
            todoItem['name'] = data.name;
            todoItem["description"] = data.description;
        }
    }
    res.send(todos);
    //console.log(req.query);
    //console.log(req.body);
});

app.delete('/', (req, res) =>{

    
    for(let i=0; i<todos.length; i++){
        let todoItem = todos[i];
        if(todoItem.id == req.query.id){
            todos.splice(i);
        }
    }
    
    res.send(todos);
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