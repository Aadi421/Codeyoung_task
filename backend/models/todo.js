const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_title: {
        type: String
    },
    todo_description: {
        type: String
    },
    todo_completed: {
        type: Boolean,
        default:false
    },
    todo_category: {
        type: String,
       
    },
    todo_dueDate: {
        type: String,
        
    }
},{timestamps:true});

module.exports = mongoose.model('Todo', Todo);