const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 8000 || process.env.PORT;
let Todo = require('./models/todo');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todos', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

routes.get('/', (req,res) => {
    Todo.find((err, todos) => {
        if(err)
            console.log(err);
        else {
            res.json(todos);
        }
    });
});

routes.get('/:id',(req,res) => {
    const id = req.params.id;
    Todo.findById(id, (err,todo) => {
        res.json(todo);
    });
});

routes.post('/add',(req,res) => {
    const todo = new Todo(req.body);
    todo.save()
        .then( todo => {
            res.status(200).json({'todo': 'todo added successfully',data:todo});
        })
        .catch( err => {
            res.status(400).send('adding new todo failed');
        });
});

routes.post('/update/:id',(req,res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo)
            res.status(404).send('Data is not found');
        else {
            todo.todo_title = req.body.todo_title;
            todo.todo_description = req.body.todo_description;
            todo.todo_category = req.body.todo_category;
            todo.todo_dueDate = req.body.todo_dueDate;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then( todo => {
                res.json('Todo updated');
            })
            .catch( err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

app.use('/todos',routes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});
