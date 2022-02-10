import React , { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todo_title: '',
            todo_description: '',
            todo_category: '',
            todo_dueDate: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/todos/' + this.props.match.params.id)
            .then( res => {
                this.setState({
                    todo_title: res.data.todo_title,
                    todo_description: res.data.todo_description,
                    todo_category: res.data.todo_category,
                    todo_dueDate: res.data.todo_dueDate,
                    todo_completed: res.data.todo_completed
                })
            })
            .catch( err => console.log(err));
    }

    
    onChangeTodoTitle = e => {
        this.setState({ todo_title: e.target.value });
    }

    onChangeTodoDescription = e => {
        this.setState({ todo_description: e.target.value });
    }

    onChangeTodoCategory = e => {
        this.setState({ todo_category: e.target.value });
    }

    onChangeTodoDueDate = e => {
        this.setState({ todo_dueDate: e.target.value });
    }


    onChangeTodoCompleted = (e) => {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todo_title: this.state.todo_title,
            todo_description: this.state.todo_description,
            todo_category: this.state.todo_category,
            todo_dueDate: this.state.todo_dueDate,
            todo_completed: this.state.todo_completed
        };
        axios.post('http://localhost:8000/todos/update/' + this.props.match.params.id, obj)
            .then( res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div className='m-3'>
                <h5>Update Todo</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                                className="form-control"
                                value={this.state.todo_title}
                                onChange={this.onChangeTodoTitle}
                                />
                    </div>
                    <div className="input-group mt-4">
                        <span className="input-group-text">Discription</span>
                        <textarea class="form-control" 
                                    aria-label="With textarea"
                                    value={this.state.todo_description}
                                    onChange={this.onChangeTodoDescription}
                                    >

                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                            <select className="form-select" 
                                    aria-label="Default select example"
                                    value={this.state.todo_category}
                                    onChange={this.onChangeTodoCategory}
                                    >
                                <option selected>Choose a catagory</option>
                                <option >personal</option>
                                <option >Home</option>
                                <option >Work</option>
                                <option>School</option>
                                <option>Other</option>
                            </select>
                        </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input type="date"    
                                className="form-control"
                                value={this.state.todo_dueDate}
                                onChange={this.onChangeTodoDueDate}
                            />
                    </div>
                    <div className="form-check mt-2">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.todo_completed}
                                    value={this.state.todo_completed}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }
}